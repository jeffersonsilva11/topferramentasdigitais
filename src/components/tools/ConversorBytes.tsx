'use client';

import { useState, useEffect } from 'react';

type Unit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

const conversions = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  TB: 1024 * 1024 * 1024 * 1024,
};

export default function ConversorBytes() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState<Unit>('MB');
  const [results, setResults] = useState({
    B: '',
    KB: '',
    MB: '',
    GB: '',
    TB: '',
  });

  useEffect(() => {
    if (value && !isNaN(Number(value))) {
      convert();
    } else {
      setResults({ B: '', KB: '', MB: '', GB: '', TB: '' });
    }
  }, [value, fromUnit]);

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    // Converter para bytes primeiro
    const bytes = numValue * conversions[fromUnit];

    // Converter bytes para todas as unidades
    setResults({
      B: bytes.toFixed(0),
      KB: (bytes / conversions.KB).toFixed(2),
      MB: (bytes / conversions.MB).toFixed(2),
      GB: (bytes / conversions.GB).toFixed(4),
      TB: (bytes / conversions.TB).toFixed(6),
    });
  };

  const copyResult = (unit: Unit) => {
    const resultValue = results[unit];
    if (resultValue) {
      navigator.clipboard.writeText(`${resultValue} ${unit}`);
      alert(`Copiado: ${resultValue} ${unit}`);
    }
  };

  const clear = () => {
    setValue('');
    setResults({ B: '', KB: '', MB: '', GB: '', TB: '' });
  };

  const loadExample = (exampleValue: string, exampleUnit: Unit) => {
    setValue(exampleValue);
    setFromUnit(exampleUnit);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor:
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Digite o valor..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unidade de entrada:
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as Unit)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="B">Bytes (B)</option>
            <option value="KB">Kilobytes (KB)</option>
            <option value="MB">Megabytes (MB)</option>
            <option value="GB">Gigabytes (GB)</option>
            <option value="TB">Terabytes (TB)</option>
          </select>
        </div>
      </div>

      {value && (
        <button
          onClick={clear}
          className="mb-6 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
        >
          🗑️ Limpar
        </button>
      )}

      {results.B && (
        <div className="space-y-3 mb-6">
          <h3 className="font-bold text-lg mb-4">Conversões:</h3>

          {/* Bytes */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Bytes (B)</p>
              <p className="text-2xl font-bold text-red-700">{results.B}</p>
            </div>
            <button
              onClick={() => copyResult('B')}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
            >
              📋
            </button>
          </div>

          {/* Kilobytes */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Kilobytes (KB)</p>
              <p className="text-2xl font-bold text-orange-700">{results.KB}</p>
            </div>
            <button
              onClick={() => copyResult('KB')}
              className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition"
            >
              📋
            </button>
          </div>

          {/* Megabytes */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Megabytes (MB)</p>
              <p className="text-2xl font-bold text-blue-700">{results.MB}</p>
            </div>
            <button
              onClick={() => copyResult('MB')}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
            >
              📋
            </button>
          </div>

          {/* Gigabytes */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Gigabytes (GB)</p>
              <p className="text-2xl font-bold text-green-700">{results.GB}</p>
            </div>
            <button
              onClick={() => copyResult('GB')}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
            >
              📋
            </button>
          </div>

          {/* Terabytes */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Terabytes (TB)</p>
              <p className="text-2xl font-bold text-purple-700">{results.TB}</p>
            </div>
            <button
              onClick={() => copyResult('TB')}
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition"
            >
              📋
            </button>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">📊 Exemplos rápidos:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadExample('1', 'GB')}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition text-sm"
          >
            1 GB
          </button>
          <button
            onClick={() => loadExample('100', 'MB')}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition text-sm"
          >
            100 MB
          </button>
          <button
            onClick={() => loadExample('500', 'KB')}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition text-sm"
          >
            500 KB
          </button>
          <button
            onClick={() => loadExample('2', 'TB')}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition text-sm"
          >
            2 TB
          </button>
        </div>
        <p className="mt-3">
          <strong>Nota:</strong> Este conversor usa o sistema binário (1 KB = 1024 bytes).
        </p>
      </div>
    </div>
  );
}
