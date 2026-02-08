'use client';

/**
 * Component Showcase Demo
 *
 * This file demonstrates all new Crystalline Intelligence design components
 * with real data examples. Use this for visual testing and documentation.
 *
 * To view: Create a route at /app/demo/page.tsx that imports this component
 */

import { useState } from 'react';
import ArgumentCardEnhanced from '../arguments/ArgumentCardEnhanced';
import ConfidenceBar from '../ui/ConfidenceBar';
import EvidenceBadge from '../ui/EvidenceBadge';
import SourceCredibilityBadge from '../ui/SourceCredibilityBadge';
import CitationTooltip from '../ui/CitationTooltip';
import ThinkingIndicator from '../ui/ThinkingIndicator';
import { Argument } from '@/lib/types';

// Sample argument data
const sampleArgument: Argument = {
  objectID: 'demo-1',
  position: 'against',
  opposingBeliefs: ['Four-day workweeks reduce productivity'],
  mainClaim: 'Four-day workweeks increase productivity and employee wellbeing without reducing output',
  evidence: 'A comprehensive UK trial involving 61 companies and 2,900 workers showed a 35% increase in revenue, 57% decrease in employee turnover, and 71% reduction in burnout levels. 92% of companies continued the four-day workweek after the trial ended.',
  supportingPoints: [
    'Companies reported revenue increases of 35% on average during the trial period',
    '57% reduction in employee turnover, saving recruitment and training costs',
    '71% decrease in burnout levels and 39% decrease in stress among workers',
    '92% of participating companies chose to continue with the four-day workweek permanently'
  ],
  limitations: 'Implementation varies significantly by industry. Roles requiring continuous coverage (healthcare, customer service) face unique challenges. Hourly workers may see income reduction if not properly transitioned to salaried compensation.',
  sourceMetadata: {
    title: 'Four Day Week UK Pilot Results: Final Report',
    authors: ['Dr. Juliet Schor', 'Dr. Jan-Emmanuel De Neve'],
    institution: 'Cambridge University & Boston College',
    publicationType: 'peer-reviewed',
    journal: 'Autonomy Research Institute',
    yearPublished: 2023,
    citationCount: 147,
    doi: '10.1234/fdw-uk-2023',
    url: 'https://autonomy.work/portfolio/uk4dwpilot/',
    sampleSize: 2900,
    methodology: 'Randomized controlled trial with 61 companies across multiple industries'
  },
  qualityScore: 89,
  sourceCredibility: 92,
  evidenceStrength: 87,
  argumentCoherence: 90,
  tags: ['Labor', 'Productivity', 'Work-Life Balance', 'Empirical Study'],
  metadata: {
    argumentType: 'empirical',
    evidenceType: 'randomized controlled trial',
    domain: 'Economics',
    subDomain: 'Labor Economics',
    strength: 'strong',
    tags: ['Productivity', 'Labor', 'Wellbeing'],
    createdAt: '2024-01-15',
    lastUpdated: '2024-01-15',
    reviewStatus: 'peer-reviewed',
    curator: 'ContradictMe Team'
  }
};

export default function ComponentShowcase() {
  const [thinkingPhase, setThinkingPhase] = useState(0);

  // Cycle through thinking phases
  const cycleThinkingPhase = () => {
    setThinkingPhase((prev) => (prev + 1) % 4);
  };

  const loadingPhases = [
    { message: 'Understanding your perspective...' },
    { message: 'Searching research databases...' },
    { message: 'Evaluating evidence quality...' },
    { message: 'Formulating counterarguments...' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
            ✨ Crystalline Intelligence Design System
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300">
            Production-grade components for ContradictMe
          </p>
        </div>

        {/* Section 1: Argument Card */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              1. ArgumentCardEnhanced
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              Production-grade argument display with faceted glassmorphism, progressive disclosure, and crystallization animations.
            </p>
          </div>

          <div className="max-w-4xl">
            <ArgumentCardEnhanced argument={sampleArgument} index={0} />
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Usage:
            </h3>
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
{`<ArgumentCardEnhanced
  argument={argumentData}
  index={0} // for staggered animation
/>`}
            </pre>
          </div>
        </section>

        {/* Section 2: Confidence Bars */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              2. ConfidenceBar
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              Visual confidence indicators with animated fills, color-coded by score level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                High Confidence (≥85%)
              </h3>
              <ConfidenceBar score={92} label="Quality Score" size="lg" animated={true} />
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                Medium Confidence (60-84%)
              </h3>
              <ConfidenceBar score={72} label="Source Credibility" size="lg" animated={true} />
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                Low Confidence (&lt;60%)
              </h3>
              <ConfidenceBar score={45} label="Evidence Strength" size="lg" animated={true} />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Usage:
            </h3>
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
{`<ConfidenceBar
  score={89}
  label="Quality Score"
  size="md"
  showNumeric={true}
  animated={true}
/>`}
            </pre>
          </div>
        </section>

        {/* Section 3: Evidence Badges */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              3. EvidenceBadge
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              Visual strength indicators with type display and animated entrance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <EvidenceBadge strength="strong" type="empirical" animated={true} />
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <EvidenceBadge strength="moderate" type="meta-analysis" animated={true} />
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <EvidenceBadge strength="weak" type="case study" animated={true} />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Usage:
            </h3>
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
{`<EvidenceBadge
  strength="strong"
  type="empirical"
  animated={true}
/>`}
            </pre>
          </div>
        </section>

        {/* Section 4: Source Credibility */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              4. SourceCredibilityBadge
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              Source metadata display with compact and full modes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                Compact Mode
              </h3>
              <SourceCredibilityBadge
                source={sampleArgument.sourceMetadata}
                score={92}
                compact={true}
              />
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                Full Mode
              </h3>
              <SourceCredibilityBadge
                source={sampleArgument.sourceMetadata}
                score={92}
                compact={false}
              />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Usage:
            </h3>
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
{`<SourceCredibilityBadge
  source={sourceMetadata}
  score={92}
  compact={false}
/>`}
            </pre>
          </div>
        </section>

        {/* Section 5: Citation Tooltip */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              5. CitationTooltip
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              Perplexity-style inline citations with hover tooltips.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              A comprehensive UK trial showed remarkable results
              <CitationTooltip
                source={sampleArgument.sourceMetadata}
                index={1}
                snippet="61 companies and 2,900 workers showed a 35% increase in revenue"
              />
              , with most companies continuing the practice permanently
              <CitationTooltip
                source={sampleArgument.sourceMetadata}
                index={2}
                snippet="92% of companies continued the four-day workweek after trial"
              />
              .
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              Hover over the <span className="text-violet-600 dark:text-violet-400">[1]</span> and{' '}
              <span className="text-violet-600 dark:text-violet-400">[2]</span> markers to see tooltips
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Usage:
            </h3>
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
{`<CitationTooltip
  source={sourceMetadata}
  index={1}
  snippet="Brief excerpt..."
/>`}
            </pre>
          </div>
        </section>

        {/* Section 6: Thinking Indicator */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              6. ThinkingIndicator
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              Enhanced loading state with morphing blob and progress ring.
            </p>
          </div>

          <div className="p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <ThinkingIndicator
              phase={thinkingPhase}
              message={loadingPhases[thinkingPhase].message}
              totalPhases={4}
            />

            <button
              onClick={cycleThinkingPhase}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Next Phase ({thinkingPhase + 1}/4)
            </button>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Usage:
            </h3>
            <pre className="text-xs text-slate-700 dark:text-slate-300 overflow-x-auto">
{`<ThinkingIndicator
  phase={0}
  message="Understanding your perspective..."
  totalPhases={4}
/>`}
            </pre>
          </div>
        </section>

        {/* Design Principles */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Design Principles
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              The &ldquo;Crystalline Intelligence&rdquo; aesthetic philosophy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/40 dark:to-purple-900/30 rounded-xl border border-violet-200 dark:border-violet-700">
              <h3 className="text-lg font-bold text-violet-900 dark:text-violet-100 mb-3">
                🔮 Faceted Glassmorphism
              </h3>
              <p className="text-sm text-violet-700 dark:text-violet-300">
                Multi-layer glass effects with gradient borders that glow on interaction. Each surface reflects credibility at different angles.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-900/30 rounded-xl border border-teal-200 dark:border-teal-700">
              <h3 className="text-lg font-bold text-teal-900 dark:text-teal-100 mb-3">
                💎 Crystallization Animations
              </h3>
              <p className="text-sm text-teal-700 dark:text-teal-300">
                Arguments materialize like crystalline structures with rotateX + scale animations. Staggered reveals create depth.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-900/30 rounded-xl border border-emerald-200 dark:border-emerald-700">
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-3">
                📊 Progressive Disclosure
              </h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Information unfolds on demand with smooth height transitions. Key metrics visible first, details available on expansion.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-900/30 rounded-xl border border-amber-200 dark:border-amber-700">
              <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-3">
                ✨ Liquid Gradients
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Flowing color transitions between violet (intellectual challenge) and teal (clarity). Animated gradient shifts create dynamism.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-12 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            ✨ Designed by Claude Sonnet 4.5 • Crystalline Intelligence Design System v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
