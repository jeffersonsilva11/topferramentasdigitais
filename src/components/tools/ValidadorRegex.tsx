'use client';

import { useState, useEffect, ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface RegexPreset {
  name: string;
  pattern: string;
  description: string;
  example: string;
}

// Preset patterns (names and descriptions will be added via translations)
const regexPresetPatterns = [
  {
    nameKey: 'presetEmailName',
    descKey: 'presetEmailDesc',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    example: 'user@example.com',
  },
  {
    nameKey: 'presetUrlName',
    descKey: 'presetUrlDesc',
    pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$',
    example: 'https://www.example.com',
  },
  {
    nameKey: 'presetPhoneName',
    descKey: 'presetPhoneDesc',
    pattern: '^\\+?1?\\s*\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
    example: '(555) 123-4567',
  },
  {
    nameKey: 'presetDateName',
    descKey: 'presetDateDesc',
    pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
    example: '2025-01-31',
  },
  {
    nameKey: 'presetHexColorName',
    descKey: 'presetHexColorDesc',
    pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
    example: '#FF5733',
  },
  {
    nameKey: 'presetIpv4Name',
    descKey: 'presetIpv4Desc',
    pattern: '^((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)$',
    example: '192.168.1.1',
  },
  {
    nameKey: 'presetUsernameName',
    descKey: 'presetUsernameDesc',
    pattern: '^[a-zA-Z0-9_-]{3,16}$',
    example: 'user_name123',
  },
  {
    nameKey: 'presetCreditCardName',
    descKey: 'presetCreditCardDesc',
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
  const [textToConvert, setTextToConvert] = useState('');
  const [generatedRegex, setGeneratedRegex] = useState('');


  // Create presets with translated names and descriptions
  const regexPresets: RegexPreset[] = regexPresetPatterns.map(preset => ({
    name: t(preset.nameKey),
    pattern: preset.pattern,
    description: t(preset.descKey),
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

    if (regex.includes('^')) parts.push('Início da string');
    if (regex.includes('$')) parts.push('Fim da string');
    if (regex.includes('\\d')) parts.push('Dígitos');
    if (regex.includes('\\w')) parts.push('Caracteres de palavra');
    if (regex.includes('\\s')) parts.push('Espaços em branco');
    if (regex.includes('+')) parts.push('Um ou mais');
    if (regex.includes('*')) parts.push('Zero ou mais');
    if (regex.includes('?')) parts.push('Opcional');
    if (regex.includes('[')) parts.push('Conjunto de caracteres');
    if (regex.includes('(')) parts.push('Grupo de captura');
    if (regex.includes('|')) parts.push('OU lógico');
    if (regex.includes('{')) parts.push('Quantidade específica');
    if (regex.includes('.')) parts.push('Qualquer caractere');

    setExplanation(parts.length > 0 ? parts.join(' • ') : 'Padrão regex simples');
  };

  const loadPreset = (preset: RegexPreset) => {
    setPattern(preset.pattern);
    setTestString(preset.example);
    setFlags('g');
  };

  const generateRegexFromText = () => {
    if (!textToConvert.trim()) {
      alert(t('alertEnterText'));
      return;
    }

    const text = textToConvert.trim();
    let generated = '';
    let description = '';

    // Detect email pattern
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text)) {
      generated = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
      description = t('generatedEmail');
    }
    // Detect URL pattern
    else if (/^https?:\/\//.test(text)) {
      generated = '^https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$';
      description = t('generatedUrl');
    }
    // Detect phone number pattern (various formats)
    else if (/^[\d\s\-\(\)\.+]+$/.test(text) && text.replace(/\D/g, '').length >= 10) {
      const digitsOnly = text.replace(/\D/g, '');
      if (digitsOnly.length === 10) {
        generated = '^\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$';
      } else if (digitsOnly.length === 11 && digitsOnly[0] === '1') {
        generated = '^\\+?1?\\s*\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$';
      } else {
        generated = '^[\\d\\s\\-\\(\\)\\.+]{10,}$';
      }
      description = t('generatedPhone');
    }
    // Detect date pattern (YYYY-MM-DD)
    else if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      generated = '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$';
      description = t('generatedDate');
    }
    // Detect hex color
    else if (/^#[0-9A-Fa-f]{3,6}$/.test(text)) {
      generated = '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$';
      description = t('generatedHexColor');
    }
    // Detect IPv4 address
    else if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(text)) {
      generated = '^((25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)$';
      description = t('generatedIpv4');
    }
    // Detect credit card (16 digits with optional separators)
    else if (/^[\d\s\-]{13,19}$/.test(text) && text.replace(/\D/g, '').length === 16) {
      generated = '^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$';
      description = t('generatedCreditCard');
    }
    // Detect only digits
    else if (/^\d+$/.test(text)) {
      const length = text.length;
      generated = `^\\d{${length}}$`;
      description = t('generatedDigits').replace('{n}', length.toString());
    }
    // Detect only letters
    else if (/^[a-zA-Z]+$/.test(text)) {
      const length = text.length;
      generated = `^[a-zA-Z]{${length}}$`;
      description = t('generatedLetters').replace('{n}', length.toString());
    }
    // Detect alphanumeric
    else if (/^[a-zA-Z0-9]+$/.test(text)) {
      const length = text.length;
      generated = `^[a-zA-Z0-9]{${length}}$`;
      description = t('generatedAlphanumeric').replace('{n}', length.toString());
    }
    // Generic: escape special characters and create literal match
    else {
      generated = '^' + text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$';
      description = t('generatedLiteral');
    }

    setGeneratedRegex(generated);
    setPattern(generated);
    setTestString(text);
    setExplanation(description);
  };

  const copyGeneratedRegex = () => {
    if (generatedRegex) {
      navigator.clipboard.writeText(generatedRegex);
      alert(t('alertRegexCopied'));
    }
  };

  const highlightMatches = () => {
    if (!testString || !matches || matches.length === 0) {
      return <span>{testString || 'Enter test string...'}</span>;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const parts: ReactElement[] = [];
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
      {/* Regex Generator */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-lg p-6 border-2 border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🎯</span> {t('generatorTitle')}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('textToConvert')}
            </label>
            <input
              type="text"
              value={textToConvert}
              onChange={(e) => setTextToConvert(e.target.value)}
              placeholder={t('textToConvertPlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {t('generatorHint')}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={generateRegexFromText}
            className="w-full"
          >
            ✨ {t('generateButton')}
          </Button>

          {generatedRegex && (
            <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border-2 border-green-400">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-green-700 dark:text-green-400">
                  ✅ {t('regexGenerated')}
                </p>
                <Button
                  variant="secondary"
                  onClick={copyGeneratedRegex}
                  size="sm"
                >
                  📋 {t('copy')}
                </Button>
              </div>
              <code className="block bg-gray-100 dark:bg-dark-900 px-4 py-3 rounded font-mono text-sm break-all">
                {generatedRegex}
              </code>
              {explanation && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  💡 {explanation}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

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
              g (global), i (case-insensitive), m (multiline)
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Correspondências Encontradas</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {matches ? matches.length : 0}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Padrão Válido</p>
                  <p className="text-2xl font-bold text-green-600">
                    {error ? '❌' : '✅'}
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tem Correspondência</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {matches && matches.length > 0 ? '✅' : '❌'}
                  </p>
                </div>
              </div>

              {/* Explanation */}
              {explanation && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                  <p className="font-semibold mb-2">📝 O padrão inclui</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{explanation}</p>
                </div>
              )}

              {/* Match Details */}
              {matches && matches.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Detalhes das Correspondências</p>
                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-dark-800 rounded-lg p-3">
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Correspondência #{index + 1}:</span>{' '}
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
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">.</code> - Qualquer caractere</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">{t('refQuantifiers')}</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">*</code> - {t('refZeroOrMore')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">+</code> - {t('refOneOrMore')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">?</code> - {t('refOptional')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">{'{n,m}'}</code> - {t('refRange')}</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">{t('refAnchors')}</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">^</code> - {t('refStart')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">$</code> - {t('refEnd')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">\b</code> - {t('refWordBoundary')}</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">{t('refGroups')}</p>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300 font-mono">
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">()</code> - {t('refGroup')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">(?:)</code> - {t('refNonCapture')}</li>
              <li><code className="bg-gray-100 dark:bg-dark-800 px-2 py-1 rounded">[]</code> - Conjunto de caracteres</li>
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
