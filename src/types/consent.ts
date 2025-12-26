export interface ConsentCategories {
  necessary: boolean; // Always true, can't be disabled
  analytics: boolean;
  advertising: boolean;
}

export interface ConsentState {
  hasConsent: boolean;
  categories: ConsentCategories;
  timestamp: number;
}

export type ConsentAction = 'accept_all' | 'reject_all' | 'custom';

export interface ConsentUpdate {
  action: ConsentAction;
  categories?: Partial<ConsentCategories>;
}

// Google Consent Mode v2 types
export type ConsentStatus = 'granted' | 'denied';

export interface GoogleConsentState {
  ad_storage: ConsentStatus;
  analytics_storage: ConsentStatus;
  ad_user_data: ConsentStatus;
  ad_personalization: ConsentStatus;
  [key: string]: ConsentStatus | number; // Index signature for gtag compatibility
}

// Window type extensions for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}
