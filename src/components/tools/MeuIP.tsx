'use client';

import { useEffect, useState } from 'react';

export default function MeuIP() {
  const [ip, setIp] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [ipInfo, setIpInfo] = useState<any>(null);

  useEffect(() => {
    fetchIP();
  }, []);

  const fetchIP = async () => {
    setLoading(true);
    setError('');
    try {
      // Usando múltiplos serviços como fallback
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIp(data.ip);

      // Buscar informações adicionais
      try {
        const infoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
        const infoData = await infoResponse.json();
        setIpInfo(infoData);
      } catch (err) {
        // Informações adicionais são opcionais
      }
    } catch (err) {
      setError('Não foi possível obter o IP. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ip);
    alert('IP copiado para a área de transferência!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-6">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-gray-600">Detectando seu IP...</p>
          </div>
        ) : error ? (
          <div className="text-red-600">
            <p className="mb-4">{error}</p>
            <button
              onClick={fetchIP}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Tentar Novamente
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Seu endereço IP público é:</p>
              <div className="bg-gray-50 border-2 border-primary-200 rounded-lg p-4 inline-block">
                <p className="text-3xl font-mono font-bold text-primary-600">{ip}</p>
              </div>
            </div>

            <button
              onClick={copyToClipboard}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              📋 Copiar IP
            </button>

            {ipInfo && (
              <div className="mt-8 text-left bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Informações Adicionais:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {ipInfo.city && (
                    <div>
                      <span className="font-semibold">Cidade:</span> {ipInfo.city}
                    </div>
                  )}
                  {ipInfo.region && (
                    <div>
                      <span className="font-semibold">Região:</span> {ipInfo.region}
                    </div>
                  )}
                  {ipInfo.country_name && (
                    <div>
                      <span className="font-semibold">País:</span> {ipInfo.country_name}
                    </div>
                  )}
                  {ipInfo.org && (
                    <div>
                      <span className="font-semibold">Provedor:</span> {ipInfo.org}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">ℹ️ O que é um endereço IP?</p>
        <p>
          O endereço IP (Internet Protocol) é um identificador único do seu dispositivo
          na internet. É como o endereço da sua casa, mas para a rede.
        </p>
      </div>
    </div>
  );
}
