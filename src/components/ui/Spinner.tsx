interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export default function Spinner({ size = 'md', color = 'primary', className = '' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600',
  };

  return (
    <div
      className={`inline-block ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}

export function SpinnerOverlay({ message }: { message?: string }) {
  return (
    <div className="absolute inset-0 bg-white/80 dark:bg-dark-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-lg">
      <Spinner size="lg" />
      {message && (
        <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">{message}</p>
      )}
    </div>
  );
}

export function FullPageSpinner({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-white dark:bg-dark-950 flex flex-col items-center justify-center z-50">
      <Spinner size="xl" />
      {message && (
        <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">{message}</p>
      )}
    </div>
  );
}
