export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Offline Icon */}
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-700 dim:text-dim-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 dim:text-dim-100 mb-4">
          You&apos;re Offline
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 dim:text-dim-400 mb-8">
          It looks like you&apos;ve lost your internet connection. Some features may not be available.
        </p>

        {/* Action Button */}
        <button
          onClick={() => window.location.reload()}
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-lg
            bg-primary-600 hover:bg-primary-700
            dark:bg-primary-500 dark:hover:bg-primary-600
            dim:bg-primary-500 dim:hover:bg-primary-600
            text-white font-semibold
            transition-colors
            focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          "
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </button>

        {/* Help Text */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500 dim:text-dim-500">
          Make sure you&apos;re connected to the internet and try reloading the page.
        </p>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Offline - Top Digital Tools',
  robots: {
    index: false,
    follow: false,
  },
};
