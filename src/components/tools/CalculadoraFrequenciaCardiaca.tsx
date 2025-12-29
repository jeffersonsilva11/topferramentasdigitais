'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function CalculadoraFrequenciaCardiaca() {
  const locale = useLocale();
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [result, setResult] = useState<{
    maxHR: number;
    zones: {
      name: string;
      min: number;
      max: number;
      percentage: string;
      benefit: string;
    }[];
  } | null>(null);

  const calculateHeartRate = () => {
    const ageNum = parseFloat(age);
    const restingHRNum = parseFloat(restingHR) || 70; // Default resting HR if not provided

    if (!ageNum) return;

    // Maximum heart rate: 220 - age
    const maxHR = 220 - ageNum;
    const hrReserve = maxHR - restingHRNum;

    // Define heart rate zones using Karvonen Formula
    const zones = [
      {
        name: locale === 'pt' ? 'Zona 1: Muito Leve' : 'Zone 1: Very Light',
        min: Math.round(restingHRNum + hrReserve * 0.5),
        max: Math.round(restingHRNum + hrReserve * 0.6),
        percentage: '50-60%',
        benefit:
          locale === 'pt'
            ? 'Aquecimento, recuperação'
            : 'Warm-up, recovery',
      },
      {
        name: locale === 'pt' ? 'Zona 2: Leve' : 'Zone 2: Light',
        min: Math.round(restingHRNum + hrReserve * 0.6),
        max: Math.round(restingHRNum + hrReserve * 0.7),
        percentage: '60-70%',
        benefit:
          locale === 'pt'
            ? 'Queima de gordura, resistência básica'
            : 'Fat burning, basic endurance',
      },
      {
        name: locale === 'pt' ? 'Zona 3: Moderada' : 'Zone 3: Moderate',
        min: Math.round(restingHRNum + hrReserve * 0.7),
        max: Math.round(restingHRNum + hrReserve * 0.8),
        percentage: '70-80%',
        benefit:
          locale === 'pt'
            ? 'Resistência aeróbica'
            : 'Aerobic endurance',
      },
      {
        name: locale === 'pt' ? 'Zona 4: Intensa' : 'Zone 4: Hard',
        min: Math.round(restingHRNum + hrReserve * 0.8),
        max: Math.round(restingHRNum + hrReserve * 0.9),
        percentage: '80-90%',
        benefit:
          locale === 'pt'
            ? 'Capacidade anaeróbica'
            : 'Anaerobic capacity',
      },
      {
        name: locale === 'pt' ? 'Zona 5: Máxima' : 'Zone 5: Maximum',
        min: Math.round(restingHRNum + hrReserve * 0.9),
        max: Math.round(maxHR),
        percentage: '90-100%',
        benefit:
          locale === 'pt'
            ? 'Performance máxima, velocidade'
            : 'Maximum performance, speed',
      },
    ];

    setResult({ maxHR, zones });
  };

  const zoneColors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-yellow-500 to-yellow-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Idade (anos):' : 'Age (years):'}
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="1"
              max="120"
            />
          </div>

          {/* Resting Heart Rate (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt'
                ? 'Frequência Cardíaca em Repouso (opcional):'
                : 'Resting Heart Rate (optional):'}
            </label>
            <input
              type="number"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              placeholder={locale === 'pt' ? '70 (padrão)' : '70 (default)'}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="30"
              max="100"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {locale === 'pt'
                ? 'Meça sua FC em repouso pela manhã, antes de se levantar'
                : 'Measure your resting HR in the morning before getting up'}
            </p>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateHeartRate}
            className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            {locale === 'pt' ? 'Calcular Zonas de FC' : 'Calculate HR Zones'}
          </button>

          {/* Results */}
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {locale === 'pt' ? 'Frequência Cardíaca Máxima:' : 'Maximum Heart Rate:'}
                    </p>
                    <p className="text-4xl font-bold text-red-600 dark:text-red-400">
                      {result.maxHR} <span className="text-lg">bpm</span>
                    </p>
                  </div>
                  <span className="text-5xl">❤️</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {locale === 'pt' ? 'Zonas de Treinamento:' : 'Training Zones:'}
                </h3>

                {result.zones.map((zone, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white dark:bg-dark-700 rounded-lg border-l-4"
                    style={{
                      borderLeftColor: index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : index === 2 ? '#eab308' : index === 3 ? '#f97316' : '#ef4444'
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {zone.name}
                      </h4>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {zone.percentage}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold" style={{
                        color: index === 0 ? '#3b82f6' : index === 1 ? '#10b981' : index === 2 ? '#eab308' : index === 3 ? '#f97316' : '#ef4444'
                      }}>
                        {zone.min} - {zone.max} <span className="text-sm">bpm</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {zone.benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  💡 <strong>{locale === 'pt' ? 'Dica:' : 'Tip:'}</strong>{' '}
                  {locale === 'pt'
                    ? 'Use um monitor de frequência cardíaca para treinar nas zonas corretas e maximizar seus resultados.'
                    : 'Use a heart rate monitor to train in the correct zones and maximize your results.'}
                </p>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400">
                {locale === 'pt'
                  ? '* Calculado usando a fórmula de Karvonen. Consulte um médico antes de iniciar qualquer programa de exercícios.'
                  : '* Calculated using the Karvonen formula. Consult a doctor before starting any exercise program.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
