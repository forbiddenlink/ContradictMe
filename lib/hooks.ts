import { useEffect, useState } from 'react';

/**
 * Custom hook for keyboard shortcuts
 * Provides app-wide keyboard navigation
 */
export function useKeyboardShortcuts(handlers: {
  onFocusSearch?: () => void;
  onEscape?: () => void;
  onNewChat?: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Cmd/Ctrl + K to focus search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        handlers.onFocusSearch?.();
      }

      // Escape to close/clear
      if (event.key === 'Escape') {
        handlers.onEscape?.();
      }

      // Cmd/Ctrl + N for new chat
      if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
        event.preventDefault();
        handlers.onNewChat?.();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}

/**
 * Custom hook to detect if user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Custom hook for focus management
 * Ensures keyboard navigation is smooth and logical
 */
export function useFocusManagement(ref: React.RefObject<HTMLElement>, shouldFocus: boolean) {
  useEffect(() => {
    if (shouldFocus && ref.current) {
      ref.current.focus();
    }
  }, [shouldFocus, ref]);
}
