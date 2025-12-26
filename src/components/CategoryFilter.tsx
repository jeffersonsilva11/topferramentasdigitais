'use client';

import { useTranslations, useLocale } from 'next-intl';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const locale = useLocale();
  const tCategories = useTranslations('categories');

  const categories = [
    { id: 'converters', icon: '🔄', color: 'blue' },
    { id: 'generators', icon: '⚙️', color: 'green' },
    { id: 'calculators', icon: '🔢', color: 'purple' },
    { id: 'text', icon: '📝', color: 'orange' },
    { id: 'images', icon: '🖼️', color: 'pink' },
    { id: 'security', icon: '🔐', color: 'indigo' },
  ];

  const colorClasses: Record<string, { bg: string; bgDark: string; text: string; textDark: string; border: string; borderDark: string; selected: string; selectedDark: string }> = {
    blue: {
      bg: 'bg-blue-50',
      bgDark: 'dark:bg-blue-950',
      text: 'text-blue-900',
      textDark: 'dark:text-blue-300',
      border: 'border-blue-200',
      borderDark: 'dark:border-blue-800',
      selected: 'bg-blue-600',
      selectedDark: 'dark:bg-blue-700',
    },
    green: {
      bg: 'bg-green-50',
      bgDark: 'dark:bg-green-950',
      text: 'text-green-900',
      textDark: 'dark:text-green-300',
      border: 'border-green-200',
      borderDark: 'dark:border-green-800',
      selected: 'bg-green-600',
      selectedDark: 'dark:bg-green-700',
    },
    purple: {
      bg: 'bg-purple-50',
      bgDark: 'dark:bg-purple-950',
      text: 'text-purple-900',
      textDark: 'dark:text-purple-300',
      border: 'border-purple-200',
      borderDark: 'dark:border-purple-800',
      selected: 'bg-purple-600',
      selectedDark: 'dark:bg-purple-700',
    },
    orange: {
      bg: 'bg-orange-50',
      bgDark: 'dark:bg-orange-950',
      text: 'text-orange-900',
      textDark: 'dark:text-orange-300',
      border: 'border-orange-200',
      borderDark: 'dark:border-orange-800',
      selected: 'bg-orange-600',
      selectedDark: 'dark:bg-orange-700',
    },
    pink: {
      bg: 'bg-pink-50',
      bgDark: 'dark:bg-pink-950',
      text: 'text-pink-900',
      textDark: 'dark:text-pink-300',
      border: 'border-pink-200',
      borderDark: 'dark:border-pink-800',
      selected: 'bg-pink-600',
      selectedDark: 'dark:bg-pink-700',
    },
    indigo: {
      bg: 'bg-indigo-50',
      bgDark: 'dark:bg-indigo-950',
      text: 'text-indigo-900',
      textDark: 'dark:text-indigo-300',
      border: 'border-indigo-200',
      borderDark: 'dark:border-indigo-800',
      selected: 'bg-indigo-600',
      selectedDark: 'dark:bg-indigo-700',
    },
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        {locale === 'en' ? 'Filter by category:' : locale === 'pt' ? 'Filtrar por categoria:' : 'Filtrar por categoría:'}
      </h2>
      <div className="flex flex-wrap gap-3" role="group" aria-label={locale === 'en' ? 'Category filters' : locale === 'pt' ? 'Filtros de categoria' : 'Filtros de categoría'}>
        {/* All Categories Button */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-950 ${
            selectedCategory === null
              ? 'bg-primary-600 dark:bg-primary-700 text-white shadow-md scale-105'
              : 'bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-700'
          }`}
          aria-pressed={selectedCategory === null}
        >
          {locale === 'en' ? '📋 All' : locale === 'pt' ? '📋 Todas' : '📋 Todas'}
        </button>

        {/* Category Buttons */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const colors = colorClasses[category.color];

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-950 ${
                isSelected
                  ? `${colors.selected} ${colors.selectedDark} text-white shadow-md scale-105 border-transparent`
                  : `${colors.bg} ${colors.bgDark} ${colors.text} ${colors.textDark} ${colors.border} ${colors.borderDark} hover:scale-105`
              }`}
              aria-pressed={isSelected}
              aria-label={`${tCategories(`${category.id}.title`)}`}
            >
              <span role="img" aria-hidden="true">{category.icon}</span> {tCategories(`${category.id}.title`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
