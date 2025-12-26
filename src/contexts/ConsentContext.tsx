'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ConsentCategories, ConsentAction } from '@/types/consent';
import {
  loadConsent,
  acceptAllCookies,
  rejectAllCookies,
  saveCustomConsent,
  deleteConsent,
  DEFAULT_CONSENT,
} from '@/lib/consent';
import { trackConsent } from '@/lib/gtag';

interface ConsentContextType {
  // State
  showBanner: boolean;
  showSettings: boolean;
  categories: ConsentCategories;
  hasConsented: boolean;

  // Actions
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (categories: Partial<ConsentCategories>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  revokeConsent: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] = useState<ConsentCategories>(DEFAULT_CONSENT);
  const [hasConsented, setHasConsented] = useState(false);

  // Load consent state on mount
  useEffect(() => {
    const savedConsent = loadConsent();

    if (savedConsent) {
      setCategories(savedConsent.categories);
      setHasConsented(true);
      setShowBanner(false);
    } else {
      // No consent found, show banner
      setShowBanner(true);
      setHasConsented(false);
    }
  }, []);

  const acceptAll = useCallback(() => {
    acceptAllCookies();
    setCategories({
      necessary: true,
      analytics: true,
      advertising: true,
    });
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);

    // Track consent
    trackConsent('granted', ['analytics', 'advertising']);
  }, []);

  const rejectAll = useCallback(() => {
    rejectAllCookies();
    setCategories(DEFAULT_CONSENT);
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);

    // Track consent
    trackConsent('denied');
  }, []);

  const savePreferences = useCallback((newCategories: Partial<ConsentCategories>) => {
    saveCustomConsent(newCategories);

    const finalCategories: ConsentCategories = {
      necessary: true,
      analytics: newCategories.analytics ?? false,
      advertising: newCategories.advertising ?? false,
    };

    setCategories(finalCategories);
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);

    // Track consent
    const grantedCategories: string[] = [];
    if (finalCategories.analytics) grantedCategories.push('analytics');
    if (finalCategories.advertising) grantedCategories.push('advertising');

    trackConsent(grantedCategories.length > 0 ? 'granted' : 'denied', grantedCategories);
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  const revokeConsent = useCallback(() => {
    deleteConsent();
    setCategories(DEFAULT_CONSENT);
    setHasConsented(false);
    setShowBanner(true);
    setShowSettings(false);
  }, []);

  const value: ConsentContextType = {
    showBanner,
    showSettings,
    categories,
    hasConsented,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
    revokeConsent,
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}
