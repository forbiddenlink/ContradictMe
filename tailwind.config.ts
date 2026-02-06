import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 2026 Deep Ocean Professional Palette
        slate: {
          950: '#0A1628',
          900: '#0F2137',
          800: '#1A2F47',
          700: '#2D4057',
          600: '#455A74',
        },
        teal: {
          600: '#0D7C7D',
          500: '#0D9A9B',
          400: '#1DBAB4',
          300: '#4DD4CF',
          200: '#8CE8E4',
          100: '#D1F5F3',
        },
        amber: {
          600: '#D97706',
          500: '#F59E0B',
          400: '#FBBF24',
          300: '#FCD34D',
        },
        // Violet for counterarguments - intellectual stimulation
        violet: {
          700: '#6D28D9',
          600: '#7C3AED',
          500: '#8B5CF6',
          400: '#A78BFA',
          300: '#C4B5FD',
          200: '#DDD6FE',
          100: '#EDE9FE',
          50: '#F5F3FF',
        },
        success: {
          500: '#10B981',
        },
        crimson: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'slide-in-up': 'slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'count-up': 'countUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        shimmer: 'shimmer 2s linear infinite',
        typing: 'typing 1.4s ease-in-out infinite',
      },
      keyframes: {
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          from: { backgroundPosition: '-1000px 0' },
          to: { backgroundPosition: '1000px 0' },
        },
        typing: {
          '0%, 60%, 100%': { opacity: '0.3' },
          '30%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
