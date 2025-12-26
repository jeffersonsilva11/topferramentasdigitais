'use client';

import { ReactNode } from 'react';
import { useInView, UseInViewOptions } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export interface AnimateInProps extends UseInViewOptions {
  children: ReactNode;
  className?: string;
  /**
   * Animation variant
   * @default 'fade-up'
   */
  variant?: 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none';
  /**
   * Duration in ms
   * @default 600
   */
  duration?: number;
}

/**
 * Wrapper component that animates children when they come into view
 *
 * @example
 * <AnimateIn variant="fade-up">
 *   <h2>This will fade in from below when scrolled into view</h2>
 * </AnimateIn>
 */
export default function AnimateIn({
  children,
  className,
  variant = 'fade-up',
  duration = 600,
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  ...observerOptions
}: AnimateInProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold,
    triggerOnce,
    delay,
    ...observerOptions,
  });

  const variantClasses = {
    fade: {
      hidden: 'opacity-0',
      visible: 'opacity-100',
    },
    'fade-up': {
      hidden: 'opacity-0 translate-y-8',
      visible: 'opacity-100 translate-y-0',
    },
    'fade-down': {
      hidden: 'opacity-0 -translate-y-8',
      visible: 'opacity-100 translate-y-0',
    },
    'fade-left': {
      hidden: 'opacity-0 translate-x-8',
      visible: 'opacity-100 translate-x-0',
    },
    'fade-right': {
      hidden: 'opacity-0 -translate-x-8',
      visible: 'opacity-100 translate-x-0',
    },
    scale: {
      hidden: 'opacity-0 scale-95',
      visible: 'opacity-100 scale-100',
    },
    none: {
      hidden: '',
      visible: '',
    },
  };

  const currentVariant = variantClasses[variant];

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all ease-out',
        isInView ? currentVariant.visible : currentVariant.hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Container for staggered children animations
 * Use with AnimateIn for list items
 *
 * @example
 * <StaggerContainer>
 *   {items.map((item, i) => (
 *     <AnimateIn key={i} delay={i * 100}>
 *       {item}
 *     </AnimateIn>
 *   ))}
 * </StaggerContainer>
 */
export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}
