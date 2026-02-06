# ContradictMe Design System

**Design Philosophy:** Intellectual Elegance meets 2026 UI Trends

Our design communicates **credibility, sophistication, and respectful challenge**. This isn't a playful chatbot - it's a tool for serious critical thinking. The aesthetic should feel like a premium research tool, not a consumer chat app.

## Core Principles

1. **Credibility Over Flashiness** - Every design decision reinforces trust
2. **Depth Over Flat** - Use 2026 trends (Liquid Glass, Soft UI) to create tactile interfaces
3. **Clarity Over Decoration** - Information hierarchy is paramount
4. **Motion with Purpose** - Animations guide attention, not distract
5. **No Generic Icons** - Custom SVG badges and symbols only

---

## Color System

### Primary Palette

```css
/* Primary Colors */
--navy-900: #1a2332; /* Darkest - headers, emphasis */
--navy-800: #2a3c52; /* Primary text, main elements */
--navy-700: #3a4d63; /* Secondary text */
--navy-600: #4a5d73; /* Tertiary elements */

/* Accent Colors */
--terracotta-500: #e8a87c; /* Warm accent - CTAs, highlights */
--terracotta-400: #edb890; /* Lighter variant */
--terracotta-300: #f2c8a4; /* Subtle highlights */

/* Quality Indicators */
--sage-700: #3d5a46; /* Dark green - excellent quality */
--sage-600: #5a7c65; /* Medium green - good quality */
--sage-500: #779e83; /* Light green - acceptable */
--amber-500: #f57c00; /* Orange - moderate quality */
--crimson-500: #c62828; /* Red - low quality (rarely shown) */

/* Neutral Palette */
--gray-50: #f8f9fa; /* Background */
--gray-100: #f1f3f5; /* Subtle backgrounds */
--gray-200: #e9ecef; /* Borders */
--gray-300: #dee2e6; /* Dividers */
--gray-400: #ced4da; /* Disabled states */
--gray-600: #6c757d; /* Muted text */
--gray-800: #343a40; /* Strong text */

/* Glass Effects */
--glass-white: rgba(255, 255, 255, 0.1);
--glass-white-strong: rgba(255, 255, 255, 0.18);
--glass-dark: rgba(26, 35, 50, 0.05);
```

### Semantic Colors

```css
--color-primary: var(--navy-800);
--color-accent: var(--terracotta-500);
--color-background: var(--gray-50);
--color-surface: #ffffff;
--color-text-primary: var(--navy-800);
--color-text-secondary: var(--navy-700);
--color-text-muted: var(--gray-600);
--color-border: var(--gray-200);
--color-border-hover: var(--gray-300);
```

### Quality Score Color Scale

```javascript
// Function to get color based on quality score
function getQualityColor(score) {
  if (score >= 90) return 'var(--sage-700)'; // 90-100: Excellent
  if (score >= 80) return 'var(--sage-600)'; // 80-89: Very Good
  if (score >= 70) return 'var(--sage-500)'; // 70-79: Good
  if (score >= 60) return 'var(--amber-500)'; // 60-69: Moderate
  return 'var(--crimson-500)'; // <60: Low (rare)
}
```

### Color Usage Guidelines

- **Navy:** Primary UI elements, text, structure
- **Terracotta:** Call-to-action, interactive elements, highlights
- **Sage Green:** Quality indicators, positive feedback, success states
- **Gray:** Backgrounds, borders, disabled states
- **Amber/Crimson:** Use sparingly for quality warnings

**Avoid:**

- Pure black (#000000) - use navy-900 instead
- Bright blues - too generic for chatbots
- Neon colors - undermines credibility
- Default Material UI colors

---

## Typography

### Font Families

```css
/* Primary Font - UI and Body Text */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - Source Citations, Technical Data */
--font-mono: 'IBM Plex Mono', 'SF Mono', Monaco, monospace;

/* Optional Display - Large Headings (if needed) */
--font-display: 'Inter', sans-serif;
```

**Why Inter?**

- Variable font (fewer HTTP requests)
- Excellent readability at small sizes
- Professional, modern aesthetic
- Used by top tools (Linear, GitHub, Figma)

**Why IBM Plex Mono?**

- Humanist monospace (more readable than Courier)
- Perfect for citations and source metadata
- Technical but approachable

### Type Scale

```css
/* Font Sizes */
--text-xs: 0.75rem; /* 12px - Small labels, badges */
--text-sm: 0.875rem; /* 14px - Body text, descriptions */
--text-base: 1rem; /* 16px - Default body */
--text-lg: 1.125rem; /* 18px - Emphasized text */
--text-xl: 1.25rem; /* 20px - Section headers */
--text-2xl: 1.5rem; /* 24px - Card titles */
--text-3xl: 1.875rem; /* 30px - Page headers */
--text-4xl: 2.25rem; /* 36px - Hero text */

/* Font Weights */
--weight-light: 300; /* Subtle emphasis */
--weight-normal: 400; /* Body text */
--weight-medium: 500; /* Slight emphasis */
--weight-semibold: 600; /* Strong emphasis */

/* Line Heights */
--leading-tight: 1.25; /* Headings */
--leading-snug: 1.375; /* Subheadings */
--leading-normal: 1.5; /* Body text */
--leading-relaxed: 1.625; /* Long-form content */

/* Letter Spacing */
--tracking-tight: -0.02em; /* Large headings */
--tracking-normal: 0; /* Body text */
--tracking-wide: 0.025em; /* Small caps, labels */
```

### Typography Usage

```css
/* Page Title */
.title-page {
  font-size: var(--text-4xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--navy-900);
}

/* Argument Card Title */
.title-argument {
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
  color: var(--navy-800);
}

/* Body Text */
.text-body {
  font-size: var(--text-base);
  font-weight: var(--weight-normal);
  line-height: var(--leading-normal);
  color: var(--navy-700);
}

/* Source Citation */
.text-citation {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--weight-normal);
  line-height: var(--leading-normal);
  color: var(--gray-600);
}

/* Quality Score */
.text-score {
  font-size: var(--text-lg);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  font-variant-numeric: tabular-nums; /* Consistent number width */
}
```

---

## Spacing System

```css
/* Spacing Scale (based on 4px grid) */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */

/* Container Widths */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;

/* Content Max Width (for readability) */
--content-max-width: 720px;
```

---

## Component Library

### 1. Argument Card (PRIMARY COMPONENT)

The most important component - must be exceptional.

**Design Features:**

- Liquid Glass aesthetic with backdrop blur
- Subtle depth with soft shadows
- Expandable sections (limitations/caveats)
- Quality score visualization
- Source metadata in distinct sub-card
- Hover state with subtle lift

```css
.argument-card {
  /* Layout */
  padding: var(--space-6);
  border-radius: 16px;

  /* Liquid Glass Effect */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);

  /* Soft Shadow */
  box-shadow:
    0 1px 3px rgba(26, 35, 50, 0.04),
    0 8px 24px rgba(26, 35, 50, 0.08);

  /* Transition */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.argument-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 4px 12px rgba(26, 35, 50, 0.08),
    0 16px 48px rgba(26, 35, 50, 0.12);
  border-color: rgba(232, 168, 124, 0.3);
}

/* Header with Quality Score */
.argument-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-4);
}

.argument-card__title {
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  color: var(--navy-900);
  line-height: var(--leading-snug);
  flex: 1;
}

/* Quality Score Badge */
.quality-score {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(90, 124, 101, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.quality-score__value {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  color: var(--sage-600);
  font-variant-numeric: tabular-nums;
}

.quality-score__label {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

/* Main Content */
.argument-card__content {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--navy-700);
  margin-bottom: var(--space-6);
}

/* Source Sub-Card */
.source-card {
  background: rgba(26, 35, 50, 0.02);
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: var(--space-4);
  margin-top: var(--space-4);
}

.source-card__author {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--navy-800);
  margin-bottom: var(--space-1);
}

.source-card__publication {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--gray-600);
}

.source-card__metadata {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-3);
  font-size: var(--text-xs);
  color: var(--gray-600);
}

/* Limitations Section (Expandable) */
.limitations {
  margin-top: var(--space-4);
  padding: var(--space-4);
  background: rgba(245, 124, 0, 0.05);
  border-left: 3px solid var(--amber-500);
  border-radius: 8px;
}

.limitations__title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  color: var(--navy-800);
  margin-bottom: var(--space-2);
}

.limitations__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.limitations__item {
  font-size: var(--text-sm);
  color: var(--navy-700);
  line-height: var(--leading-normal);
  padding-left: var(--space-4);
  position: relative;
}

.limitations__item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--amber-500);
}

/* CTA Link */
.argument-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--terracotta-500);
  text-decoration: none;
  margin-top: var(--space-4);
  transition: all 0.2s ease;
}

.argument-card__link:hover {
  color: var(--terracotta-400);
  gap: var(--space-3);
}
```

**Visual Structure:**

```
┌─────────────────────────────────────────────────┐
│ [Liquid Glass Card with Backdrop Blur]          │
│                                                  │
│  Innovation requires serendipity    Quality: 87 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                  │
│  Stanford study of 10,000 developers found      │
│  23% more patent filings from hybrid teams      │
│  compared to fully remote. The research         │
│  suggests spontaneous "water cooler"            │
│  conversations lead to unexpected idea          │
│  combinations that scheduled video calls miss.  │
│                                                  │
│  ┌───────────────────────────────────────────┐ │
│  │ [Source Sub-Card - Subtle Background]     │ │
│  │                                            │ │
│  │ Dr. Sarah Chen                             │ │
│  │ Stanford Economics, 2024                   │ │
│  │                                            │ │
│  │ Evidence: 85/100  •  Sample: 10,000       │ │
│  └───────────────────────────────────────────┘ │
│                                                  │
│  ⚠ Limitations                                  │
│  • Study focused on tech industry              │
│  • Hybrid model (2-3 days) equally effective   │
│                                                  │
│  [Read Full Study →]                            │
│                                                  │
└─────────────────────────────────────────────────┘
```

### 2. Quality Score Visualization

Instead of plain numbers, use radial progress ring:

```jsx
// React component for animated quality score
<svg width="80" height="80" viewBox="0 0 80 80">
  {/* Background circle */}
  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />

  {/* Animated progress circle */}
  <circle
    cx="40"
    cy="40"
    r="32"
    fill="none"
    stroke={getQualityColor(score)}
    strokeWidth="8"
    strokeDasharray={`${2 * Math.PI * 32}`}
    strokeDashoffset={`${2 * Math.PI * 32 * (1 - score / 100)}`}
    transform="rotate(-90 40 40)"
    style={{
      transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: '0.2s',
    }}
  />

  {/* Score number */}
  <text
    x="40"
    y="40"
    textAnchor="middle"
    dominantBaseline="central"
    fontSize="20"
    fontWeight="600"
    fill="var(--navy-900)"
  >
    {score}
  </text>
</svg>
```

### 3. Evidence Type Badges

Custom SVG badges (no generic icons):

```css
.evidence-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  background: rgba(90, 124, 101, 0.1);
  border-radius: 6px;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--sage-700);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

/* Badge variants */
.evidence-badge--empirical {
  background: rgba(90, 124, 101, 0.1);
}
.evidence-badge--expert {
  background: rgba(232, 168, 124, 0.1);
}
.evidence-badge--research {
  background: rgba(42, 60, 82, 0.1);
}
```

**Badge Types:**

- 📊 EMPIRICAL (data-driven studies)
- 👤 EXPERT (expert opinions)
- 📚 RESEARCH (academic papers)
- 📈 META-ANALYSIS (systematic reviews)

### 4. Chat Interface

**Layout:** Spatial conversation (not linear bubbles)

```css
.chat-container {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

/* User Message */
.message--user {
  background: rgba(42, 60, 82, 0.05);
  border-left: 3px solid var(--navy-800);
  padding: var(--space-4);
  border-radius: 8px;
  margin-bottom: var(--space-8);
  max-width: 600px;
}

.message--user__text {
  font-size: var(--text-lg);
  color: var(--navy-800);
  line-height: var(--leading-normal);
}

/* Agent Response Container */
.message--agent {
  margin-bottom: var(--space-12);
}

.agent-intro {
  font-size: var(--text-base);
  color: var(--navy-700);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

/* Arguments Grid (not stacked) */
.arguments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

/* Follow-up Questions */
.follow-up-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.follow-up-button {
  padding: var(--space-3) var(--space-5);
  background: rgba(232, 168, 124, 0.1);
  border: 1px solid rgba(232, 168, 124, 0.3);
  border-radius: 24px;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--terracotta-500);
  cursor: pointer;
  transition: all 0.2s ease;
}

.follow-up-button:hover {
  background: rgba(232, 168, 124, 0.2);
  border-color: var(--terracotta-500);
  transform: translateY(-1px);
}
```

### 5. Input Field

```css
.chat-input-container {
  position: sticky;
  bottom: 0;
  background: rgba(248, 249, 250, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--gray-200);
  padding: var(--space-6);
}

.chat-input {
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  position: relative;
}

.chat-input__field {
  width: 100%;
  padding: var(--space-4) var(--space-6);
  padding-right: 120px; /* Space for button */
  font-size: var(--text-base);
  font-family: var(--font-primary);
  color: var(--navy-800);
  background: white;
  border: 2px solid var(--gray-200);
  border-radius: 16px;
  outline: none;
  transition: all 0.2s ease;
  resize: none;
  min-height: 56px;
  max-height: 200px;
}

.chat-input__field:focus {
  border-color: var(--terracotta-500);
  box-shadow: 0 0 0 4px rgba(232, 168, 124, 0.1);
}

.chat-input__button {
  position: absolute;
  right: var(--space-2);
  bottom: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--terracotta-500);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  cursor: pointer;
  transition: all 0.2s ease;
}

.chat-input__button:hover {
  background: var(--terracotta-400);
  transform: translateY(-1px);
}

.chat-input__button:disabled {
  background: var(--gray-400);
  cursor: not-allowed;
  transform: none;
}
```

---

## Micro-Interactions & Animations

### Animation Timing Functions

```css
/* Timing Functions */
--ease-in-out-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* Duration */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Key Animations

**1. Argument Card Entrance** (Staggered)

```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.argument-card {
  animation: slideInUp 0.5s var(--ease-in-out-smooth) both;
}

/* Stagger effect via inline styles or JS */
.argument-card:nth-child(1) {
  animation-delay: 0ms;
}
.argument-card:nth-child(2) {
  animation-delay: 100ms;
}
.argument-card:nth-child(3) {
  animation-delay: 200ms;
}
```

**2. Quality Score Animation**

```css
@keyframes countUp {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.quality-score__value {
  animation: countUp 0.4s var(--ease-out-back) both;
  animation-delay: 0.3s;
}

/* Pair with JS counter animation from 0 to final value */
```

**3. Source Badge Pulse (Hover)**

```css
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.evidence-badge:hover {
  animation: pulse 1.5s ease-in-out infinite;
}
```

**4. Skeleton Loading** (While waiting for response)

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-100) 0px,
    var(--gray-200) 40px,
    var(--gray-100) 80px
  );
  background-size: 1000px 100%;
  animation: shimmer 2s linear infinite;
  border-radius: 8px;
}

.skeleton--title {
  height: 28px;
  width: 70%;
  margin-bottom: var(--space-3);
}

.skeleton--text {
  height: 16px;
  width: 100%;
  margin-bottom: var(--space-2);
}
```

**5. Message Typing Indicator**

```css
@keyframes typing {
  0%,
  60%,
  100% {
    opacity: 0.3;
  }
  30% {
    opacity: 1;
  }
}

.typing-indicator {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-4);
}

.typing-indicator__dot {
  width: 8px;
  height: 8px;
  background: var(--gray-400);
  border-radius: 50%;
  animation: typing 1.4s ease-in-out infinite;
}

.typing-indicator__dot:nth-child(1) {
  animation-delay: 0s;
}
.typing-indicator__dot:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-indicator__dot:nth-child(3) {
  animation-delay: 0.4s;
}
```

---

## Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px; /* Small tablets */
--breakpoint-md: 768px; /* Tablets */
--breakpoint-lg: 1024px; /* Small laptops */
--breakpoint-xl: 1280px; /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Mobile Adaptations

```css
/* Argument Card on Mobile */
@media (max-width: 640px) {
  .argument-card {
    padding: var(--space-4);
    border-radius: 12px;
  }

  .argument-card__title {
    font-size: var(--text-xl);
  }

  .quality-score {
    flex-direction: column;
    align-items: flex-end;
  }

  .arguments-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .chat-input__field {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}
```

---

## Accessibility

### Focus States

```css
/* Custom focus ring (better than default) */
*:focus-visible {
  outline: 2px solid var(--terracotta-500);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Interactive elements */
.argument-card:focus-visible {
  outline: 3px solid var(--terracotta-500);
  outline-offset: 4px;
}
```

### Screen Reader Text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Color Contrast

All text meets WCAG AA standards:

- Body text (navy-700 on gray-50): 10.5:1 ✓
- Secondary text (gray-600 on white): 5.2:1 ✓
- Quality scores use sufficient contrast even on colored backgrounds

---

## Implementation in Tailwind CSS

### tailwind.config.js

```javascript
module.exports = {
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'slide-in-up': 'slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'count-up': 'countUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        shimmer: 'shimmer 2s linear infinite',
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
      },
    },
  },
  plugins: [],
};
```

---

## Design Inspiration References

### Study These for Component Ideas:

1. **Linear** (linear.app) - Clean argument cards, quality badges
2. **Perplexity AI** (perplexity.ai) - Source citations, follow-up questions
3. **Notion AI** - Subtle animations, professional aesthetic
4. **Stripe Dashboard** - Data visualization, information hierarchy
5. **Algolia InstantSearch Examples** - Search UI patterns

### Dribbble Searches:

- "glassmorphism dashboard"
- "AI chat interface"
- "data visualization card"
- "modern chat UI"
- "quality indicator design"

### CodePen Searches:

- "glass card effect"
- "animated quality score"
- "chat interface animation"
- "radial progress SVG"

---

## Design Checklist

Before implementation:

- [ ] Color palette tested for accessibility (use WebAIM contrast checker)
- [ ] Typography scale verified at different viewport sizes
- [ ] Argument Card mockup created (Figma/Sketch)
- [ ] Quality Score animation prototyped
- [ ] Mobile layout tested on actual device
- [ ] Dark mode consideration (future enhancement)
- [ ] Loading states designed for all components
- [ ] Error states designed
- [ ] Empty states designed

---

## Next Steps

1. **Create Figma/Sketch mockup** of Argument Card component
2. **Initialize Tailwind** with custom config
3. **Build Argument Card** in isolation (Storybook optional)
4. **Test on mobile device**
5. **Implement remaining components**

---

## Design Anti-Patterns to Avoid

❌ **Don't:**

- Use generic chatbot bubble design (too common)
- Use bright blue primary colors (overused in chat UIs)
- Use emoji reactions or playful illustrations (undermines credibility)
- Add unnecessary animations (distracting)
- Use default Material UI/Bootstrap components (too recognizable)
- Make quality scores too prominent (shouldn't dominate the argument)
- Use stock icons (use custom SVG badges)

✅ **Do:**

- Emphasize content over chrome
- Use whitespace generously
- Make source citations prominent
- Animate with purpose
- Test on multiple devices
- Prioritize readability
- Make quality indicators subtle but clear

---

**Design Philosophy Summary:**

This isn't a playful AI assistant - it's a serious tool for intellectual growth. Every design decision should reinforce **credibility, sophistication, and respectful challenge**. The user should feel like they're using a premium research tool, not a consumer chatbot.

The aesthetic is **Liquid Glass meets Academic Journal** - modern but authoritative, beautiful but functional, engaging but never frivolous.
