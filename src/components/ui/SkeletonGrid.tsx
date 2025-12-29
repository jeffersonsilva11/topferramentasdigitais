'use client';

import Skeleton from './Skeleton';

interface SkeletonGridProps {
  count?: number;
  columns?: number;
}

export default function SkeletonGrid({ count = 12, columns = 3 }: SkeletonGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-dark-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-dark-700"
        >
          <div className="flex items-center gap-4 mb-4">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="flex-1 space-y-2">
              <Skeleton width="60%" height={20} />
              <Skeleton width="80%" height={16} />
            </div>
          </div>
          <Skeleton count={2} />
        </div>
      ))}
    </div>
  );
}
