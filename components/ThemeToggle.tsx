'use client';

import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <motion.button
      onClick={cycleTheme}
      className="relative p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm transition-all"
      aria-label={`Current theme: ${theme}. Click to change.`}
      title={`Theme: ${theme}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Sun icon (light mode) */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-amber-500"
        initial={false}
        animate={{
          opacity: resolvedTheme === 'light' ? 1 : 0,
          scale: resolvedTheme === 'light' ? 1 : 0.5,
          rotate: resolvedTheme === 'light' ? 0 : -90,
        }}
        transition={{ duration: 0.2 }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
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
      </motion.svg>

      {/* Moon icon (dark mode) */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-violet-400"
        initial={false}
        animate={{
          opacity: resolvedTheme === 'dark' ? 1 : 0,
          scale: resolvedTheme === 'dark' ? 1 : 0.5,
          rotate: resolvedTheme === 'dark' ? 0 : 90,
        }}
        transition={{ duration: 0.2 }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </motion.svg>

      {/* Spacer to maintain button size */}
      <span className="w-[18px] h-[18px] block opacity-0">
        <svg width="18" height="18" />
      </span>

      {/* System indicator */}
      {theme === 'system' && (
        <motion.span
          className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-teal-500 rounded-full border-2 border-white dark:border-slate-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          title="Following system preference"
        />
      )}
    </motion.button>
  );
}
