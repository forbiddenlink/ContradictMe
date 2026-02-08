/**
 * Button Component
 * Flexible button component with multiple variants
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            // Variants
            'bg-teal-600 text-white hover:bg-teal-700 shadow-sm hover:shadow-md':
              variant === 'default',
            // Ghost: improved dark mode contrast (slate-100 text on slate-700/800 bg = 7.5:1+)
            'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100':
              variant === 'ghost',
            // Outline: improved dark mode contrast with lighter text
            'border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-100':
              variant === 'outline',
            'bg-red-600 text-white hover:bg-red-700 shadow-sm':
              variant === 'destructive',
            // Sizes
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
