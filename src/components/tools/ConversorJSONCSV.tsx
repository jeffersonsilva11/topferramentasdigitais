'use client';

import { useState } from 'react';
import Papa from 'papaparse';

export default function ConversorJSONCSV() {
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convertJSONtoCSV = () => {
    try {
      const json = JSON.parse(input);
      const array = Array.isArray(json) ? json : [json];
      const csv = Papa.unparse(array);
      setOutput(csv);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      alert(`Erro ao converter JSON: ${message}`);
    }
  };

  const convertCSVtoJSON = () => {
    try {
      const result = Papa.parse(input, { header: true, dynamicTyping: true });
      setOutput(JSON.stringify(result.data, null, 2));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      alert(`Erro ao converter CSV: ${message}`);
    }
  };

  const convert = () => {
    setOutput('');
    if (mode === 'json-to-csv') {
      convertJSONtoCSV();
    } else {
      convertCSVtoJSON();
    }
  };

  const downloadOutput = () => {
    const extension = mode === 'json-to-csv' ? 'csv' : 'json';
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `converted.${extension}`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadExample = () => {
    if (mode === 'json-to-csv') {
      setInput('[{"name":"João","age":30,"city":"São Paulo"},{"name":"Maria","age":25,"city":"Rio de Janeiro"}]');
    } else {
      setInput('name,age,city\nJoão,30,São Paulo\nMaria,25,Rio de Janeiro');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setMode('json-to-csv')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
            mode === 'json-to-csv' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          JSON → CSV
        </button>
        <button
          onClick={() => setMode('csv-to-json')}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
            mode === 'csv-to-json' ? 'bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          CSV → JSON
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entrada ({mode === 'json-to-csv' ? 'JSON' : 'CSV'}):
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'json-to-csv' ? '[{"key": "value"}]' : 'header1,header2\nvalue1,value2'}
            className="w-full h-64 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Saída ({mode === 'json-to-csv' ? 'CSV' : 'JSON'}):
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Resultado aparecerá aqui..."
            className="w-full h-64 px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg font-mono text-sm resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={convert} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
          🔄 Converter
        </button>
        <button onClick={loadExample} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          📝 Exemplo
        </button>
        {output && (
          <button onClick={downloadOutput} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            💾 Baixar
          </button>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Sobre a conversão:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>JSON → CSV:</strong> Converte arrays JSON em planilha CSV</li>
          <li><strong>CSV → JSON:</strong> Converte CSV em formato JSON estruturado</li>
          <li>Mantém tipos de dados (números, strings, booleanos)</li>
          <li>Processamento local - seus dados não saem do navegador</li>
        </ul>
      </div>
    </div>
  );
}
