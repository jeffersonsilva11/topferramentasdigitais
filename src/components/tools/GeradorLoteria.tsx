'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

interface LotteryPreset {
  name: string;
  mainNumbers: number;
  mainRange: [number, number];
  extraNumbers?: number;
  extraRange?: [number, number];
}

const lotteryPresets: LotteryPreset[] = [
  { name: 'Mega-Sena (Brazil)', mainNumbers: 6, mainRange: [1, 60] },
  { name: 'Powerball (USA)', mainNumbers: 5, mainRange: [1, 69], extraNumbers: 1, extraRange: [1, 26] },
  { name: 'EuroMillions', mainNumbers: 5, mainRange: [1, 50], extraNumbers: 2, extraRange: [1, 12] },
  { name: 'Lotofácil (Brazil)', mainNumbers: 15, mainRange: [1, 25] },
  { name: 'Quina (Brazil)', mainNumbers: 5, mainRange: [1, 80] },
  { name: 'Custom', mainNumbers: 6, mainRange: [1, 100] },
];

export default function GeradorLoteria() {
  const t = useTranslations('lotteryGeneratorUI');
  const [selectedPreset, setSelectedPreset] = useState<LotteryPreset>(lotteryPresets[0]);
  const [customMain, setCustomMain] = useState({ count: 6, min: 1, max: 100 });
  const [customExtra, setCustomExtra] = useState({ count: 0, min: 1, max: 10 });
  const [results, setResults] = useState<{ main: number[], extra?: number[] } | null>(null);
  const [history, setHistory] = useState<{ main: number[], extra?: number[], name: string }[]>([]);

  const generateNumbers = (count: number, min: number, max: number): number[] => {
    const available = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const selected: number[] = [];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      selected.push(available[randomIndex]);
      available.splice(randomIndex, 1);
    }

    return selected.sort((a, b) => a - b);
  };

  const generateLottery = () => {
    let mainNumbers: number[];
    let extraNumbers: number[] | undefined;
    let lotteryName: string;

    if (selectedPreset.name === 'Custom') {
      mainNumbers = generateNumbers(customMain.count, customMain.min, customMain.max);
      if (customExtra.count > 0) {
        extraNumbers = generateNumbers(customExtra.count, customExtra.min, customExtra.max);
      }
      lotteryName = 'Custom';
    } else {
      mainNumbers = generateNumbers(
        selectedPreset.mainNumbers,
        selectedPreset.mainRange[0],
        selectedPreset.mainRange[1]
      );

      if (selectedPreset.extraNumbers && selectedPreset.extraRange) {
        extraNumbers = generateNumbers(
          selectedPreset.extraNumbers,
          selectedPreset.extraRange[0],
          selectedPreset.extraRange[1]
        );
      }
      lotteryName = selectedPreset.name;
    }

    setResults({ main: mainNumbers, extra: extraNumbers });
    setHistory(prev => [
      { main: mainNumbers, extra: extraNumbers, name: lotteryName },
      ...prev.slice(0, 9)
    ]);
  };

  const copyResults = () => {
    if (!results) return;
    const text = results.extra
      ? `Main: ${results.main.join(', ')} | Extra: ${results.extra.join(', ')}`
      : results.main.join(', ');
    navigator.clipboard.writeText(text);
    alert(t('numbersCopied'));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      {/* Preset Selection */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {lotteryPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setSelectedPreset(preset)}
              className={`p-4 rounded-lg border-2 text-left transition ${
                selectedPreset.name === preset.name
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-dark-700'
              }`}
            >
              <p className="font-semibold mb-1">{preset.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {preset.mainNumbers} numbers ({preset.mainRange[0]}-{preset.mainRange[1]})
                {preset.extraNumbers && ` + ${preset.extraNumbers} extra`}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Settings */}
      {selectedPreset.name === 'Custom' && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('preset')}</h2>

          <div className="space-y-4">
            {/* Main Numbers */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('mainNumbers')}</label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Count</label>
                  <input
                    type="number"
                    value={customMain.count}
                    onChange={(e) => setCustomMain(prev => ({ ...prev, count: parseInt(e.target.value) }))}
                    min="1"
                    className="w-full px-3 py-2 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Min</label>
                  <input
                    type="number"
                    value={customMain.min}
                    onChange={(e) => setCustomMain(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Max</label>
                  <input
                    type="number"
                    value={customMain.max}
                    onChange={(e) => setCustomMain(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Extra Numbers */}
            <div>
              <label className="block text-sm font-medium mb-2">{t('extraNumbers')}</label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Count</label>
                  <input
                    type="number"
                    value={customExtra.count}
                    onChange={(e) => setCustomExtra(prev => ({ ...prev, count: parseInt(e.target.value) }))}
                    min="0"
                    className="w-full px-3 py-2 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Min</label>
                  <input
                    type="number"
                    value={customExtra.min}
                    onChange={(e) => setCustomExtra(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                    disabled={customExtra.count === 0}
                    className="w-full px-3 py-2 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Max</label>
                  <input
                    type="number"
                    value={customExtra.max}
                    onChange={(e) => setCustomExtra(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                    disabled={customExtra.count === 0}
                    className="w-full px-3 py-2 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <Button
          variant="primary"
          onClick={generateLottery}
          className="w-full text-lg py-4"
        >
          {t('generate')}
        </Button>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t('results')}</h2>
            <Button
              variant="outline"
              onClick={copyResults}
              size="sm"
            >
              {t('copy')}
            </Button>
          </div>

          <div className="space-y-4">
            {/* Main Numbers */}
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                {t('main')}:
              </p>
              <div className="flex flex-wrap gap-3">
                {results.main.map((num, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-3xl rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            {/* Extra Numbers */}
            {results.extra && results.extra.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                  {t('extra')}:
                </p>
                <div className="flex flex-wrap gap-3">
                  {results.extra.map((num, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white font-bold text-3xl rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{t('history')}</h2>
            <Button
              variant="outline"
              onClick={clearHistory}
              size="sm"
            >
              🗑️ Clear
            </Button>
          </div>

          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4"
              >
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                  {item.name}
                </p>
                <p className="text-sm font-mono">
                  {item.main.join(', ')}
                  {item.extra && item.extra.length > 0 && ` | Extra: ${item.extra.join(', ')}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
        <p className="font-semibold mb-2">{t('disclaimer')}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t('disclaimerText')}
        </p>
      </div>
    </div>
  );
}
