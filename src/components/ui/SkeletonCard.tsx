export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-900 rounded-lg shadow-md p-6 animate-pulse">
      {/* Icon placeholder */}
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Title placeholder */}
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-3"></div>

      {/* Description placeholder */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
      </div>

      {/* Category badge placeholder */}
      <div className="mt-4 flex justify-center">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export function SkeletonLine({ width = 'full' }: { width?: string }) {
  return (
    <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded w-${width} animate-pulse`}></div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          style={{ width: index === lines - 1 ? '75%' : '100%' }}
        ></div>
      ))}
    </div>
  );
}
