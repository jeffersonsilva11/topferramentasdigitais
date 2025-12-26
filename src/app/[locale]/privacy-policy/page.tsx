
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

interface Params {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });

  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}

export default async function PrivacyPolicyPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('privacyPolicy');
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
            🔒 {t('title')}
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

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('dataCollection.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('dataCollection.intro')}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">▪</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">{t('dataCollection.item1.title')}</strong>
                  <p className="text-gray-700 dark:text-gray-300">{t('dataCollection.item1.desc')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">▪</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">{t('dataCollection.item2.title')}</strong>
                  <p className="text-gray-700 dark:text-gray-300">{t('dataCollection.item2.desc')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">▪</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">{t('dataCollection.item3.title')}</strong>
                  <p className="text-gray-700 dark:text-gray-300">{t('dataCollection.item3.desc')}</p>
                </div>
              </li>
            </ul>
          </section>

          {/* How We Use Data */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('dataUse.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('dataUse.intro')}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{t('dataUse.item1')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{t('dataUse.item2')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{t('dataUse.item3')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{t('dataUse.item4')}</span>
              </li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('cookies.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('cookies.intro')}
            </p>
            <Link
              href={`/${locale}/cookie-policy`}
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              {t('cookies.linkText')}
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('dataSharing.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('dataSharing.intro')}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">▪</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">{t('dataSharing.item1.title')}</strong>
                  <p className="text-gray-700 dark:text-gray-300">{t('dataSharing.item1.desc')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 dark:text-primary-400 mr-3 mt-1">▪</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">{t('dataSharing.item2.title')}</strong>
                  <p className="text-gray-700 dark:text-gray-300">{t('dataSharing.item2.desc')}</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('yourRights.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('yourRights.intro')}
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6 space-y-3">
              <div>
                <strong className="text-blue-900 dark:text-blue-100">🇪🇺 GDPR (EU):</strong>
                <p className="text-blue-800 dark:text-blue-200">{t('yourRights.gdpr')}</p>
              </div>
              <div>
                <strong className="text-blue-900 dark:text-blue-100">🇧🇷 LGPD (Brazil):</strong>
                <p className="text-blue-800 dark:text-blue-200">{t('yourRights.lgpd')}</p>
              </div>
              <div>
                <strong className="text-blue-900 dark:text-blue-100">🇺🇸 CCPA (California):</strong>
                <p className="text-blue-800 dark:text-blue-200">{t('yourRights.ccpa')}</p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('dataSecurity.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('dataSecurity.desc')}
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('childrenPrivacy.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('childrenPrivacy.desc')}
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('changes.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('changes.desc')}
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
