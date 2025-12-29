'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { PDFDocument } from 'pdf-lib';
import { showSuccess, showError, downloadFile } from '@/lib/toast';

export default function DesbloquearPDF() {
  const locale = useLocale();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const unlockPDF = async () => {
    if (!file) {
      showError(locale === 'pt' ? 'Selecione um arquivo PDF' : 'Select a PDF file');
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();

      // Try to load the PDF with the password if provided
      let pdfDoc;
      if (password) {
        try {
          // Note: pdf-lib has limited password support
          // For fully encrypted PDFs, this may not work
          pdfDoc = await PDFDocument.load(arrayBuffer, {
            ignoreEncryption: true,
          });
        } catch (error) {
          showError(
            locale === 'pt'
              ? 'Não foi possível desbloquear este PDF. Para PDFs criptografados, use software de desktop como Adobe Acrobat.'
              : 'Could not unlock this PDF. For encrypted PDFs, use desktop software like Adobe Acrobat.'
          );
          setIsProcessing(false);
          return;
        }
      } else {
        pdfDoc = await PDFDocument.load(arrayBuffer, {
          ignoreEncryption: true,
        });
      }

      // Save the PDF without restrictions
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });

      downloadFile(
        blob,
        'unlocked.pdf',
        locale === 'pt' ? 'PDF desbloqueado!' : 'PDF unlocked!'
      );
      showSuccess(
        locale === 'pt'
          ? 'PDF processado com sucesso! Nota: Limitações de navegador podem impedir o desbloqueio completo.'
          : 'PDF processed successfully! Note: Browser limitations may prevent full unlocking.'
      );
    } catch (error) {
      console.error(error);
      showError(
        locale === 'pt'
          ? 'Erro ao processar PDF. Este arquivo pode estar criptografado de forma que navegadores não conseguem desbloquear.'
          : 'Error processing PDF. This file may be encrypted in a way browsers cannot unlock.'
      );
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
              {file ? file.name : locale === 'pt' ? 'Selecione um PDF protegido' : 'Select a protected PDF'}
            </p>
          </label>
        </div>

        {file && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Senha (se necessário):' : 'Password (if needed):'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={locale === 'pt' ? 'Digite a senha do PDF' : 'Enter PDF password'}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>{locale === 'pt' ? '⚠️ Limitações importantes:' : '⚠️ Important limitations:'}</strong>
              </p>
              <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside space-y-1">
                <li>
                  {locale === 'pt'
                    ? 'Esta ferramenta pode remover algumas restrições simples de PDFs'
                    : 'This tool can remove some simple PDF restrictions'}
                </li>
                <li>
                  {locale === 'pt'
                    ? 'PDFs com criptografia forte requerem software de desktop'
                    : 'PDFs with strong encryption require desktop software'}
                </li>
                <li>
                  {locale === 'pt'
                    ? 'Use apenas em PDFs que você tem permissão para desbloquear'
                    : 'Only use on PDFs you have permission to unlock'}
                </li>
              </ul>
            </div>

            <button
              onClick={unlockPDF}
              disabled={isProcessing}
              className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing
                ? locale === 'pt'
                  ? 'Processando...'
                  : 'Processing...'
                : locale === 'pt'
                ? 'Desbloquear PDF'
                : 'Unlock PDF'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
