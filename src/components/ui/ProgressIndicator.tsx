'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'bar' | 'circular';
}

export default function ProgressIndicator({
  progress,
  label,
  showPercentage = true,
  size = 'md',
  variant = 'bar',
}: ProgressIndicatorProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  if (variant === 'circular') {
    const sizeMap = { sm: 60, md: 80, lg: 100 };
    const strokeWidthMap = { sm: 4, md: 6, lg: 8 };
    const radius = (sizeMap[size] - strokeWidthMap[size]) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedProgress / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-2">
        {label && <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>}
        <svg width={sizeMap[size]} height={sizeMap[size]} className="transform -rotate-90">
          <circle
            cx={sizeMap[size] / 2}
            cy={sizeMap[size] / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidthMap[size]}
            className="text-gray-200 dark:text-dark-600"
          />
          <motion.circle
            cx={sizeMap[size] / 2}
            cy={sizeMap[size] / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidthMap[size]}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-primary-600"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </svg>
        {showPercentage && (
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {Math.round(clampedProgress)}%
          </p>
        )}
      </div>
    );
  }

  // Bar variant
  const heightMap = { sm: 'h-2', md: 'h-3', lg: 'h-4' };

  return (
    <div className="w-full space-y-2">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>}
          {showPercentage && (
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {Math.round(clampedProgress)}%
            </p>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden ${heightMap[size]}`}>
        <motion.div
          className="h-full bg-primary-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
