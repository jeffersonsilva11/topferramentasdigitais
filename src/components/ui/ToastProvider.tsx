'use client';

import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/contexts/ThemeContext';

export default function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: theme === 'dark' ? '#1f2937' : '#ffffff',
          color: theme === 'dark' ? '#f3f4f6' : '#111827',
          border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          fontSize: '14px',
          fontWeight: '500',
        },
        // Success style
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10b981',
            secondary: '#ffffff',
          },
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
            border: `1px solid #10b981`,
          },
        },
        // Error style
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#ffffff',
          },
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
            border: `1px solid #ef4444`,
          },
        },
        // Loading style
        loading: {
          iconTheme: {
            primary: '#3b82f6',
            secondary: '#ffffff',
          },
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
            border: `1px solid #3b82f6`,
          },
        },
      }}
    />
  );
}
