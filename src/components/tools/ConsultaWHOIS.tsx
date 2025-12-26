'use client';

import { useState } from 'react';

export default function ConsultaWHOIS() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const checkDomain = async () => {
    if (!domain.trim()) {
      alert('Por favor, insira um domínio');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      // API pública WHOIS - whoisjsonapi.com ou similar
      const cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0];
      const response = await fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName=${cleanDomain}&outputFormat=JSON&apiKey=at_free`);

      if (!response.ok) {
        setResult('⚠️ Serviço WHOIS temporariamente indisponível.\n\nInformações básicas do domínio:\n• Domínio consultado: ' + cleanDomain + '\n• Status: Aguardando consulta WHOIS\n• Para consulta completa, use registrar.br (domínios .br) ou whois.com');
        return;
      }

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch {
      setResult(`⚠️ Não foi possível consultar o domínio.\n\nDica: Para consultar domínios .br, acesse:\nhttps://registro.br/tecnologia/ferramentas/whois/\n\nPara domínios internacionais:\nhttps://whois.com/whois/${domain.replace(/^https?:\/\//, '').split('/')[0]}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Domínio para consultar:</label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="exemplo.com ou exemplo.com.br"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          onKeyPress={(e) => e.key === 'Enter' && checkDomain()}
        />
      </div>

      <button
        onClick={checkDomain}
        disabled={loading}
        className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-400 mb-6"
      >
        {loading ? '🔍 Consultando...' : '🔎 Consultar WHOIS'}
      </button>

      {result && (
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Resultado:</p>
          <pre className="bg-white p-4 rounded border overflow-auto max-h-96 text-xs font-mono whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">🌐 O que é WHOIS?</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Protocolo para consultar informações de domínios</li>
          <li>Mostra: proprietário, data de registro, expiração</li>
          <li>Útil para verificar disponibilidade e proprietário</li>
          <li>Algumas informações podem estar privadas (WHOIS Privacy)</li>
        </ul>
      </div>
    </div>
  );
}
