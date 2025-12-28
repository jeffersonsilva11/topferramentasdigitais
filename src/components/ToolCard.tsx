'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Tool } from '@/types';
import { motion } from 'framer-motion';

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const locale = useLocale();
  const t = useTranslations(`tools.${tool.slug}`);

  const translatedSlug = t('slug');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link
        href={`/${locale}/${translatedSlug}`}
        className="group relative block h-full bg-white dark:bg-dark-900 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-400 dark:hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-950 overflow-hidden"
        role="listitem"
        aria-label={`${t('name')} - ${t('description')}`}
      >
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-950/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div className="relative flex flex-col items-center text-center h-full">
          {/* Icon with enhanced animation */}
          <motion.div
            className="text-5xl mb-4"
            role="img"
            aria-hidden="true"
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.3 }}
          >
            {tool.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-220">
            {t('name')}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
            {t('description')}
          </p>

          {/* Category badge */}
          <div className="mt-4 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors duration-220">
              {t('category')}
            </span>
          </div>

          {/* Action indicator */}
          <div className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm transition-all duration-220">
            {locale === 'en' ? 'Use tool' :
             locale === 'pt' ? 'Usar ferramenta' :
             locale === 'es' ? 'Usar herramienta' :
             locale === 'fr' ? 'Utiliser l\'outil' :
             locale === 'de' ? 'Tool verwenden' :
             locale === 'ru' ? 'Использовать' :
             locale === 'it' ? 'Usa lo strumento' : 'Use tool'}
            <motion.span
              className="ml-1"
              aria-hidden="true"
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                repeatDelay: 0.5
              }}
            >
              →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
