'use client';

import { useState } from 'react';

export default function GeradorUTM() {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [finalUrl, setFinalUrl] = useState('');

  const generateUTM = () => {
    if (!url || !source || !medium || !campaign) {
      alert('Por favor, preencha URL, Fonte, Mídia e Campanha');
      return;
    }

    const params = new URLSearchParams();
    params.append('utm_source', source);
    params.append('utm_medium', medium);
    params.append('utm_campaign', campaign);
    if (term) params.append('utm_term', term);
    if (content) params.append('utm_content', content);

    const baseUrl = url.includes('?') ? url.split('?')[0] : url;
    const generated = `${baseUrl}?${params.toString()}`;
    setFinalUrl(generated);
  };

  const copyURL = () => {
    navigator.clipboard.writeText(finalUrl);
    alert('URL copiada!');
  };

  const presets = [
    { label: 'Facebook', source: 'facebook', medium: 'social' },
    { label: 'Instagram', source: 'instagram', medium: 'social' },
    { label: 'Google Ads', source: 'google', medium: 'cpc' },
    { label: 'Email Marketing', source: 'email', medium: 'email' },
    { label: 'WhatsApp', source: 'whatsapp', medium: 'social' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">URL do site: *</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://seusite.com/pagina"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fonte (utm_source): *</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="facebook, google, newsletter"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mídia (utm_medium): *</label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="cpc, social, email, organic"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Campanha (utm_campaign): *</label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="black_friday_2024"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Termo (utm_term):</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="palavra-chave"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Conteúdo (utm_content):</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="banner_topo, botao_azul"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">⚡ Presets rápidos:</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setSource(preset.source);
                setMedium(preset.medium);
              }}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={generateUTM}
        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium mb-6"
      >
        🔗 Gerar URL com UTMs
      </button>

      {finalUrl && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">URL gerada:</p>
          <div className="bg-white p-3 rounded border break-all text-sm font-mono mb-3">
            {finalUrl}
          </div>
          <button onClick={copyURL} className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            📋 Copiar URL
          </button>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">📊 O que são UTMs?</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>utm_source:</strong> De onde veio (facebook, google)</li>
          <li><strong>utm_medium:</strong> Tipo de tráfego (cpc, social, email)</li>
          <li><strong>utm_campaign:</strong> Nome da campanha</li>
          <li><strong>utm_term:</strong> Palavra-chave (opcional)</li>
          <li><strong>utm_content:</strong> Variação de anúncio (opcional)</li>
        </ul>
      </div>
    </div>
  );
}
