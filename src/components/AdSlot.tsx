'use client';

/**
 * AdSlot Component - Placeholder for Google Auto Ads
 *
 * Google Auto Ads automatically places ads in optimal positions.
 * The script in layout.tsx handles everything - no manual slots needed.
 *
 * After AdSense approval, you can optionally create manual ad units
 * for more control over placement.
 */

interface AdSlotProps {
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  // Minimum heights to prevent layout shift when ads load
  const heightMap = {
    top: '90px',
    middle: '250px',
    bottom: '90px',
    sidebar: '600px',
  };

  // This container serves as a hint for Google Auto Ads
  // Google will automatically fill these spaces with relevant ads
  return (
    <div
      className={`ad-container ${className}`}
      style={{
        minHeight: heightMap[position],
        textAlign: 'center',
      }}
      data-ad-position={position}
      aria-hidden="true"
    >
      {/* Google Auto Ads will automatically insert ads here */}
    </div>
  );
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW AUTO ADS WORKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. The AdSense script in layout.tsx loads the Auto Ads system
2. Google analyzes your page structure automatically
3. Ads are placed in optimal positions by Google's AI
4. No manual ad unit creation needed for approval

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AFTER APPROVAL (OPTIONAL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If you want more control after approval, you can:
1. Go to AdSense > Ads > By ad unit
2. Create ad units for each position
3. Update this component to use <ins> elements with your ad slots

Example:
  <ins className="adsbygoogle"
       data-ad-client="ca-pub-7799249195760389"
       data-ad-slot="YOUR_SLOT_ID"
       data-ad-format="auto"
       data-full-width-responsive="true">
  </ins>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
