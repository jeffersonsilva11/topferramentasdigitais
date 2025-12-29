'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function CalculadoraIdade() {
  const locale = useLocale();
  const [dataNascimento, setDataNascimento] = useState('');
  const [resultado, setResultado] = useState<{anos: number; meses: number; dias: number} | null>(null);

  const calcularIdade = () => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();
    let dias = hoje.getDate() - nascimento.getDate();

    if (dias < 0) {
      meses--;
      dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    }
    if (meses < 0) {
      anos--;
      meses += 12;
    }

    setResultado({ anos, meses, dias });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
        <label className="block text-sm font-medium mb-2">
          {locale === 'pt' ? 'Data de Nascimento' : 'Birth Date'}
        </label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        <button onClick={calcularIdade} className="w-full py-3 bg-primary-600 text-white rounded-lg">
          {locale === 'pt' ? 'Calcular Idade' : 'Calculate Age'}
        </button>
        {resultado && (
          <div className="mt-6 p-6 bg-gray-50 dark:bg-dark-700 rounded-lg text-center">
            <p className="text-3xl font-bold">
              {resultado.anos} {locale === 'pt' ? 'anos' : 'years'}
            </p>
            <p className="text-lg mt-2">
              {resultado.meses} {locale === 'pt' ? 'meses e' : 'months and'} {resultado.dias} {locale === 'pt' ? 'dias' : 'days'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
