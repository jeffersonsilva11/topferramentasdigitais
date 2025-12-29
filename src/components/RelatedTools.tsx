'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Tool } from '@/types';
import { motion } from 'framer-motion';

interface ToolTranslation {
  slug?: string;
  name?: string;
  description?: string;
}

interface RelatedToolsProps {
  currentTool: Tool;
  allTools: Tool[];
  translations: Record<string, ToolTranslation>;
}

export default function RelatedTools({ currentTool, allTools, translations }: RelatedToolsProps) {
  const locale = useLocale();

  // Get related tools based on category (same category, exclude current)
  const relatedTools = allTools
    .filter(tool => 
      tool.category === currentTool.category && 
      tool.id !== currentTool.id
    )
    .slice(0, 3);

  // If not enough tools in same category, get random popular tools
  if (relatedTools.length < 3) {
    const additionalTools = allTools
      .filter(tool => 
        tool.id !== currentTool.id && 
        !relatedTools.find(rt => rt.id === tool.id)
      )
      .slice(0, 3 - relatedTools.length);
    relatedTools.push(...additionalTools);
  }

  if (relatedTools.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {locale === 'pt' ? 'Ferramentas Relacionadas' : locale === 'es' ? 'Herramientas Relacionadas' : 'Related Tools'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedTools.map((tool, index) => {
          const toolSlug = translations[tool.slug]?.slug || tool.slug;
          const toolName = translations[tool.slug]?.name || tool.name;
          const toolDesc = translations[tool.slug]?.description || tool.description;

          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/${locale}/${toolSlug}`}
                className="block p-6 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{tool.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition-colors">
                    {toolName}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {toolDesc}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
