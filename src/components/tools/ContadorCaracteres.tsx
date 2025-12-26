'use client';

import { useState, useEffect } from 'react';

export default function ContadorCaracteres() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    noSpaces: 0,
    onlyLetters: 0,
    onlyNumbers: 0,
    spaces: 0,
  });

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (value: string) => {
    const total = value.length;
    const noSpaces = value.replace(/\s/g, '').length;
    const onlyLetters = (value.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
    const onlyNumbers = (value.match(/[0-9]/g) || []).length;
    const spaces = total - noSpaces;

    setStats({
      total,
      noSpaces,
      onlyLetters,
      onlyNumbers,
      spaces,
    });
  };

  const clearText = () => {
    setText('');
  };

  const pasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch {
      alert('Não foi possível acessar a área de transferência');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">
            Digite ou cole seu texto:
          </label>
          <button
            onClick={pasteText}
            className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            📋 Colar
          </button>
        </div>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite ou cole seu texto aqui para contar caracteres..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={10}
        />
      </div>

      {text && (
        <button
          onClick={clearText}
          className="mb-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
        >
          🗑️ Limpar Texto
        </button>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-primary-600">{stats.total}</div>
          <div className="text-sm text-gray-600 mt-1">Total</div>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{stats.noSpaces}</div>
          <div className="text-sm text-gray-600 mt-1">Sem espaços</div>
        </div>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">{stats.spaces}</div>
          <div className="text-sm text-gray-600 mt-1">Espaços</div>
        </div>
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-orange-600">{stats.onlyLetters}</div>
          <div className="text-sm text-gray-600 mt-1">Letras</div>
        </div>
        <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-pink-600">{stats.onlyNumbers}</div>
          <div className="text-sm text-gray-600 mt-1">Números</div>
        </div>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">
            {stats.total - stats.onlyLetters - stats.onlyNumbers}
          </div>
          <div className="text-sm text-gray-600 mt-1">Outros</div>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">📊 Contador em tempo real</p>
        <p>
          As estatísticas são atualizadas automaticamente enquanto você digita.
          Útil para verificar limites de caracteres em redes sociais, formulários e textos.
        </p>
      </div>
    </div>
  );
}
