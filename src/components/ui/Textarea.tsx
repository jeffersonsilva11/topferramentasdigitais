'use client';

import { TextareaHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  showCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      success,
      helperText,
      maxLength,
      showCount = false,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
      if (value) {
        setCharCount(String(value).length);
      } else {
        setCharCount(0);
      }
    }, [value]);

    const hasContent = value !== undefined && value !== '';
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    return (
      <div className="w-full">
        <div className="relative">
          {/* Floating Label */}
          {label && (
            <motion.label
              htmlFor={props.id}
              className={cn(
                'absolute left-3 pointer-events-none transition-all duration-220 origin-left z-10',
                isFocused || hasContent
                  ? 'top-0 -translate-y-1/2 text-xs bg-white dark:bg-dark-950 px-2'
                  : 'top-4 text-base',
                hasError
                  ? 'text-red-600 dark:text-red-400'
                  : hasSuccess
                  ? 'text-green-600 dark:text-green-400'
                  : isFocused
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400'
              )}
              animate={{
                scale: isFocused || hasContent ? 0.85 : 1,
                y: isFocused || hasContent ? '-50%' : '0%',
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {label}
            </motion.label>
          )}

          {/* Textarea */}
          <textarea
            ref={ref}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={maxLength}
            className={cn(
              'w-full px-4 py-3 rounded-lg border-2 transition-all duration-220',
              'bg-white dark:bg-dark-900',
              'text-gray-900 dark:text-gray-100',
              'placeholder-gray-400 dark:placeholder-gray-500',
              'focus:outline-none resize-none',
              hasError
                ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
                : hasSuccess
                ? 'border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-500/20'
                : 'border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
              isFocused && !hasError && !hasSuccess && 'shadow-glow',
              className
            )}
            {...props}
          />
        </div>

        {/* Character Counter */}
        <AnimatePresence>
          {showCount && maxLength && (isFocused || charCount > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1 text-xs text-right"
            >
              <span
                className={cn(
                  'transition-colors duration-220',
                  charCount > maxLength * 0.9
                    ? 'text-red-600 dark:text-red-400 font-medium'
                    : 'text-gray-500 dark:text-gray-400'
                )}
              >
                {charCount} / {maxLength}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Helper Text */}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
