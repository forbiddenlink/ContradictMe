'use client';

interface LoadingSkeletonProps {
  variant?: 'chat' | 'debate' | 'analytics' | 'card';
}

export default function LoadingSkeleton({ variant = 'chat' }: LoadingSkeletonProps) {
  if (variant === 'chat') {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'debate') {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-32" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20" />
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-11/12" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-10/12" />
        </div>
      </div>
    );
  }

  if (variant === 'analytics') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-16 mb-2" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24" />
          </div>
        ))}
      </div>
    );
  }

  // Default card variant
  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4 animate-pulse">
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
      </div>
    </div>
  );
}
