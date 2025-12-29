'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function CalendarioPerpetuo() {
  const locale = useLocale();
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const monthNames = {
    pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };

  const weekDays = {
    pt: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    );
  };

  const calendar = generateCalendar();
  const months = locale === 'pt' ? monthNames.pt : monthNames.en;
  const days = locale === 'pt' ? weekDays.pt : weekDays.en;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* Year and Month Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Ano:' : 'Year:'}
              </label>
              <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="1"
                max="9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === 'pt' ? 'Mês:' : 'Month:'}
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setSelectedMonth((m) => (m === 0 ? 11 : m - 1))}
              className="px-4 py-2 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors"
            >
              ← {locale === 'pt' ? 'Mês Anterior' : 'Previous Month'}
            </button>
            <button
              onClick={() => {
                const today = new Date();
                setSelectedYear(today.getFullYear());
                setSelectedMonth(today.getMonth());
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {locale === 'pt' ? 'Hoje' : 'Today'}
            </button>
            <button
              onClick={() => setSelectedMonth((m) => (m === 11 ? 0 : m + 1))}
              className="px-4 py-2 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors"
            >
              {locale === 'pt' ? 'Próximo Mês' : 'Next Month'} →
            </button>
          </div>

          {/* Calendar Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {months[selectedMonth]} {selectedYear}
            </h2>
          </div>

          {/* Calendar Grid */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {days.map((day, index) => (
                <div
                  key={index}
                  className="text-center font-semibold text-gray-700 dark:text-gray-300 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {calendar.map((day, index) => (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-lg font-medium
                    ${day === null ? 'invisible' : ''}
                    ${
                      isToday(day)
                        ? 'bg-primary-600 text-white shadow-lg scale-110 font-bold'
                        : 'bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-dark-600'
                    }
                    transition-all cursor-default
                  `}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {locale === 'pt' ? (
              <>
                📅 Este calendário funciona para qualquer ano de 1 a 9999
              </>
            ) : (
              <>
                📅 This calendar works for any year from 1 to 9999
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
