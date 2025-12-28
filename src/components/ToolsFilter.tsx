'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { SortOption, FilterCategory } from '@/hooks/useToolsFilter';

interface ToolsFilterProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filterCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  categoryCount: Record<string, number>;
  totalCount: number;
  filteredCount: number;
}

export default function ToolsFilter({
  sortBy,
  onSortChange,
  filterCategory,
  onCategoryChange,
  categoryCount,
  totalCount,
  filteredCount,
}: ToolsFilterProps) {
  const locale = useLocale();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'name', label: locale === 'en' ? 'Name (A-Z)' : locale === 'pt' ? 'Nome (A-Z)' : 'Nombre (A-Z)' },
    { value: 'category', label: locale === 'en' ? 'Category' : locale === 'pt' ? 'Categoria' : 'Categoría' },
    { value: 'popular', label: locale === 'en' ? 'Popular' : locale === 'pt' ? 'Popular' : 'Popular' },
  ];

  const categories: { value: FilterCategory; label: string; icon: string }[] = [
    { value: 'all', label: locale === 'en' ? 'All' : locale === 'pt' ? 'Todas' : 'Todas', icon: '📦' },
    { value: 'conversion', label: locale === 'en' ? 'Conversion' : locale === 'pt' ? 'Conversão' : 'Conversión', icon: '🔄' },
    { value: 'generator', label: locale === 'en' ? 'Generator' : locale === 'pt' ? 'Gerador' : 'Generador', icon: '⚡' },
    { value: 'calculator', label: locale === 'en' ? 'Calculator' : locale === 'pt' ? 'Calculadora' : 'Calculadora', icon: '🧮' },
    { value: 'text', label: locale === 'en' ? 'Text' : locale === 'pt' ? 'Texto' : 'Texto', icon: '📝' },
    { value: 'image', label: locale === 'en' ? 'Image' : locale === 'pt' ? 'Imagem' : 'Imagen', icon: '🖼️' },
    { value: 'utility', label: locale === 'en' ? 'Utility' : locale === 'pt' ? 'Utilitário' : 'Utilidad', icon: '🛠️' },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-gray-600 dark:text-gray-400 dim:text-dim-400"
        role="status"
        aria-live="polite"
      >
        {locale === 'en' && `Showing ${filteredCount} of ${totalCount} tools`}
        {locale === 'pt' && `Mostrando ${filteredCount} de ${totalCount} ferramentas`}
        {locale === 'es' && `Mostrando ${filteredCount} de ${totalCount} herramientas`}
      </motion.div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Category Filter */}
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 dim:text-dim-200 mb-2">
            {locale === 'en' ? 'Category' : locale === 'pt' ? 'Categoria' : 'Categoría'}
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const count = categoryCount[category.value] || 0;
              const isActive = filterCategory === category.value;

              return (
                <motion.button
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative px-4 py-2 rounded-lg
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-primary-600 text-white dark:bg-primary-500 dim:bg-primary-500'
                        : 'bg-gray-100 dark:bg-dark-800 dim:bg-dim-800 text-gray-700 dark:text-gray-300 dim:text-dim-200 hover:bg-gray-200 dark:hover:bg-dark-700 dim:hover:bg-dim-700'
                    }
                  `}
                  aria-pressed={isActive}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.label}
                  <span className={`ml-1.5 text-xs ${isActive ? 'opacity-80' : 'opacity-60'}`}>
                    ({count})
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full md:w-auto md:min-w-[200px]">
          <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 dim:text-dim-200 mb-2">
            {locale === 'en' ? 'Sort by' : locale === 'pt' ? 'Ordenar por' : 'Ordenar por'}
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="
              w-full px-4 py-2 rounded-lg
              bg-white dark:bg-dark-800 dim:bg-dim-800
              border-2 border-gray-200 dark:border-dark-700 dim:border-dim-700
              text-gray-900 dark:text-gray-100 dim:text-dim-100
              focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              transition-colors
            "
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
