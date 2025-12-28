'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { formatShortcut, type KeyboardShortcut } from '@/hooks/useKeyboardShortcuts';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
  shortcuts: KeyboardShortcut[];
  title?: string;
}

export default function KeyboardShortcutsHelp({
  isOpen,
  onClose,
  shortcuts,
  title = 'Keyboard Shortcuts',
}: KeyboardShortcutsHelpProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="
                w-full max-w-2xl max-h-[80vh] overflow-hidden
                bg-white dark:bg-dark-900 dim:bg-dim-900
                border-2 border-gray-200 dark:border-dark-700 dim:border-dim-700
                rounded-2xl shadow-2xl
              "
              role="dialog"
              aria-modal="true"
              aria-labelledby="shortcuts-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700 dim:border-dim-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 dim:bg-primary-900/20 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary-600 dark:text-primary-400 dim:text-primary-400"
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
                  </div>
                  <h2
                    id="shortcuts-title"
                    className="text-2xl font-bold text-gray-900 dark:text-gray-100 dim:text-dim-100"
                  >
                    {title}
                  </h2>
                </div>
                <motion.button
                  onClick={onClose}
                  className="
                    p-2 rounded-lg
                    text-gray-500 dark:text-gray-400 dim:text-dim-400
                    hover:bg-gray-100 dark:hover:bg-dark-800 dim:hover:bg-dim-800
                    transition-colors
                    focus-visible:ring-2 focus-visible:ring-primary-500
                  "
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-88px)]">
                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={`${shortcut.key}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="
                        flex items-center justify-between p-4 rounded-lg
                        bg-gray-50 dark:bg-dark-800 dim:bg-dim-800
                        border border-gray-200 dark:border-dark-700 dim:border-dim-700
                        hover:bg-gray-100 dark:hover:bg-dark-700 dim:hover:bg-dim-700
                        transition-colors
                      "
                    >
                      <p className="text-gray-700 dark:text-gray-300 dim:text-dim-200 font-medium">
                        {shortcut.description}
                      </p>
                      <kbd
                        className="
                          inline-flex items-center gap-1 px-3 py-1.5 rounded-md
                          bg-white dark:bg-dark-900 dim:bg-dim-900
                          border-2 border-gray-300 dark:border-dark-600 dim:border-dim-600
                          text-gray-900 dark:text-gray-100 dim:text-dim-100
                          font-mono text-sm font-semibold
                          shadow-sm
                        "
                      >
                        {formatShortcut(shortcut)}
                      </kbd>
                    </motion.div>
                  ))}
                </div>

                {/* Footer hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: shortcuts.length * 0.05 + 0.2 }}
                  className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400 dim:text-dim-400"
                >
                  Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-dark-700 dim:bg-dim-700 rounded font-mono text-xs">Esc</kbd> to close
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
