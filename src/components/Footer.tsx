'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations('footer');
  const tCategories = useTranslations('categories');

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-16" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              <span role="img" aria-label={locale === 'en' ? 'Tools icon' : locale === 'pt' ? 'Ícone de ferramentas' : 'Ícono de herramientas'}>🛠️</span> {t('title')}
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              {t('subtitle')}
            </p>
          </div>

          {/* Categories Section */}
          <nav aria-label={locale === 'en' ? 'Tool categories' : locale === 'pt' ? 'Categorias de ferramentas' : 'Categorías de herramientas'}>
            <h4 className="font-semibold mb-4">{t('categories')}</h4>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500" role="list">
              <li>{tCategories('converters.title')}</li>
              <li>{tCategories('generators.title')}</li>
              <li>{tCategories('calculators.title')}</li>
              <li>{tCategories('text.title')}</li>
              <li>{tCategories('images.title')}</li>
            </ul>
          </nav>

          {/* About/Legal Section */}
          <div>
            <h4 className="font-semibold mb-4">{t('about')}</h4>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
              {t('aboutText')}
            </p>
            {/* TODO: Add Privacy Policy and Cookie Policy links in Phase 3 */}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>© {currentYear} {t('title')}. {t('copyright')}</p>
          <p className="mt-2">{t('tagline')}</p>
        </div>
      </div>
    </footer>
  );
}
