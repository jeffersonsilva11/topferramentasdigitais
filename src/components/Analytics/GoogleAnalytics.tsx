'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, GA_MEASUREMENT_ID } from '@/lib/gtag';
import { initializeGoogleConsent } from '@/lib/consent';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }
  }, [pathname, searchParams]);

  // Initialize Google Consent Mode before scripts load
  useEffect(() => {
    initializeGoogleConsent();
  }, []);

  // Don't load if no GA_MEASUREMENT_ID
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID not set');
    return null;
  }

  return (
    <>
      {/* Google Tag Manager / gtag.js */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* Initialize gtag */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // This is redundant with initializeGoogleConsent() but acts as fallback
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false, // We'll handle this manually
            });
          `,
        }}
      />
    </>
  );
}
