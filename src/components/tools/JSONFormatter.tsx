'use client';

import { useState } from 'react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const formatJSON = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Por favor, insira um JSON');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
    } catch (err: any) {
      setError(`Erro ao processar JSON: ${err.message}`);
    }
  };

  const minifyJSON = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Por favor, insira um JSON');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err: any) {
      setError(`Erro ao processar JSON: ${err.message}`);
    }
  };

  const validateJSON = () => {
    setError('');

    if (!input.trim()) {
      setError('Por favor, insira um JSON');
      return;
    }

    try {
      JSON.parse(input);
      alert('✅ JSON válido!');
    } catch (err: any) {
      setError(`❌ JSON inválido: ${err.message}`);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    alert('JSON copiado para a área de transferência!');
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const loadExample = () => {
    const example = {
      "nome": "João Silva",
      "idade": 30,
      "email": "joao@exemplo.com",
      "endereco": {
        "rua": "Rua Principal",
        "numero": 123,
        "cidade": "São Paulo"
      },
      "hobbies": ["programação", "leitura", "música"],
      "ativo": true
    };
    setInput(JSON.stringify(example));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="json-input" className="block text-sm font-medium text-gray-700">
            Cole seu JSON aqui:
          </label>
          <button
            onClick={loadExample}
            className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            📝 Carregar Exemplo
          </button>
        </div>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"chave": "valor", "array": [1, 2, 3]}'
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
          rows={8}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Espaçamento (indentação): {indent} espaços
        </label>
        <input
          type="range"
          min="2"
          max="8"
          step="2"
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={formatJSON}
          className="flex-1 min-w-[150px] px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          ✨ Formatar
        </button>
        <button
          onClick={minifyJSON}
          className="flex-1 min-w-[150px] px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
        >
          🗜️ Minificar
        </button>
        <button
          onClick={validateJSON}
          className="flex-1 min-w-[150px] px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          ✅ Validar
        </button>
        <button
          onClick={clear}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
        >
          🗑️ Limpar
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">⚠️ Erro:</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {output && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Resultado:
            </label>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
            >
              📋 Copiar
            </button>
          </div>
          <div className="bg-gray-50 border-2 border-green-200 rounded-lg p-4 max-h-96 overflow-auto">
            <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {output.split('\n').length} linhas • {output.length} caracteres
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Funcionalidades:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Formatar:</strong> Organiza o JSON com indentação para melhor legibilidade</li>
          <li><strong>Minificar:</strong> Remove espaços desnecessários para economizar espaço</li>
          <li><strong>Validar:</strong> Verifica se o JSON está correto sintaticamente</li>
        </ul>
      </div>
    </div>
  );
}
