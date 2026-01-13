import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#1A2332',
          800: '#2A3C52',
          700: '#3A4D63',
          600: '#4A5D73',
        },
        terracotta: {
          500: '#E8A87C',
          400: '#EDB890',
          300: '#F2C8A4',
        },
        sage: {
          700: '#3D5A46',
          600: '#5A7C65',
          500: '#779E83',
        },
        amber: {
          500: '#F57C00',
        },
        crimson: {
          500: '#C62828',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
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
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 1.4s ease-in-out infinite',
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
