'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function DiferencaDatas() {
  const locale = useLocale();
  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');
  const [resultado, setResultado] = useState<{anos: number; meses: number; dias: number; totalDias: number} | null>(null);

  const calcular = () => {
    const d1 = new Date(data1);
    const d2 = new Date(data2);
    const diff = Math.abs(d2.getTime() - d1.getTime());
    const totalDias = Math.floor(diff / (1000 * 60 * 60 * 24));

    const anos = Math.floor(totalDias / 365);
    const meses = Math.floor((totalDias % 365) / 30);
    const dias = totalDias % 30;

    setResultado({ anos, meses, dias, totalDias });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {locale === 'pt' ? 'Data Inicial' : 'Start Date'}
            </label>
            <input type="date" value={data1} onChange={(e) => setData1(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              {locale === 'pt' ? 'Data Final' : 'End Date'}
            </label>
            <input type="date" value={data2} onChange={(e) => setData2(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
          </div>
        </div>
        <button onClick={calcular} className="w-full py-3 bg-primary-600 text-white rounded-lg">
          {locale === 'pt' ? 'Calcular Diferença' : 'Calculate Difference'}
        </button>
        {resultado && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <p className="text-2xl font-bold">{resultado.anos} {locale === 'pt' ? 'anos' : 'years'}, {resultado.meses} {locale === 'pt' ? 'meses' : 'months'}, {resultado.dias} {locale === 'pt' ? 'dias' : 'days'}</p>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <p className="text-lg"><strong>{resultado.totalDias}</strong> {locale === 'pt' ? 'dias no total' : 'total days'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
