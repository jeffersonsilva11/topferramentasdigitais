import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ConsentProvider } from '@/contexts/ConsentContext';
import CookieBanner from '@/components/CookieConsent/CookieBanner';
import CookieSettings from '@/components/CookieConsent/CookieSettings';
import GoogleAnalytics from '@/components/Analytics/GoogleAnalytics';

const locales = ['en', 'pt', 'es'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Google AdSense will be loaded via GoogleAnalytics component after consent */}
      </head>
      <body className="font-sans bg-white dark:bg-dark-950 text-gray-900 dark:text-gray-100 transition-colors antialiased">
        {/* Skip to main content - Accessibility */}
        <a href="#main-content" className="skip-to-main">
          {locale === 'en' ? 'Skip to main content' : locale === 'pt' ? 'Pular para o conteúdo principal' : 'Saltar al contenido principal'}
        </a>

        <NextIntlClientProvider messages={messages}>
          <ConsentProvider>
            {/* Google Analytics with Consent Mode v2 */}
            <GoogleAnalytics />

            {/* Cookie Consent Components */}
            <CookieBanner />
            <CookieSettings />

            {/* Main Layout */}
            <Header />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
