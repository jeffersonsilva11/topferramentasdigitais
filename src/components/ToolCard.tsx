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
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-primary-400 animate-fade-in"
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
          {tool.icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition">
          {t('name')}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t('description')}
        </p>
        <div className="mt-4 inline-flex items-center text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
          {locale === 'en' ? 'Use tool' : locale === 'pt' ? 'Usar ferramenta' : 'Usar herramienta'}
          <span className="ml-1 group-hover:ml-2 transition-all">→</span>
        </div>
      </div>
    </Link>
  );
}
