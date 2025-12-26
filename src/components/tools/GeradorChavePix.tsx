'use client';

import { useState } from 'react';
import QRCode from 'qrcode';

export default function GeradorChavePix() {
  const [chavePix, setChavePix] = useState('');
  const [valor, setValor] = useState('');
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [txid, setTxid] = useState('');
  const [descricao, setDescricao] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [pixCopia, setPixCopia] = useState('');

  const gerarPixCopiaECola = () => {
    // Formato simplificado do PIX Copia e Cola
    // Nota: Esta é uma versão simplificada. Para produção, use biblioteca como 'pix-utils'
    const payload = `00020126${chavePix.length.toString().padStart(2, '0')}${chavePix}${
      valor ? `5303986540${valor.length}${valor}` : ''
    }5802BR${nome ? `59${nome.length.toString().padStart(2, '0')}${nome}` : ''}${
      cidade ? `60${cidade.length.toString().padStart(2, '0')}${cidade}` : ''
    }${txid ? `62${(txid.length + 4).toString().padStart(2, '0')}05${txid.length.toString().padStart(2, '0')}${txid}` : ''}6304`;

    // Calcula CRC16 (simplificado - em produção usar biblioteca)
    const crc = '0000'; // Placeholder - implementar CRC16 real

    return payload + crc;
  };

  const gerarQRCode = async () => {
    if (!chavePix.trim()) {
      alert('Por favor, insira uma chave PIX');
      return;
    }

    try {
      const payload = gerarPixCopiaECola();
      setPixCopia(payload);

      const qr = await QRCode.toDataURL(payload, {
        width: 400,
        margin: 2,
        color: {
          dark: '#00000',
          light: '#FFFFFF',
        },
      });

      setQrCodeUrl(qr);
    } catch {
      alert('Erro ao gerar QR Code PIX');
    }
  };

  const copiarChave = () => {
    navigator.clipboard.writeText(chavePix);
    alert('Chave PIX copiada!');
  };

  const copiarCodigoColaECopia = () => {
    navigator.clipboard.writeText(pixCopia);
    alert('Código PIX Copia e Cola copiado!');
  };

  const baixarQRCode = () => {
    const link = document.createElement('a');
    link.download = 'pix-qrcode.png';
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chave PIX: *
          </label>
          <input
            type="text"
            value={chavePix}
            onChange={(e) => setChavePix(e.target.value)}
            placeholder="CPF, CNPJ, e-mail, telefone ou chave aleatória"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valor (opcional):
          </label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0.00"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do beneficiário:
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="João Silva"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cidade:
          </label>
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="São Paulo"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID da transação (TXID):
          </label>
          <input
            type="text"
            value={txid}
            onChange={(e) => setTxid(e.target.value)}
            placeholder="PGTO123"
            maxLength={25}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição (opcional):
          </label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Pagamento de serviços"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={gerarQRCode}
        className="w-full px-6 py-3 bg-[#32BCAD] text-white rounded-lg hover:bg-[#2a9d8f] transition font-medium mb-8"
      >
        🇧🇷 Gerar QR Code PIX
      </button>

      {qrCodeUrl && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg mb-4">QR Code PIX Gerado!</h3>
            <img src={qrCodeUrl} alt="QR Code PIX" className="mx-auto rounded-lg shadow-lg mb-4" />
            <div className="flex gap-3 justify-center">
              <button
                onClick={baixarQRCode}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                💾 Baixar QR Code
              </button>
              <button
                onClick={copiarChave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                📋 Copiar Chave
              </button>
            </div>
          </div>

          {pixCopia && (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">PIX Copia e Cola:</p>
              <div className="bg-white p-3 rounded border break-all text-xs font-mono">
                {pixCopia}
              </div>
              <button
                onClick={copiarCodigoColaECopia}
                className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                📋 Copiar Código PIX
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">🇧🇷 Sobre o PIX:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Gratuito:</strong> Transferências PIX são grátis para pessoas físicas</li>
          <li><strong>Instantâneo:</strong> Receba pagamentos em segundos, 24/7</li>
          <li><strong>QR Code:</strong> Cliente escaneia e paga direto pelo app do banco</li>
          <li><strong>Copia e Cola:</strong> Código pode ser copiado e colado no app</li>
          <li><strong>Seguro:</strong> Sistema do Banco Central do Brasil</li>
        </ul>
      </div>
    </div>
  );
}
