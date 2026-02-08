/**
 * Toast Notification Provider
 * Wraps react-hot-toast with custom styling and animations
 */

'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Default options
        duration: 5000,
        style: {
          background: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: '0.75rem',
          padding: '1rem',
          fontSize: '0.875rem',
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.10)',
          backdropFilter: 'blur(20px) saturate(180%)',
        },

        // Success toast
        success: {
          duration: 4000,
          iconTheme: {
            primary: 'var(--color-success)',
            secondary: '#ffffff',
          },
          style: {
            border: '1px solid var(--success-500)',
          },
        },

        // Error toast
        error: {
          duration: 7000,
          iconTheme: {
            primary: 'var(--color-error)',
            secondary: '#ffffff',
          },
          style: {
            border: '1px solid var(--crimson-500)',
          },
        },

        // Loading toast
        loading: {
          iconTheme: {
            primary: 'var(--color-accent)',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
}

// Custom toast functions with better typing
export { toast } from 'react-hot-toast';
