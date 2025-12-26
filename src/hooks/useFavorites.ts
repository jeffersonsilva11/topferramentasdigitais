'use client';

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'user_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const isFavorite = (toolId: string): boolean => {
    return favorites.includes(toolId);
  };

  const toggleFavorite = (toolId: string): void => {
    setFavorites((prev) => {
      if (prev.includes(toolId)) {
        // Remove from favorites
        return prev.filter((id) => id !== toolId);
      } else {
        // Add to favorites
        return [...prev, toolId];
      }
    });
  };

  const addFavorite = (toolId: string): void => {
    if (!favorites.includes(toolId)) {
      setFavorites((prev) => [...prev, toolId]);
    }
  };

  const removeFavorite = (toolId: string): void => {
    setFavorites((prev) => prev.filter((id) => id !== toolId));
  };

  const clearFavorites = (): void => {
    setFavorites([]);
  };

  return {
    favorites,
    isLoaded,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };
}
