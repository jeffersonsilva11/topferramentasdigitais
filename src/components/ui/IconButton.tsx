'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center
      rounded-lg
      transition-all duration-200 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      overflow-hidden
      group
    `;

    const variants = {
      primary: `
        bg-primary-600 text-white
        hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/20
        active:bg-primary-800 active:scale-95
        dark:bg-primary-700 dark:hover:bg-primary-600
      `,
      secondary: `
        bg-gray-200 text-gray-900
        hover:bg-gray-300 hover:shadow-md
        active:bg-gray-400 active:scale-95
        dark:bg-dark-800 dark:text-gray-100
        dark:hover:bg-dark-700
      `,
      ghost: `
        bg-transparent text-gray-700
        hover:bg-gray-100
        active:bg-gray-200 active:scale-95
        dark:text-gray-300
        dark:hover:bg-dark-800
      `,
    };

    const sizes = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-3',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {/* Ripple effect background */}
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity duration-200" />
        </span>

        {/* Loading spinner or icon */}
        <span className={cn(
          'relative z-10 flex items-center justify-center transition-transform',
          loading ? 'animate-spin' : 'group-hover:scale-110 group-active:scale-100'
        )}>
          {loading ? (
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            children
          )}
        </span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
