/**
 * Enhanced Thinking Indicator
 * Shows contextual AI status with progress visualization
 */

'use client';

import { m } from 'framer-motion';
import { Loader2, Search, Brain, Sparkles } from 'lucide-react';

interface EnhancedThinkingIndicatorProps {
  phase: number;
  message: string;
  totalPhases: number;
  sourceCount?: number;
}

export default function EnhancedThinkingIndicator({
  phase,
  message,
  totalPhases,
  sourceCount,
}: EnhancedThinkingIndicatorProps) {
  const progress = ((phase + 1) / totalPhases) * 100;

  // Choose icon based on phase
  const getIcon = () => {
    if (message.includes('Research') || message.includes('sources')) {
      return <Search className="h-4 w-4" />;
    }
    if (message.includes('Analyz') || message.includes('Understanding')) {
      return <Brain className="h-4 w-4" />;
    }
    if (message.includes('Synthesiz') || message.includes('Formulat')) {
      return <Sparkles className="h-4 w-4" />;
    }
    return <Loader2 className="h-4 w-4 animate-spin" />;
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="inline-flex flex-col gap-2 max-w-sm"
    >
      {/* Main indicator */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br from-violet-50/90 to-teal-50/90 dark:from-violet-950/30 dark:to-teal-950/30 backdrop-blur-md border border-violet-200/40 dark:border-violet-800/40">
        {/* Animated icon */}
        <m.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="flex-shrink-0 text-violet-600 dark:text-violet-400"
        >
          {getIcon()}
        </m.div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {message}
          </p>
          {sourceCount && sourceCount > 0 && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {sourceCount} sources found
            </p>
          )}
        </div>

        {/* Animated dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <m.div
              key={i}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400"
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <m.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-violet-500 to-teal-500 rounded-full"
        />
      </div>
    </m.div>
  );
}
