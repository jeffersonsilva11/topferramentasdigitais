'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

export default function CalculadoraROI() {
  const t = useTranslations('roiCalculatorUI');
  const [investment, setInvestment] = useState<string>('');
  const [revenue, setRevenue] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<string>('');
  const [roi, setROI] = useState<number | null>(null);
  const [profit, setProfit] = useState<number | null>(null);
  const [shareableUrl, setShareableUrl] = useState<string>('');

  // Load from URL parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const invParam = params.get('investment');
      const revParam = params.get('revenue');
      const timeParam = params.get('period');

      if (invParam) setInvestment(invParam);
      if (revParam) setRevenue(revParam);
      if (timeParam) setTimePeriod(timeParam);

      // Auto-calculate if params present
      if (invParam && revParam) {
        calculateROI(parseFloat(invParam), parseFloat(revParam));
      }
    }
  }, []);

  const calculateROI = (inv?: number, rev?: number) => {
    const investmentValue = inv ?? parseFloat(investment);
    const revenueValue = rev ?? parseFloat(revenue);

    if (isNaN(investmentValue) || isNaN(revenueValue) || investmentValue === 0) {
      alert('Please enter valid investment and revenue values');
      return;
    }

    const calculatedProfit = revenueValue - investmentValue;
    const calculatedROI = (calculatedProfit / investmentValue) * 100;

    setProfit(calculatedProfit);
    setROI(calculatedROI);

    // Generate shareable URL
    generateShareableUrl(investmentValue, revenueValue, timePeriod);
  };

  const generateShareableUrl = (inv: number, rev: number, period: string) => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      params.set('investment', inv.toString());
      params.set('revenue', rev.toString());
      if (period) params.set('period', period);

      const baseUrl = window.location.origin + window.location.pathname;
      const url = `${baseUrl}?${params.toString()}`;
      setShareableUrl(url);
    }
  };

  const handleCalculate = () => {
    calculateROI();
  };

  const handleReset = () => {
    setInvestment('');
    setRevenue('');
    setTimePeriod('');
    setROI(null);
    setProfit(null);
    setShareableUrl('');

    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  const copyShareableUrl = () => {
    navigator.clipboard.writeText(shareableUrl);
    alert('URL copied to clipboard!');
  };

  const getROIInterpretation = (roiValue: number) => {
    if (roiValue < 0) {
      return {
        color: 'text-red-600',
        emoji: '📉',
        text: 'Negative ROI - This investment resulted in a loss.',
      };
    } else if (roiValue === 0) {
      return {
        color: 'text-gray-600',
        emoji: '➖',
        text: 'Break-even - No profit or loss on this investment.',
      };
    } else if (roiValue < 50) {
      return {
        color: 'text-yellow-600',
        emoji: '📊',
        text: 'Modest ROI - This investment generated some profit.',
      };
    } else if (roiValue < 100) {
      return {
        color: 'text-green-600',
        emoji: '📈',
        text: 'Good ROI - This is a profitable investment.',
      };
    } else {
      return {
        color: 'text-green-700',
        emoji: '🚀',
        text: 'Excellent ROI - This investment has generated significant returns!',
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t('title')}</h2>

        <div className="space-y-4">
          {/* Investment Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('investment')}
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              placeholder={t('investmentPlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              step="0.01"
            />
          </div>

          {/* Revenue Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('revenue')}
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder={t('revenuePlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              step="0.01"
            />
          </div>

          {/* Time Period (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('timePeriod')}
            </label>
            <input
              type="text"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              placeholder="e.g., 12 months, 2 years"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-dark-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleCalculate}
              className="flex-1"
            >
              {t('calculate')}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {roi !== null && profit !== null && (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">{t('results')}</h2>

          <div className="space-y-4">
            {/* ROI Percentage */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {t('roi')}
                </p>
                <p className={`text-5xl font-bold ${getROIInterpretation(roi).color}`}>
                  {roi.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Profit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t('profit')}
                </p>
                <p className={`text-2xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${profit.toFixed(2)}
                </p>
              </div>

              {timePeriod && (
                <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {t('timePeriod')}
                  </p>
                  <p className="text-2xl font-bold">
                    {timePeriod}
                  </p>
                </div>
              )}
            </div>

            {/* Interpretation */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
              <p className="font-semibold mb-2">
                {getROIInterpretation(roi).emoji} {getROIInterpretation(roi).text}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                For every $1 invested, you {roi >= 0 ? 'gained' : 'lost'} ${Math.abs(roi / 100).toFixed(2)}.
              </p>
            </div>

            {/* Formula Explanation */}
            <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">📐 {t('formula')}</p>
              <code className="text-xs bg-white dark:bg-dark-900 px-3 py-2 rounded block">
                ROI = ((Revenue - Investment) / Investment) × 100
              </code>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                ROI = (({parseFloat(revenue)} - {parseFloat(investment)}) / {parseFloat(investment)}) × 100 = {roi.toFixed(2)}%
              </p>
            </div>

            {/* Shareable URL */}
            {shareableUrl && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('shareableUrl')}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareableUrl}
                    readOnly
                    className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-dark-700 rounded-lg bg-gray-50 dark:bg-dark-800"
                  />
                  <Button
                    variant="secondary"
                    onClick={copyShareableUrl}
                  >
                    {t('copy')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
        <p className="font-semibold mb-2">💡 {t('whatIsROI')}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t('roiExplanation')}
        </p>
      </div>
    </div>
  );
}
