'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileMenu() {
  const locale = useLocale();
  const pathname = usePathname();
  const tCategories = useTranslations('categories');
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const categories = [
    { id: 'converters', icon: '🔄', color: 'blue' },
    { id: 'generators', icon: '⚙️', color: 'green' },
    { id: 'calculators', icon: '🔢', color: 'purple' },
    { id: 'text', icon: '📝', color: 'orange' },
    { id: 'images', icon: '🖼️', color: 'pink' },
    { id: 'security', icon: '🔐', color: 'indigo' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
        aria-label={isOpen ? (locale === 'en' ? 'Close menu' : locale === 'pt' ? 'Fechar menu' : 'Cerrar menú') : (locale === 'en' ? 'Open menu' : locale === 'pt' ? 'Abrir menu' : 'Abrir menú')}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-dark-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={locale === 'en' ? 'Mobile navigation menu' : locale === 'pt' ? 'Menu de navegação mobile' : 'Menú de navegación móvil'}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {locale === 'en' ? 'Menu' : locale === 'pt' ? 'Menu' : 'Menú'}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={locale === 'en' ? 'Close menu' : locale === 'pt' ? 'Fechar menu' : 'Cerrar menú'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <nav className="overflow-y-auto h-[calc(100%-73px)]" aria-label={locale === 'en' ? 'Mobile navigation' : locale === 'pt' ? 'Navegação mobile' : 'Navegación móvil'}>
          {/* Home Link */}
          <div className="p-4 border-b border-gray-200 dark:border-dark-700">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 text-gray-900 dark:text-gray-100 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span className="text-xl" role="img" aria-label={locale === 'en' ? 'Home' : locale === 'pt' ? 'Início' : 'Inicio'}>🏠</span>
              {locale === 'en' ? 'Home' : locale === 'pt' ? 'Início' : 'Inicio'}
            </Link>
          </div>

          {/* Categories */}
          <div className="p-4">
            <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {locale === 'en' ? 'Categories' : locale === 'pt' ? 'Categorias' : 'Categorías'}
            </h3>
            <ul className="space-y-1" role="list">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/${locale}#${category.id}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-${category.color}-50 dark:hover:bg-${category.color}-950 text-gray-700 dark:text-gray-300 hover:text-${category.color}-900 dark:hover:text-${category.color}-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  >
                    <span className="text-xl" role="img" aria-hidden="true">{category.icon}</span>
                    <span className="font-medium">{tCategories(`${category.id}.title`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-700">
            <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              {locale === 'en' ? 'More' : locale === 'pt' ? 'Mais' : 'Más'}
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#about"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <span className="text-xl" role="img" aria-label={locale === 'en' ? 'About' : locale === 'pt' ? 'Sobre' : 'Acerca de'}>ℹ️</span>
                  <span className="font-medium">
                    {locale === 'en' ? 'About' : locale === 'pt' ? 'Sobre' : 'Acerca de'}
                  </span>
                </a>
              </li>
              {/* TODO: Add Privacy Policy and Cookie Policy links when pages are created */}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
