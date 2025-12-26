'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function GeradorUUID() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generateUUIDs = () => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(uuidv4());
    }
    setUuids(newUuids);
  };

  const copyToClipboard = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    alert('UUID copiado para a área de transferência!');
  };

  const copyAll = () => {
    const allUuids = uuids.join('\n');
    navigator.clipboard.writeText(allUuids);
    alert(`${uuids.length} UUID(s) copiado(s) para a área de transferência!`);
  };

  const clear = () => {
    setUuids([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantidade de UUIDs para gerar:
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Máximo: 100 UUIDs</p>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={generateUUIDs}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          🆔 Gerar UUID{count > 1 ? 's' : ''}
        </button>
        {uuids.length > 0 && (
          <>
            <button
              onClick={copyAll}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              📋 Copiar Todos
            </button>
            <button
              onClick={clear}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
            >
              🗑️ Limpar
            </button>
          </>
        )}
      </div>

      {uuids.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold text-lg">
            {uuids.length} UUID{uuids.length > 1 ? 's' : ''} gerado{uuids.length > 1 ? 's' : ''}:
          </h3>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {uuids.map((uuid, index) => (
              <div
                key={index}
                className="bg-gray-50 border-2 border-primary-200 rounded-lg p-4 flex justify-between items-center hover:bg-primary-50 transition"
              >
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">UUID #{index + 1}</p>
                  <p className="font-mono text-sm text-gray-800 break-all">{uuid}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(uuid)}
                  className="ml-4 px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 transition flex-shrink-0"
                >
                  📋
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 O que é UUID?</p>
        <p className="mb-2">
          UUID (Universally Unique Identifier) é um identificador único de 128 bits usado para
          identificar informações em sistemas computacionais.
        </p>
        <p className="mb-2">
          <strong>Formato:</strong> xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        </p>
        <p className="mb-2">
          <strong>Exemplos de uso:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Identificadores de banco de dados</li>
          <li>IDs de sessão</li>
          <li>Nomes de arquivos únicos</li>
          <li>Identificadores de transações</li>
        </ul>
        <p className="mt-2">
          Esta ferramenta gera UUIDs versão 4 (aleatórios), que são extremamente improváveis
          de colidir mesmo em grande escala.
        </p>
      </div>
    </div>
  );
}
