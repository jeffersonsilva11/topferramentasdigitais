'use client';

import { useState } from 'react';
import ToolCard from './ToolCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import { tools } from '@/lib/tools';
import { useLocale } from 'next-intl';

export default function ToolsGrid() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter tools by selected category
  const filteredTools = selectedCategory
    ? tools.filter((tool) => tool.category.toLowerCase() === selectedCategory.toLowerCase())
    : tools;

  const toolCount = filteredTools.length;

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Category Filter */}
      <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* Results Count */}
      {selectedCategory && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {locale === 'en' && `Showing ${toolCount} tool${toolCount !== 1 ? 's' : ''}`}
            {locale === 'pt' && `Mostrando ${toolCount} ferramenta${toolCount !== 1 ? 's' : ''}`}
            {locale === 'es' && `Mostrando ${toolCount} herramienta${toolCount !== 1 ? 's' : ''}`}
          </p>
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {locale === 'en' && 'No tools found'}
            {locale === 'pt' && 'Nenhuma ferramenta encontrada'}
            {locale === 'es' && 'No se encontraron herramientas'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {locale === 'en' && 'Try selecting a different category'}
            {locale === 'pt' && 'Tente selecionar uma categoria diferente'}
            {locale === 'es' && 'Intenta seleccionar una categoría diferente'}
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-6 py-3 bg-primary-600 dark:bg-primary-700 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-950"
          >
            {locale === 'en' && 'Show all tools'}
            {locale === 'pt' && 'Mostrar todas as ferramentas'}
            {locale === 'es' && 'Mostrar todas las herramientas'}
          </button>
        </div>
      )}
    </div>
  );
}
