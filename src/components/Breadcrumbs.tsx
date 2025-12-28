'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const locale = useLocale();

  // Don't show breadcrumbs on home page
  if (pathname === `/${locale}` || pathname === '/') {
    return null;
  }

  // Build breadcrumb items from path
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: locale === 'en' ? 'Home' : locale === 'pt' ? 'Início' : 'Inicio',
      href: `/${locale}`,
    },
  ];

  // Build path incrementally
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    // Skip locale segment
    if (index === 0 && segment === locale) {
      return;
    }

    currentPath += `/${segment}`;

    // Format segment label (remove hyphens, capitalize)
    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbItems.push({
      label,
      href: currentPath.startsWith(`/${locale}`) ? currentPath : `/${locale}${currentPath}`,
    });
  });

  // Generate Schema.org BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${typeof window !== 'undefined' ? window.location.origin : ''}${item.href}`,
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="
          container mx-auto px-4 py-3
          bg-gray-50 dark:bg-dark-800 dim:bg-dim-800
          rounded-lg mt-4
        "
      >
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2"
              >
                {!isLast ? (
                  <>
                    <Link
                      href={item.href}
                      className="
                        text-primary-600 dark:text-primary-400 dim:text-primary-400
                        hover:underline
                        focus-visible:ring-2 focus-visible:ring-primary-500 rounded
                        transition-colors
                      "
                    >
                      {item.label}
                    </Link>
                    <svg
                      className="w-4 h-4 text-gray-400 dark:text-gray-600 dim:text-dim-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </>
                ) : (
                  <span
                    className="text-gray-700 dark:text-gray-300 dim:text-dim-200 font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
