'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('site');

  const isHome = pathname === `/${locale}` || pathname === '/';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-2 hover:opacity-80 transition">
            <span className="text-2xl">🛠️</span>
            <div>
              <h1 className="text-xl font-bold text-primary-600">
                {t('hero.title')}
              </h1>
              <p className="text-xs text-gray-500">
                {locale === 'en' ? 'Free Online Tools' : locale === 'pt' ? 'Utilitários online gratuitos' : 'Herramientas online gratis'}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSelector />
            {!isHome && (
              <Link
                href={`/${locale}`}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
              >
                ← {t('backToHome')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
