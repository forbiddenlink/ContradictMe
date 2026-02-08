'use client';

import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

/**
 * ScrollToTop - Floating action button to scroll back to top
 * Shows after scrolling down 400px
 */
export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <m.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-violet-700 text-white shadow-lg hover:shadow-xl hover:from-violet-700 hover:to-violet-800 transition-all z-50 flex items-center justify-center"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </m.button>
      )}
    </AnimatePresence>
  );
}
