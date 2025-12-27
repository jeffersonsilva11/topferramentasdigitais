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

const regexPresets: RegexPreset[] = [
  {
    name: 'Email',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    description: 'Validates email addresses',
    example: 'user@example.com',
  },
  {
    name: 'URL',
    pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$',
    description: 'Validates HTTP/HTTPS URLs',
    example: 'https://www.example.com',
  },
  {
    name: 'Phone (US)',
    pattern: '^\\+?1?\\s*\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
    description: 'US phone numbers',
    example: '(555) 123-4567',
  },
  {
    name: 'Date (YYYY-MM-DD)',
    pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
    description: 'ISO date format',
    example: '2025-01-31',
  },
  {
    name: 'Hex Color',
    pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
    description: 'Hexadecimal color codes',
    example: '#FF5733',
  },
  {
    name: 'IPv4',
    pattern: '^((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)$',
    description: 'IPv4 addresses',
    example: '192.168.1.1',
  },
  {
    name: 'Username',
    pattern: '^[a-zA-Z0-9_-]{3,16}$',
    description: '3-16 chars, alphanumeric, underscore, hyphen',
    example: 'user_name123',
  },
  {
    name: 'Credit Card',
    pattern: '^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$',
    description: '16-digit credit card number',
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

    if (regex.includes('^')) parts.push('Start of string');
    if (regex.includes('$')) parts.push('End of string');
    if (regex.includes('\\d')) parts.push('Digit (0-9)');
    if (regex.includes('\\w')) parts.push('Word character (a-z, A-Z, 0-9, _)');
    if (regex.includes('\\s')) parts.push('Whitespace');
    if (regex.includes('+')) parts.push('One or more');
    if (regex.includes('*')) parts.push('Zero or more');
    if (regex.includes('?')) parts.push('Optional');
    if (regex.includes('[')) parts.push('Character set');
    if (regex.includes('(')) parts.push('Capturing group');
    if (regex.includes('|')) parts.push('OR operator');
    if (regex.includes('{')) parts.push('Specific quantity');
    if (regex.includes('.')) parts.push('Any character');

    setExplanation(parts.length > 0 ? parts.join(' • ') : 'Simple pattern');
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
                placeholder="Enter regex pattern"
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
              Flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode)
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Matches Found</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {matches ? matches.length : 0}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pattern Valid</p>
                  <p className="text-2xl font-bold text-green-600">
                    {error ? '❌' : '✅'}
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Has Match</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {matches && matches.length > 0 ? '✅' : '❌'}
                  </p>
                </div>
              </div>

              {/* Explanation */}
              {explanation && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                  <p className="font-semibold mb-2">📝 Pattern includes:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{explanation}</p>
                </div>
              )}

              {/* Match Details */}
              {matches && matches.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Match Details:</p>
                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-dark-800 rounded-lg p-3">
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Match #{index + 1}:</span>{' '}
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
            <p className="font-semibold mb-2">Character Classes:</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">\d</code> - Digit (0-9)</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">\w</code> - Word character</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">\s</code> - Whitespace</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">.</code> - Any character</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">Quantifiers:</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">*</code> - 0 or more</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">+</code> - 1 or more</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">?</code> - 0 or 1</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">{'{n,m}'}</code> - Between n and m</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">Anchors:</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">^</code> - Start of string</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">$</code> - End of string</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">\b</code> - Word boundary</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">Groups:</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">()</code> - Capturing group</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">(?:)</code> - Non-capturing</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">[]</code> - Character set</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">|</code> - OR operator</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">💡 Tips:</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>Use the presets as starting points for common patterns</li>
          <li>Test your regex with multiple examples to ensure it works correctly</li>
          <li>Remember to escape special characters with backslash (\)</li>
          <li>Use the 'g' flag to find all matches, not just the first one</li>
        </ul>
      </div>
    </div>
  );
}
