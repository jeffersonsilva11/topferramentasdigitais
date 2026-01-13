import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

interface Params {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}

export default async function AboutPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
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
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-8 space-y-8">
          {/* Mission */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="mr-3">🎯</span>
              {t('mission.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('mission.p1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('mission.p2')}
            </p>
          </section>

          {/* What We Offer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="mr-3">🛠️</span>
              {t('whatWeOffer.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t('whatWeOffer.desc')}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">{t('whatWeOffer.converters.title')}</h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm">{t('whatWeOffer.converters.desc')}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">{t('whatWeOffer.generators.title')}</h3>
                <p className="text-green-800 dark:text-green-200 text-sm">{t('whatWeOffer.generators.desc')}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2">{t('whatWeOffer.calculators.title')}</h3>
                <p className="text-purple-800 dark:text-purple-200 text-sm">{t('whatWeOffer.calculators.desc')}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2">{t('whatWeOffer.security.title')}</h3>
                <p className="text-orange-800 dark:text-orange-200 text-sm">{t('whatWeOffer.security.desc')}</p>
              </div>
            </div>
          </section>

          {/* Why Free */}
          <section className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100 mb-4 flex items-center">
              <span className="mr-3">💡</span>
              {t('whyFree.title')}
            </h2>
            <p className="text-primary-800 dark:text-primary-200 leading-relaxed mb-4">
              {t('whyFree.p1')}
            </p>
            <p className="text-primary-800 dark:text-primary-200 leading-relaxed">
              {t('whyFree.p2')}
            </p>
          </section>

          {/* Privacy First */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="mr-3">🔒</span>
              {t('privacyFirst.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('privacyFirst.p1')}
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-4">
              <ul className="space-y-2 text-green-800 dark:text-green-200">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('privacyFirst.item1')}
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('privacyFirst.item2')}
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('privacyFirst.item3')}
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('privacyFirst.item4')}
                </li>
              </ul>
            </div>
          </section>

          {/* Our Values */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="mr-3">⭐</span>
              {t('values.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{t('values.simplicity.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('values.simplicity.desc')}</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🎁</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{t('values.accessibility.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('values.accessibility.desc')}</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🛡️</div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{t('values.trust.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('values.trust.desc')}</p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-gray-50 dark:bg-dark-800 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('contactCta.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('contactCta.desc')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              {t('contactCta.button')}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>&copy; {currentYear} {t('footer')}</p>
        </div>
      </div>
    </main>
  );
}
