'use client';

import { useState } from 'react';
import QRCode from 'qrcode';

export default function GeradorLinkWhatsApp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateLink = async () => {
    if (!phoneNumber.trim()) {
      alert('Por favor, insira um número de telefone');
      return;
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';
    const link = `https://wa.me/${cleanPhone}${encodedMessage}`;

    setGeneratedLink(link);

    try {
      const qr = await QRCode.toDataURL(link, { width: 400 });
      setQrCodeUrl(qr);
    } catch {
      alert('Erro ao gerar QR Code');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copiado!');
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'whatsapp-qr.png';
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Número do WhatsApp (com código do país):
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="5511999999999"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          Exemplo: 55 11 99999-9999 (Brasil) / 1 555 123-4567 (EUA)
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mensagem pré-definida (opcional):
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Olá! Gostaria de mais informações..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={4}
        />
      </div>

      <button
        onClick={generateLink}
        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium mb-8"
      >
        💬 Gerar Link WhatsApp
      </button>

      {generatedLink && (
        <div className="space-y-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Seu link:</p>
            <div className="bg-white p-3 rounded border break-all text-sm font-mono">
              {generatedLink}
            </div>
            <div className="flex gap-3 mt-3">
              <button
                onClick={copyLink}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                📋 Copiar Link
              </button>
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
              >
                🔗 Testar Link
              </a>
            </div>
          </div>

          {qrCodeUrl && (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="font-medium mb-4">QR Code do WhatsApp:</p>
              <img src={qrCodeUrl} alt="QR Code" className="mx-auto rounded-lg shadow-md mb-4" />
              <button
                onClick={downloadQR}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                💾 Baixar QR Code
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Como usar:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Insira o número com código do país (sem +, espaços ou traços)</li>
          <li>Adicione uma mensagem pré-definida (opcional)</li>
          <li>Compartilhe o link ou QR Code com seus clientes</li>
          <li>Quem clicar abrirá o WhatsApp direto com você!</li>
        </ul>
      </div>
    </div>
  );
}
