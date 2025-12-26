'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSelector from './LanguageSelector';
import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('site');

  const isHome = pathname === `/${locale}` || pathname === '/';

  return (
    <header className="bg-white dark:bg-dark-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
            aria-label={locale === 'en' ? 'Go to homepage' : locale === 'pt' ? 'Ir para página inicial' : 'Ir a la página de inicio'}
            aria-current={isHome ? 'page' : undefined}
          >
            <span className="text-2xl" role="img" aria-label={locale === 'en' ? 'Tools icon' : locale === 'pt' ? 'Ícone de ferramentas' : 'Ícono de herramientas'}>🛠️</span>
            <div>
              <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                {t('hero.title')}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {locale === 'en' ? 'Free Online Tools' : locale === 'pt' ? 'Utilitários online gratuitos' : 'Herramientas online gratis'}
              </p>
            </div>
          </Link>

          <nav aria-label={locale === 'en' ? 'Main navigation' : locale === 'pt' ? 'Navegação principal' : 'Navegación principal'}>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              {!isHome && (
                <Link
                  href={`/${locale}`}
                  className="hidden sm:inline-flex px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label={locale === 'en' ? 'Back to homepage' : locale === 'pt' ? 'Voltar para página inicial' : 'Volver a la página de inicio'}
                >
                  ← {t('backToHome')}
                </Link>
              )}
              <MobileMenu />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
