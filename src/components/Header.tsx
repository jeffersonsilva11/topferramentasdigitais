'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('site');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                whileTap={{ scale: 0.9 }}
                className="
                  lg:hidden p-2 rounded-lg
                  text-gray-700 dark:text-gray-300 dim:text-dim-200
                  hover:bg-gray-100 dark:hover:bg-dark-800 dim:hover:bg-dim-800
                  transition-colors
                  focus-visible:ring-2 focus-visible:ring-primary-500
                "
                aria-label={locale === 'en' ? 'Open menu' : locale === 'pt' ? 'Abrir menu' : 'Abrir menú'}
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>

              <ThemeToggle />
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
            </div>
          </nav>

          {/* Mobile Menu */}
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>
    </header>
  );
}
