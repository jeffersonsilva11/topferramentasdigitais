'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { showSuccess } from '@/lib/toast';

export default function ConversorCase() {
  const locale = useLocale();
  const [text, setText] = useState('');

  const transformText = (type: string) => {
    let result = '';
    switch (type) {
      case 'upper': result = text.toUpperCase(); break;
      case 'lower': result = text.toLowerCase(); break;
      case 'title': result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); break;
      case 'sentence': result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(); break;
      case 'camel': result = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''); break;
      case 'snake': result = text.toLowerCase().replace(/\s+/g, '_'); break;
      case 'kebab': result = text.toLowerCase().replace(/\s+/g, '-'); break;
    }
    setText(result);
    showSuccess(locale === 'pt' ? 'Texto convertido!' : 'Text converted!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={locale === 'pt' ? 'Digite seu texto aqui...' : 'Enter your text here...'}
          className="w-full h-40 px-4 py-2 border rounded-lg mb-4"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { type: 'upper', label: locale === 'pt' ? 'MAIÚSCULAS' : 'UPPERCASE' },
            { type: 'lower', label: locale === 'pt' ? 'minúsculas' : 'lowercase' },
            { type: 'title', label: locale === 'pt' ? 'Título' : 'Title Case' },
            { type: 'sentence', label: locale === 'pt' ? 'Sentença' : 'Sentence case' },
            { type: 'camel', label: 'camelCase' },
            { type: 'snake', label: 'snake_case' },
            { type: 'kebab', label: 'kebab-case' },
          ].map(({ type, label }) => (
            <button
              key={type}
              onClick={() => transformText(type)}
              className="py-2 px-4 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 rounded-lg transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
