'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function GeradorNumeroAleatorio() {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [quantity, setQuantity] = useState<string>('1');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);

  const generateNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const qty = parseInt(quantity);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(qty)) {
      alert('Please enter valid numbers');
      return;
    }

    if (minNum >= maxNum) {
      alert('Minimum must be less than maximum');
      return;
    }

    if (qty < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    if (!allowDuplicates && qty > (maxNum - minNum + 1)) {
      alert('Cannot generate more unique numbers than the range allows');
      return;
    }

    const generated: number[] = [];

    if (allowDuplicates) {
      for (let i = 0; i < qty; i++) {
        const num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        generated.push(num);
      }
    } else {
      const available = Array.from({ length: maxNum - minNum + 1 }, (_, i) => minNum + i);
      for (let i = 0; i < qty; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        generated.push(available[randomIndex]);
        available.splice(randomIndex, 1);
      }
    }

    setResults(generated);
    setHistory(prev => [generated, ...prev.slice(0, 9)]); // Keep last 10
  };

  const copyResults = () => {
    navigator.clipboard.writeText(results.join(', '));
    alert('Numbers copied to clipboard!');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Settings</h2>

        <div className="space-y-4">
          {/* Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Minimum
              </label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Maximum
              </label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">
              How many numbers?
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Duplicates */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="duplicates"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
            />
            <label htmlFor="duplicates" className="ml-2 text-sm font-medium">
              Allow duplicate numbers
            </label>
          </div>

          {/* Generate Button */}
          <Button
            variant="primary"
            onClick={generateNumbers}
            className="w-full"
          >
            🎲 Generate Random Numbers
          </Button>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Results</h2>
            <Button
              variant="outline"
              onClick={copyResults}
              size="sm"
            >
              📋 Copy
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {results.map((num, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-2xl rounded-lg px-6 py-4 shadow-lg"
              >
                {num}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Generated {results.length} number{results.length !== 1 ? 's' : ''}:
            </p>
            <p className="text-lg font-mono">
              {results.join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">History</h2>
            <Button
              variant="outline"
              onClick={clearHistory}
              size="sm"
            >
              🗑️ Clear
            </Button>
          </div>

          <div className="space-y-2">
            {history.map((nums, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-dark-800 rounded-lg p-3"
              >
                <p className="text-sm font-mono">
                  {nums.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
        <p className="font-semibold mb-2">ℹ️ How it works:</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>Set your minimum and maximum values</li>
          <li>Choose how many numbers you want to generate</li>
          <li>Optionally allow or prevent duplicate numbers</li>
          <li>Click "Generate" to get your random numbers</li>
          <li>Previous results are saved in the history</li>
        </ul>
      </div>
    </div>
  );
}
