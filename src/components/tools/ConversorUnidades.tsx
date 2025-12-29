'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume';

export default function ConversorUnidades() {
  const locale = useLocale();
  const [category, setCategory] = useState<UnitCategory>('length');
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [result, setResult] = useState<number | null>(null);

  const units = {
    length: {
      meter: { name: locale === 'pt' ? 'Metro' : 'Meter', factor: 1 },
      kilometer: { name: locale === 'pt' ? 'Quilômetro' : 'Kilometer', factor: 0.001 },
      centimeter: { name: locale === 'pt' ? 'Centímetro' : 'Centimeter', factor: 100 },
      millimeter: { name: locale === 'pt' ? 'Milímetro' : 'Millimeter', factor: 1000 },
      mile: { name: locale === 'pt' ? 'Milha' : 'Mile', factor: 0.000621371 },
      yard: { name: locale === 'pt' ? 'Jarda' : 'Yard', factor: 1.09361 },
      foot: { name: locale === 'pt' ? 'Pé' : 'Foot', factor: 3.28084 },
      inch: { name: locale === 'pt' ? 'Polegada' : 'Inch', factor: 39.3701 },
    },
    weight: {
      kilogram: { name: locale === 'pt' ? 'Quilograma' : 'Kilogram', factor: 1 },
      gram: { name: locale === 'pt' ? 'Grama' : 'Gram', factor: 1000 },
      milligram: { name: locale === 'pt' ? 'Miligrama' : 'Milligram', factor: 1000000 },
      ton: { name: locale === 'pt' ? 'Tonelada' : 'Ton', factor: 0.001 },
      pound: { name: locale === 'pt' ? 'Libra' : 'Pound', factor: 2.20462 },
      ounce: { name: locale === 'pt' ? 'Onça' : 'Ounce', factor: 35.274 },
    },
    temperature: {
      celsius: { name: locale === 'pt' ? 'Celsius' : 'Celsius', factor: 1, special: true },
      fahrenheit: { name: locale === 'pt' ? 'Fahrenheit' : 'Fahrenheit', factor: 1, special: true },
      kelvin: { name: locale === 'pt' ? 'Kelvin' : 'Kelvin', factor: 1, special: true },
    },
    volume: {
      liter: { name: locale === 'pt' ? 'Litro' : 'Liter', factor: 1 },
      milliliter: { name: locale === 'pt' ? 'Mililitro' : 'Milliliter', factor: 1000 },
      gallon: { name: locale === 'pt' ? 'Galão (US)' : 'Gallon (US)', factor: 0.264172 },
      quart: { name: locale === 'pt' ? 'Quarto' : 'Quart', factor: 1.05669 },
      pint: { name: locale === 'pt' ? 'Pinta' : 'Pint', factor: 2.11338 },
      cup: { name: locale === 'pt' ? 'Xícara' : 'Cup', factor: 4.22675 },
      fluidounce: { name: locale === 'pt' ? 'Onça Fluida' : 'Fluid Ounce', factor: 33.814 },
    },
  };

  const convertTemperature = (val: number, from: string, to: string): number => {
    let celsius: number;

    // Convert to Celsius first
    if (from === 'celsius') {
      celsius = val;
    } else if (from === 'fahrenheit') {
      celsius = (val - 32) * 5 / 9;
    } else if (from === 'kelvin') {
      celsius = val - 273.15;
    } else {
      return 0;
    }

    // Convert from Celsius to target
    if (to === 'celsius') {
      return celsius;
    } else if (to === 'fahrenheit') {
      return (celsius * 9 / 5) + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    }

    return 0;
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;

    if (category === 'temperature') {
      const converted = convertTemperature(val, fromUnit, toUnit);
      setResult(Math.round(converted * 100) / 100);
    } else {
      const categoryUnits = units[category] as Record<string, { factor: number }>;
      const fromFactor = categoryUnits[fromUnit].factor;
      const toFactor = categoryUnits[toUnit].factor;
      const converted = (val / fromFactor) * toFactor;
      setResult(Math.round(converted * 1000000) / 1000000);
    }
  };

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    const categoryKeys = Object.keys(units[newCategory]);
    setFromUnit(categoryKeys[0]);
    setToUnit(categoryKeys[1] || categoryKeys[0]);
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {locale === 'pt' ? 'Categoria:' : 'Category:'}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'length', label: locale === 'pt' ? 'Comprimento' : 'Length', icon: '📏' },
                { value: 'weight', label: locale === 'pt' ? 'Peso' : 'Weight', icon: '⚖️' },
                { value: 'temperature', label: locale === 'pt' ? 'Temperatura' : 'Temperature', icon: '🌡️' },
                { value: 'volume', label: locale === 'pt' ? 'Volume' : 'Volume', icon: '🧪' },
              ].map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value as UnitCategory)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    category === cat.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Valor:' : 'Value:'}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              step="any"
            />
          </div>

          {/* From Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'De:' : 'From:'}
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {Object.entries(units[category]).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          {/* To Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Para:' : 'To:'}
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {Object.entries(units[category]).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          {/* Convert Button */}
          <button
            onClick={convert}
            disabled={!value}
            className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {locale === 'pt' ? 'Converter' : 'Convert'}
          </button>

          {/* Result */}
          {result !== null && (() => {
            const currentUnits = units[category] as Record<string, { name: string; factor: number }>;
            const toUnitName = currentUnits[toUnit]?.name || toUnit;
            return (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {locale === 'pt' ? 'Resultado:' : 'Result:'}
                </h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                    {result}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {toUnitName}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
