'use client';

import { useState, useEffect } from 'react';

interface ExchangeRates {
  [key: string]: number;
}

const currencies = {
  USD: { name: 'Dólar Americano', flag: '🇺🇸' },
  EUR: { name: 'Euro', flag: '🇪🇺' },
  GBP: { name: 'Libra Esterlina', flag: '🇬🇧' },
  BRL: { name: 'Real Brasileiro', flag: '🇧🇷' },
  JPY: { name: 'Iene Japonês', flag: '🇯🇵' },
  CNY: { name: 'Yuan Chinês', flag: '🇨🇳' },
  ARS: { name: 'Peso Argentino', flag: '🇦🇷' },
  AUD: { name: 'Dólar Australiano', flag: '🇦🇺' },
  CAD: { name: 'Dólar Canadense', flag: '🇨🇦' },
  CHF: { name: 'Franco Suíço', flag: '🇨🇭' },
  CLP: { name: 'Peso Chileno', flag: '🇨🇱' },
  COP: { name: 'Peso Colombiano', flag: '🇨🇴' },
  MXN: { name: 'Peso Mexicano', flag: '🇲🇽' },
  INR: { name: 'Rúpia Indiana', flag: '🇮🇳' },
  KRW: { name: 'Won Sul-Coreano', flag: '🇰🇷' },
  RUB: { name: 'Rublo Russo', flag: '🇷🇺' },
  ZAR: { name: 'Rand Sul-Africano', flag: '🇿🇦' },
};

export default function CotacaoMoedas() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [rates, setRates] = useState<ExchangeRates>({});
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${fromCurrency}`
      );
      const data = await response.json();
      setRates(data.rates);
      setLastUpdate(new Date().toLocaleString('pt-BR'));

      if (data.rates[toCurrency]) {
        setResult(amount * data.rates[toCurrency]);
      }
    } catch {
      alert('Erro ao buscar cotações. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rates[toCurrency]) {
      setResult(amount * rates[toCurrency]);
    }
  }, [amount, toCurrency, rates]);

  const convert = () => {
    fetchRates();
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    fetchRates();
  };

  const popularPairs = [
    { from: 'USD', to: 'BRL', label: 'USD → BRL' },
    { from: 'EUR', to: 'BRL', label: 'EUR → BRL' },
    { from: 'BRL', to: 'USD', label: 'BRL → USD' },
    { from: 'USD', to: 'EUR', label: 'USD → EUR' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">💱 Última atualização:</p>
            <p className="font-medium text-gray-800">{lastUpdate || 'Carregando...'}</p>
          </div>
          <button
            onClick={fetchRates}
            disabled={loading}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-400"
          >
            🔄 Atualizar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Valor:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">De:</label>
          <select
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
              fetchRates();
            }}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          >
            {Object.entries(currencies).map(([code, { name, flag }]) => (
              <option key={code} value={code}>
                {flag} {code} - {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Para:</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          >
            {Object.entries(currencies).map(([code, { name, flag }]) => (
              <option key={code} value={code}>
                {flag} {code} - {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={convert}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400"
        >
          💱 Converter
        </button>
        <button
          onClick={swapCurrencies}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          title="Inverter moedas"
        >
          🔄 Inverter
        </button>
      </div>

      {result !== null && (
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6 mb-6 text-center">
          <p className="text-sm text-gray-600 mb-2">Resultado:</p>
          <p className="text-4xl font-bold text-green-700 mb-2">
            {currencies[toCurrency].flag} {result.toFixed(2)} {toCurrency}
          </p>
          <p className="text-sm text-gray-600">
            {currencies[fromCurrency].flag} {amount.toFixed(2)} {fromCurrency} = {currencies[toCurrency].flag}{' '}
            {result.toFixed(2)} {toCurrency}
          </p>
          {rates[toCurrency] && (
            <p className="text-xs text-gray-500 mt-2">
              Taxa: 1 {fromCurrency} = {rates[toCurrency].toFixed(4)} {toCurrency}
            </p>
          )}
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">⚡ Conversões populares:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {popularPairs.map((pair) => (
            <button
              key={pair.label}
              onClick={() => {
                setFromCurrency(pair.from);
                setToCurrency(pair.to);
                fetchRates();
              }}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
            >
              {pair.label}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">💡 Sobre as cotações:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Fonte:</strong> Banco Central Europeu (ECB) via Frankfurter API</li>
          <li><strong>Atualização:</strong> Taxas atualizadas diariamente</li>
          <li><strong>Gratuito:</strong> Sem limites de consultas</li>
          <li><strong>17 moedas</strong> disponíveis incluindo principais moedas mundiais</li>
          <li>Use para referência - confirme taxas finais com seu banco</li>
        </ul>
      </div>
    </div>
  );
}
