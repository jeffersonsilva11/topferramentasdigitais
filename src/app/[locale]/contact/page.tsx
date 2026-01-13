import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

interface Params {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: Params) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('title'),
    description: t('metaDescription'),
  };
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
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
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
            {/* Response Time */}
            <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <span className="mr-2">⏱️</span>
                {t('responseTime.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {t('responseTime.desc')}
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <span className="mr-2">❓</span>
                {t('faq.title')}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                    {t('faq.q1')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('faq.a1')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                    {t('faq.q2')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('faq.a2')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                    {t('faq.q3')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('faq.a3')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Google Forms Embed) */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <span className="mr-2">✉️</span>
                {t('form.title')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {t('form.desc')}
              </p>

              {/* Google Forms Embed */}
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-dark-700">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSeTpiE0cHe8sijg_Jrt9nOmvj_-pt1tzipJDkAyaw9bzbOybw/viewform?embedded=true"
                  width="100%"
                  height="800"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="bg-white dark:bg-dark-800"
                  title={t('form.title')}
                >
                  {t('form.loading')}
                </iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>&copy; {currentYear} {t('footer')}</p>
        </div>
      </div>
    </main>
  );
}
