'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
}

// AdSense Publisher ID
const AD_CLIENT = 'ca-pub-7799249195760389';

// Ad slots for different positions (create these in your AdSense console)
// For now using responsive auto ads format
const AD_SLOTS: Record<string, string> = {
  top: '1234567890',      // Replace with real slot from AdSense
  middle: '1234567891',   // Replace with real slot from AdSense
  bottom: '1234567892',   // Replace with real slot from AdSense
  sidebar: '1234567893',  // Replace with real slot from AdSense
};

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adInitialized, setAdInitialized] = useState(false);

  // Lazy load ads - only load when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        rootMargin: '200px', // Load ads 200px before they enter viewport
      }
    );

    const currentRef = adRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  // Load AdSense script when ad becomes visible (only once per component)
  useEffect(() => {
    if (isVisible && typeof window !== 'undefined' && !adInitialized) {
      setAdInitialized(true);

      // Small delay to ensure the ins element is rendered
      const timer = setTimeout(() => {
        try {
          // @ts-expect-error - adsbygoogle is injected by Google
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          // Ignore errors - common when ads are blocked or already loaded
          if (process.env.NODE_ENV === 'development') {
            console.log('AdSense info:', err);
          }
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible, adInitialized]);

  // Minimum heights to ensure proper ad display and prevent CLS
  const heightMap = {
    top: '90px',
    middle: '250px',
    bottom: '90px',
    sidebar: '600px',
  };

  return (
    <div
      ref={adRef}
      className={`ad-container overflow-hidden ${className}`}
      style={{
        minHeight: heightMap[position],
        textAlign: 'center',
      }}
      data-ad-position={position}
    >
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            minHeight: heightMap[position],
          }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={AD_SLOTS[position]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADSENSE INTEGRATION GUIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ADD TO LAYOUT.TSX (in <head>):
   <script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossOrigin="anonymous"
   ></script>

2. REPLACE THE PLACEHOLDER ABOVE WITH:
   <ins className="adsbygoogle"
        style={{display:'block'}}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true">
   </ins>

3. FOR EZOIC:
   - Replace placeholder with: <div id={`ezoic-pub-ad-placeholder-${position}`}></div>
   - Ezoic will automatically inject ads into these placeholders

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERFORMANCE FEATURES ALREADY IMPLEMENTED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Lazy Loading: Ads load only when near viewport (200px margin)
✅ CLS Prevention: Fixed heights prevent layout shifts
✅ Intersection Observer: Efficient viewport detection
✅ Responsive: Adapts to all screen sizes
✅ Non-blocking: Won't delay page render

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVENUE OPTIMIZATION TIPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Use different ad slots for each position (top, middle, bottom)
• Enable auto ads for better fill rates
• Test different ad formats (responsive, display, in-article)
• Monitor Core Web Vitals in Google Search Console
• A/B test ad positions for best RPM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
