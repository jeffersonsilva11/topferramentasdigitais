'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

export default function CalculadoraCalorias() {
  const locale = useLocale();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [result, setResult] = useState<{
    bmr: number;
    maintain: number;
    mildLoss: number;
    weightLoss: number;
    extremeLoss: number;
    mildGain: number;
    weightGain: number;
  } | null>(null);

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const activity = parseFloat(activityLevel);

    if (!w || !h || !a) return;

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const maintain = bmr * activity;
    const mildLoss = maintain - 250;
    const weightLoss = maintain - 500;
    const extremeLoss = maintain - 1000;
    const mildGain = maintain + 250;
    const weightGain = maintain + 500;

    setResult({
      bmr: Math.round(bmr),
      maintain: Math.round(maintain),
      mildLoss: Math.round(mildLoss),
      weightLoss: Math.round(weightLoss),
      extremeLoss: Math.round(extremeLoss),
      mildGain: Math.round(mildGain),
      weightGain: Math.round(weightGain),
    });
  };

  const activityLevels = [
    { value: '1.2', label: locale === 'pt' ? 'Sedentário (pouco ou nenhum exercício)' : 'Sedentary (little or no exercise)' },
    { value: '1.375', label: locale === 'pt' ? 'Levemente ativo (1-3 dias/semana)' : 'Lightly active (1-3 days/week)' },
    { value: '1.55', label: locale === 'pt' ? 'Moderadamente ativo (3-5 dias/semana)' : 'Moderately active (3-5 days/week)' },
    { value: '1.725', label: locale === 'pt' ? 'Muito ativo (6-7 dias/semana)' : 'Very active (6-7 days/week)' },
    { value: '1.9', label: locale === 'pt' ? 'Extremamente ativo (atleta/trabalho físico)' : 'Extremely active (athlete/physical job)' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-dark-800 dim:bg-dim-800 rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {locale === 'pt' ? 'Sexo:' : 'Gender:'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setGender('male')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  gender === 'male'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {locale === 'pt' ? 'Masculino' : 'Male'}
              </button>
              <button
                onClick={() => setGender('female')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  gender === 'female'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {locale === 'pt' ? 'Feminino' : 'Female'}
              </button>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Idade (anos):' : 'Age (years):'}
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="25"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="1"
              max="120"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Peso (kg):' : 'Weight (kg):'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="70"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="1"
              step="0.1"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Altura (cm):' : 'Height (cm):'}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="1"
              step="0.1"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'pt' ? 'Nível de Atividade:' : 'Activity Level:'}
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateCalories}
            className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            {locale === 'pt' ? 'Calcular Calorias' : 'Calculate Calories'}
          </button>

          {/* Results */}
          {result && (
            <div className="mt-6 p-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {locale === 'pt' ? 'Suas Necessidades Calóricas:' : 'Your Caloric Needs:'}
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-dark-700 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'pt' ? 'Taxa Metabólica Basal (TMB):' : 'Basal Metabolic Rate (BMR):'}
                  </span>
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {result.bmr} {locale === 'pt' ? 'cal/dia' : 'cal/day'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white dark:bg-dark-700 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'pt' ? 'Manter peso:' : 'Maintain weight:'}
                  </span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {result.maintain} {locale === 'pt' ? 'cal/dia' : 'cal/day'}
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-600 pt-3 mt-3">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {locale === 'pt' ? 'Perda de peso:' : 'Weight loss:'}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pl-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {locale === 'pt' ? 'Leve (0.25 kg/semana):' : 'Mild (0.25 kg/week):'}
                      </span>
                      <span className="font-medium text-orange-600 dark:text-orange-400">
                        {result.mildLoss} {locale === 'pt' ? 'cal/dia' : 'cal/day'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pl-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {locale === 'pt' ? 'Moderada (0.5 kg/semana):' : 'Moderate (0.5 kg/week):'}
                      </span>
                      <span className="font-medium text-orange-600 dark:text-orange-400">
                        {result.weightLoss} {locale === 'pt' ? 'cal/dia' : 'cal/day'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pl-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {locale === 'pt' ? 'Extrema (1 kg/semana):' : 'Extreme (1 kg/week):'}
                      </span>
                      <span className="font-medium text-orange-600 dark:text-orange-400">
                        {result.extremeLoss} {locale === 'pt' ? 'cal/dia' : 'cal/day'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-600 pt-3">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {locale === 'pt' ? 'Ganho de peso:' : 'Weight gain:'}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pl-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {locale === 'pt' ? 'Leve (0.25 kg/semana):' : 'Mild (0.25 kg/week):'}
                      </span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {result.mildGain} {locale === 'pt' ? 'cal/dia' : 'cal/day'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pl-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {locale === 'pt' ? 'Moderado (0.5 kg/semana):' : 'Moderate (0.5 kg/week):'}
                      </span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {result.weightGain} {locale === 'pt' ? 'cal/dia' : 'cal/day'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                {locale === 'pt'
                  ? '* Calculado usando a Equação de Mifflin-St Jeor. Consulte um profissional de saúde para orientação personalizada.'
                  : '* Calculated using the Mifflin-St Jeor Equation. Consult a healthcare professional for personalized guidance.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
