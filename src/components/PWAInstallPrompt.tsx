'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      // Save the event for later use
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show the install prompt after a delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000); // Wait 3 seconds before showing
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);

    // Don't show again for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Check if user dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);

      if (daysSinceDismissed < 7) {
        setShowPrompt(false);
      }
    }
  }, []);

  const messages = {
    en: {
      title: 'Install Top Digital Tools',
      description: 'Get quick access to all tools right from your home screen',
      install: 'Install',
      dismiss: 'Not now',
    },
    pt: {
      title: 'Instalar Top Ferramentas',
      description: 'Acesse rapidamente todas as ferramentas direto da sua tela inicial',
      install: 'Instalar',
      dismiss: 'Agora não',
    },
    es: {
      title: 'Instalar Top Herramientas',
      description: 'Accede rápidamente a todas las herramientas desde tu pantalla de inicio',
      install: 'Instalar',
      dismiss: 'Ahora no',
    },
    fr: {
      title: 'Installer Top Outils',
      description: 'Accédez rapidement à tous les outils depuis votre écran d\'accueil',
      install: 'Installer',
      dismiss: 'Pas maintenant',
    },
    de: {
      title: 'Top Tools installieren',
      description: 'Schneller Zugriff auf alle Tools direkt von Ihrem Startbildschirm',
      install: 'Installieren',
      dismiss: 'Nicht jetzt',
    },
    ru: {
      title: 'Установить Top Инструменты',
      description: 'Быстрый доступ ко всем инструментам прямо с главного экрана',
      install: 'Установить',
      dismiss: 'Не сейчас',
    },
    it: {
      title: 'Installa Top Strumenti',
      description: 'Accedi rapidamente a tutti gli strumenti dalla schermata iniziale',
      install: 'Installa',
      dismiss: 'Non ora',
    },
  };

  const t = messages[locale as keyof typeof messages] || messages.en;

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="glass-strong rounded-2xl shadow-2xl border-2 border-primary-200 dark:border-primary-800 dim:border-primary-700 p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900/30 dim:bg-primary-900/20 rounded-xl">
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
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 dim:text-dim-100 mb-1">
                  {t.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 dim:text-dim-400 mb-4">
                  {t.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={handleInstall}
                    whileTap={{ scale: 0.95 }}
                    className="
                      flex-1 px-4 py-2 rounded-lg
                      bg-primary-600 hover:bg-primary-700
                      dark:bg-primary-500 dark:hover:bg-primary-600
                      dim:bg-primary-500 dim:hover:bg-primary-600
                      text-white font-semibold
                      transition-colors
                      focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                    "
                  >
                    {t.install}
                  </motion.button>
                  <motion.button
                    onClick={handleDismiss}
                    whileTap={{ scale: 0.95 }}
                    className="
                      px-4 py-2 rounded-lg
                      text-gray-600 dark:text-gray-400 dim:text-dim-400
                      hover:bg-gray-100 dark:hover:bg-dark-800 dim:hover:bg-dim-800
                      font-medium
                      transition-colors
                    "
                  >
                    {t.dismiss}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
