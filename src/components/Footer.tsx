'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const tCategories = useTranslations('categories');

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">🛠️ {t('title')}</h3>
            <p className="text-gray-400 text-sm">
              {t('subtitle')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('categories')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{tCategories('converters.title')}</li>
              <li>{tCategories('generators.title')}</li>
              <li>{tCategories('calculators.title')}</li>
              <li>{tCategories('text.title')}</li>
              <li>{tCategories('images.title')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('about')}</h4>
            <p className="text-sm text-gray-400">
              {t('aboutText')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {currentYear} {t('title')}. {t('copyright')}</p>
          <p className="mt-2">{t('tagline')}</p>
        </div>
      </div>
    </footer>
  );
}
