'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useTranslations } from 'next-intl';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations('theme');

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-lg
        bg-gray-200 dark:bg-dark-800
        hover:bg-gray-300 dark:hover:bg-dark-700
        text-gray-800 dark:text-gray-200
        transition-colors duration-200
        focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
      "
      aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
      title={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
    >
      {theme === 'dark' ? (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {/* Sun icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {/* Moon icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
