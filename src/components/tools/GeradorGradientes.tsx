'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { showSuccess } from '@/lib/toast';

export default function GeradorGradientes() {
  const locale = useLocale();
  const [color1, setColor1] = useState('#6366f1');
  const [color2, setColor2] = useState('#8b5cf6');
  const [direction, setDirection] = useState('to right');
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');

  const directions = [
    { value: 'to right', label: locale === 'pt' ? 'Para Direita' : 'To Right' },
    { value: 'to left', label: locale === 'pt' ? 'Para Esquerda' : 'To Left' },
    { value: 'to bottom', label: locale === 'pt' ? 'Para Baixo' : 'To Bottom' },
    { value: 'to top', label: locale === 'pt' ? 'Para Cima' : 'To Top' },
    { value: 'to bottom right', label: locale === 'pt' ? 'Diagonal ↘' : 'Diagonal ↘' },
    { value: 'to bottom left', label: locale === 'pt' ? 'Diagonal ↙' : 'Diagonal ↙' },
    { value: 'to top right', label: locale === 'pt' ? 'Diagonal ↗' : 'Diagonal ↗' },
    { value: 'to top left', label: locale === 'pt' ? 'Diagonal ↖' : 'Diagonal ↖' },
  ];

  const generateCSS = () => {
    if (gradientType === 'linear') {
      return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
  };

  const getGradientStyle = () => {
    if (gradientType === 'linear') {
      return {
        background: `linear-gradient(${direction}, ${color1}, ${color2})`,
      };
    } else {
      return {
        background: `radial-gradient(circle, ${color1}, ${color2})`,
      };
    }
  };

  const copyCSS = () => {
    const css = generateCSS();
    navigator.clipboard.writeText(css);
    showSuccess(locale === 'pt' ? 'CSS copiado!' : 'CSS copied!');
  };

  const randomGradient = () => {
    const randomColor = () => {
      return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    };
    setColor1(randomColor());
    setColor2(randomColor());
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* Gradient Preview */}
          <div
            className="w-full h-64 rounded-lg shadow-xl transition-all duration-300"
            style={getGradientStyle()}
          />

          {/* Gradient Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {locale === 'pt' ? 'Tipo de Gradiente:' : 'Gradient Type:'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGradientType('linear')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  gradientType === 'linear'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {locale === 'pt' ? 'Linear' : 'Linear'}
              </button>
              <button
                onClick={() => setGradientType('radial')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  gradientType === 'radial'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {locale === 'pt' ? 'Radial' : 'Radial'}
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Cor 1:' : 'Color 1:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-dark-600"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Cor 2:' : 'Color 2:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-dark-600"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                />
              </div>
            </div>
          </div>

          {/* Direction (only for linear) */}
          {gradientType === 'linear' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {locale === 'pt' ? 'Direção:' : 'Direction:'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {directions.map((dir) => (
                  <button
                    key={dir.value}
                    onClick={() => setDirection(dir.value)}
                    className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                      direction === dir.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {dir.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CSS Output */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Código CSS:' : 'CSS Code:'}
            </label>
            <div className="relative">
              <pre className="p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">
                {generateCSS()}
              </pre>
              <button
                onClick={copyCSS}
                className="absolute top-2 right-2 px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors"
              >
                {locale === 'pt' ? 'Copiar' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={randomGradient}
              className="flex-1 py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              🎲 {locale === 'pt' ? 'Gradiente Aleatório' : 'Random Gradient'}
            </button>
            <button
              onClick={copyCSS}
              className="flex-1 py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              📋 {locale === 'pt' ? 'Copiar CSS' : 'Copy CSS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
