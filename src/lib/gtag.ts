/**
 * Google Analytics 4 with Consent Mode v2 Support
 *
 * Usage:
 * 1. Set GA_MEASUREMENT_ID in .env.local
 * 2. Call initializeGoogleConsent() before loading gtag scripts
 * 3. Load gtag scripts in layout.tsx
 * 4. Use pageview() for page tracking
 * 5. Use event() for custom events
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Page view tracking
 * @param url - Page URL to track
 */
export function pageview(url: string): void {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/**
 * Event tracking
 * @param action - Event action name
 * @param category - Event category
 * @param label - Event label (optional)
 * @param value - Event value (optional)
 */
export function event(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

/**
 * Tool usage tracking
 * @param toolName - Name of the tool used
 * @param toolCategory - Category of the tool
 */
export function trackToolUsage(toolName: string, toolCategory: string): void {
  event('tool_used', toolCategory, toolName);
}

/**
 * Search tracking
 * @param searchTerm - Search query
 */
export function trackSearch(searchTerm: string): void {
  event('search', 'engagement', searchTerm);
}

/**
 * Favorite tracking
 * @param toolName - Name of the tool
 * @param action - 'add' or 'remove'
 */
export function trackFavorite(toolName: string, action: 'add' | 'remove'): void {
  event(`favorite_${action}ed`, 'engagement', toolName);
}

/**
 * Category filter tracking
 * @param category - Category name
 */
export function trackCategoryFilter(category: string): void {
  event('category_filtered', 'navigation', category);
}

/**
 * Theme change tracking
 * @param theme - 'light' or 'dark'
 */
export function trackThemeChange(theme: 'light' | 'dark'): void {
  event('theme_changed', 'settings', theme);
}

/**
 * Consent tracking
 * @param action - 'granted' or 'denied'
 * @param categories - Consent categories
 */
export function trackConsent(
  action: 'granted' | 'denied',
  categories?: string[]
): void {
  event(
    `consent_${action}`,
    'privacy',
    categories ? categories.join(',') : 'all'
  );
}

/**
 * Download tracking
 * @param fileName - Name of the downloaded file
 * @param fileType - Type of file (e.g., 'pdf', 'jpg')
 */
export function trackDownload(fileName: string, fileType: string): void {
  event('file_download', 'conversion', fileName, undefined);
  event('download_' + fileType, 'conversion', fileName);
}

/**
 * Error tracking
 * @param error - Error message or description
 * @param fatal - Whether the error is fatal
 */
export function trackError(error: string, fatal: boolean = false): void {
  event('exception', 'error', error, fatal ? 1 : 0);
}
