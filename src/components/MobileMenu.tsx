'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const dragControls = useDragControls();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const menuItems = [
    { href: `/${locale}`, label: t('home') || 'Home', icon: '🏠' },
    { href: `/${locale}#tools`, label: t('tools') || 'Tools', icon: '🛠️' },
    { href: `/${locale}/privacy-policy`, label: t('privacy') || 'Privacy', icon: '🔒' },
    { href: `/${locale}/cookie-policy`, label: t('cookies') || 'Cookies', icon: '🍪' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.2, right: 0 }}
            dragControls={dragControls}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100 || info.velocity.x < -500) {
                onClose();
              }
            }}
            className="
              fixed top-0 left-0 bottom-0 z-[100]
              w-[280px] max-w-[85vw]
              bg-white dark:bg-dark-900 dim:bg-dim-900
              shadow-2xl
              overflow-y-auto
              lg:hidden
            "
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Drag Handle */}
            <div
              className="absolute top-4 right-4 w-1 h-12 bg-gray-300 dark:bg-dark-700 dim:bg-dim-700 rounded-full cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            />

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700 dim:border-dim-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 dim:text-dim-100">
                Menu
              </h2>
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.9 }}
                className="
                  p-2 rounded-lg
                  text-gray-500 dark:text-gray-400 dim:text-dim-400
                  hover:bg-gray-100 dark:hover:bg-dark-800 dim:hover:bg-dim-800
                  transition-colors
                "
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Menu Items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.href || (item.href.includes('#') && pathname === `/${locale}`);

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg
                          font-medium transition-all duration-200
                          ${
                            isActive
                              ? 'bg-primary-100 dark:bg-primary-900/30 dim:bg-primary-900/20 text-primary-700 dark:text-primary-300 dim:text-primary-400'
                              : 'text-gray-700 dark:text-gray-300 dim:text-dim-200 hover:bg-gray-100 dark:hover:bg-dark-800 dim:hover:bg-dim-800'
                          }
                        `}
                        onClick={onClose}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span>{item.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active-indicator"
                            className="ml-auto w-2 h-2 bg-primary-600 dark:bg-primary-400 dim:bg-primary-400 rounded-full"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-dark-700 dim:border-dim-700 bg-gray-50 dark:bg-dark-950 dim:bg-dim-950">
              <p className="text-xs text-gray-500 dark:text-gray-400 dim:text-dim-400 text-center">
                Top Digital Tools
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 dim:text-dim-500 text-center mt-1">
                {locale === 'en' && 'Swipe left to close'}
                {locale === 'pt' && 'Deslize para a esquerda para fechar'}
                {locale === 'es' && 'Desliza a la izquierda para cerrar'}
                {locale === 'fr' && 'Glissez vers la gauche pour fermer'}
                {locale === 'de' && 'Nach links wischen zum Schließen'}
                {locale === 'ru' && 'Проведите влево, чтобы закрыть'}
                {locale === 'it' && 'Scorri a sinistra per chiudere'}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
