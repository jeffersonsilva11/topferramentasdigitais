'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { PDFDocument } from 'pdf-lib';
import { showSuccess, showError, downloadFile } from '@/lib/toast';

export default function ComprimirPDF() {
  const locale = useLocale();
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const compressPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pdfBytes = await pdfDoc.save({
        useObjectStreams: compressionLevel !== 'low',
        addDefaultPage: false,
        objectsPerTick: compressionLevel === 'high' ? 50 : 20,
      });

      const originalSize = file.size;
      const compressedSize = pdfBytes.length;
      const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });

      downloadFile(blob, 'compressed.pdf', '');

      showSuccess(
        locale === 'pt'
          ? `PDF comprimido! Original: ${(originalSize / 1024).toFixed(0)}KB - Comprimido: ${(compressedSize / 1024).toFixed(0)}KB`
          : `PDF compressed! Original: ${(originalSize / 1024).toFixed(0)}KB - Compressed: ${(compressedSize / 1024).toFixed(0)}KB`
      );
    } catch (error) {
      console.error(error);
      showError(locale === 'pt' ? 'Erro ao comprimir PDF' : 'Error compressing PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <label className="block w-full p-8 border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg text-center cursor-pointer hover:border-primary-500 transition-colors">
            <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
            <div className="text-6xl mb-4">📄</div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {file ? file.name : locale === 'pt' ? 'Selecione um PDF' : 'Select a PDF'}
            </p>
            {file && (
              <p className="text-sm text-gray-500 mt-2">
                {locale === 'pt' ? 'Tamanho:' : 'Size:'} {(file.size / 1024).toFixed(0)}KB
              </p>
            )}
          </label>
        </div>

        {file && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {locale === 'pt' ? 'Nível de Compressão:' : 'Compression Level:'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'medium', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setCompressionLevel(level)}
                    className={`py-2 px-4 rounded-lg font-medium transition-colors capitalize ${
                      compressionLevel === level
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {level === 'low' ? (locale === 'pt' ? 'Baixa' : 'Low') : ''}
                    {level === 'medium' ? (locale === 'pt' ? 'Média' : 'Medium') : ''}
                    {level === 'high' ? (locale === 'pt' ? 'Alta' : 'High') : ''}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={compressPDF}
              disabled={isProcessing}
              className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing
                ? locale === 'pt' ? 'Comprimindo...' : 'Compressing...'
                : locale === 'pt' ? 'Comprimir PDF' : 'Compress PDF'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
