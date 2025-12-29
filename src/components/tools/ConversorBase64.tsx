'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { showSuccess } from '@/lib/toast';

export default function ConversorBase64() {
  const locale = useLocale();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => {
    const encoded = btoa(unescape(encodeURIComponent(input)));
    setOutput(encoded);
    showSuccess(locale === 'pt' ? 'Codificado!' : 'Encoded!');
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      showSuccess(locale === 'pt' ? 'Decodificado!' : 'Decoded!');
    } catch {
      setOutput('Erro: Base64 inválido');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={locale === 'pt' ? 'Digite o texto...' : 'Enter text...'}
          className="w-full h-32 px-4 py-2 border rounded-lg mb-4"
        />
        <div className="flex gap-3 mb-4">
          <button onClick={encode} className="flex-1 py-2 bg-primary-600 text-white rounded-lg">
            {locale === 'pt' ? 'Codificar' : 'Encode'}
          </button>
          <button onClick={decode} className="flex-1 py-2 bg-green-600 text-white rounded-lg">
            {locale === 'pt' ? 'Decodificar' : 'Decode'}
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          placeholder={locale === 'pt' ? 'Resultado...' : 'Result...'}
          className="w-full h-32 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-dark-700"
        />
      </div>
    </div>
  );
}
