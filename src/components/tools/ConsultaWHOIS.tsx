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
      // Limpar o domínio removendo protocolo e path
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

      // Usar URL absoluta para evitar problemas com i18n locale no path
      const apiUrl = `${window.location.origin}/api/whois?domain=${encodeURIComponent(cleanDomain)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('API indisponível');
      }

      const data = await response.json();

      // Verificar se houve erro da API
      if (data.error) {
        throw new Error(data.message || 'WHOIS service unavailable');
      }

      // Formatar resultado de forma mais legível
      let formattedResult = `🌐 Informações WHOIS para: ${cleanDomain}\n\n`;

      if (data.raw) {
        // Extrair informações principais do raw data
        const rawText = Array.isArray(data.raw) ? data.raw.join('\n') : data.raw;

        // Tentar extrair informações principais
        const lines = rawText.split('\n');
        const importantLines = lines.filter((line: string) => {
          const lower = line.toLowerCase();
          return (
            lower.includes('domain name:') ||
            lower.includes('registrar:') ||
            lower.includes('creation date:') ||
            lower.includes('expiration date:') ||
            lower.includes('updated date:') ||
            lower.includes('name server:') ||
            lower.includes('status:') ||
            lower.includes('registrant') ||
            lower.includes('admin') ||
            lower.includes('tech')
          );
        });

        if (importantLines.length > 0) {
          formattedResult += importantLines.join('\n');
        } else {
          formattedResult += rawText;
        }
      } else {
        formattedResult += JSON.stringify(data, null, 2);
      }

      setResult(formattedResult);
    } catch (error) {
      console.error('Erro WHOIS:', error);
      setResult(
        `⚠️ Não foi possível consultar o domínio automaticamente.\n\n` +
          `📌 Consulte manualmente em:\n\n` +
          `• Domínios .br:\n  https://registro.br/tecnologia/ferramentas/whois/\n\n` +
          `• Domínios internacionais:\n  https://whois.com/whois/${domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]}\n\n` +
          `• Alternativa:\n  https://who.is/whois/${domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]}`
      );
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
