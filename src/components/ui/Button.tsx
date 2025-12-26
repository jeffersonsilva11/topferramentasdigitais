'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-medium rounded-lg
      transition-all duration-200 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      overflow-hidden
      group
    `;

    const variants = {
      primary: `
        bg-primary-600 text-white
        hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30
        active:bg-primary-800 active:scale-[0.98]
        dark:bg-primary-700 dark:hover:bg-primary-600
      `,
      secondary: `
        bg-gray-200 text-gray-900
        hover:bg-gray-300 hover:shadow-md
        active:bg-gray-400 active:scale-[0.98]
        dark:bg-dark-800 dark:text-gray-100
        dark:hover:bg-dark-700
      `,
      outline: `
        bg-transparent border-2 border-primary-600 text-primary-600
        hover:bg-primary-50 hover:border-primary-700
        active:bg-primary-100 active:scale-[0.98]
        dark:border-primary-400 dark:text-primary-400
        dark:hover:bg-primary-950/30
      `,
      ghost: `
        bg-transparent text-gray-700
        hover:bg-gray-100 hover:text-gray-900
        active:bg-gray-200 active:scale-[0.98]
        dark:text-gray-300
        dark:hover:bg-dark-800 dark:hover:text-gray-100
      `,
      danger: `
        bg-red-600 text-white
        hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/30
        active:bg-red-800 active:scale-[0.98]
        dark:bg-red-700 dark:hover:bg-red-600
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3.5 text-lg',
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

        {/* Loading spinner */}
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
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
        )}

        {/* Left icon */}
        {leftIcon && !loading && (
          <span className="flex-shrink-0 transition-transform group-hover:scale-110">
            {leftIcon}
          </span>
        )}

        {/* Content */}
        <span className="relative z-10">{children}</span>

        {/* Right icon */}
        {rightIcon && !loading && (
          <span className="flex-shrink-0 transition-transform group-hover:scale-110 group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
