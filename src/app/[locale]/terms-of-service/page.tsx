import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

interface Params {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsOfService' });

  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}

export default async function TermsOfServicePage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('termsOfService');
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

          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('acceptance.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('acceptance.desc')}
            </p>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('services.desc')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('services.item1')}</li>
              <li>{t('services.item2')}</li>
              <li>{t('services.item3')}</li>
              <li>{t('services.item4')}</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('userResponsibilities.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('userResponsibilities.desc')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('userResponsibilities.item1')}</li>
              <li>{t('userResponsibilities.item2')}</li>
              <li>{t('userResponsibilities.item3')}</li>
              <li>{t('userResponsibilities.item4')}</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('intellectualProperty.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('intellectualProperty.p1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('intellectualProperty.p2')}
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('privacy.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('privacy.desc')}{' '}
              <Link href={`/${locale}/privacy-policy`} className="text-primary-600 dark:text-primary-400 hover:underline">
                {t('privacy.link')}
              </Link>
            </p>
          </section>

          {/* Disclaimer */}
          <section className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-yellow-900 dark:text-yellow-100 mb-4">
              {t('disclaimer.title')}
            </h2>
            <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed mb-4">
              {t('disclaimer.p1')}
            </p>
            <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">
              {t('disclaimer.p2')}
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('limitation.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('limitation.desc')}
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('modifications.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('modifications.desc')}
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('governingLaw.title')}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('governingLaw.desc')}
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
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
            >
              {t('contact.link')}
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
