'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const adLoadedRef = useRef(false);

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

  // Load AdSense script when ad becomes visible (only once)
  useEffect(() => {
    if (isVisible && typeof window !== 'undefined' && !adLoadedRef.current) {
      adLoadedRef.current = true;
      try {
        // @ts-expect-error - adsbygoogle is injected by Google
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Ignore "already have ads" error - this is expected behavior
        if (err instanceof Error && !err.message.includes('already have ads')) {
          console.error('AdSense error:', err);
        }
      }
    }
  }, [isVisible]);

  // Minimum heights to ensure proper ad display
  const heightMap = {
    top: '90px',
    middle: '90px',
    bottom: '90px',
    sidebar: '250px',
  };

  // This component is ready for Google Auto Ads
  // Google Auto Ads will automatically place ads in optimal positions
  // The container provides a designated space that Google can use
  return (
    <div
      ref={adRef}
      className={`ad-container overflow-hidden ${className}`}
      style={{
        minHeight: heightMap[position],
      }}
      data-ad-position={position}
    >
      {/* Google Auto Ads will automatically insert ads here */}
      {/* No placeholder needed - Google handles ad placement automatically */}
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
