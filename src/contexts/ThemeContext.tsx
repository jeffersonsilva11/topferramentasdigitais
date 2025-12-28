'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dim' | 'dark' | 'auto';
type ResolvedTheme = 'light' | 'dim' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme-preference';

// Auto theme based on time of day
// 6AM-6PM: light, 6PM-10PM: dim, 10PM-6AM: dark
const getAutoTheme = (): ResolvedTheme => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 18) {
    return 'light'; // 6 AM - 6 PM
  } else if (hour >= 18 && hour < 22) {
    return 'dim'; // 6 PM - 10 PM
  } else {
    return 'dark'; // 10 PM - 6 AM
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    if (savedTheme && ['light', 'dim', 'dark', 'auto'].includes(savedTheme)) {
      setThemeState(savedTheme);
    } else {
      setThemeState('light');
    }

    setMounted(true);
  }, []);

  // Resolve auto theme
  useEffect(() => {
    if (theme === 'auto') {
      const resolved = getAutoTheme();
      setResolvedTheme(resolved);

      // Check every minute for time changes
      const interval = setInterval(() => {
        const newResolved = getAutoTheme();
        if (newResolved !== resolvedTheme) {
          setResolvedTheme(newResolved);
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    } else {
      setResolvedTheme(theme as ResolvedTheme);
    }
  }, [theme, resolvedTheme]);

  // Apply theme to document with smooth transition
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Add transition for smooth theme changes (300ms)
    root.style.transition = 'background-color 300ms ease-in-out, color 300ms ease-in-out';

    // Remove all theme classes
    root.classList.remove('light', 'dim', 'dark');

    // Add current theme class
    root.classList.add(resolvedTheme);

    // Save preference to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Cleanup transition after it completes
    const timeoutId = setTimeout(() => {
      root.style.transition = '';
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [theme, resolvedTheme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      // Cycle: light -> dim -> dark -> light
      if (prev === 'light') return 'dim';
      if (prev === 'dim') return 'dark';
      return 'light';
    });
  }, []);

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
