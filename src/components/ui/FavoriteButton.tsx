'use client';

import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useFavorites } from '@/hooks/useFavorites';
import { showSuccess, showInfo } from '@/lib/toast';

interface FavoriteButtonProps {
  toolId: string;
  toolName: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function FavoriteButton({
  toolId,
  toolName,
  size = 'md',
  showLabel = true,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const isFav = isFavorite(toolId);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wasAdded = !isFav;
    toggleFavorite(toolId);

    if (wasAdded) {
      // Confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
        colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
      });

      // Toast notification
      showSuccess(`${toolName} added to favorites!`);
    } else {
      showInfo(`${toolName} removed from favorites`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={handleToggle}
        className={`${sizes[size]} flex items-center justify-center rounded-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
        whileTap={{ scale: 0.9 }}
        aria-label={isFav ? `Remove ${toolName} from favorites` : `Add ${toolName} to favorites`}
      >
        <AnimatePresence mode="wait">
          {isFav ? (
            <motion.svg
              key="filled"
              className={`${iconSizes[size]} text-red-500`}
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: [0, 1.3, 1],
                rotate: [- 180, 10, 0],
              }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="outline"
              className={`${iconSizes[size]} text-gray-400 dark:text-gray-500`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Favorite count badge */}
      {showLabel && favorites.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <motion.span
            key={favorites.length}
            initial={{ scale: 1.5, color: '#3b82f6' }}
            animate={{ scale: 1, color: 'inherit' }}
            transition={{ duration: 0.3 }}
          >
            {favorites.length}
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}
