'use client';

import { useState } from 'react';

export default function SiteOnline() {
  const [url, setUrl] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{
    status: 'online' | 'offline' | 'error';
    message: string;
    time?: number;
  } | null>(null);

  const checkSite = async () => {
    if (!url.trim()) {
      alert('Por favor, insira uma URL');
      return;
    }

    let testUrl = url.trim();
    if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
      testUrl = 'https://' + testUrl;
    }

    setChecking(true);
    setResult(null);

    try {
      const startTime = Date.now();

      // Tentar fazer um HEAD request através de um proxy CORS
      // Nota: Em produção, você precisaria de um backend ou serviço de proxy
      await fetch(testUrl, {
        method: 'HEAD',
        mode: 'no-cors', // Isso vai limitar o que podemos verificar
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Com no-cors, não conseguimos ver o status real, então assumimos sucesso
      setResult({
        status: 'online',
        message: `Site está acessível! (Tempo de resposta aproximado: ${responseTime}ms)`,
        time: responseTime,
      });
    } catch {
      setResult({
        status: 'offline',
        message: 'Não foi possível acessar o site. Pode estar offline ou bloqueando verificações.',
      });
    } finally {
      setChecking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkSite();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
          Digite a URL do site:
        </label>
        <input
          id="url-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="exemplo.com ou https://exemplo.com"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          Exemplos: google.com, https://github.com, www.example.com
        </p>
      </div>

      <button
        onClick={checkSite}
        disabled={checking || !url.trim()}
        className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed mb-6"
      >
        {checking ? '⏳ Verificando...' : '🌍 Testar Site'}
      </button>

      {result && (
        <div
          className={`rounded-lg p-6 ${
            result.status === 'online'
              ? 'bg-green-50 border-2 border-green-200'
              : 'bg-red-50 border-2 border-red-200'
          }`}
        >
          <div className="flex items-center mb-2">
            <span className="text-3xl mr-3">
              {result.status === 'online' ? '✅' : '❌'}
            </span>
            <div>
              <h3
                className={`font-bold text-lg ${
                  result.status === 'online' ? 'text-green-900' : 'text-red-900'
                }`}
              >
                {result.status === 'online' ? 'Site Online!' : 'Site Offline ou Inacessível'}
              </h3>
              <p
                className={`text-sm ${
                  result.status === 'online' ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {result.message}
              </p>
            </div>
          </div>

          {result.status === 'online' && result.time && (
            <div className="mt-4 bg-white rounded-lg p-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tempo de resposta:</span>
                <span className="font-semibold text-green-600">{result.time}ms</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="font-semibold mb-2">⚠️ Limitações técnicas:</p>
        <p className="mb-2">
          Devido às restrições de segurança dos navegadores (CORS), esta ferramenta tem limitações:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Alguns sites podem bloquear verificações diretas do navegador</li>
          <li>O tempo de resposta é aproximado</li>
          <li>Para verificações mais precisas, use ferramentas como ping ou traceroute no terminal</li>
        </ul>
      </div>
    </div>
  );
}
