import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import LiveRegion from '@/components/LiveRegion';
import { ConsentProvider } from '@/contexts/ConsentContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import CookieBanner from '@/components/CookieConsent/CookieBanner';
import CookieSettings from '@/components/CookieConsent/CookieSettings';
import GoogleAnalytics from '@/components/Analytics/GoogleAnalytics';
import ToastProvider from '@/components/ui/ToastProvider';
import GlobalKeyboardShortcuts from '@/components/GlobalKeyboardShortcuts';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

const locales = ['en', 'pt', 'es', 'fr', 'de', 'ru', 'it'];

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
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TopTools" />

        {/* Google AdSense - Meta tag for domain verification */}
        <meta name="google-adsense-account" content="ca-pub-7799249195760389" />

        {/* Google AdSense - Script for ad display */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7799249195760389"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans bg-white dark:bg-dark-950 dim:bg-dim-950 text-gray-900 dark:text-gray-100 dim:text-dim-100 transition-colors antialiased">
        {/* Skip to main content - Accessibility */}
        <a href="#main-content" className="skip-to-main">
          {locale === 'en' && 'Skip to main content'}
          {locale === 'pt' && 'Pular para o conteúdo principal'}
          {locale === 'es' && 'Saltar al contenido principal'}
          {locale === 'fr' && 'Passer au contenu principal'}
          {locale === 'de' && 'Zum Hauptinhalt springen'}
          {locale === 'ru' && 'Перейти к основному содержанию'}
          {locale === 'it' && 'Vai al contenuto principale'}
        </a>

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ConsentProvider>
              {/* Google Analytics with Consent Mode v2 */}
              <GoogleAnalytics />

              {/* Toast Notifications */}
              <ToastProvider />

              {/* Global Keyboard Shortcuts */}
              <GlobalKeyboardShortcuts />

              {/* PWA Components */}
              <ServiceWorkerRegistration />
              <PWAInstallPrompt />

              {/* Live Region for Screen Readers */}
              <LiveRegion />

              {/* Cookie Consent Components */}
              <CookieBanner />
              <CookieSettings />

              {/* Main Layout */}
              <Header />
              <main id="main-content" className="min-h-screen pb-20 lg:pb-0">
                {children}
              </main>
              <Footer />

              {/* Mobile Bottom Navigation */}
              <BottomNav />
            </ConsentProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
