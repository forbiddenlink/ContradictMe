'use client';

import { useTheme } from './ThemeProvider';
import { m } from 'framer-motion';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <m.button
      onClick={cycleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-200"
      aria-label={`Current theme: ${theme}. Click to change.`}
      title={`Theme: ${theme}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Icon container - prevents transform conflicts */}
      <div className="relative w-[18px] h-[18px]">
        {/* Sun icon (light mode) */}
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 text-amber-500"
          initial={false}
          animate={{
            opacity: resolvedTheme === 'light' ? 1 : 0,
            scale: resolvedTheme === 'light' ? 1 : 0.5,
            rotate: resolvedTheme === 'light' ? 0 : -90,
          }}
          transition={{ duration: 0.2 }}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </m.svg>

        {/* Moon icon (dark mode) */}
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 text-violet-400"
          initial={false}
          animate={{
            opacity: resolvedTheme === 'dark' ? 1 : 0,
            scale: resolvedTheme === 'dark' ? 1 : 0.5,
            rotate: resolvedTheme === 'dark' ? 0 : 90,
          }}
          transition={{ duration: 0.2 }}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </m.svg>
      </div>

      {/* System indicator */}
      {theme === 'system' && (
        <m.span
          className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-teal-500 rounded-full border-2 border-white dark:border-slate-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          title="Following system preference"
        />
      )}
    </m.button>
  );
}
