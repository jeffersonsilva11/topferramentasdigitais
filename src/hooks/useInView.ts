'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseInViewOptions extends IntersectionObserverInit {
  /**
   * Trigger only once when element comes into view
   * @default true
   */
  triggerOnce?: boolean;
  /**
   * Amount of delay before triggering (in ms)
   * @default 0
   */
  delay?: number;
}

/**
 * Hook to detect when an element is in viewport
 * Uses Intersection Observer API for performance
 *
 * @example
 * const { ref, isInView } = useInView();
 * <div ref={ref} className={isInView ? 'fade-in' : 'opacity-0'}>
 *   Content
 * </div>
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already triggered and triggerOnce is enabled
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;

        if (delay > 0 && inView) {
          setTimeout(() => {
            setIsInView(true);
            if (triggerOnce) {
              setHasTriggered(true);
            }
          }, delay);
        } else {
          setIsInView(inView);
          if (inView && triggerOnce) {
            setHasTriggered(true);
          }
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, hasTriggered, delay]);

  return { ref, isInView, hasTriggered };
}

/**
 * Hook to get sequential stagger delays for list items
 * Useful for animating lists of items with delays
 *
 * @example
 * const items = ['Item 1', 'Item 2', 'Item 3'];
 * items.map((item, i) => (
 *   <div key={i} style={{ animationDelay: `${i * 100}ms` }}>
 *     {item}
 *   </div>
 * ))
 */
export function useStaggerDelay(baseDelay = 100) {
  return (index: number) => index * baseDelay;
}
