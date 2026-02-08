'use client';

import { motion } from 'framer-motion';

interface EvidenceBadgeProps {
  strength: 'strong' | 'moderate' | 'weak';
  type?: string;
  animated?: boolean;
}

export default function EvidenceBadge({ strength, type, animated = true }: EvidenceBadgeProps) {
  // Visual styling per strength level
  const strengthStyles = {
    strong: {
      container:
        'bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/30',
      border: 'border-emerald-400/60 dark:border-emerald-500/40',
      text: 'text-emerald-800 dark:text-emerald-200',
      icon: '●',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      glow: '0 0 16px rgba(16, 185, 129, 0.2)',
    },
    moderate: {
      container:
        'bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/30',
      border: 'border-amber-400/60 dark:border-amber-500/40 border-dashed',
      text: 'text-amber-800 dark:text-amber-200',
      icon: '◐',
      iconColor: 'text-amber-600 dark:text-amber-400',
      glow: '0 0 16px rgba(245, 158, 11, 0.2)',
    },
    weak: {
      container:
        'bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/40 dark:to-slate-700/30',
      border: 'border-slate-400/60 dark:border-slate-500/40 border-dashed',
      text: 'text-slate-700 dark:text-slate-300',
      icon: '○',
      iconColor: 'text-slate-700 dark:text-slate-300',
      glow: '0 0 16px rgba(100, 116, 139, 0.15)',
    },
  };

  const style = strengthStyles[strength];

  // Type icon mapping - using lucide-react icons for consistency
  const getTypeIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    
    const iconProps = { className: "w-3.5 h-3.5 inline-block mr-1", strokeWidth: 2 };
    
    if (lowerType.includes('empirical') || lowerType.includes('data')) {
      return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>;
    }
    if (lowerType.includes('meta') || lowerType.includes('review')) {
      return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>;
    }
    if (lowerType.includes('trial') || lowerType.includes('rct') || lowerType.includes('controlled')) {
      return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>;
    }
    if (lowerType.includes('case') || lowerType.includes('study')) {
      return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>;
    }
    if (lowerType.includes('expert') || lowerType.includes('opinion')) {
      return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>;
    }
    if (lowerType.includes('survey') || lowerType.includes('poll')) {
      return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>;
    }
    if (lowerType.includes('longitudinal')) {
      return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>;
    }
    // Default document icon
    return <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>;
  };

  const strengthLabels = {
    strong: 'Strong Evidence',
    moderate: 'Moderate Evidence',
    weak: 'Limited Evidence',
  };

  const BadgeContent = (
    <div
      className={`
        evidence-badge
        ${style.container}
        ${style.border}
      `}
      style={{ boxShadow: style.glow }}
    >
      {/* Strength Indicator */}
      <span className={`evidence-icon ${style.iconColor}`}>{style.icon}</span>

      {/* Label */}
      <span className={`evidence-text ${style.text}`}>{strengthLabels[strength]}</span>

      {/* Type Badge (if provided) */}
      {type && (
        <>
          <span className={`evidence-divider ${style.text}`}>·</span>
          <span className="evidence-type flex items-center">
            {getTypeIcon(type)} {type}
          </span>
        </>
      )}

      {/* Faceted shine overlay */}
      <div className="evidence-shine" />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.2,
        }}
        className="inline-block"
      >
        {BadgeContent}
      </motion.div>
    );
  }

  return <div className="inline-block">{BadgeContent}</div>;
}

// CSS-in-JS styles for scoped styling
const styles = `
  .evidence-badge {
    @apply relative inline-flex items-center gap-2;
    @apply px-3 py-1.5 rounded-lg;
    @apply text-xs font-semibold;
    @apply border;
    @apply transition-all duration-200;
    @apply overflow-hidden;
  }

  .evidence-badge:hover {
    @apply scale-105;
    @apply brightness-105;
  }

  .evidence-icon {
    @apply text-sm font-bold;
    @apply leading-none;
  }

  .evidence-text {
    @apply font-bold tracking-wide uppercase;
    @apply text-[10px];
  }

  .evidence-divider {
    @apply opacity-40 mx-0.5;
  }

  .evidence-type {
    @apply text-xs font-medium;
    @apply opacity-80;
  }

  .evidence-shine {
    @apply absolute inset-0;
    @apply opacity-20;
    @apply pointer-events-none;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255, 255, 255, 0.8) 45%,
      rgba(255, 255, 255, 0.9) 50%,
      rgba(255, 255, 255, 0.8) 55%,
      transparent 100%
    );
    background-size: 200% 200%;
    animation: shine-sweep 4s ease-in-out infinite;
  }

  @keyframes shine-sweep {
    0%, 100% {
      background-position: -100% 0;
    }
    50% {
      background-position: 200% 0;
    }
  }
`;

// Inject styles into component
if (typeof document !== 'undefined') {
  const styleId = 'evidence-badge-styles';
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }
}
