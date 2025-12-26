import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

interface Params {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cookiePolicy' });

  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}

export default async function CookiePolicyPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('cookiePolicy');
  const currentYear = new Date().getFullYear();

  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-950 dark:to-dark-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-8 mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('backToHome')}
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🍪 {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('lastUpdated')}: {t('updateDate')}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('introduction.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('introduction.p1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('introduction.p2')}
            </p>
          </section>

          {/* What Are Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('whatAreCookies.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('whatAreCookies.desc')}
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('cookieTypes.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t('cookieTypes.intro')}
            </p>

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3 flex items-center">
                  <span className="mr-2">🔒</span>
                  {t('cookieTypes.necessary.title')}
                  <span className="ml-3 text-xs px-2 py-1 bg-green-200 dark:bg-green-800 rounded-full">
                    {t('cookieTypes.necessary.alwaysActive')}
                  </span>
                </h3>
                <p className="text-green-800 dark:text-green-200 mb-3">
                  {t('cookieTypes.necessary.desc')}
                </p>
                <div className="bg-white dark:bg-dark-900 rounded p-4 text-sm">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t('cookieTypes.necessary.examplesTitle')}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>{t('cookieTypes.necessary.example1')}</li>
                    <li>{t('cookieTypes.necessary.example2')}</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    <strong>{t('retention')}:</strong> {t('cookieTypes.necessary.retention')}
                  </p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                  <span className="mr-2">📊</span>
                  {t('cookieTypes.analytics.title')}
                  <span className="ml-3 text-xs px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded-full">
                    {t('optional')}
                  </span>
                </h3>
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  {t('cookieTypes.analytics.desc')}
                </p>
                <div className="bg-white dark:bg-dark-900 rounded p-4 text-sm">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t('cookieTypes.analytics.examplesTitle')}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>{t('cookieTypes.analytics.example1')}</li>
                    <li>{t('cookieTypes.analytics.example2')}</li>
                    <li>{t('cookieTypes.analytics.example3')}</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    <strong>{t('retention')}:</strong> {t('cookieTypes.analytics.retention')}
                  </p>
                </div>
              </div>

              {/* Advertising Cookies */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-3 flex items-center">
                  <span className="mr-2">🎯</span>
                  {t('cookieTypes.advertising.title')}
                  <span className="ml-3 text-xs px-2 py-1 bg-purple-200 dark:bg-purple-800 rounded-full">
                    {t('optional')}
                  </span>
                </h3>
                <p className="text-purple-800 dark:text-purple-200 mb-3">
                  {t('cookieTypes.advertising.desc')}
                </p>
                <div className="bg-white dark:bg-dark-900 rounded p-4 text-sm">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t('cookieTypes.advertising.examplesTitle')}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>{t('cookieTypes.advertising.example1')}</li>
                    <li>{t('cookieTypes.advertising.example2')}</li>
                    <li>{t('cookieTypes.advertising.example3')}</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    <strong>{t('retention')}:</strong> {t('cookieTypes.advertising.retention')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Third Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('thirdParty.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('thirdParty.intro')}
            </p>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {t('thirdParty.google.title')}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                  {t('thirdParty.google.desc')}
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline text-sm inline-flex items-center"
                >
                  {t('thirdParty.google.link')}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* How to Manage Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('manageCookies.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('manageCookies.intro')}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1 font-bold">1.</span>
                <span className="text-gray-700 dark:text-gray-300">{t('manageCookies.method1')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1 font-bold">2.</span>
                <span className="text-gray-700 dark:text-gray-300">{t('manageCookies.method2')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1 font-bold">3.</span>
                <span className="text-gray-700 dark:text-gray-300">{t('manageCookies.method3')}</span>
              </li>
            </ul>
          </section>

          {/* Browser Settings */}
          <section className="bg-gray-50 dark:bg-dark-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('browserSettings.title')}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              {t('browserSettings.intro')}
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-white dark:bg-dark-900 rounded hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
                <span className="mr-2">Chrome</span>
                <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-white dark:bg-dark-900 rounded hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
                <span className="mr-2">Firefox</span>
                <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-white dark:bg-dark-900 rounded hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
                <span className="mr-2">Safari</span>
                <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-white dark:bg-dark-900 rounded hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
                <span className="mr-2">Edge</span>
                <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('updates.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('updates.desc')}
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 dark:bg-dark-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('contact.desc')}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>{t('contact.email')}</strong>
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>© {currentYear} {t('footer')}</p>
        </div>
      </div>
    </main>
  );
}
