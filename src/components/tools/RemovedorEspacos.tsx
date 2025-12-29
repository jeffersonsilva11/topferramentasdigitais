'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { showSuccess } from '@/lib/toast';

export default function RemovedorEspacos() {
  const locale = useLocale();
  const [text, setText] = useState('');

  const removeExtraSpaces = () => {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    setText(cleaned);
    showSuccess(locale === 'pt' ? 'Espaços removidos!' : 'Spaces removed!');
  };

  const removeAllSpaces = () => {
    const cleaned = text.replace(/\s/g, '');
    setText(cleaned);
    showSuccess(locale === 'pt' ? 'Todos espaços removidos!' : 'All spaces removed!');
  };

  const removeDuplicateLines = () => {
    const lines = text.split('\n');
    const unique = Array.from(new Set(lines));
    setText(unique.join('\n'));
    showSuccess(locale === 'pt' ? 'Linhas duplicadas removidas!' : 'Duplicate lines removed!');
  };

  const removeEmptyLines = () => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    setText(lines.join('\n'));
    showSuccess(locale === 'pt' ? 'Linhas vazias removidas!' : 'Empty lines removed!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={locale === 'pt' ? 'Cole seu texto aqui...' : 'Paste your text here...'}
          className="w-full h-64 px-4 py-2 border rounded-lg mb-4 font-mono"
        />
        <div className="grid grid-cols-2 gap-3">
          <button onClick={removeExtraSpaces} className="py-2 bg-primary-600 text-white rounded-lg">
            {locale === 'pt' ? 'Remover Espaços Extras' : 'Remove Extra Spaces'}
          </button>
          <button onClick={removeAllSpaces} className="py-2 bg-green-600 text-white rounded-lg">
            {locale === 'pt' ? 'Remover Todos Espaços' : 'Remove All Spaces'}
          </button>
          <button onClick={removeDuplicateLines} className="py-2 bg-blue-600 text-white rounded-lg">
            {locale === 'pt' ? 'Remover Linhas Duplicadas' : 'Remove Duplicate Lines'}
          </button>
          <button onClick={removeEmptyLines} className="py-2 bg-purple-600 text-white rounded-lg">
            {locale === 'pt' ? 'Remover Linhas Vazias' : 'Remove Empty Lines'}
          </button>
        </div>
      </div>
    </div>
  );
}
