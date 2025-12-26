'use client';

import { useState } from 'react';

export default function GeradorSenha() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [strength, setStrength] = useState('');

  const generatePassword = () => {
    let charset = '';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (options.lowercase) charset += lowercase;
    if (options.uppercase) charset += uppercase;
    if (options.numbers) charset += numbers;
    if (options.symbols) charset += symbols;

    if (charset === '') {
      alert('Selecione pelo menos uma opção!');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (pass.length >= 16) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;

    if (score <= 2) setStrength('Fraca');
    else if (score <= 4) setStrength('Média');
    else setStrength('Forte');
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert('Senha copiada para a área de transferência!');
  };

  const getStrengthColor = () => {
    if (strength === 'Forte') return 'text-green-600 bg-green-50 border-green-200';
    if (strength === 'Média') return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tamanho da senha: {length} caracteres
        </label>
        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>6</span>
          <span>32</span>
        </div>
      </div>

      <div className="mb-6 space-y-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-3 text-sm text-gray-700">Letras maiúsculas (A-Z)</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={options.lowercase}
            onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-3 text-sm text-gray-700">Letras minúsculas (a-z)</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={options.numbers}
            onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-3 text-sm text-gray-700">Números (0-9)</span>
        </label>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={options.symbols}
            onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="ml-3 text-sm text-gray-700">Símbolos (!@#$%...)</span>
        </label>
      </div>

      <button
        onClick={generatePassword}
        className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium mb-6"
      >
        🔐 Gerar Senha Segura
      </button>

      {password && (
        <div className="space-y-4">
          <div className="bg-gray-50 border-2 border-primary-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Sua senha:</label>
              {strength && (
                <span className={`text-xs px-3 py-1 rounded-full border-2 font-semibold ${getStrengthColor()}`}>
                  {strength}
                </span>
              )}
            </div>
            <div className="bg-white rounded-lg p-3 font-mono text-lg break-all border-2 border-gray-300">
              {password}
            </div>
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          >
            📋 Copiar Senha
          </button>
        </div>
      )}

      <div className="mt-8 text-sm text-gray-600 bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <p className="font-semibold mb-2">🔒 Dicas de segurança:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Use senhas com pelo menos 12 caracteres</li>
          <li>Ative todas as opções para máxima segurança</li>
          <li>Nunca reutilize senhas em sites diferentes</li>
          <li>Use um gerenciador de senhas para guardá-las com segurança</li>
          <li>Esta senha é gerada localmente - nada é enviado para servidores</li>
        </ul>
      </div>
    </div>
  );
}
