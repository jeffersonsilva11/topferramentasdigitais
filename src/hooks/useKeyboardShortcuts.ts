'use client';

import { useEffect, useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  cmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
  global?: boolean;
}

interface UseKeyboardShortcutsOptions {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

export function useKeyboardShortcuts({ shortcuts, enabled = true }: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Don't trigger shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

      for (const shortcut of shortcuts) {
        // Skip non-global shortcuts when typing
        if (!shortcut.global && isTyping) continue;

        const ctrlKey = shortcut.ctrl && (event.ctrlKey || event.metaKey);
        const cmdKey = shortcut.cmd && (event.ctrlKey || event.metaKey);
        const shiftKey = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altKey = shortcut.alt ? event.altKey : !event.altKey;

        const modifiersMatch =
          (shortcut.ctrl || shortcut.cmd ? (ctrlKey || cmdKey) : !event.ctrlKey && !event.metaKey) &&
          shiftKey &&
          altKey;

        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (modifiersMatch && keyMatch) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);

  return {
    shortcuts,
  };
}

// Helper function to format shortcut display
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const parts: string[] = [];

  if (shortcut.ctrl || shortcut.cmd) {
    parts.push(isMac ? '⌘' : 'Ctrl');
  }
  if (shortcut.shift) {
    parts.push(isMac ? '⇧' : 'Shift');
  }
  if (shortcut.alt) {
    parts.push(isMac ? '⌥' : 'Alt');
  }

  // Capitalize single letters
  const key = shortcut.key.length === 1 ? shortcut.key.toUpperCase() : shortcut.key;
  parts.push(key);

  return parts.join(isMac ? '' : '+');
}
