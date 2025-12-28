'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const locale = useLocale();
  const pathname = usePathname();

  const navItems = [
    {
      href: `/${locale}`,
      label: locale === 'en' ? 'Home' : locale === 'pt' ? 'Início' : 'Inicio',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      href: `/${locale}#tools`,
      label: locale === 'en' ? 'Tools' : locale === 'pt' ? 'Ferramentas' : 'Herramientas',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      href: '#search',
      label: locale === 'en' ? 'Search' : locale === 'pt' ? 'Buscar' : 'Buscar',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      action: () => {
        const searchInput = document.querySelector<HTMLInputElement>('input[type="text"]');
        if (searchInput) {
          searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          searchInput.focus();
        }
      },
    },
  ];

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-40
        lg:hidden
        bg-white/95 dark:bg-dark-900/95 dim:bg-dim-900/95
        backdrop-blur-md
        border-t-2 border-gray-200 dark:border-dark-700 dim:border-dim-700
        shadow-2xl
        safe-area-inset-bottom
      "
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item, index) => {
          const isActive = item.href === '#search' ? false : pathname === item.href || (item.href.includes('#tools') && pathname === `/${locale}`);

          const handleClick = (e: React.MouseEvent) => {
            if (item.action) {
              e.preventDefault();
              item.action();
            }
          };

          const LinkContent = (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`
                relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 dim:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 dim:text-dim-400'
                }
              `}
            >
              <div className="relative">
                {item.icon}
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-600 dark:bg-primary-400 dim:bg-primary-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </motion.div>
          );

          if (item.action) {
            return (
              <button key={item.href} onClick={handleClick} className="flex-1 max-w-[120px]">
                {LinkContent}
              </button>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="flex-1 max-w-[120px]">
              {LinkContent}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
