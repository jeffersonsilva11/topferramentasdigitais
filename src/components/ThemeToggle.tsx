'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

type Theme = 'light' | 'dim' | 'dark' | 'auto';

interface ThemeOption {
  value: Theme;
  icon: React.ReactNode;
  label: string;
  preview: string;
}

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = useTranslations('theme');
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<Theme | null>(null);

  const themeOptions: ThemeOption[] = [
    {
      value: 'light',
      label: t('light') || 'Light',
      preview: 'bg-white text-gray-900 border-gray-200',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      value: 'dim',
      label: t('dim') || 'Dim',
      preview: 'bg-dim-900 text-dim-100 border-dim-700',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      value: 'dark',
      label: t('dark') || 'Dark',
      preview: 'bg-dark-950 text-gray-100 border-dark-700',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
    },
    {
      value: 'auto',
      label: t('auto') || 'Auto',
      preview: 'bg-gradient-to-r from-white via-dim-900 to-dark-950 text-gray-900 border-gray-300',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const currentOption = themeOptions.find((opt) => opt.value === theme) || themeOptions[0];

  const handleThemeSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
    setHoveredTheme(null);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="
          p-2 rounded-lg
          bg-white dark:bg-dark-800 dim:bg-dim-800
          hover:bg-gray-100 dark:hover:bg-dark-700 dim:hover:bg-dim-700
          text-gray-800 dark:text-gray-200 dim:text-dim-100
          border-2 border-gray-200 dark:border-dark-700 dim:border-dim-700
          transition-all duration-200
          focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
        "
        whileTap={{ scale: 0.95 }}
        aria-label={`Current theme: ${currentOption.label}`}
        aria-expanded={isOpen}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          {currentOption.icon}
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="
                absolute right-0 mt-2 z-50
                w-48 p-2
                bg-white dark:bg-dark-900 dim:bg-dim-900
                border-2 border-gray-200 dark:border-dark-700 dim:border-dim-700
                rounded-lg shadow-2xl
              "
            >
              <div className="space-y-1">
                {themeOptions.map((option, index) => {
                  const isActive = theme === option.value;
                  const isHovered = hoveredTheme === option.value;

                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleThemeSelect(option.value)}
                      onMouseEnter={() => setHoveredTheme(option.value)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-md
                        text-sm font-medium transition-all duration-220
                        ${
                          isActive
                            ? 'bg-primary-100 dark:bg-primary-900/30 dim:bg-primary-900/20 text-primary-700 dark:text-primary-300 dim:text-primary-400'
                            : 'text-gray-700 dark:text-gray-300 dim:text-dim-200 hover:bg-gray-100 dark:hover:bg-dark-800 dim:hover:bg-dim-800'
                        }
                      `}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={isActive ? 'text-primary-600 dark:text-primary-400' : ''}>
                        {option.icon}
                      </span>
                      <span className="flex-1 text-left">{option.label}</span>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.svg
                          className="w-4 h-4 text-primary-600 dark:text-primary-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      )}

                      {/* Hover Preview */}
                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className={`
                              absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full
                              w-16 h-12 rounded-md border-2
                              ${option.preview}
                              shadow-lg
                            `}
                          >
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold opacity-50">
                              Aa
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>

              {/* Auto Mode Info */}
              {theme === 'auto' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 pt-2 border-t border-gray-200 dark:border-dark-700 dim:border-dim-700"
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400 dim:text-dim-400 px-3 py-1">
                    {t('autoModeInfo') || `Currently: ${resolvedTheme}`}
                    <span className="block font-semibold mt-0.5 text-gray-700 dark:text-gray-300 dim:text-dim-200">
                      {resolvedTheme.charAt(0).toUpperCase() + resolvedTheme.slice(1)}
                    </span>
                  </p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
