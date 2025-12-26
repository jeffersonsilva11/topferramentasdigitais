'use client';

import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';

export default function ConverterJPGPDF() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) =>
      ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    );

    if (imageFiles.length === 0) {
      alert('Por favor, selecione arquivos de imagem válidos (JPG, JPEG, PNG)');
      return;
    }

    setSelectedFiles(imageFiles);

    // Gerar previews
    const previewPromises = imageFiles.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then(setPreviews);
  };

  const convertToPDF = async () => {
    if (selectedFiles.length === 0) return;

    setConverting(true);
    try {
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (let i = 0; i < previews.length; i++) {
        const preview = previews[i];

        // Criar uma imagem para obter dimensões
        const img = new Image();
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = preview;
        });

        // Calcular dimensões mantendo proporção
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgRatio = img.width / img.height;
        const pdfRatio = pdfWidth / pdfHeight;

        let finalWidth, finalHeight;
        if (imgRatio > pdfRatio) {
          finalWidth = pdfWidth;
          finalHeight = pdfWidth / imgRatio;
        } else {
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * imgRatio;
        }

        // Adicionar nova página (exceto na primeira)
        if (!isFirstPage) {
          pdf.addPage();
        }
        isFirstPage = false;

        // Centralizar imagem
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        pdf.addImage(preview, 'JPEG', x, y, finalWidth, finalHeight);
      }

      // Salvar PDF
      pdf.save('imagens-convertidas.pdf');
    } catch {
      alert('Erro ao converter para PDF');
    } finally {
      setConverting(false);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const reset = () => {
    setSelectedFiles([]);
    setPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecione uma ou mais imagens (JPG, PNG):
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          multiple
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
        />
      </div>

      {selectedFiles.length > 0 && (
        <>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">{selectedFiles.length}</span> imagem(ns) selecionada(s)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                  <p className="text-xs text-center mt-1 text-gray-600">
                    {selectedFiles[index].name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={convertToPDF}
              disabled={converting}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {converting ? '⏳ Convertendo...' : '📄 Converter para PDF'}
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
            >
              🗑️ Limpar
            </button>
          </div>
        </>
      )}

      <div className="text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Como usar:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Selecione uma ou mais imagens JPG ou PNG</li>
          <li>As imagens serão adicionadas ao PDF na ordem selecionada</li>
          <li>Clique em &quot;Converter para PDF&quot; para gerar o arquivo</li>
          <li>Tudo funciona localmente - suas imagens não são enviadas para servidores</li>
        </ul>
      </div>
    </div>
  );
}
