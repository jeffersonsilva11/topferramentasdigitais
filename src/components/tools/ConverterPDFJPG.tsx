'use client';

import { useState, useRef } from 'react';

export default function ConverterPDFJPG() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setImages([]);
    } else {
      alert('Por favor, selecione um arquivo PDF válido');
    }
  };

  const convertPDFtoJPG = async () => {
    if (!selectedFile) return;

    setConverting(true);
    try {
      // Nota: Conversão de PDF para JPG no navegador requer bibliotecas como pdf.js
      // Esta é uma implementação simplificada que mostra a estrutura
      alert(
        'Para converter PDF para JPG completamente no navegador, seria necessário integrar a biblioteca PDF.js. ' +
        'Esta demonstração mostra a interface da ferramenta.'
      );

      // Simulação de conversão (substituir por implementação real com PDF.js)
      setTimeout(() => {
        setConverting(false);
        // setImages([...]) - adicionar imagens convertidas aqui
      }, 2000);
    } catch (error) {
      alert('Erro ao converter PDF');
      setConverting(false);
    }
  };

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `pagina-${index + 1}.jpg`;
    link.click();
  };

  const reset = () => {
    setSelectedFile(null);
    setImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecione um arquivo PDF:
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
        />
      </div>

      {selectedFile && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Arquivo selecionado:</span> {selectedFile.name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Tamanho:</span>{' '}
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <button
          onClick={convertPDFtoJPG}
          disabled={!selectedFile || converting}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {converting ? '⏳ Convertendo...' : '🔄 Converter para JPG'}
        </button>
        {selectedFile && (
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
          >
            🗑️ Limpar
          </button>
        )}
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Imagens convertidas:</h3>
          {images.map((imageUrl, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={imageUrl} alt={`Página ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                <span className="font-medium">Página {index + 1}</span>
              </div>
              <button
                onClick={() => downloadImage(imageUrl, index)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                💾 Baixar
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="font-semibold mb-2">⚠️ Nota sobre implementação:</p>
        <p>
          Para uma conversão completa de PDF para JPG no navegador, é necessário integrar
          a biblioteca PDF.js da Mozilla. Esta interface mostra como a ferramenta funcionaria.
          Os arquivos são processados localmente - nada é enviado para servidores externos.
        </p>
      </div>
    </div>
  );
}
