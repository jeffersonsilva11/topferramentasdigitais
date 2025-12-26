'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('languageSelector');

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return;

    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={(e) => changeLanguage(e.target.value)}
        disabled={isPending}
        className="appearance-none bg-gray-100 dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 cursor-pointer transition-colors"
        aria-label={t('label')}
      >
        <option value="en">{t('en')}</option>
        <option value="pt">{t('pt')}</option>
        <option value="es">{t('es')}</option>
        <option value="fr">{t('fr')}</option>
        <option value="de">{t('de')}</option>
        <option value="ru">{t('ru')}</option>
        <option value="it">{t('it')}</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}
