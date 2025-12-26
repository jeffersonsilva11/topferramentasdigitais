'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { tools } from '@/lib/tools';

export default function SearchBar() {
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof tools>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuse.js configuration for fuzzy search (memoized to avoid re-creation)
  const fuse = useMemo(() => new Fuse(tools, {
    keys: ['name', 'slug', 'category'],
    threshold: 0.3, // 0 = exact match, 1 = match anything
    minMatchCharLength: 2,
    ignoreLocation: true,
  }), []);

  // Handle search
  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = fuse.search(query);
      setResults(searchResults.map(result => result.item));
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, fuse]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/${locale}/${results[selectedIndex].slug}`;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            locale === 'en'
              ? 'Search tools... (e.g., PDF, QR, compress)'
              : locale === 'pt'
              ? 'Buscar ferramentas... (ex: PDF, QR, comprimir)'
              : 'Buscar herramientas... (ej: PDF, QR, comprimir)'
          }
          className="w-full pl-12 pr-12 py-3 bg-white dark:bg-dark-900 border-2 border-gray-200 dark:border-dark-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          aria-label={
            locale === 'en'
              ? 'Search for tools'
              : locale === 'pt'
              ? 'Buscar ferramentas'
              : 'Buscar herramientas'
          }
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isOpen}
          role="combobox"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            aria-label={locale === 'en' ? 'Clear search' : locale === 'pt' ? 'Limpar busca' : 'Limpiar búsqueda'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-900 rounded-lg shadow-2xl border-2 border-gray-200 dark:border-dark-700 max-h-96 overflow-y-auto animate-fade-in-up"
          role="listbox"
        >
          <div className="p-2">
            {results.map((tool, index) => (
              <Link
                key={tool.id}
                href={`/${locale}/${tool.slug}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  index === selectedIndex
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-300'
                    : 'hover:bg-gray-50 dark:hover:bg-dark-800 text-gray-900 dark:text-gray-100'
                }`}
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-2xl" role="img" aria-hidden="true">
                  {tool.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{tool.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {locale === 'en' ? 'Category: ' : locale === 'pt' ? 'Categoria: ' : 'Categoría: '}
                    {tool.category}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div
          className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-900 rounded-lg shadow-2xl border-2 border-gray-200 dark:border-dark-700 p-8 text-center animate-fade-in-up"
          role="status"
        >
          <svg
            className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {locale === 'en'
              ? 'No tools found for'
              : locale === 'pt'
              ? 'Nenhuma ferramenta encontrada para'
              : 'No se encontraron herramientas para'}{' '}
            <span className="font-bold text-gray-900 dark:text-gray-100">&quot;{query}&quot;</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {locale === 'en'
              ? 'Try different keywords or browse all tools'
              : locale === 'pt'
              ? 'Tente palavras-chave diferentes ou navegue por todas as ferramentas'
              : 'Intenta con diferentes palabras clave o navega por todas las herramientas'}
          </p>
        </div>
      )}
    </div>
  );
}
