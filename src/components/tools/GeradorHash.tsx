'use client';

import { useState } from 'react';
import CryptoJS from 'crypto-js';

export default function GeradorHash() {
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: '',
  });

  const generateHashes = () => {
    if (!text.trim()) {
      alert('Por favor, insira um texto');
      return;
    }

    setHashes({
      md5: CryptoJS.MD5(text).toString(),
      sha1: CryptoJS.SHA1(text).toString(),
      sha256: CryptoJS.SHA256(text).toString(),
      sha512: CryptoJS.SHA512(text).toString(),
    });
  };

  const copyToClipboard = (hash: string, type: string) => {
    navigator.clipboard.writeText(hash);
    alert(`Hash ${type.toUpperCase()} copiado para a área de transferência!`);
  };

  const clear = () => {
    setText('');
    setHashes({
      md5: '',
      sha1: '',
      sha256: '',
      sha512: '',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
          Digite o texto para gerar o hash:
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite qualquer texto aqui..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={4}
        />
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={generateHashes}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          🔒 Gerar Hashes
        </button>
        {hashes.md5 && (
          <button
            onClick={clear}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
          >
            🗑️ Limpar
          </button>
        )}
      </div>

      {hashes.md5 && (
        <div className="space-y-4">
          {/* MD5 */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-red-900">MD5 (128 bits)</h3>
              <button
                onClick={() => copyToClipboard(hashes.md5, 'md5')}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
              >
                📋 Copiar
              </button>
            </div>
            <p className="font-mono text-sm break-all text-gray-800">{hashes.md5}</p>
          </div>

          {/* SHA-1 */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-orange-900">SHA-1 (160 bits)</h3>
              <button
                onClick={() => copyToClipboard(hashes.sha1, 'sha1')}
                className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition"
              >
                📋 Copiar
              </button>
            </div>
            <p className="font-mono text-sm break-all text-gray-800">{hashes.sha1}</p>
          </div>

          {/* SHA-256 */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-green-900">SHA-256 (256 bits)</h3>
              <button
                onClick={() => copyToClipboard(hashes.sha256, 'sha256')}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
              >
                📋 Copiar
              </button>
            </div>
            <p className="font-mono text-sm break-all text-gray-800">{hashes.sha256}</p>
          </div>

          {/* SHA-512 */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-blue-900">SHA-512 (512 bits)</h3>
              <button
                onClick={() => copyToClipboard(hashes.sha512, 'sha512')}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
              >
                📋 Copiar
              </button>
            </div>
            <p className="font-mono text-xs break-all text-gray-800">{hashes.sha512}</p>
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="font-semibold mb-2">⚠️ Informações importantes:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>MD5 e SHA-1:</strong> Considerados inseguros para aplicações críticas de segurança</li>
          <li><strong>SHA-256 e SHA-512:</strong> Recomendados para uso em segurança</li>
          <li><strong>Hashes são unidirecionais:</strong> Não é possível reverter o hash para o texto original</li>
          <li><strong>Uso comum:</strong> Verificação de integridade de arquivos, armazenamento seguro de senhas</li>
        </ul>
      </div>
    </div>
  );
}
