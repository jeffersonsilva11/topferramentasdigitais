'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function CalculadoraIMC() {
  const locale = useLocale();
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setIMC] = useState<number | null>(null);

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura) / 100; // convert cm to m
    if (p > 0 && a > 0) {
      const resultado = p / (a * a);
      setIMC(resultado);
    }
  };

  const getCategoria = (imc: number) => {
    if (imc < 18.5) return { texto: locale === 'pt' ? 'Abaixo do peso' : 'Underweight', cor: 'text-blue-600' };
    if (imc < 25) return { texto: locale === 'pt' ? 'Peso normal' : 'Normal weight', cor: 'text-green-600' };
    if (imc < 30) return { texto: locale === 'pt' ? 'Sobrepeso' : 'Overweight', cor: 'text-yellow-600' };
    if (imc < 35) return { texto: locale === 'pt' ? 'Obesidade Grau I' : 'Obesity Class I', cor: 'text-orange-600' };
    if (imc < 40) return { texto: locale === 'pt' ? 'Obesidade Grau II' : 'Obesity Class II', cor: 'text-red-600' };
    return { texto: locale === 'pt' ? 'Obesidade Grau III' : 'Obesity Class III', cor: 'text-red-800' };
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Peso (kg)' : 'Weight (kg)'}
            </label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="70"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Altura (cm)' : 'Height (cm)'}
            </label>
            <input
              type="number"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="170"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <button
          onClick={calcularIMC}
          className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
        >
          {locale === 'pt' ? 'Calcular IMC' : 'Calculate BMI'}
        </button>

        {imc !== null && (
          <div className="mt-6 p-6 bg-gray-50 dark:bg-dark-700 dim:bg-dim-700 rounded-lg text-center">
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {imc.toFixed(1)}
            </p>
            <p className={`text-xl font-semibold ${getCategoria(imc).cor}`}>
              {getCategoria(imc).texto}
            </p>

            <div className="mt-6 text-left text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>• {locale === 'pt' ? 'Abaixo de 18.5: Abaixo do peso' : 'Below 18.5: Underweight'}</p>
              <p>• 18.5 - 24.9: {locale === 'pt' ? 'Peso normal' : 'Normal weight'}</p>
              <p>• 25 - 29.9: {locale === 'pt' ? 'Sobrepeso' : 'Overweight'}</p>
              <p>• 30 - 34.9: {locale === 'pt' ? 'Obesidade Grau I' : 'Obesity Class I'}</p>
              <p>• 35 - 39.9: {locale === 'pt' ? 'Obesidade Grau II' : 'Obesity Class II'}</p>
              <p>• {locale === 'pt' ? 'Acima de 40: Obesidade Grau III' : 'Above 40: Obesity Class III'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
