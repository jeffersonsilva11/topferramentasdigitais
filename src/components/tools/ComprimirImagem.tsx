'use client';

import { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';

export default function ComprimirImagem() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [compressedPreview, setCompressedPreview] = useState<string>('');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressedPreview('');
      setCompressedSize(0);

      const reader = new FileReader();
      reader.onload = (e) => setOriginalPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione um arquivo de imagem válido');
    }
  };

  const compressImage = async () => {
    if (!selectedFile) return;

    setCompressing(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality / 100,
      };

      const compressedFile = await imageCompression(selectedFile, options);
      setCompressedSize(compressedFile.size);

      const reader = new FileReader();
      reader.onload = (e) => setCompressedPreview(e.target?.result as string);
      reader.readAsDataURL(compressedFile);
    } catch {
      alert('Erro ao comprimir imagem');
    } finally {
      setCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedPreview) return;

    const link = document.createElement('a');
    link.href = compressedPreview;
    link.download = `compressed-${selectedFile?.name || 'image.jpg'}`;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setOriginalPreview('');
    setCompressedPreview('');
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const compressionPercent = originalSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0;

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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualidade da compressão: {quality}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Menor qualidade (mais compressão)</span>
              <span>Melhor qualidade (menos compressão)</span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={compressImage}
              disabled={compressing}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {compressing ? '⏳ Comprimindo...' : '🗜️ Comprimir Imagem'}
            </button>
            {compressedPreview && (
              <button
                onClick={downloadCompressed}
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
              <p className="text-sm text-gray-600 mt-2">
                Tamanho: <span className="font-semibold">{formatBytes(originalSize)}</span>
              </p>
            </div>
          </div>
          {compressedPreview && (
            <div>
              <h3 className="font-bold mb-2">Comprimida</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <img src={compressedPreview} alt="Comprimida" className="w-full h-auto rounded" />
                <p className="text-sm text-gray-600 mt-2">
                  Tamanho: <span className="font-semibold">{formatBytes(compressedSize)}</span>
                </p>
                <p className="text-sm text-green-600 font-semibold">
                  Economia de {compressionPercent}%
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Dica:</p>
        <p>
          A compressão reduz o tamanho do arquivo mantendo a qualidade visual.
          Use qualidade 80-90% para um bom equilíbrio entre tamanho e qualidade.
          Tudo é processado localmente no seu navegador.
        </p>
      </div>
    </div>
  );
}
