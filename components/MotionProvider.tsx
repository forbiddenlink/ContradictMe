'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * MotionProvider wraps the app with LazyMotion for optimized bundle size.
 *
 * Benefits:
 * - Reduces framer-motion bundle from ~34KB to ~4.6KB (-88%)
 * - Loads animation features on-demand
 * - Improves initial page load performance
 *
 * Usage: Import 'm' instead of 'motion' in components:
 * ```tsx
 * import { m } from 'framer-motion';
 * <m.div animate={{ scale: 1.2 }} />
 * ```
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
