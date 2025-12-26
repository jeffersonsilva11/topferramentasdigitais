'use client';

import { useState, useEffect } from 'react';

export default function ContadorTexto() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
    const readingTime = Math.ceil(words / 200); // 200 palavras por minuto

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
    });
  }, [text]);

  const pasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch {
      alert('Não foi possível acessar a área de transferência');
    }
  };

  const clearText = () => {
    setText('');
  };

  const copyStats = () => {
    const statsText = `
Estatísticas do Texto:
━━━━━━━━━━━━━━━━━━━━━
📝 Caracteres: ${stats.characters}
🔤 Caracteres (sem espaços): ${stats.charactersNoSpaces}
📖 Palavras: ${stats.words}
📄 Sentenças: ${stats.sentences}
📋 Parágrafos: ${stats.paragraphs}
⏱️ Tempo de leitura: ${stats.readingTime} min
    `.trim();

    navigator.clipboard.writeText(statsText);
    alert('Estatísticas copiadas!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label htmlFor="text-area" className="block text-sm font-medium text-gray-700 mb-2">
          Digite ou cole seu texto:
        </label>
        <textarea
          id="text-area"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole ou digite seu texto aqui..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={12}
        />
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={pasteText}
          className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          📋 Colar Texto
        </button>
        <button
          onClick={clearText}
          className="flex-1 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
        >
          🗑️ Limpar
        </button>
        <button
          onClick={copyStats}
          className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          disabled={!text}
        >
          📊 Copiar Estatísticas
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium mb-1">📝 Caracteres</p>
          <p className="text-3xl font-bold text-blue-700">{stats.characters.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-medium mb-1">🔤 Sem Espaços</p>
          <p className="text-3xl font-bold text-purple-700">{stats.charactersNoSpaces.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium mb-1">📖 Palavras</p>
          <p className="text-3xl font-bold text-green-700">{stats.words.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-600 font-medium mb-1">📄 Sentenças</p>
          <p className="text-3xl font-bold text-orange-700">{stats.sentences.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 rounded-lg p-4">
          <p className="text-sm text-pink-600 font-medium mb-1">📋 Parágrafos</p>
          <p className="text-3xl font-bold text-pink-700">{stats.paragraphs.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-lg p-4">
          <p className="text-sm text-indigo-600 font-medium mb-1">⏱️ Tempo Leitura</p>
          <p className="text-3xl font-bold text-indigo-700">{stats.readingTime} min</p>
        </div>
      </div>

      <div className="text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Sobre esta ferramenta:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Caracteres:</strong> Total de letras, números, espaços e símbolos</li>
          <li><strong>Sem Espaços:</strong> Contagem excluindo todos os espaços</li>
          <li><strong>Palavras:</strong> Contagem de palavras separadas por espaços</li>
          <li><strong>Sentenças:</strong> Frases separadas por pontos, exclamações ou interrogações</li>
          <li><strong>Parágrafos:</strong> Blocos de texto separados por quebras de linha</li>
          <li><strong>Tempo de Leitura:</strong> Estimativa baseada em 200 palavras/minuto</li>
        </ul>
      </div>
    </div>
  );
}
