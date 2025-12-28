interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon = '📭',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center ${className}`}>
      {/* Icon */}
      <div className="text-6xl sm:text-7xl mb-4 animate-bounce-subtle" role="img" aria-label={title}>
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {description}
        </p>
      )}

      {/* Action button */}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition-all duration-220 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
