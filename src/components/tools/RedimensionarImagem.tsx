'use client';

import { useState, useRef } from 'react';

export default function RedimensionarImagem() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [resizedPreview, setResizedPreview] = useState<string>('');
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [newWidth, setNewWidth] = useState<number>(0);
  const [newHeight, setNewHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResizedPreview('');

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          setNewWidth(img.width);
          setNewHeight(img.height);
        };
        img.src = e.target?.result as string;
        setOriginalPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione um arquivo de imagem válido');
    }
  };

  const handleWidthChange = (value: number) => {
    setNewWidth(value);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setNewHeight(Math.round(value * ratio));
    }
  };

  const handleHeightChange = (value: number) => {
    setNewHeight(value);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setNewWidth(Math.round(value * ratio));
    }
  };

  const resizeImage = async () => {
    if (!originalPreview || newWidth <= 0 || newHeight <= 0) return;

    setProcessing(true);
    try {
      const img = new Image();
      img.src = originalPreview;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setResizedPreview(resizedDataUrl);
      }
    } catch {
      alert('Erro ao redimensionar imagem');
    } finally {
      setProcessing(false);
    }
  };

  const downloadResized = () => {
    if (!resizedPreview) return;

    const link = document.createElement('a');
    link.href = resizedPreview;
    link.download = `resized-${selectedFile?.name || 'image.jpg'}`;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setOriginalPreview('');
    setResizedPreview('');
    setOriginalDimensions({ width: 0, height: 0 });
    setNewWidth(0);
    setNewHeight(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecione uma imagem:
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
        />
      </div>

      {selectedFile && (
        <>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-4">
              Dimensões originais: <span className="font-semibold">{originalDimensions.width} x {originalDimensions.height}px</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Largura (px)
                </label>
                <input
                  type="number"
                  value={newWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Altura (px)
                </label>
                <input
                  type="number"
                  value={newHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={maintainAspectRatio}
                onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">Manter proporção (aspect ratio)</span>
            </label>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={resizeImage}
              disabled={processing || newWidth <= 0 || newHeight <= 0}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {processing ? '⏳ Redimensionando...' : '📐 Redimensionar'}
            </button>
            {resizedPreview && (
              <button
                onClick={downloadResized}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                💾 Baixar
              </button>
            )}
            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
            >
              🗑️ Limpar
            </button>
          </div>
        </>
      )}

      {originalPreview && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-2">Original</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <img src={originalPreview} alt="Original" className="w-full h-auto rounded" />
            </div>
          </div>
          {resizedPreview && (
            <div>
              <h3 className="font-bold mb-2">Redimensionada</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <img src={resizedPreview} alt="Redimensionada" className="w-full h-auto rounded" />
                <p className="text-sm text-gray-600 mt-2">
                  Novas dimensões: <span className="font-semibold">{newWidth} x {newHeight}px</span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Dica:</p>
        <p>
          Mantenha a proporção ativada para evitar distorções na imagem.
          Tudo é processado localmente no seu navegador - suas imagens não são enviadas para servidores.
        </p>
      </div>
    </div>
  );
}
