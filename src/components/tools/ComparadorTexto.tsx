'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function ComparadorTexto() {
  const locale = useLocale();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [comparisonMode, setComparisonMode] = useState<'characters' | 'words' | 'lines'>('lines');
  const [showDifferences, setShowDifferences] = useState(false);

  const compareTexts = () => {
    setShowDifferences(true);
  };

  const clearTexts = () => {
    setText1('');
    setText2('');
    setShowDifferences(false);
  };

  const getDifferences = () => {
    if (comparisonMode === 'characters') {
      return {
        equal: text1 === text2,
        text1Length: text1.length,
        text2Length: text2.length,
        difference: Math.abs(text1.length - text2.length),
      };
    } else if (comparisonMode === 'words') {
      const words1 = text1.trim().split(/\s+/).filter(w => w.length > 0);
      const words2 = text2.trim().split(/\s+/).filter(w => w.length > 0);
      return {
        equal: words1.join(' ') === words2.join(' '),
        text1Length: words1.length,
        text2Length: words2.length,
        difference: Math.abs(words1.length - words2.length),
      };
    } else {
      const lines1 = text1.split('\n');
      const lines2 = text2.split('\n');
      return {
        equal: text1 === text2,
        text1Length: lines1.length,
        text2Length: lines2.length,
        difference: Math.abs(lines1.length - lines2.length),
      };
    }
  };

  const stats = showDifferences ? getDifferences() : null;

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* Comparison Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {locale === 'pt' ? 'Modo de Comparação:' : 'Comparison Mode:'}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'characters', label: locale === 'pt' ? 'Caracteres' : 'Characters', icon: '🔤' },
                { value: 'words', label: locale === 'pt' ? 'Palavras' : 'Words', icon: '📝' },
                { value: 'lines', label: locale === 'pt' ? 'Linhas' : 'Lines', icon: '📋' },
              ].map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => setComparisonMode(mode.value as typeof comparisonMode)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    comparisonMode === mode.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{mode.icon}</span>
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? '📄 Texto 1' : '📄 Text 1'}
              </label>
              <textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder={locale === 'pt' ? 'Cole o primeiro texto aqui...' : 'Paste first text here...'}
                className="w-full h-64 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm resize-none"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {comparisonMode === 'characters' && `${text1.length} ${locale === 'pt' ? 'caracteres' : 'characters'}`}
                {comparisonMode === 'words' && `${text1.trim().split(/\s+/).filter(w => w.length > 0).length} ${locale === 'pt' ? 'palavras' : 'words'}`}
                {comparisonMode === 'lines' && `${text1.split('\n').length} ${locale === 'pt' ? 'linhas' : 'lines'}`}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? '📄 Texto 2' : '📄 Text 2'}
              </label>
              <textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder={locale === 'pt' ? 'Cole o segundo texto aqui...' : 'Paste second text here...'}
                className="w-full h-64 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm resize-none"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {comparisonMode === 'characters' && `${text2.length} ${locale === 'pt' ? 'caracteres' : 'characters'}`}
                {comparisonMode === 'words' && `${text2.trim().split(/\s+/).filter(w => w.length > 0).length} ${locale === 'pt' ? 'palavras' : 'words'}`}
                {comparisonMode === 'lines' && `${text2.split('\n').length} ${locale === 'pt' ? 'linhas' : 'lines'}`}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={compareTexts}
              disabled={!text1 && !text2}
              className="flex-1 py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {locale === 'pt' ? 'Comparar Textos' : 'Compare Texts'}
            </button>
            <button
              onClick={clearTexts}
              className="py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              {locale === 'pt' ? 'Limpar' : 'Clear'}
            </button>
          </div>

          {/* Results */}
          {showDifferences && stats && (
            <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {locale === 'pt' ? '📊 Resultado da Comparação:' : '📊 Comparison Result:'}
              </h3>

              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${stats.equal ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{stats.equal ? '✅' : '❌'}</span>
                    <div>
                      <p className={`text-lg font-semibold ${stats.equal ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                        {stats.equal
                          ? (locale === 'pt' ? 'Textos Idênticos' : 'Texts are Identical')
                          : (locale === 'pt' ? 'Textos Diferentes' : 'Texts are Different')}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {!stats.equal && `${stats.difference} ${
                          comparisonMode === 'characters' ? (locale === 'pt' ? 'caracteres' : 'characters') :
                          comparisonMode === 'words' ? (locale === 'pt' ? 'palavras' : 'words') :
                          (locale === 'pt' ? 'linhas' : 'lines')
                        } ${locale === 'pt' ? 'de diferença' : 'difference'}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white dark:bg-dark-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'pt' ? 'Texto 1:' : 'Text 1:'}
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.text1Length}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {comparisonMode === 'characters' && (locale === 'pt' ? 'caracteres' : 'characters')}
                      {comparisonMode === 'words' && (locale === 'pt' ? 'palavras' : 'words')}
                      {comparisonMode === 'lines' && (locale === 'pt' ? 'linhas' : 'lines')}
                    </p>
                  </div>

                  <div className="p-4 bg-white dark:bg-dark-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'pt' ? 'Texto 2:' : 'Text 2:'}
                    </p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.text2Length}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {comparisonMode === 'characters' && (locale === 'pt' ? 'caracteres' : 'characters')}
                      {comparisonMode === 'words' && (locale === 'pt' ? 'palavras' : 'words')}
                      {comparisonMode === 'lines' && (locale === 'pt' ? 'linhas' : 'lines')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
