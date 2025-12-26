'use client';

import { useConsent } from '@/contexts/ConsentContext';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { detectUserRegion, requiresDoNotSell } from '@/lib/regions';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, openSettings } = useConsent();
  const t = useTranslations('cookie.banner');
  const [isUSCA, setIsUSCA] = useState(false);

  useEffect(() => {
    // Detect if user is in California (CCPA applies)
    const region = detectUserRegion();
    setIsUSCA(region === 'US_CA' || requiresDoNotSell(region));
  }, []);

  if (!showBanner) return null;

  // Use CCPA-specific description for California users
  const description = isUSCA && t('descriptionCCPA') ? t('descriptionCCPA') : t('description');

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
        aria-hidden="true"
      />

      {/* Banner */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] animate-slide-up"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-dark-700 p-6 sm:p-8">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl" aria-hidden="true">🍪</span>
                  <div className="flex-1">
                    <h2
                      id="cookie-banner-title"
                      className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                    >
                      {t('title')}
                    </h2>
                    <p
                      id="cookie-banner-description"
                      className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed"
                    >
                      {description}
                    </p>
                    {isUSCA && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
                        🇺🇸 CCPA Compliance: California Consumer Privacy Act
                      </p>
                    )}
                  </div>
                </div>

                {/* Privacy Policy Link */}
                <Link
                  href="/privacy-policy"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium inline-flex items-center gap-1"
                >
                  {t('privacyPolicy')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Reject All Button - MUST have same prominence as Accept (LGPD requirement) */}
                <button
                  onClick={rejectAll}
                  className="
                    flex-1 px-6 py-3.5 rounded-lg font-semibold text-base
                    bg-gray-200 dark:bg-dark-700 text-gray-900 dark:text-gray-100
                    border-2 border-gray-300 dark:border-dark-600
                    hover:bg-gray-300 dark:hover:bg-dark-600
                    focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                    transition-all duration-200
                    active:scale-95
                  "
                  aria-label={t('rejectAllAria')}
                >
                  {t('rejectAll')}
                </button>

                {/* Accept All Button */}
                <button
                  onClick={acceptAll}
                  className="
                    flex-1 px-6 py-3.5 rounded-lg font-semibold text-base
                    bg-primary-600 text-white
                    border-2 border-primary-600
                    hover:bg-primary-700 hover:border-primary-700
                    focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                    transition-all duration-200
                    active:scale-95
                  "
                  aria-label={t('acceptAllAria')}
                >
                  {t('acceptAll')}
                </button>
              </div>

              {/* Settings Link */}
              <button
                onClick={openSettings}
                className="
                  text-sm font-medium text-gray-700 dark:text-gray-300
                  hover:text-primary-600 dark:hover:text-primary-400
                  underline decoration-dotted underline-offset-4
                  transition-colors
                  focus-visible:ring-2 focus-visible:ring-primary-500 rounded
                  px-2 py-1
                "
                aria-label={t('customizeAria')}
              >
                ⚙️ {t('customize')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
