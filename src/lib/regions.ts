/**
 * Region Detection and Compliance Rules
 * Handles GDPR (EU), LGPD (Brazil), CCPA (California/USA), and other regions
 */

export type ConsentRegion = 'EU' | 'BR' | 'US_CA' | 'US_OTHER' | 'LATAM' | 'OTHER';

export interface RegionInfo {
  region: ConsentRegion;
  requiresOptIn: boolean; // True for GDPR/LGPD, false for CCPA
  showDoNotSell: boolean; // CCPA requirement
  defaultAnalytics: boolean; // Default consent for analytics
  defaultAdvertising: boolean; // Default consent for advertising
}

/**
 * EU countries (GDPR applies)
 */
const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'IS', 'LI', 'NO', 'CH'
];

/**
 * LATAM countries (similar privacy laws to LGPD)
 */
const LATAM_COUNTRIES = [
  'AR', 'CL', 'CO', 'MX', 'PE', 'UY', 'EC', 'BO', 'PY', 'VE'
];

/**
 * Detect user's region based on browser language and locale
 * Note: This is a simple approximation. For production, consider using IP geolocation
 */
export function detectUserRegion(): ConsentRegion {
  if (typeof window === 'undefined') return 'OTHER';

  // Try to get country from navigator.language (e.g., "en-US", "pt-BR", "de-DE")
  const locale = navigator.language || navigator.languages?.[0] || 'en-US';
  const countryCode = locale.split('-')[1]?.toUpperCase() || '';

  // Check EU
  if (EU_COUNTRIES.includes(countryCode)) {
    return 'EU';
  }

  // Check Brazil (LGPD)
  if (countryCode === 'BR') {
    return 'BR';
  }

  // Check California (CCPA) - approximation based on locale
  // In production, use IP geolocation for accurate California detection
  if (countryCode === 'US') {
    // Default to CCPA compliance for all US users (safest approach)
    return 'US_CA';
  }

  // Check other LATAM countries
  if (LATAM_COUNTRIES.includes(countryCode)) {
    return 'LATAM';
  }

  return 'OTHER';
}

/**
 * Get region-specific consent rules
 */
export function getRegionInfo(region?: ConsentRegion): RegionInfo {
  const detectedRegion = region || detectUserRegion();

  switch (detectedRegion) {
    case 'EU':
      // GDPR: Strict opt-in required
      return {
        region: 'EU',
        requiresOptIn: true,
        showDoNotSell: false,
        defaultAnalytics: false,
        defaultAdvertising: false,
      };

    case 'BR':
      // LGPD: Opt-in required (similar to GDPR)
      return {
        region: 'BR',
        requiresOptIn: true,
        showDoNotSell: false,
        defaultAnalytics: false,
        defaultAdvertising: false,
      };

    case 'LATAM':
      // Other LATAM countries: Conservative opt-in approach
      return {
        region: 'LATAM',
        requiresOptIn: true,
        showDoNotSell: false,
        defaultAnalytics: false,
        defaultAdvertising: false,
      };

    case 'US_CA':
      // CCPA: Opt-out model (can set cookies by default, but must offer opt-out)
      // However, we keep deny-by-default for consistency and user trust
      return {
        region: 'US_CA',
        requiresOptIn: false,
        showDoNotSell: true, // Show "Do Not Sell My Personal Information"
        defaultAnalytics: false, // Conservative: still require opt-in
        defaultAdvertising: false,
      };

    case 'US_OTHER':
      // Other US states: More flexible, but we keep conservative approach
      return {
        region: 'US_OTHER',
        requiresOptIn: false,
        showDoNotSell: false,
        defaultAnalytics: false,
        defaultAdvertising: false,
      };

    default:
      // OTHER: Conservative approach (opt-in)
      return {
        region: 'OTHER',
        requiresOptIn: false,
        showDoNotSell: false,
        defaultAnalytics: false,
        defaultAdvertising: false,
      };
  }
}

/**
 * Get legal framework name for display
 */
export function getLegalFramework(region: ConsentRegion): string {
  switch (region) {
    case 'EU':
      return 'GDPR';
    case 'BR':
      return 'LGPD';
    case 'US_CA':
      return 'CCPA';
    case 'LATAM':
      return 'Privacy Laws';
    default:
      return 'Privacy Policy';
  }
}

/**
 * Check if region requires explicit opt-in consent
 */
export function requiresExplicitConsent(region?: ConsentRegion): boolean {
  const info = getRegionInfo(region);
  return info.requiresOptIn;
}

/**
 * Check if region requires "Do Not Sell" option (CCPA)
 */
export function requiresDoNotSell(region?: ConsentRegion): boolean {
  const info = getRegionInfo(region);
  return info.showDoNotSell;
}
