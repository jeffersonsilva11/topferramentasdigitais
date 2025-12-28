import toast from 'react-hot-toast';

// Success toast with custom styling
export const showSuccess = (message: string, duration = 3000) => {
  return toast.success(message, {
    duration,
    icon: '✅',
  });
};

// Error toast
export const showError = (message: string, duration = 5000) => {
  return toast.error(message, {
    duration,
    icon: '❌',
  });
};

// Loading toast
export const showLoading = (message: string) => {
  return toast.loading(message);
};

// Info toast
export const showInfo = (message: string, duration = 4000) => {
  return toast(message, {
    duration,
    icon: 'ℹ️',
  });
};

// Warning toast
export const showWarning = (message: string, duration = 4000) => {
  return toast(message, {
    duration,
    icon: '⚠️',
  });
};

// Custom toast with icon
export const showToast = (message: string, icon: string, duration = 4000) => {
  return toast(message, {
    duration,
    icon,
  });
};

// Copy to clipboard with toast
export const copyToClipboard = async (
  text: string,
  successMessage = 'Copied to clipboard!',
  errorMessage = 'Failed to copy'
) => {
  try {
    await navigator.clipboard.writeText(text);
    showSuccess(successMessage);
    return true;
  } catch (error) {
    showError(errorMessage);
    return false;
  }
};

// Download file with toast
export const downloadFile = (
  data: string | Blob,
  filename: string,
  successMessage = 'Download started',
  errorMessage = 'Failed to download'
) => {
  try {
    const blob = typeof data === 'string' ? new Blob([data]) : data;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showSuccess(successMessage);
    return true;
  } catch (error) {
    showError(errorMessage);
    return false;
  }
};

// Promise toast - shows loading, then success/error
export const promiseToast = <T,>(
  promise: Promise<T>,
  {
    loading,
    success,
    error,
  }: {
    loading: string;
    success: string;
    error: string;
  }
) => {
  return toast.promise(promise, {
    loading,
    success,
    error,
  });
};
