'use client';

import { useState, useRef } from 'react';

export default function ConverterPNGJPG() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [convertedPreview, setConvertedPreview] = useState<string>('');
  const [converting, setConverting] = useState(false);
  const [quality, setQuality] = useState(90);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/png') {
      setSelectedFile(file);
      setConvertedPreview('');

      const reader = new FileReader();
      reader.onload = (e) => setOriginalPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione um arquivo PNG válido');
    }
  };

  const convertToJPG = async () => {
    if (!originalPreview) return;

    setConverting(true);
    try {
      const img = new Image();
      img.src = originalPreview;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Preencher fundo branco (PNG pode ter transparência)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const jpgDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
        setConvertedPreview(jpgDataUrl);
      }
    } catch {
      alert('Erro ao converter para JPG');
    } finally {
      setConverting(false);
    }
  };

  const downloadConverted = () => {
    if (!convertedPreview) return;

    const link = document.createElement('a');
    link.href = convertedPreview;
    const fileName = selectedFile?.name.replace('.png', '.jpg') || 'converted.jpg';
    link.download = fileName;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setOriginalPreview('');
    setConvertedPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecione um arquivo PNG:
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
        />
      </div>

      {selectedFile && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualidade do JPG: {quality}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Menor qualidade</span>
              <span>Melhor qualidade</span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={convertToJPG}
              disabled={converting}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {converting ? '⏳ Convertendo...' : '🔄 Converter para JPG'}
            </button>
            {convertedPreview && (
              <button
                onClick={downloadConverted}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                💾 Baixar JPG
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
            <h3 className="font-bold mb-2">Original (PNG)</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <img src={originalPreview} alt="Original PNG" className="w-full h-auto rounded" />
            </div>
          </div>
          {convertedPreview && (
            <div>
              <h3 className="font-bold mb-2">Convertido (JPG)</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <img src={convertedPreview} alt="Convertido JPG" className="w-full h-auto rounded" />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Informação:</p>
        <p>
          PNG suporta transparência, mas JPG não. Áreas transparentes serão preenchidas com branco.
          JPG geralmente tem arquivos menores que PNG para fotos e imagens complexas.
          Tudo é processado localmente no seu navegador.
        </p>
      </div>
    </div>
  );
}
