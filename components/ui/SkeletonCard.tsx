'use client';

/**
 * SkeletonCard - Loading placeholder with shimmer animation
 * Research: 47% activation rate increase (Attention Insight 2025)
 * Makes loading feel instant instead of slow
 */
export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 animate-pulse">
      {/* Header with avatar and quality score */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer bg-[length:200%_100%]" />
        <div className="h-12 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>

      {/* Content lines */}
      <div className="space-y-3">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
      </div>

      {/* Supporting points */}
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
      </div>

      {/* Source metadata */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
        <div className="mt-2 h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
      </div>
    </div>
  );
}

/**
 * SkeletonMessage - Loading placeholder for chat messages
 */
export function SkeletonMessage() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200 dark:from-violet-700 dark:via-violet-600 dark:to-violet-700 animate-shimmer bg-[length:200%_100%]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
      </div>
    </div>
  );
}
