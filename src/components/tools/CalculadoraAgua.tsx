'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function CalculadoraAgua() {
  const locale = useLocale();
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('normal');
  const [climate, setClimate] = useState('normal');
  const [result, setResult] = useState<{
    liters: number;
    ml: number;
    cups: number;
    oz: number;
  } | null>(null);

  const calculateWater = () => {
    const w = parseFloat(weight);
    if (!w) return;

    // Base calculation: 35ml per kg of body weight
    let baseIntake = w * 35;

    // Adjust for activity level
    if (activityLevel === 'light') {
      baseIntake *= 1.1;
    } else if (activityLevel === 'moderate') {
      baseIntake *= 1.3;
    } else if (activityLevel === 'intense') {
      baseIntake *= 1.5;
    }

    // Adjust for climate
    if (climate === 'hot') {
      baseIntake *= 1.15;
    } else if (climate === 'very-hot') {
      baseIntake *= 1.3;
    }

    const liters = baseIntake / 1000;
    const cups = liters * 4.22675; // US cups
    const oz = liters * 33.814; // Fluid ounces

    setResult({
      liters: Math.round(liters * 10) / 10,
      ml: Math.round(baseIntake),
      cups: Math.round(cups * 10) / 10,
      oz: Math.round(oz),
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Peso (kg):' : 'Weight (kg):'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="1"
              step="0.1"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {locale === 'pt' ? 'Nível de Atividade Física:' : 'Physical Activity Level:'}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'sedentary', label: locale === 'pt' ? 'Sedentário' : 'Sedentary' },
                { value: 'normal', label: locale === 'pt' ? 'Normal' : 'Normal' },
                { value: 'light', label: locale === 'pt' ? 'Leve' : 'Light' },
                { value: 'moderate', label: locale === 'pt' ? 'Moderado' : 'Moderate' },
                { value: 'intense', label: locale === 'pt' ? 'Intenso' : 'Intense' },
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivityLevel(level.value)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    activityLevel === level.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Climate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {locale === 'pt' ? 'Clima:' : 'Climate:'}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'cold', label: locale === 'pt' ? 'Frio' : 'Cold' },
                { value: 'normal', label: locale === 'pt' ? 'Normal' : 'Normal' },
                { value: 'hot', label: locale === 'pt' ? 'Quente' : 'Hot' },
                { value: 'very-hot', label: locale === 'pt' ? 'Muito Quente' : 'Very Hot' },
              ].map((c) => (
                <button
                  key={c.value}
                  onClick={() => setClimate(c.value)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    climate === c.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateWater}
            className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            {locale === 'pt' ? 'Calcular Ingestão de Água' : 'Calculate Water Intake'}
          </button>

          {/* Results */}
          {result && (
            <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">💧</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {locale === 'pt' ? 'Sua Ingestão Diária Recomendada:' : 'Your Recommended Daily Intake:'}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-dark-700 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.liters}L</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {locale === 'pt' ? 'Litros' : 'Liters'}
                  </p>
                </div>

                <div className="bg-white dark:bg-dark-700 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.ml}ml</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {locale === 'pt' ? 'Mililitros' : 'Milliliters'}
                  </p>
                </div>

                <div className="bg-white dark:bg-dark-700 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.cups}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {locale === 'pt' ? 'Copos (250ml)' : 'Cups (8 oz)'}
                  </p>
                </div>

                <div className="bg-white dark:bg-dark-700 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.oz} oz</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {locale === 'pt' ? 'Onças fluidas' : 'Fluid ounces'}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  💡 <strong>{locale === 'pt' ? 'Dica:' : 'Tip:'}</strong>{' '}
                  {locale === 'pt'
                    ? 'Beba água regularmente ao longo do dia. Aumente a ingestão durante exercícios intensos ou em dias quentes.'
                    : 'Drink water regularly throughout the day. Increase intake during intense exercise or on hot days.'}
                </p>
              </div>

              <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                {locale === 'pt'
                  ? '* Esta é uma estimativa baseada em 35ml por kg de peso corporal. Consulte um profissional de saúde para orientação personalizada.'
                  : '* This is an estimate based on 35ml per kg of body weight. Consult a healthcare professional for personalized guidance.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
