'use client';

import { useState } from 'react';

const holidays2026 = {
  br: [
    { date: '2026-01-01', name: 'Confraternização Universal' },
    { date: '2026-02-16', name: 'Carnaval' },
    { date: '2026-02-17', name: 'Carnaval' },
    { date: '2026-04-03', name: 'Sexta-feira Santa' },
    { date: '2026-04-21', name: 'Tiradentes' },
    { date: '2026-05-01', name: 'Dia do Trabalho' },
    { date: '2026-06-04', name: 'Corpus Christi' },
    { date: '2026-09-07', name: 'Independência do Brasil' },
    { date: '2026-10-12', name: 'Nossa Senhora Aparecida' },
    { date: '2026-11-02', name: 'Finados' },
    { date: '2026-11-15', name: 'Proclamação da República' },
    { date: '2026-11-20', name: 'Consciência Negra' },
    { date: '2026-12-25', name: 'Natal' },
  ],
  us: [
    { date: '2026-01-01', name: "New Year's Day" },
    { date: '2026-01-19', name: 'Martin Luther King Jr. Day' },
    { date: '2026-02-16', name: "Presidents' Day" },
    { date: '2026-05-25', name: 'Memorial Day' },
    { date: '2026-07-03', name: 'Independence Day (observed)' },
    { date: '2026-07-04', name: 'Independence Day' },
    { date: '2026-09-07', name: 'Labor Day' },
    { date: '2026-10-12', name: 'Columbus Day' },
    { date: '2026-11-11', name: 'Veterans Day' },
    { date: '2026-11-26', name: 'Thanksgiving Day' },
    { date: '2026-12-25', name: 'Christmas Day' },
  ],
  es: [
    { date: '2026-01-01', name: 'Año Nuevo' },
    { date: '2026-01-06', name: 'Reyes Magos' },
    { date: '2026-04-03', name: 'Viernes Santo' },
    { date: '2026-05-01', name: 'Día del Trabajo' },
    { date: '2026-08-15', name: 'Asunción de la Virgen' },
    { date: '2026-10-12', name: 'Fiesta Nacional de España' },
    { date: '2026-11-01', name: 'Todos los Santos' },
    { date: '2026-12-06', name: 'Día de la Constitución' },
    { date: '2026-12-08', name: 'Inmaculada Concepción' },
    { date: '2026-12-25', name: 'Navidad' },
  ],
  mx: [
    { date: '2026-01-01', name: 'Año Nuevo' },
    { date: '2026-02-02', name: 'Día de la Constitución' },
    { date: '2026-03-16', name: 'Natalicio de Benito Juárez' },
    { date: '2026-05-01', name: 'Día del Trabajo' },
    { date: '2026-09-16', name: 'Día de la Independencia' },
    { date: '2026-11-16', name: 'Día de la Revolución Mexicana' },
    { date: '2026-12-25', name: 'Navidad' },
  ],
  ar: [
    { date: '2026-01-01', name: 'Año Nuevo' },
    { date: '2026-02-16', name: 'Carnaval' },
    { date: '2026-02-17', name: 'Carnaval' },
    { date: '2026-03-24', name: 'Día de la Memoria' },
    { date: '2026-04-02', name: 'Día del Veterano' },
    { date: '2026-04-03', name: 'Viernes Santo' },
    { date: '2026-05-01', name: 'Día del Trabajador' },
    { date: '2026-05-25', name: 'Revolución de Mayo' },
    { date: '2026-06-20', name: 'Día de la Bandera' },
    { date: '2026-07-09', name: 'Día de la Independencia' },
    { date: '2026-08-17', name: 'Paso a la Inmortalidad del Gral. San Martín' },
    { date: '2026-10-12', name: 'Día del Respeto a la Diversidad Cultural' },
    { date: '2026-11-23', name: 'Día de la Soberanía Nacional' },
    { date: '2026-12-08', name: 'Inmaculada Concepción' },
    { date: '2026-12-25', name: 'Navidad' },
  ],
  cl: [
    { date: '2026-01-01', name: 'Año Nuevo' },
    { date: '2026-04-03', name: 'Viernes Santo' },
    { date: '2026-04-04', name: 'Sábado Santo' },
    { date: '2026-05-01', name: 'Día del Trabajo' },
    { date: '2026-05-21', name: 'Día de las Glorias Navales' },
    { date: '2026-06-29', name: 'San Pedro y San Pablo' },
    { date: '2026-07-16', name: 'Día de la Virgen del Carmen' },
    { date: '2026-08-15', name: 'Asunción de la Virgen' },
    { date: '2026-09-18', name: 'Día de la Independencia' },
    { date: '2026-09-19', name: 'Día de las Glorias del Ejército' },
    { date: '2026-10-12', name: 'Encuentro de Dos Mundos' },
    { date: '2026-10-31', name: 'Día de las Iglesias Evangélicas' },
    { date: '2026-11-01', name: 'Día de Todos los Santos' },
    { date: '2026-12-08', name: 'Inmaculada Concepción' },
    { date: '2026-12-25', name: 'Navidad' },
  ],
  co: [
    { date: '2026-01-01', name: 'Año Nuevo' },
    { date: '2026-01-12', name: 'Día de los Reyes Magos' },
    { date: '2026-03-23', name: 'Día de San José' },
    { date: '2026-04-02', name: 'Jueves Santo' },
    { date: '2026-04-03', name: 'Viernes Santo' },
    { date: '2026-05-01', name: 'Día del Trabajo' },
    { date: '2026-05-18', name: 'Ascensión del Señor' },
    { date: '2026-06-08', name: 'Corpus Christi' },
    { date: '2026-06-15', name: 'Sagrado Corazón' },
    { date: '2026-06-29', name: 'San Pedro y San Pablo' },
    { date: '2026-07-20', name: 'Día de la Independencia' },
    { date: '2026-08-07', name: 'Batalla de Boyacá' },
    { date: '2026-08-17', name: 'Asunción de la Virgen' },
    { date: '2026-10-12', name: 'Día de la Raza' },
    { date: '2026-11-02', name: 'Día de Todos los Santos' },
    { date: '2026-11-16', name: 'Independencia de Cartagena' },
    { date: '2026-12-08', name: 'Inmaculada Concepción' },
    { date: '2026-12-25', name: 'Navidad' },
  ],
};

const countryNames: Record<string, { name: string; flag: string }> = {
  br: { name: 'Brasil', flag: '🇧🇷' },
  us: { name: 'Estados Unidos', flag: '🇺🇸' },
  es: { name: 'Espanha', flag: '🇪🇸' },
  mx: { name: 'México', flag: '🇲🇽' },
  ar: { name: 'Argentina', flag: '🇦🇷' },
  cl: { name: 'Chile', flag: '🇨🇱' },
  co: { name: 'Colômbia', flag: '🇨🇴' },
};

export default function FeriadosNacionais() {
  const [selectedCountry, setSelectedCountry] = useState('br');

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const getDayOfWeek = (dateStr: string) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const date = new Date(dateStr + 'T12:00:00');
    return days[date.getDay()];
  };

  const selectedHolidays = holidays2026[selectedCountry as keyof typeof holidays2026] || [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Selecione o país:</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(countryNames).map(([code, { name, flag }]) => (
            <button
              key={code}
              onClick={() => setSelectedCountry(code)}
              className={`px-4 py-3 rounded-lg font-medium transition ${
                selectedCountry === code
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {flag} {name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {countryNames[selectedCountry].flag} Feriados {countryNames[selectedCountry].name} 2026
        </h2>
        <p className="text-sm text-gray-600">{selectedHolidays.length} feriados nacionais</p>
      </div>

      <div className="space-y-3">
        {selectedHolidays.map((holiday, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-primary-400 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg text-gray-800">{holiday.name}</p>
                <p className="text-sm text-gray-600">
                  {formatDate(holiday.date)} • {getDayOfWeek(holiday.date)}
                </p>
              </div>
              <div className="text-3xl">{countryNames[selectedCountry].flag}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-600 bg-blue-50 border-l-4 border-blue-400 p-4">
        <p className="font-semibold mb-2">📅 Informações:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Calendário atualizado para 2026</li>
          <li>Inclui feriados nacionais oficiais</li>
          <li>Feriados estaduais/municipais podem variar</li>
          <li>Datas móveis (como Carnaval e Páscoa) já calculadas</li>
        </ul>
      </div>
    </div>
  );
}
