'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { PDFDocument } from 'pdf-lib';
import { showSuccess, showError, downloadFile } from '@/lib/toast';

export default function DividirPDF() {
  const locale = useLocale();
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
    }
  };

  const splitPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer);

      // Parse page ranges (e.g., "1-3, 5, 7-10")
      const ranges = selectedPages.split(',').map(r => r.trim());
      const pagesToExtract: number[] = [];

      for (const range of ranges) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(n => parseInt(n.trim()) - 1);
          for (let i = start; i <= end; i++) {
            if (i >= 0 && i < pageCount) pagesToExtract.push(i);
          }
        } else {
          const page = parseInt(range) - 1;
          if (page >= 0 && page < pageCount) pagesToExtract.push(page);
        }
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(sourcePdf, pagesToExtract);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });

      downloadFile(blob, 'split.pdf', locale === 'pt' ? 'PDF dividido!' : 'PDF split!');
      showSuccess(locale === 'pt' ? 'PDF dividido com sucesso!' : 'PDF split successfully!');
    } catch (error) {
      console.error(error);
      showError(locale === 'pt' ? 'Erro ao dividir PDF' : 'Error splitting PDF');
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
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {locale === 'pt' ? `Total de páginas: ${pageCount}` : `Total pages: ${pageCount}`}
              </p>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Páginas para extrair (ex: 1-3, 5, 7-10):' : 'Pages to extract (e.g., 1-3, 5, 7-10):'}
              </label>
              <input
                type="text"
                value={selectedPages}
                onChange={(e) => setSelectedPages(e.target.value)}
                placeholder="1-3, 5, 7-10"
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              onClick={splitPDF}
              disabled={!selectedPages || isProcessing}
              className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (locale === 'pt' ? 'Dividindo...' : 'Splitting...') : (locale === 'pt' ? 'Dividir PDF' : 'Split PDF')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
