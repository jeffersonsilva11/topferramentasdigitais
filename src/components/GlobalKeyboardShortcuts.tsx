'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useKeyboardShortcuts, type KeyboardShortcut } from '@/hooks/useKeyboardShortcuts';
import KeyboardShortcutsHelp from './ui/KeyboardShortcutsHelp';

export default function GlobalKeyboardShortcuts() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const locale = useLocale();

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen) {
      // Wait for render, then focus the search input
      const timer = setTimeout(() => {
        const searchInput = document.querySelector<HTMLInputElement>('input[type="text"]');
        if (searchInput && searchInput.placeholder.toLowerCase().includes('search')) {
          searchInput.focus();
          searchInput.select();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // Go to home
  const goToHome = () => {
    window.location.href = `/${locale}`;
  };

  // Define global shortcuts
  const globalShortcuts: KeyboardShortcut[] = [
    {
      key: 'k',
      ctrl: true,
      cmd: true,
      description: locale === 'en'
        ? 'Open search'
        : locale === 'pt'
        ? 'Abrir busca'
        : 'Abrir búsqueda',
      action: () => {
        setIsSearchOpen(true);
        // Scroll to search bar if it exists
        const searchBar = document.querySelector('input[type="text"]');
        if (searchBar) {
          searchBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            (searchBar as HTMLInputElement).focus();
          }, 300);
        }
      },
      global: true,
    },
    {
      key: '/',
      ctrl: true,
      cmd: true,
      description: locale === 'en'
        ? 'Show all shortcuts'
        : locale === 'pt'
        ? 'Mostrar todos os atalhos'
        : 'Mostrar todos los atajos',
      action: () => setIsHelpOpen(true),
      global: true,
    },
    {
      key: 'Escape',
      description: locale === 'en'
        ? 'Close modals'
        : locale === 'pt'
        ? 'Fechar modais'
        : 'Cerrar modales',
      action: () => {
        setIsHelpOpen(false);
        setIsSearchOpen(false);
        // Close any open dropdowns
        const openDropdowns = document.querySelectorAll('[role="dialog"], [role="menu"]');
        openDropdowns.forEach((dropdown) => {
          const closeButton = dropdown.querySelector('[aria-label*="Close"], [aria-label*="Fechar"], [aria-label*="Cerrar"]');
          if (closeButton) {
            (closeButton as HTMLButtonElement).click();
          }
        });
      },
      global: true,
    },
    {
      key: 'h',
      ctrl: true,
      cmd: true,
      description: locale === 'en'
        ? 'Go to home'
        : locale === 'pt'
        ? 'Ir para início'
        : 'Ir al inicio',
      action: goToHome,
      global: true,
    },
    {
      key: 'ArrowUp',
      ctrl: true,
      cmd: true,
      description: locale === 'en'
        ? 'Scroll to top'
        : locale === 'pt'
        ? 'Rolar para o topo'
        : 'Desplazar hacia arriba',
      action: scrollToTop,
      global: true,
    },
    {
      key: 'ArrowDown',
      ctrl: true,
      cmd: true,
      description: locale === 'en'
        ? 'Scroll to bottom'
        : locale === 'pt'
        ? 'Rolar para baixo'
        : 'Desplazar hacia abajo',
      action: scrollToBottom,
      global: true,
    },
  ];

  // Register shortcuts
  useKeyboardShortcuts({
    shortcuts: globalShortcuts,
    enabled: true,
  });

  return (
    <>
      {/* Keyboard Shortcuts Help Modal */}
      <KeyboardShortcutsHelp
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        shortcuts={globalShortcuts}
        title={
          locale === 'en'
            ? 'Keyboard Shortcuts'
            : locale === 'pt'
            ? 'Atalhos de Teclado'
            : 'Atajos de Teclado'
        }
      />

      {/* Keyboard Shortcut Indicator (floating hint) */}
      {!isHelpOpen && (
        <div className="fixed bottom-4 right-4 z-50 hidden lg:block">
          <button
            onClick={() => setIsHelpOpen(true)}
            className="
              group flex items-center gap-2 px-3 py-2 rounded-lg
              bg-white/90 dark:bg-dark-900/90 dim:bg-dim-900/90
              backdrop-blur-sm
              border border-gray-300 dark:border-dark-700 dim:border-dim-700
              shadow-lg hover:shadow-xl
              text-gray-600 dark:text-gray-400 dim:text-dim-400
              hover:text-gray-900 dark:hover:text-gray-100 dim:hover:text-dim-100
              transition-all duration-220
              focus-visible:ring-2 focus-visible:ring-primary-500
            "
            aria-label={
              locale === 'en'
                ? 'View keyboard shortcuts'
                : locale === 'pt'
                ? 'Ver atalhos de teclado'
                : 'Ver atajos de teclado'
            }
          >
            <svg
              className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span className="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity">
              {locale === 'en' ? 'Shortcuts' : locale === 'pt' ? 'Atalhos' : 'Atajos'}
            </span>
            <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-dark-700 dim:bg-dim-700 rounded text-xs font-mono opacity-60 group-hover:opacity-100 transition-opacity">
              {typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0 ? '⌘' : 'Ctrl'}
              /
            </kbd>
          </button>
        </div>
      )}
    </>
  );
}
