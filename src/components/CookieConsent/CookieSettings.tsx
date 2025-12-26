'use client';

import { useState, useEffect } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import { useTranslations } from 'next-intl';

export default function CookieSettings() {
  const { showSettings, categories, savePreferences, closeSettings } = useConsent();
  const t = useTranslations('cookie.settings');
  const tCat = useTranslations('cookie.categories');

  const [localCategories, setLocalCategories] = useState(categories);

  // Sync with global state when dialog opens
  useEffect(() => {
    if (showSettings) {
      setLocalCategories(categories);
    }
  }, [showSettings, categories]);

  if (!showSettings) return null;

  const handleToggle = (category: 'analytics' | 'advertising') => {
    setLocalCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    savePreferences({
      analytics: localCategories.analytics,
      advertising: localCategories.advertising,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
        onClick={closeSettings}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        role="dialog"
        aria-labelledby="cookie-settings-title"
        aria-modal="true"
      >
        <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 dark:border-dark-700 flex items-center justify-between">
            <h2
              id="cookie-settings-title"
              className="text-2xl font-bold text-gray-900 dark:text-gray-100"
            >
              ⚙️ {t('title')}
            </h2>
            <button
              onClick={closeSettings}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800"
              aria-label={t('close')}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('description')}
            </p>

            <div className="space-y-4">
              {/* Necessary Cookies - Always On */}
              <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-5 border-2 border-gray-200 dark:border-dark-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                      🔒 {tCat('necessary.title')}
                      <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full font-medium">
                        {t('alwaysActive')}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tCat('necessary.description')}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-6 bg-green-600 rounded-full relative cursor-not-allowed opacity-75">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-5 border-2 border-gray-200 dark:border-dark-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      📊 {tCat('analytics.title')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {tCat('analytics.description')}
                    </p>
                    <details className="text-xs text-gray-500 dark:text-gray-500">
                      <summary className="cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                        {t('seeDetails')}
                      </summary>
                      <ul className="mt-2 ml-4 list-disc space-y-1">
                        <li>Google Analytics (_ga, _gid, _gat)</li>
                        <li>{t('dataRetention')}: 14 {t('months')}</li>
                      </ul>
                    </details>
                  </div>
                  <button
                    onClick={() => handleToggle('analytics')}
                    className="flex-shrink-0 focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full"
                    aria-label={`${localCategories.analytics ? t('disable') : t('enable')} ${tCat('analytics.title')}`}
                    role="switch"
                    aria-checked={localCategories.analytics}
                  >
                    <div
                      className={`
                        w-12 h-6 rounded-full transition-colors duration-200
                        ${localCategories.analytics ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'}
                      `}
                    >
                      <div
                        className={`
                          w-4 h-4 bg-white rounded-full transition-transform duration-200
                          absolute top-1
                          ${localCategories.analytics ? 'translate-x-7' : 'translate-x-1'}
                        `}
                      />
                    </div>
                  </button>
                </div>
              </div>

              {/* Advertising Cookies */}
              <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-5 border-2 border-gray-200 dark:border-dark-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      🎯 {tCat('advertising.title')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {tCat('advertising.description')}
                    </p>
                    <details className="text-xs text-gray-500 dark:text-gray-500">
                      <summary className="cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 font-medium">
                        {t('seeDetails')}
                      </summary>
                      <ul className="mt-2 ml-4 list-disc space-y-1">
                        <li>Google Ads (IDE, DSID, FLC)</li>
                        <li>Google AdSense</li>
                        <li>{t('dataRetention')}: 24 {t('months')}</li>
                      </ul>
                    </details>
                  </div>
                  <button
                    onClick={() => handleToggle('advertising')}
                    className="flex-shrink-0 focus-visible:ring-2 focus-visible:ring-primary-500 rounded-full"
                    aria-label={`${localCategories.advertising ? t('disable') : t('enable')} ${tCat('advertising.title')}`}
                    role="switch"
                    aria-checked={localCategories.advertising}
                  >
                    <div
                      className={`
                        w-12 h-6 rounded-full transition-colors duration-200
                        ${localCategories.advertising ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'}
                      `}
                    >
                      <div
                        className={`
                          w-4 h-4 bg-white rounded-full transition-transform duration-200
                          absolute top-1
                          ${localCategories.advertising ? 'translate-x-7' : 'translate-x-1'}
                        `}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-dark-700 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={closeSettings}
              className="
                px-6 py-2.5 rounded-lg font-medium
                bg-gray-200 dark:bg-dark-700 text-gray-900 dark:text-gray-100
                hover:bg-gray-300 dark:hover:bg-dark-600
                transition-colors
              "
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleSave}
              className="
                px-6 py-2.5 rounded-lg font-medium
                bg-primary-600 text-white
                hover:bg-primary-700
                transition-colors
              "
            >
              {t('savePreferences')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
