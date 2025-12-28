'use client';

import { Tool } from '@/types';
import { tools } from '@/lib/tools';
import ToolCard from './ToolCard';
import { useTranslations } from 'next-intl';

interface RelatedToolsProps {
  currentTool: Tool;
  maxItems?: number;
}

export default function RelatedTools({ currentTool, maxItems = 3 }: RelatedToolsProps) {
  const t = useTranslations('site');

  // Find related tools based on category and keywords
  const relatedTools = tools
    .filter((tool) => {
      if (tool.id === currentTool.id) return false;

      // Same category gets highest priority
      if (tool.category === currentTool.category) return true;

      // Check for keyword overlap
      const keywordOverlap = tool.keywords.some((keyword) =>
        currentTool.keywords.includes(keyword)
      );
      return keywordOverlap;
    })
    .slice(0, maxItems);

  if (relatedTools.length === 0) return null;

  return (
    <section className="mt-16 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
          {t('relatedTools') || 'Related Tools'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          {t('relatedToolsDescription') || 'You might also be interested in these tools'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedTools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
