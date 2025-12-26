'use client';

import { useState } from 'react';

export default function RegraDeTres() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<string>('');
  const [type, setType] = useState<'simple' | 'inverse'>('simple');

  const calculate = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      alert('Por favor, preencha todos os campos com números válidos');
      return;
    }

    if (numA === 0) {
      alert('O primeiro valor não pode ser zero');
      return;
    }

    let x: number;
    if (type === 'simple') {
      // Regra de três simples: A está para B assim como C está para X
      // A / B = C / X
      // X = (B * C) / A
      x = (numB * numC) / numA;
    } else {
      // Regra de três inversa: A está para B inversamente como C está para X
      // A * B = C * X
      // X = (A * B) / C
      x = (numA * numB) / numC;
    }

    setResult(x.toFixed(4));
  };

  const clear = () => {
    setA('');
    setB('');
    setC('');
    setResult('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Tipo de regra de três:
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="type"
              value="simple"
              checked={type === 'simple'}
              onChange={() => setType('simple')}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Simples (direta)</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="type"
              value="inverse"
              checked={type === 'inverse'}
              onChange={() => setType('inverse')}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Inversa</span>
          </label>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="A"
                className="w-full px-4 py-3 border-2 border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-lg font-semibold"
              />
            </div>
            <div>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="B"
                className="w-full px-4 py-3 border-2 border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-lg font-semibold"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="number"
                value={c}
                onChange={(e) => setC(e.target.value)}
                placeholder="C"
                className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg font-semibold"
              />
            </div>
            <div>
              <div className="w-full px-4 py-3 bg-primary-100 border-2 border-primary-400 rounded-lg text-center text-lg font-bold text-primary-700">
                {result ? result : 'X = ?'}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          {type === 'simple' ? (
            <p>Se <strong>A</strong> está para <strong>B</strong>, então <strong>C</strong> está para <strong>X</strong></p>
          ) : (
            <p>Se <strong>A</strong> está inversamente para <strong>B</strong>, então <strong>C</strong> está para <strong>X</strong></p>
          )}
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={calculate}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          ➗ Calcular
        </button>
        <button
          onClick={clear}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
        >
          🗑️ Limpar
        </button>
      </div>

      <div className="space-y-4 text-sm text-gray-600">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="font-semibold mb-2">📘 Regra de Três Simples (Direta):</p>
          <p className="mb-2">Quando duas grandezas são diretamente proporcionais:</p>
          <p className="italic">Exemplo: Se 5 canetas custam R$ 10, quanto custarão 8 canetas?</p>
          <p className="mt-1">A = 5, B = 10, C = 8 → X = 16</p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
          <p className="font-semibold mb-2">📙 Regra de Três Inversa:</p>
          <p className="mb-2">Quando duas grandezas são inversamente proporcionais:</p>
          <p className="italic">Exemplo: Se 4 trabalhadores fazem uma obra em 12 dias, em quantos dias 6 trabalhadores farão?</p>
          <p className="mt-1">A = 4, B = 12, C = 6 → X = 8 (menos trabalhadores = mais dias)</p>
        </div>
      </div>
    </div>
  );
}
