'use client';

import { useState, useEffect } from 'react';

export default function ContadorPalavras() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (value: string) => {
    const trimmedText = value.trim();

    // Palavras
    const words = trimmedText
      ? trimmedText.split(/\s+/).filter((word) => word.length > 0).length
      : 0;

    // Caracteres
    const characters = value.length;
    const charactersNoSpaces = value.replace(/\s/g, '').length;

    // Frases (aproximado)
    const sentences = trimmedText
      ? trimmedText.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;

    // Parágrafos
    const paragraphs = trimmedText
      ? trimmedText.split(/\n\n+/).filter((p) => p.trim().length > 0).length
      : 0;

    // Tempo de leitura (assumindo 200 palavras por minuto)
    const readingTime = Math.ceil(words / 200);

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
    });
  };

  const clearText = () => {
    setText('');
  };

  const pasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
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
          placeholder="Digite ou cole seu texto aqui para contar palavras..."
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-primary-600">{stats.words}</div>
          <div className="text-sm text-gray-600 mt-1">Palavras</div>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{stats.characters}</div>
          <div className="text-sm text-gray-600 mt-1">Caracteres</div>
        </div>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-600">{stats.charactersNoSpaces}</div>
          <div className="text-sm text-gray-600 mt-1">Sem espaços</div>
        </div>
        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-orange-600">{stats.sentences}</div>
          <div className="text-sm text-gray-600 mt-1">Frases</div>
        </div>
        <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-pink-600">{stats.paragraphs}</div>
          <div className="text-sm text-gray-600 mt-1">Parágrafos</div>
        </div>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.readingTime}</div>
          <div className="text-sm text-gray-600 mt-1">Min. leitura</div>
        </div>
      </div>

      <div className="text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">📊 Estatísticas em tempo real</p>
        <p>
          As estatísticas são atualizadas automaticamente conforme você digita.
          Tempo de leitura calculado com base em 200 palavras por minuto (média de leitura).
        </p>
      </div>
    </div>
  );
}
