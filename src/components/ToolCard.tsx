'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const locale = useLocale();
  const t = useTranslations(`tools.${tool.slug}`);

  const translatedSlug = t('slug');

  return (
    <Link
      href={`/${locale}/${translatedSlug}`}
      className="group bg-white dark:bg-dark-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-primary-400 dark:hover:border-primary-500 animate-fade-in focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-950"
      role="listitem"
      aria-label={`${t('name')} - ${t('description')}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" role="img" aria-hidden="true">
          {tool.icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
          {t('name')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t('description')}
        </p>
        <div className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:gap-2 transition-all">
          {locale === 'en' ? 'Use tool' : locale === 'pt' ? 'Usar ferramenta' : 'Usar herramienta'}
          <span className="ml-1 group-hover:ml-2 transition-all" aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
}
