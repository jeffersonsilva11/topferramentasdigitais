import Cookies from 'js-cookie';
import type {
  ConsentCategories,
  ConsentState,
  GoogleConsentState,
  ConsentStatus
} from '@/types/consent';
import { detectUserRegion, getRegionInfo } from './regions';

const CONSENT_COOKIE_NAME = 'user_consent';
const CONSENT_REGION_COOKIE = 'user_region';
const CONSENT_EXPIRY_DAYS = 365; // 12 months

/**
 * Default consent state - all denied except necessary
 */
export const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true, // Always true
  analytics: false,
  advertising: false,
};

/**
 * Get region-aware default consent
 */
export function getDefaultConsent(): ConsentCategories {
  const region = detectUserRegion();
  const regionInfo = getRegionInfo(region);

  return {
    necessary: true, // Always true
    analytics: regionInfo.defaultAnalytics,
    advertising: regionInfo.defaultAdvertising,
  };
}

/**
 * Save detected region to cookie
 */
export function saveRegion(region: string): void {
  Cookies.set(CONSENT_REGION_COOKIE, region, {
    expires: CONSENT_EXPIRY_DAYS,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

/**
 * Load saved region from cookie
 */
export function loadRegion(): string | undefined {
  return Cookies.get(CONSENT_REGION_COOKIE);
}

/**
 * Initialize Google Consent Mode v2 with region-aware defaults
 * MUST be called before gtag scripts load
 *
 * Compliance:
 * - GDPR (EU): Default deny, require opt-in
 * - LGPD (Brazil): Default deny, require opt-in
 * - CCPA (California): Default deny (conservative), show "Do Not Sell"
 * - Other LATAM: Default deny (conservative)
 * - Other regions: Default deny (safest approach)
 */
export function initializeGoogleConsent(): void {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer if not exists
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  // Detect user region
  const region = detectUserRegion();
  const regionInfo = getRegionInfo(region);

  // Save region for later use
  saveRegion(region);

  // Conservative approach: default to denied for all regions
  // This ensures compliance with GDPR, LGPD, and CCPA
  const defaultConsent: GoogleConsentState = {
    ad_storage: regionInfo.defaultAdvertising ? 'granted' : 'denied',
    analytics_storage: regionInfo.defaultAnalytics ? 'granted' : 'denied',
    ad_user_data: regionInfo.defaultAdvertising ? 'granted' : 'denied',
    ad_personalization: regionInfo.defaultAdvertising ? 'granted' : 'denied',
    wait_for_update: 500, // Wait 500ms for consent banner interaction
  };

  // Set default consent state
  window.gtag('consent', 'default', defaultConsent);

  // For regions with specific requirements, add additional signals
  if (region === 'US_CA') {
    // CCPA: Signal that this is California traffic
    window.gtag('set', 'ads_data_redaction', { ads_data_redaction: true });
    window.gtag('set', 'url_passthrough', { url_passthrough: true });
  }
}

/**
 * Update Google Consent Mode based on user choices
 */
export function updateGoogleConsent(categories: ConsentCategories): void {
  if (typeof window === 'undefined' || !window.gtag) return;

  const consentState: GoogleConsentState = {
    ad_storage: categories.advertising ? 'granted' : 'denied',
    analytics_storage: categories.analytics ? 'granted' : 'denied',
    ad_user_data: categories.advertising ? 'granted' : 'denied',
    ad_personalization: categories.advertising ? 'granted' : 'denied',
  };

  window.gtag('consent', 'update', consentState);
}

/**
 * Save consent state to cookie
 */
export function saveConsent(categories: ConsentCategories): void {
  const consentState: ConsentState = {
    hasConsent: true,
    categories,
    timestamp: Date.now(),
  };

  // Save to cookie (HttpOnly would be better but requires server-side)
  Cookies.set(CONSENT_COOKIE_NAME, JSON.stringify(consentState), {
    expires: CONSENT_EXPIRY_DAYS,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });

  // Update Google Consent Mode
  updateGoogleConsent(categories);
}

/**
 * Load consent state from cookie
 */
export function loadConsent(): ConsentState | null {
  const consentCookie = Cookies.get(CONSENT_COOKIE_NAME);

  if (!consentCookie) return null;

  try {
    const state = JSON.parse(consentCookie) as ConsentState;

    // Check if consent is expired (12 months)
    const twelveMonthsAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
    if (state.timestamp < twelveMonthsAgo) {
      // Consent expired, delete it
      deleteConsent();
      return null;
    }

    return state;
  } catch {
    // Invalid cookie format
    deleteConsent();
    return null;
  }
}

/**
 * Delete consent cookie (used when user withdraws consent)
 */
export function deleteConsent(): void {
  Cookies.remove(CONSENT_COOKIE_NAME);

  // Reset Google Consent Mode to denied
  if (typeof window !== 'undefined') {
    updateGoogleConsent(DEFAULT_CONSENT);
  }
}

/**
 * Check if user has given consent
 */
export function hasUserConsent(): boolean {
  const consent = loadConsent();
  return consent !== null && consent.hasConsent;
}

/**
 * Check if specific category is consented
 */
export function hasCategoryConsent(category: keyof ConsentCategories): boolean {
  const consent = loadConsent();
  if (!consent) return category === 'necessary'; // Necessary cookies always allowed
  return consent.categories[category];
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  const allConsent: ConsentCategories = {
    necessary: true,
    analytics: true,
    advertising: true,
  };
  saveConsent(allConsent);
}

/**
 * Reject all non-necessary cookies
 */
export function rejectAllCookies(): void {
  saveConsent(DEFAULT_CONSENT);
}

/**
 * Save custom consent preferences
 */
export function saveCustomConsent(categories: Partial<ConsentCategories>): void {
  const finalCategories: ConsentCategories = {
    necessary: true, // Always true
    analytics: categories.analytics ?? false,
    advertising: categories.advertising ?? false,
  };
  saveConsent(finalCategories);
}
