'use client';

import { useState, useRef } from 'react';
import QRCode from 'qrcode';

export default function GeradorQRCode() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert('Por favor, insira um texto ou URL');
      return;
    }

    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, text, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });

        // Gerar URL para download
        const url = await QRCode.toDataURL(text, { width: 500 });
        setQrCodeUrl(url);
      }
    } catch (err) {
      alert('Erro ao gerar QR Code');
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeUrl;
    link.click();
  };

  const clearQRCode = () => {
    setText('');
    setQrCodeUrl('');
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label htmlFor="qr-text" className="block text-sm font-medium text-gray-700 mb-2">
          Digite o texto ou URL para gerar o QR Code:
        </label>
        <textarea
          id="qr-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://exemplo.com ou qualquer texto..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={4}
        />
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={generateQRCode}
          className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          🎨 Gerar QR Code
        </button>
        {qrCodeUrl && (
          <>
            <button
              onClick={downloadQRCode}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              💾 Baixar
            </button>
            <button
              onClick={clearQRCode}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
            >
              🗑️ Limpar
            </button>
          </>
        )}
      </div>

      {qrCodeUrl && (
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <p className="text-gray-700 mb-4 font-medium">Seu QR Code:</p>
          <div className="inline-block bg-white p-4 rounded-lg shadow-md">
            <canvas ref={canvasRef} className="mx-auto" />
          </div>
        </div>
      )}

      {!qrCodeUrl && (
        <canvas ref={canvasRef} className="hidden" />
      )}

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Dica:</p>
        <p>
          QR Codes podem armazenar URLs, textos, números de telefone, e-mails e muito mais.
          Basta escanear com a câmera do celular para acessar o conteúdo!
        </p>
      </div>
    </div>
  );
}
