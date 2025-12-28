'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { tools } from '@/lib/tools';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar() {
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof tools>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuse.js configuration for fuzzy search (memoized to avoid re-creation)
  const fuse = useMemo(() => new Fuse(tools, {
    keys: ['name', 'slug', 'category'],
    threshold: 0.3,
    minMatchCharLength: 2,
    ignoreLocation: true,
  }), []);

  // Handle search with debounce effect
  useEffect(() => {
    if (query.length >= 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const searchResults = fuse.search(query);
        setResults(searchResults.map(result => result.item));
        setIsOpen(true);
        setSelectedIndex(-1);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsOpen(false);
      setIsSearching(false);
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

  // Highlight search term in text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-900/50 text-gray-900 dark:text-gray-100 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <AnimatePresence mode="wait">
            {isSearching ? (
              <motion.svg
                key="spinner"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ rotate: { duration: 1, repeat: Infinity, ease: 'linear' } }}
                className="w-5 h-5 text-primary-500 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </motion.svg>
            ) : (
              <motion.svg
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
              </motion.svg>
            )}
          </AnimatePresence>
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
          className="w-full pl-12 pr-12 py-3 bg-white dark:bg-dark-900 border-2 border-gray-200 dark:border-dark-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-220"
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
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              aria-label={locale === 'en' ? 'Clear search' : locale === 'pt' ? 'Limpar busca' : 'Limpiar búsqueda'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            id="search-results"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-900 rounded-lg shadow-2xl border-2 border-gray-200 dark:border-dark-700 max-h-96 overflow-y-auto"
            role="listbox"
          >
            <div className="p-2">
              {results.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.2,
                  }}
                >
                  <Link
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
                      <p className="font-semibold truncate">
                        {highlightText(tool.name, query)}
                      </p>
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Results */}
      <AnimatePresence>
        {isOpen && query.length >= 2 && results.length === 0 && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-900 rounded-lg shadow-2xl border-2 border-gray-200 dark:border-dark-700 p-8 text-center"
            role="status"
          >
            <motion.svg
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
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
            </motion.svg>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
