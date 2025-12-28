'use client';

import { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
  strengthMeter?: boolean; // For password inputs
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      success,
      helperText,
      maxLength,
      showCount = false,
      strengthMeter = false,
      icon,
      iconPosition = 'left',
      type = 'text',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [passwordStrength, setPasswordStrength] = useState(0);

    useEffect(() => {
      if (value) {
        setCharCount(String(value).length);

        // Password strength calculation
        if (strengthMeter && type === 'password') {
          const password = String(value);
          let strength = 0;

          if (password.length >= 8) strength += 25;
          if (password.length >= 12) strength += 25;
          if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
          if (/[0-9]/.test(password)) strength += 12.5;
          if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;

          setPasswordStrength(strength);
        }
      } else {
        setCharCount(0);
        setPasswordStrength(0);
      }
    }, [value, strengthMeter, type]);

    const hasContent = value !== undefined && value !== '';
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    const strengthColor =
      passwordStrength >= 75 ? 'bg-green-500' :
      passwordStrength >= 50 ? 'bg-yellow-500' :
      passwordStrength >= 25 ? 'bg-orange-500' : 'bg-red-500';

    const strengthLabel =
      passwordStrength >= 75 ? 'Strong' :
      passwordStrength >= 50 ? 'Medium' :
      passwordStrength >= 25 ? 'Weak' : 'Very Weak';

    return (
      <div className="w-full">
        <div className="relative">
          {/* Floating Label */}
          {label && (
            <motion.label
              htmlFor={props.id}
              className={cn(
                'absolute left-3 pointer-events-none transition-all duration-220 origin-left',
                icon && iconPosition === 'left' && 'left-11',
                isFocused || hasContent
                  ? 'top-0 -translate-y-1/2 text-xs bg-white dark:bg-dark-950 px-2'
                  : 'top-1/2 -translate-y-1/2 text-base',
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
                y: isFocused || hasContent ? '-120%' : '-50%',
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {label}
            </motion.label>
          )}

          {/* Icon Left */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={type}
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
              'focus:outline-none',
              icon && iconPosition === 'left' && 'pl-11',
              icon && iconPosition === 'right' && 'pr-11',
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

          {/* Icon Right / Validation Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Success Icon */}
            <AnimatePresence>
              {hasSuccess && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: 'spring', duration: 0.3 }}
                  className="text-green-600 dark:text-green-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Icon */}
            <AnimatePresence>
              {hasError && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: 'spring', duration: 0.3 }}
                  className="text-red-600 dark:text-red-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Icon Right */}
            {icon && iconPosition === 'right' && !hasSuccess && !hasError && (
              <div className="text-gray-400 dark:text-gray-500">{icon}</div>
            )}
          </div>
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

        {/* Password Strength Meter */}
        <AnimatePresence>
          {strengthMeter && type === 'password' && (isFocused || hasContent) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 space-y-1"
            >
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${strengthColor} transition-colors duration-300`}
                  initial={{ width: 0 }}
                  animate={{ width: `${passwordStrength}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Password strength: <span className="font-medium">{strengthLabel}</span>
              </p>
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

Input.displayName = 'Input';

export default Input;
