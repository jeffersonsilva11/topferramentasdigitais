'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, GA_MEASUREMENT_ID } from '@/lib/gtag';
import { initializeGoogleConsent } from '@/lib/consent';

// Google AdSense Publisher ID
const ADSENSE_ID = 'ca-pub-7799249195760389';

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

  return (
    <>
      {/* Google AdSense - Required for domain verification and ad serving */}
      <Script
        id="adsense"
        async
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
      />

      {/* Google Analytics - Only load if GA_MEASUREMENT_ID is set */}
      {GA_MEASUREMENT_ID && (
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
      )}
    </>
  );
}
