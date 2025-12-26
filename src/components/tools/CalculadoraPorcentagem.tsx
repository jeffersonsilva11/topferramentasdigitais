'use client';

import { useState } from 'react';

export default function CalculadoraPorcentagem() {
  const [calc1, setCalc1] = useState({ value: '', percent: '', result: '' });
  const [calc2, setCalc2] = useState({ part: '', total: '', result: '' });
  const [calc3, setCalc3] = useState({ value: '', percent: '', result: '' });

  // Calcular X% de Y
  const calculatePercentOf = () => {
    const value = parseFloat(calc1.value);
    const percent = parseFloat(calc1.percent);
    if (!isNaN(value) && !isNaN(percent)) {
      const result = (value * percent) / 100;
      setCalc1({ ...calc1, result: result.toFixed(2) });
    }
  };

  // X é quanto % de Y
  const calculateWhatPercent = () => {
    const part = parseFloat(calc2.part);
    const total = parseFloat(calc2.total);
    if (!isNaN(part) && !isNaN(total) && total !== 0) {
      const result = (part / total) * 100;
      setCalc2({ ...calc2, result: result.toFixed(2) });
    }
  };

  // Aumentar/Diminuir por X%
  const calculateIncreaseDecrease = (increase: boolean) => {
    const value = parseFloat(calc3.value);
    const percent = parseFloat(calc3.percent);
    if (!isNaN(value) && !isNaN(percent)) {
      const change = (value * percent) / 100;
      const result = increase ? value + change : value - change;
      setCalc3({ ...calc3, result: result.toFixed(2) });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-8">
        {/* Calculadora 1: X% de Y */}
        <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-primary-900 mb-4">Quanto é X% de Y?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Porcentagem (%)
              </label>
              <input
                type="number"
                value={calc1.percent}
                onChange={(e) => setCalc1({ ...calc1, percent: e.target.value })}
                placeholder="Ex: 20"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                De (valor)
              </label>
              <input
                type="number"
                value={calc1.value}
                onChange={(e) => setCalc1({ ...calc1, value: e.target.value })}
                placeholder="Ex: 1000"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={calculatePercentOf}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Calcular
            </button>
          </div>
          {calc1.result && (
            <div className="mt-4 bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Resultado:</p>
              <p className="text-2xl font-bold text-primary-600">
                {calc1.percent}% de {calc1.value} = {calc1.result}
              </p>
            </div>
          )}
        </div>

        {/* Calculadora 2: X é quanto % de Y */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-900 mb-4">X é quanto % de Y?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parte (X)
              </label>
              <input
                type="number"
                value={calc2.part}
                onChange={(e) => setCalc2({ ...calc2, part: e.target.value })}
                placeholder="Ex: 200"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total (Y)
              </label>
              <input
                type="number"
                value={calc2.total}
                onChange={(e) => setCalc2({ ...calc2, total: e.target.value })}
                placeholder="Ex: 1000"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={calculateWhatPercent}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Calcular
            </button>
          </div>
          {calc2.result && (
            <div className="mt-4 bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Resultado:</p>
              <p className="text-2xl font-bold text-green-600">
                {calc2.part} é {calc2.result}% de {calc2.total}
              </p>
            </div>
          )}
        </div>

        {/* Calculadora 3: Aumentar/Diminuir por X% */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-purple-900 mb-4">Aumentar ou Diminuir por X%</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor inicial
              </label>
              <input
                type="number"
                value={calc3.value}
                onChange={(e) => setCalc3({ ...calc3, value: e.target.value })}
                placeholder="Ex: 1000"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Porcentagem (%)
              </label>
              <input
                type="number"
                value={calc3.percent}
                onChange={(e) => setCalc3({ ...calc3, percent: e.target.value })}
                placeholder="Ex: 15"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => calculateIncreaseDecrease(true)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                + Aumentar
              </button>
              <button
                onClick={() => calculateIncreaseDecrease(false)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                - Diminuir
              </button>
            </div>
          </div>
          {calc3.result && (
            <div className="mt-4 bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Resultado:</p>
              <p className="text-2xl font-bold text-purple-600">{calc3.result}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">📊 Exemplos práticos:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Calcular desconto: 20% de R$ 1000 = R$ 200</li>
          <li>Calcular quanto representa: R$ 200 é 20% de R$ 1000</li>
          <li>Aplicar aumento: R$ 1000 + 15% = R$ 1150</li>
        </ul>
      </div>
    </div>
  );
}
