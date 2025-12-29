'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { PDFDocument } from 'pdf-lib';
import { showSuccess, showError, downloadFile } from '@/lib/toast';

export default function MesclarPDF() {
  const locale = useLocale();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFileUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setFiles(newFiles);
  };

  const moveFileDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    setFiles(newFiles);
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      showError(locale === 'pt' ? 'Adicione pelo menos 2 arquivos PDF' : 'Add at least 2 PDF files');
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: 'application/pdf' });

      downloadFile(blob, 'merged.pdf', locale === 'pt' ? 'PDF mesclado!' : 'PDF merged!');
      showSuccess(locale === 'pt' ? 'PDFs mesclados com sucesso!' : 'PDFs merged successfully!');
    } catch (error) {
      console.error(error);
      showError(locale === 'pt' ? 'Erro ao mesclar PDFs' : 'Error merging PDFs');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        {/* Upload Area */}
        <div className="mb-6">
          <label className="block w-full p-8 border-2 border-dashed border-gray-300 dark:border-dark-600 dim:border-dim-600 rounded-lg text-center cursor-pointer hover:border-primary-500 transition-colors">
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 dim:text-dim-200">
              {locale === 'pt' ? 'Clique para adicionar PDFs' : 'Click to add PDFs'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 dim:text-dim-400 mt-2">
              {locale === 'pt' ? 'ou arraste e solte aqui' : 'or drag and drop here'}
            </p>
          </label>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 dim:text-dim-100 mb-3">
              {locale === 'pt' ? 'Arquivos adicionados:' : 'Added files:'} ({files.length})
            </h3>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-700 dim:bg-dim-700 rounded-lg"
              >
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 dim:text-dim-200 truncate">
                  {index + 1}. {file.name}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveFileUp(index)}
                    disabled={index === 0}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 disabled:opacity-30"
                    title={locale === 'pt' ? 'Mover para cima' : 'Move up'}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveFileDown(index)}
                    disabled={index === files.length - 1}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 disabled:opacity-30"
                    title={locale === 'pt' ? 'Mover para baixo' : 'Move down'}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 text-red-600 hover:text-red-700"
                    title={locale === 'pt' ? 'Remover' : 'Remove'}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Merge Button */}
        <button
          onClick={mergePDFs}
          disabled={files.length < 2 || isProcessing}
          className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing
            ? (locale === 'pt' ? 'Mesclando...' : 'Merging...')
            : (locale === 'pt' ? `Mesclar ${files.length} PDFs` : `Merge ${files.length} PDFs`)}
        </button>
      </div>
    </div>
  );
}
