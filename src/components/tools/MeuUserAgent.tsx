'use client';

import { useEffect, useState } from 'react';

export default function MeuUserAgent() {
  const [userAgent, setUserAgent] = useState('');
  const [browserInfo, setBrowserInfo] = useState({
    name: '',
    version: '',
    os: '',
    device: '',
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    setUserAgent(ua);
    parseUserAgent(ua);
  }, []);

  const parseUserAgent = (ua: string) => {
    let browserName = 'Desconhecido';
    let browserVersion = '';
    let os = 'Desconhecido';
    let device = 'Desktop';

    // Detectar navegador
    if (ua.includes('Firefox/')) {
      browserName = 'Firefox';
      browserVersion = ua.split('Firefox/')[1]?.split(' ')[0] || '';
    } else if (ua.includes('Edg/')) {
      browserName = 'Microsoft Edge';
      browserVersion = ua.split('Edg/')[1]?.split(' ')[0] || '';
    } else if (ua.includes('Chrome/')) {
      browserName = 'Chrome';
      browserVersion = ua.split('Chrome/')[1]?.split(' ')[0] || '';
    } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
      browserName = 'Safari';
      browserVersion = ua.split('Version/')[1]?.split(' ')[0] || '';
    } else if (ua.includes('Opera/') || ua.includes('OPR/')) {
      browserName = 'Opera';
      browserVersion = ua.split('OPR/')[1]?.split(' ')[0] || '';
    }

    // Detectar SO
    if (ua.includes('Windows NT 10')) {
      os = 'Windows 10/11';
    } else if (ua.includes('Windows NT')) {
      os = 'Windows';
    } else if (ua.includes('Mac OS X')) {
      os = 'macOS';
      const version = ua.split('Mac OS X ')[1]?.split(')')[0].replace(/_/g, '.');
      if (version) os += ' ' + version;
    } else if (ua.includes('Linux')) {
      os = 'Linux';
    } else if (ua.includes('Android')) {
      os = 'Android';
      const version = ua.split('Android ')[1]?.split(';')[0];
      if (version) os += ' ' + version;
    } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
      os = 'iOS';
    }

    // Detectar dispositivo
    if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
      device = 'Mobile';
    } else if (ua.includes('Tablet') || ua.includes('iPad')) {
      device = 'Tablet';
    }

    setBrowserInfo({
      name: browserName,
      version: browserVersion,
      os,
      device,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userAgent);
    alert('User Agent copiado para a área de transferência!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-4">
          <h3 className="font-semibold text-primary-900 mb-2">🌐 Navegador</h3>
          <p className="text-2xl font-bold text-primary-600">{browserInfo.name}</p>
          {browserInfo.version && (
            <p className="text-sm text-gray-600">Versão: {browserInfo.version}</p>
          )}
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">💻 Sistema Operacional</h3>
          <p className="text-2xl font-bold text-green-600">{browserInfo.os}</p>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">📱 Tipo de Dispositivo</h3>
          <p className="text-2xl font-bold text-purple-600">{browserInfo.device}</p>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-orange-900 mb-2">📏 Resolução da Tela</h3>
          <p className="text-2xl font-bold text-orange-600">
            {window.screen.width} × {window.screen.height}
          </p>
          <p className="text-sm text-gray-600">
            Viewport: {window.innerWidth} × {window.innerHeight}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          String completa do User Agent:
        </label>
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <p className="text-sm font-mono break-all text-gray-800">{userAgent}</p>
        </div>
      </div>

      <button
        onClick={copyToClipboard}
        className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
      >
        📋 Copiar User Agent
      </button>

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">ℹ️ O que é User Agent?</p>
        <p>
          O User Agent é uma string que identifica seu navegador, sistema operacional e dispositivo
          para os sites. É usado para fornecer conteúdo otimizado para seu dispositivo e ajudar
          em estatísticas de acesso.
        </p>
      </div>
    </div>
  );
}
