'use client';

import { useState } from 'react';

export default function CalculadoraJuros() {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(10);
  const [time, setTime] = useState(12);
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const p = principal;
    const r = rate / 100;
    const t = frequency === 'monthly' ? time : time * 12;
    const n = frequency === 'monthly' ? 12 : 1;

    const amount = p * Math.pow(1 + r / n, n * (t / 12));
    setResult(amount);
  };

  const totalInterest = result ? result - principal : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valor inicial (R$):</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-lg font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Taxa de juros (% ao ano):</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            step="0.1"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-lg font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Período:</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-lg font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frequência:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'monthly' | 'yearly')}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-lg"
          >
            <option value="monthly">Meses</option>
            <option value="yearly">Anos</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium mb-6"
      >
        💰 Calcular Juros Compostos
      </button>

      {result !== null && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6">
            <p className="text-sm text-gray-600 mb-2">Montante Final:</p>
            <p className="text-4xl font-bold text-green-700">R$ {result.toFixed(2)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-600 mb-1">💵 Valor Inicial</p>
              <p className="text-2xl font-bold text-blue-700">R$ {principal.toFixed(2)}</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-600 mb-1">📈 Juros Ganhos</p>
              <p className="text-2xl font-bold text-purple-700">R$ {totalInterest.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-gray-700">
              Em <strong>{time} {frequency === 'monthly' ? 'meses' : 'anos'}</strong>, com taxa de <strong>{rate}% ao ano</strong>, seu investimento de <strong>R$ {principal.toFixed(2)}</strong> se tornará <strong>R$ {result.toFixed(2)}</strong>, rendendo <strong>R$ {totalInterest.toFixed(2)}</strong> em juros.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Sobre juros compostos:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Juros sobre juros - rendimento exponencial</li>
          <li>Fórmula: M = C × (1 + i)^t</li>
          <li>Use para simular investimentos, poupança, CDBs</li>
          <li>Quanto mais tempo, maior o efeito dos juros compostos</li>
        </ul>
      </div>
    </div>
  );
}
