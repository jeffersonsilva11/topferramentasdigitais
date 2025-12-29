'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';

export default function ConversorFusoHorario() {
  const locale = useLocale();
  const [sourceTime, setSourceTime] = useState('12:00');
  const [sourceDate, setSourceDate] = useState('');
  const [sourceTimezone, setSourceTimezone] = useState('America/New_York');
  const [targetTimezone, setTargetTimezone] = useState('Europe/London');
  const [result, setResult] = useState<string>('');

  const timezones = [
    { value: 'America/New_York', label: 'New York (EST/EDT)', offset: '-05:00' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', offset: '-08:00' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT)', offset: '-06:00' },
    { value: 'America/Denver', label: 'Denver (MST/MDT)', offset: '-07:00' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', offset: '-03:00' },
    { value: 'Europe/London', label: 'London (GMT/BST)', offset: '+00:00' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: '+01:00' },
    { value: 'Europe/Moscow', label: 'Moscow (MSK)', offset: '+03:00' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: '+09:00' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: '+08:00' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)', offset: '+04:00' },
    { value: 'Asia/Kolkata', label: 'Mumbai (IST)', offset: '+05:30' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)', offset: '+10:00' },
    { value: 'Pacific/Auckland', label: 'Auckland (NZDT/NZST)', offset: '+12:00' },
    { value: 'UTC', label: 'UTC', offset: '+00:00' },
  ];

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSourceDate(today);
  }, []);

  const convertTimezone = () => {
    if (!sourceTime || !sourceDate) return;

    try {
      // Create a date object in the source timezone
      const dateTimeString = `${sourceDate}T${sourceTime}:00`;
      const sourceDateTime = new Date(dateTimeString);

      // Format the result in the target timezone
      const options: Intl.DateTimeFormatOptions = {
        timeZone: targetTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      const formatted = new Intl.DateTimeFormat('en-GB', options).format(sourceDateTime);
      setResult(formatted);
    } catch (error) {
      console.error('Error converting timezone:', error);
      setResult(locale === 'pt' ? 'Erro ao converter' : 'Error converting');
    }
  };

  useEffect(() => {
    if (sourceTime && sourceDate) {
      convertTimezone();
    }
  }, [sourceTime, sourceDate, sourceTimezone, targetTimezone]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* Source Section */}
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {locale === 'pt' ? '🌍 Horário de Origem' : '🌍 Source Time'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {locale === 'pt' ? 'Fuso Horário:' : 'Timezone:'}
                </label>
                <select
                  value={sourceTimezone}
                  onChange={(e) => setSourceTimezone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label} (UTC{tz.offset})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {locale === 'pt' ? 'Data:' : 'Date:'}
                  </label>
                  <input
                    type="date"
                    value={sourceDate}
                    onChange={(e) => setSourceDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {locale === 'pt' ? 'Horário:' : 'Time:'}
                  </label>
                  <input
                    type="time"
                    value={sourceTime}
                    onChange={(e) => setSourceTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Arrow */}
          <div className="flex justify-center">
            <div className="text-4xl text-primary-600 dark:text-primary-400">↓</div>
          </div>

          {/* Target Section */}
          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {locale === 'pt' ? '🎯 Horário de Destino' : '🎯 Target Time'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {locale === 'pt' ? 'Fuso Horário:' : 'Timezone:'}
                </label>
                <select
                  value={targetTimezone}
                  onChange={(e) => setTargetTimezone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {timezones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label} (UTC{tz.offset})
                    </option>
                  ))}
                </select>
              </div>

              {result && (
                <div className="p-4 bg-white dark:bg-dark-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {locale === 'pt' ? 'Resultado:' : 'Result:'}
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {result}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              💡 <strong>{locale === 'pt' ? 'Dica:' : 'Tip:'}</strong>{' '}
              {locale === 'pt'
                ? 'As conversões consideram automaticamente o horário de verão (DST) quando aplicável.'
                : 'Conversions automatically consider daylight saving time (DST) when applicable.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
