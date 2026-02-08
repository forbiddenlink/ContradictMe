'use client';

import { motion } from 'framer-motion';

interface EvidenceBadgeProps {
  strength: 'strong' | 'moderate' | 'weak';
  type?: string;
  animated?: boolean;
}

export default function EvidenceBadge({
  strength,
  type,
  animated = true,
}: EvidenceBadgeProps) {
  // Visual styling per strength level
  const strengthStyles = {
    strong: {
      container: 'bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/30',
      border: 'border-emerald-400/60 dark:border-emerald-500/40',
      text: 'text-emerald-800 dark:text-emerald-200',
      icon: '●',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      glow: '0 0 16px rgba(16, 185, 129, 0.2)',
    },
    moderate: {
      container: 'bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/30',
      border: 'border-amber-400/60 dark:border-amber-500/40 border-dashed',
      text: 'text-amber-800 dark:text-amber-200',
      icon: '◐',
      iconColor: 'text-amber-600 dark:text-amber-400',
      glow: '0 0 16px rgba(245, 158, 11, 0.2)',
    },
    weak: {
      container: 'bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/40 dark:to-slate-700/30',
      border: 'border-slate-400/60 dark:border-slate-500/40 border-dashed',
      text: 'text-slate-700 dark:text-slate-300',
      icon: '○',
      iconColor: 'text-slate-700 dark:text-slate-300',
      glow: '0 0 16px rgba(100, 116, 139, 0.15)',
    },
  };

  const style = strengthStyles[strength];

  // Type emoji mapping
  const typeEmojis: Record<string, string> = {
    'empirical': '📊',
    'meta-analysis': '🔬',
    'randomized controlled trial': '🧪',
    'case study': '📋',
    'expert opinion': '👤',
    'survey': '📈',
    'longitudinal study': '📉',
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
      <span className={`evidence-icon ${style.iconColor}`}>
        {style.icon}
      </span>

      {/* Label */}
      <span className={`evidence-text ${style.text}`}>
        {strengthLabels[strength]}
      </span>

      {/* Type Badge (if provided) */}
      {type && (
        <>
          <span className={`evidence-divider ${style.text}`}>·</span>
          <span className="evidence-type">
            {typeEmojis[type.toLowerCase()] || '📄'} {type}
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
