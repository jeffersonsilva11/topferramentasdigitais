'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSlotProps {
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current);
      }
    };
  }, [isVisible]);

  // Load AdSense script when ad becomes visible
  useEffect(() => {
    if (isVisible && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isVisible]);

  // Fixed heights to prevent CLS (Cumulative Layout Shift)
  const heightMap = {
    top: '280px',
    middle: '280px',
    bottom: '280px',
    sidebar: '600px',
  };

  return (
    <div
      ref={adRef}
      className={`bg-gray-50 border border-gray-200 rounded-lg overflow-hidden ${className}`}
      style={{
        minHeight: heightMap[position],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isVisible ? (
        <>
          {/*
            PRODUCTION: Replace this with your actual AdSense code

            Example AdSense Integration:
            <ins className="adsbygoogle"
                 style={{display:'block'}}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>

            For Ezoic: Add placeholder div with specific ID
            <div id={`ezoic-pub-ad-placeholder-${position}`}></div>
          */}
          <div className="text-center p-6">
            <div className="text-4xl mb-2">📢</div>
            <p className="text-gray-500 font-medium text-sm mb-1">
              Ad Space - {position.toUpperCase()}
            </p>
            <p className="text-xs text-gray-400 mb-3">
              Insert your ad code here (AdSense/Ezoic)
            </p>
            <code className="text-xs bg-gray-200 px-2 py-1 rounded block mb-2">
              Position: {position}
            </code>
            <code className="text-xs bg-gray-200 px-2 py-1 rounded block">
              Size: {heightMap[position]}
            </code>
          </div>
        </>
      ) : (
        <div className="text-gray-300 text-sm">Loading ad...</div>
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
