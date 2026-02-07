'use client';

import { motion } from 'framer-motion';

interface ConfidenceBarProps {
  score: number;
  label: string;
  showNumeric?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function ConfidenceBar({
  score,
  label,
  showNumeric = true,
  size = 'md',
  animated = true,
}: ConfidenceBarProps) {
  // Confidence level determination
  const getConfidenceLevel = (s: number): 'high' | 'medium' | 'low' => {
    if (s >= 85) return 'high';
    if (s >= 60) return 'medium';
    return 'low';
  };

  const confidenceLevel = getConfidenceLevel(score);

  // Visual styling per confidence level
  const levelStyles = {
    high: {
      gradient: 'from-emerald-500 via-emerald-400 to-teal-400',
      bg: 'bg-emerald-500/20 dark:bg-emerald-500/10',
      text: 'text-emerald-700 dark:text-emerald-300',
      glow: 'rgba(16, 185, 129, 0.3)',
      label: 'High Confidence',
    },
    medium: {
      gradient: 'from-amber-500 via-amber-400 to-yellow-400',
      bg: 'bg-amber-500/20 dark:bg-amber-500/10',
      text: 'text-amber-700 dark:text-amber-300',
      glow: 'rgba(245, 158, 11, 0.3)',
      label: 'Moderate Confidence',
    },
    low: {
      gradient: 'from-slate-500 via-slate-400 to-gray-400',
      bg: 'bg-slate-500/20 dark:bg-slate-500/10',
      text: 'text-slate-700 dark:text-slate-300',
      glow: 'rgba(100, 116, 139, 0.3)',
      label: 'Low Confidence',
    },
  };

  const sizeClasses = {
    sm: {
      container: 'h-1.5',
      bar: 'h-1.5',
      text: 'text-[10px]',
    },
    md: {
      container: 'h-2',
      bar: 'h-2',
      text: 'text-xs',
    },
    lg: {
      container: 'h-3',
      bar: 'h-3',
      text: 'text-sm',
    },
  };

  const style = levelStyles[confidenceLevel];
  const sizeClass = sizeClasses[size];

  return (
    <div className="confidence-bar-wrapper">
      {/* Label Row */}
      <div className="flex items-center justify-between mb-1.5">
        <span className={`font-semibold ${sizeClass.text} ${style.text}`}>
          {label}
        </span>
        {showNumeric && (
          <span className={`${sizeClass.text} font-bold ${style.text} tabular-nums`}>
            {score}
            <span className="opacity-60">/100</span>
          </span>
        )}
      </div>

      {/* Progress Bar Container */}
      <div className={`confidence-bar-track ${sizeClass.container} ${style.bg}`}>
        {/* Animated Fill */}
        {animated ? (
          <motion.div
            className={`confidence-bar-fill ${sizeClass.bar} bg-gradient-to-r ${style.gradient}`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{
              duration: 1,
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.1,
            }}
            style={{
              boxShadow: `0 0 12px ${style.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.4)`,
            }}
          />
        ) : (
          <div
            className={`confidence-bar-fill ${sizeClass.bar} bg-gradient-to-r ${style.gradient}`}
            style={{
              width: `${score}%`,
              boxShadow: `0 0 12px ${style.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.4)`,
            }}
          />
        )}

        {/* Shimmer effect */}
        <div className="confidence-bar-shimmer" />
      </div>

      {/* Confidence Level Label (optional) */}
      {size !== 'sm' && (
        <div className="mt-1">
          <span className={`${sizeClass.text} ${style.text} opacity-75 font-medium`}>
            {style.label}
          </span>
        </div>
      )}

      <style jsx>{`
        .confidence-bar-wrapper {
          @apply w-full;
        }

        .confidence-bar-track {
          @apply relative w-full rounded-full overflow-hidden;
          @apply backdrop-blur-sm;
          @apply border border-slate-200/50 dark:border-slate-700/50;
        }

        .confidence-bar-fill {
          @apply relative rounded-full;
          @apply transition-all duration-500 ease-out;
        }

        .confidence-bar-shimmer {
          @apply absolute inset-0;
          @apply opacity-30;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer-slide 3s ease-in-out infinite;
        }

        @keyframes shimmer-slide {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
