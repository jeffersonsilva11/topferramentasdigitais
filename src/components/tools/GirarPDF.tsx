'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { PDFDocument, degrees } from 'pdf-lib';
import { showSuccess, showError, downloadFile } from '@/lib/toast';

export default function GirarPDF() {
  const locale = useLocale();
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const rotatePDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach(page => {
        page.setRotation(degrees(rotation));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });

      downloadFile(blob, 'rotated.pdf', locale === 'pt' ? 'PDF girado!' : 'PDF rotated!');
      showSuccess(locale === 'pt' ? 'PDF girado com sucesso!' : 'PDF rotated successfully!');
    } catch (error) {
      console.error(error);
      showError(locale === 'pt' ? 'Erro ao girar PDF' : 'Error rotating PDF');
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
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {locale === 'pt' ? 'Selecione um PDF' : 'Select a PDF'}
            </p>
          </label>
        </div>

        {file && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {locale === 'pt' ? 'Rotação:' : 'Rotation:'}
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[90, 180, 270, 360].map(deg => (
                  <button
                    key={deg}
                    onClick={() => setRotation(deg)}
                    className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                      rotation === deg
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={rotatePDF}
              disabled={isProcessing}
              className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (locale === 'pt' ? 'Girando...' : 'Rotating...') : (locale === 'pt' ? 'Girar PDF' : 'Rotate PDF')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
