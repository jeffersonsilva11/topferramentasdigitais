'use client';

import { useState, useRef, useEffect } from 'react';

interface ConvertedImage {
  dataUrl: string;
  pageNumber: number;
}

export default function ConverterPDFJPG() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<ConvertedImage[]>([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(90);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfjsRef = useRef<typeof import('pdfjs-dist') | null>(null);

  // Carregar PDF.js dinamicamente após o componente montar
  useEffect(() => {
    const loadPdfJs = async () => {
      if (typeof window !== 'undefined') {
        const pdfjs = await import('pdfjs-dist/build/pdf.min.mjs');
        pdfjsRef.current = pdfjs;

        if (pdfjs.GlobalWorkerOptions) {
          pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
        }
      }
    };

    loadPdfJs();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setImages([]);
      setProgress(0);
    } else {
      alert('Por favor, selecione um arquivo PDF válido');
    }
  };

  const convertToJPG = async () => {
    if (!selectedFile) return;

    // Verificar se PDF.js foi carregado
    if (!pdfjsRef.current) {
      alert('Aguarde, carregando biblioteca PDF.js...');
      return;
    }

    setConverting(true);
    setProgress(0);
    setImages([]);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const loadingTask = pdfjsRef.current.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const convertedImages: ConvertedImage[] = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        // Definir escala para boa qualidade
        const scale = 2.0;
        const viewport = page.getViewport({ scale });

        // Criar canvas
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          console.error(`Não foi possível criar contexto 2D para a página ${pageNum}`);
          continue;
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Renderizar página no canvas
        await page.render({
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        }).promise;

        // Converter para JPG
        const jpgDataUrl = canvas.toDataURL('image/jpeg', quality / 100);

        convertedImages.push({
          dataUrl: jpgDataUrl,
          pageNumber: pageNum,
        });

        // Atualizar progresso
        setProgress(Math.round((pageNum / numPages) * 100));
      }

      if (convertedImages.length === 0) {
        alert('Nenhuma página foi convertida. Verifique o arquivo PDF.');
      } else {
        setImages(convertedImages);
      }
    } catch (error) {
      console.error('Erro ao converter PDF:', error);
      let errorMessage = 'Erro ao converter PDF.';

      if (error instanceof Error) {
        if (error.message.includes('Invalid PDF')) {
          errorMessage = 'O arquivo selecionado não é um PDF válido.';
        } else if (error.message.includes('password')) {
          errorMessage = 'Este PDF está protegido por senha e não pode ser convertido.';
        } else {
          errorMessage = `Erro ao converter PDF: ${error.message}`;
        }
      }

      alert(errorMessage);
    } finally {
      setConverting(false);
    }
  };

  const downloadImage = (imageUrl: string, pageNumber: number) => {
    const link = document.createElement('a');
    link.download = `page-${pageNumber}.jpg`;
    link.href = imageUrl;
    link.click();
  };

  const downloadAll = () => {
    images.forEach((img) => {
      setTimeout(() => downloadImage(img.dataUrl, img.pageNumber), img.pageNumber * 100);
    });
  };

  const reset = () => {
    setSelectedFile(null);
    setImages([]);
    setProgress(0);
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
          accept="application/pdf"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
        />
      </div>

      {selectedFile && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qualidade JPG: {quality}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={converting}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Menor tamanho</span>
            <span>Melhor qualidade</span>
          </div>
        </div>
      )}

      {selectedFile && !converting && images.length === 0 && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={convertToJPG}
            className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            🖼️ Converter PDF para JPG
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
          >
            🗑️ Limpar
          </button>
        </div>
      )}

      {converting && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Convertendo...</span>
            <span className="text-sm font-medium text-primary-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <p className="text-green-700 font-medium">
              ✅ {images.length} página(s) convertida(s) com sucesso!
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={downloadAll}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              💾 Baixar Todas ({images.length})
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
            >
              🔄 Nova Conversão
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.pageNumber}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-400 transition"
              >
                <img
                  src={img.dataUrl}
                  alt={`Página ${img.pageNumber}`}
                  className="w-full h-48 object-contain bg-gray-50 rounded mb-3"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Página {img.pageNumber}
                  </span>
                  <button
                    onClick={() => downloadImage(img.dataUrl, img.pageNumber)}
                    className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 transition"
                  >
                    💾 Baixar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Como usar:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Selecione um arquivo PDF do seu computador</li>
          <li>Ajuste a qualidade do JPG (maior qualidade = maior tamanho)</li>
          <li>Clique em &quot;Converter PDF para JPG&quot;</li>
          <li>Cada página do PDF será convertida em uma imagem JPG separada</li>
          <li>Baixe as imagens individualmente ou todas de uma vez</li>
          <li>✅ Tudo funciona localmente - seu PDF não é enviado para servidores!</li>
        </ul>
      </div>
    </div>
  );
}
