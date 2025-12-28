'use client';

import { useState, useMemo, useEffect } from 'react';

export type SortOption = 'name' | 'category' | 'popular';
export type FilterCategory = 'all' | 'conversion' | 'generator' | 'calculator' | 'text' | 'image' | 'utility';

interface UseToolsFilterOptions {
  initialSort?: SortOption;
  initialCategory?: FilterCategory;
}

export function useToolsFilter<T extends { category?: string; name?: string }>(
  items: T[],
  options: UseToolsFilterOptions = {}
) {
  const [sortBy, setSortBy] = useState<SortOption>(options.initialSort || 'name');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>(options.initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist filter state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tools-sort', sortBy);
      localStorage.setItem('tools-category', filterCategory);
    }
  }, [sortBy, filterCategory]);

  // Load saved preferences on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSort = localStorage.getItem('tools-sort') as SortOption;
      const savedCategory = localStorage.getItem('tools-category') as FilterCategory;

      if (savedSort) setSortBy(savedSort);
      if (savedCategory) setFilterCategory(savedCategory);
    }
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Apply category filter
    if (filterCategory !== 'all') {
      result = result.filter((item) => {
        if (!item.category) return false;
        return item.category.toLowerCase() === filterCategory.toLowerCase();
      });
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) => {
        const name = item.name?.toLowerCase() || '';
        const category = item.category?.toLowerCase() || '';
        return name.includes(query) || category.includes(query);
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'category') {
        return (a.category || '').localeCompare(b.category || '');
      }
      // 'popular' - could be based on usage count, for now alphabetical
      return (a.name || '').localeCompare(b.name || '');
    });

    return result;
  }, [items, sortBy, filterCategory, searchQuery]);

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {
      all: items.length,
    };

    items.forEach((item) => {
      const cat = (item.category || 'utility').toLowerCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });

    return counts;
  }, [items]);

  return {
    filteredItems: filteredAndSortedItems,
    sortBy,
    setSortBy,
    filterCategory,
    setFilterCategory,
    searchQuery,
    setSearchQuery,
    categoryCount,
    totalCount: items.length,
    filteredCount: filteredAndSortedItems.length,
  };
}
