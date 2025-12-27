'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface RegexPreset {
  name: string;
  pattern: string;
  description: string;
  example: string;
}

// Presets will be created using t() in the component
const regexPresetPatterns = [
  {
    key: 'email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    example: 'user@example.com',
  },
  {
    key: 'url',
    pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$',
    example: 'https://www.example.com',
  },
  {
    key: 'phone',
    pattern: '^\\+?1?\\s*\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
    example: '(555) 123-4567',
  },
  {
    key: 'date',
    pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
    example: '2025-01-31',
  },
  {
    key: 'hexColor',
    pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
    example: '#FF5733',
  },
  {
    key: 'ipv4',
    pattern: '^((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)$',
    example: '192.168.1.1',
  },
  {
    key: 'username',
    pattern: '^[a-zA-Z0-9_-]{3,16}$',
    example: 'user_name123',
  },
  {
    key: 'creditCard',
    pattern: '^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$',
    example: '1234 5678 9012 3456',
  },
];

export default function ValidadorRegex() {
  const t = useTranslations('regexValidatorUI');
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');

  // Create presets with translated descriptions
  const regexPresets: RegexPreset[] = regexPresetPatterns.map(preset => ({
    name: t(`preset${preset.key.charAt(0).toUpperCase() + preset.key.slice(1)}Name`),
    pattern: preset.pattern,
    description: t(`preset${preset.key.charAt(0).toUpperCase() + preset.key.slice(1)}Desc`),
    example: preset.example,
  }));

  useEffect(() => {
    testRegex();
  }, [pattern, flags, testString]);

  const testRegex = () => {
    if (!pattern) {
      setMatches(null);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const result = testString.match(regex);
      setMatches(result);
      setError('');
      generateExplanation(pattern);
    } catch (err) {
      setError((err as Error).message);
      setMatches(null);
      setExplanation('');
    }
  };

  const generateExplanation = (regex: string) => {
    const parts: string[] = [];

    if (regex.includes('^')) parts.push(t('explainStart'));
    if (regex.includes('$')) parts.push(t('explainEnd'));
    if (regex.includes('\\d')) parts.push(t('explainDigit'));
    if (regex.includes('\\w')) parts.push(t('explainWord'));
    if (regex.includes('\\s')) parts.push(t('explainWhitespace'));
    if (regex.includes('+')) parts.push(t('explainOneOrMore'));
    if (regex.includes('*')) parts.push(t('explainZeroOrMore'));
    if (regex.includes('?')) parts.push(t('explainOptional'));
    if (regex.includes('[')) parts.push(t('explainCharSet'));
    if (regex.includes('(')) parts.push(t('explainCapturing'));
    if (regex.includes('|')) parts.push(t('explainOr'));
    if (regex.includes('{')) parts.push(t('explainQuantity'));
    if (regex.includes('.')) parts.push(t('explainAny'));

    setExplanation(parts.length > 0 ? parts.join(' • ') : t('explainSimple'));
  };

  const loadPreset = (preset: RegexPreset) => {
    setPattern(preset.pattern);
    setTestString(preset.example);
    setFlags('g');
  };

  const highlightMatches = () => {
    if (!testString || !matches || matches.length === 0) {
      return <span>{testString || 'Enter test string...'}</span>;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const parts: JSX.Element[] = [];
      let lastIndex = 0;

      testString.replace(regex, (match, ...args) => {
        const index = typeof args[args.length - 2] === 'number' ? args[args.length - 2] : 0;

        // Add non-matching part
        if (index > lastIndex) {
          parts.push(
            <span key={`text-${lastIndex}`}>
              {testString.substring(lastIndex, index)}
            </span>
          );
        }

        // Add matching part
        parts.push(
          <span key={`match-${index}`} className="bg-yellow-300 dark:bg-yellow-600 font-bold">
            {match}
          </span>
        );

        lastIndex = index + match.length;
        return match;
      });

      // Add remaining text
      if (lastIndex < testString.length) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {testString.substring(lastIndex)}
          </span>
        );
      }

      return <>{parts}</>;
    } catch {
      return <span>{testString}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Regex Tester */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('title')}</h2>

        <div className="space-y-4">
          {/* Pattern Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('pattern')}
            </label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 bg-gray-100 dark:bg-dark-800 border-2 border-gray-300 dark:border-dark-700 rounded-l-lg">
                /
              </span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder={t('patternPlaceholder')}
                className="flex-1 px-4 py-3 border-2 border-l-0 border-gray-300 dark:border-dark-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <span className="flex items-center px-3 bg-gray-100 dark:bg-dark-800 border-2 border-l-0 border-gray-300 dark:border-dark-700 rounded-r-lg">
                /
              </span>
              <input
                type="text"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="flags"
                className="w-20 px-3 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('flagsExplanation')}
            </p>
          </div>

          {/* Test String */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('testString')}
            </label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder={t('testStringPlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded">
              <p className="font-semibold text-red-700 dark:text-red-400">❌ Error:</p>
              <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Matches Display */}
          {!error && pattern && (
            <div className="space-y-3">
              {/* Highlighted Text */}
              <div>
                <p className="text-sm font-medium mb-2">{t('matches')}:</p>
                <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4 font-mono text-sm break-words">
                  {highlightMatches()}
                </div>
              </div>

              {/* Match Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('matchesFound')}</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {matches ? matches.length : 0}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('patternValid')}</p>
                  <p className="text-2xl font-bold text-green-600">
                    {error ? '❌' : '✅'}
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('hasMatch')}</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {matches && matches.length > 0 ? '✅' : '❌'}
                  </p>
                </div>
              </div>

              {/* Explanation */}
              {explanation && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                  <p className="font-semibold mb-2">📝 {t('patternIncludes')}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{explanation}</p>
                </div>
              )}

              {/* Match Details */}
              {matches && matches.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">{t('matchDetails')}</p>
                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-dark-800 rounded-lg p-3">
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">{t('matchNumber', { number: index + 1 })}</span>{' '}
                          <span className="font-mono font-semibold">{match}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Presets */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('commonPresets')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {regexPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => loadPreset(preset)}
              className="text-left p-4 rounded-lg border-2 border-gray-300 dark:border-dark-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
            >
              <p className="font-semibold mb-1">{preset.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {preset.description}
              </p>
              <p className="text-xs font-mono bg-gray-100 dark:bg-dark-800 rounded px-2 py-1">
                {preset.example}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('quickReference')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold mb-2">{t('refCharClasses')}</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">\d</code> - {t('refDigit')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">\w</code> - {t('refWord')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">\s</code> - {t('refWhitespace')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">.</code> - {t('refAny')}</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">{t('refQuantifiers')}</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">*</code> - {t('refZeroOrMore')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">+</code> - {t('refOneOrMore')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">?</code> - {t('refZeroOrOne')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">{'{n,m}'}</code> - {t('refBetween')}</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">{t('refAnchors')}</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">^</code> - {t('refStartString')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">$</code> - {t('refEndString')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">\b</code> - {t('refWordBoundary')}</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">{t('refGroups')}</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">()</code> - {t('refCapturingGroup')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">(?:)</code> - {t('refNonCapturing')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">[]</code> - {t('refCharSet')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">|</code> - {t('refOr')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">💡 {t('tips')}</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>{t('tip1')}</li>
          <li>{t('tip2')}</li>
          <li>{t('tip3')}</li>
          <li>{t('tip4')}</li>
        </ul>
      </div>
    </div>
  );
}
