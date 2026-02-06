'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handleChallenge = (message?: string) => {
    const queryMessage = message || input;
    if (queryMessage.trim()) {
      router.push(`/chat?message=${encodeURIComponent(queryMessage)}`);
    } else {
      router.push('/chat');
    }
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20 relative overflow-hidden"
      role="main"
    >
      {/* Animated Background Orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-20 left-10 w-96 h-96 bg-violet-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '5s' }}
        ></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '4s', animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '2s' }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-64 h-64 bg-violet-300/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '7s', animationDelay: '3s' }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20 relative z-10">
        <header className="text-center mb-14 sm:mb-20">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-5 sm:mb-7 text-balance bg-gradient-to-r from-slate-900 via-violet-700 to-teal-600 bg-clip-text text-transparent bg-liquid leading-[1.1] tracking-[-0.03em]">
            An AI that disagrees with you
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto text-balance">
            Challenge your beliefs with the strongest counterarguments, backed by research. Fight
            echo chambers. Think critically.
          </p>
        </header>

        {/* Chat Input Preview */}
        <div className="mb-12 sm:mb-16">
          <div className="relative">
            <label htmlFor="challenge-input" className="sr-only">
              Enter a belief to challenge
            </label>
            <input
              id="challenge-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChallenge()}
              className="w-full px-5 sm:px-6 py-4 sm:py-5 pr-32 sm:pr-44 rounded-2xl border-2 border-gray-200/60 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all placeholder:text-gray-400 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl hover:bg-white/80 text-base sm:text-lg"
              placeholder="Tell me something you believe strongly..."
              aria-label="Enter a belief you hold strongly"
            />
            <button
              onClick={() => handleChallenge()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 sm:px-7 py-3 sm:py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold text-sm sm:text-base btn-magnetic shadow-lg whitespace-nowrap"
              aria-label="Start challenge conversation"
            >
              Challenge Me
            </button>
          </div>
          <div
            className="mt-5 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-3"
            role="group"
            aria-label="Example topics to challenge"
          >
            <button
              onClick={() => handleChallenge('Nuclear energy is too dangerous')}
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm sm:text-base font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
              aria-label="Challenge belief about nuclear energy"
            >
              Nuclear energy
            </button>
            <button
              onClick={() => handleChallenge('College is always worth it')}
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm sm:text-base font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
              aria-label="Challenge belief about college ROI"
            >
              College ROI
            </button>
            <button
              onClick={() => handleChallenge('AI will cause mass unemployment')}
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm sm:text-base font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
              aria-label="Challenge belief about AI and jobs"
            >
              AI & Jobs
            </button>
            <button
              onClick={() => handleChallenge('UBI makes people lazy')}
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm sm:text-base font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
              aria-label="Challenge belief about universal basic income"
            >
              Universal basic income
            </button>
            <button
              onClick={() => handleChallenge('EVs are always better for the environment')}
              className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm sm:text-base font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
              aria-label="Challenge belief about electric vehicles"
            >
              Electric vehicles
            </button>
          </div>
        </div>

        {/* Example Argument Card */}
        <section className="mb-16 sm:mb-20" aria-labelledby="example-heading">
          <h2
            id="example-heading"
            className="font-display text-lg sm:text-xl font-semibold text-slate-800 mb-5 sm:mb-6 px-2 sm:px-0 tracking-tight"
          >
            Here&apos;s what you&apos;ll get:
          </h2>
          <article className="argument-card">
            {/* Header with Quality Score */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-display title-argument flex-1 text-lg sm:text-xl">
                Innovation requires serendipity
              </h3>
              <div className="quality-score ml-3 sm:ml-4" aria-label="Quality score 87 out of 100">
                <span className="text-score text-violet-600" aria-hidden="true">
                  87
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Quality
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="text-body mb-4 sm:mb-6 text-sm sm:text-base">
              Stanford study of 10,000 developers found 23% more patent filings from hybrid teams
              compared to fully remote. The research suggests spontaneous &ldquo;water cooler&rdquo;
              conversations lead to unexpected idea combinations that scheduled video calls miss.
            </div>

            {/* Source Card */}
            <div className="source-card">
              <div className="text-citation font-medium text-slate-800 mb-1 text-sm sm:text-base">
                Dr. Sarah Chen
              </div>
              <div className="text-citation text-xs sm:text-sm">Stanford Economics, 2024</div>
              <div
                className="flex gap-3 sm:gap-4 mt-2 sm:mt-3 text-[10px] sm:text-xs text-gray-600"
                role="list"
                aria-label="Research metrics"
              >
                <span role="listitem">Evidence: 85/100</span>
                <span aria-hidden="true">•</span>
                <span role="listitem">Sample: 10,000</span>
              </div>
            </div>

            {/* Limitations */}
            <div className="limitations">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                <span aria-hidden="true">⚠</span>
                <span>Limitations</span>
              </div>
              <ul className="list-none p-0 m-0 space-y-1">
                <li className="text-xs sm:text-sm text-slate-700 pl-4 relative">
                  <span className="absolute left-0 text-violet-500" aria-hidden="true">
                    •
                  </span>
                  Study focused on tech industry
                </li>
                <li className="text-xs sm:text-sm text-slate-700 pl-4 relative">
                  <span className="absolute left-0 text-violet-500" aria-hidden="true">
                    •
                  </span>
                  Hybrid model (2-3 days) equally effective
                </li>
              </ul>
            </div>

            {/* CTA Link */}
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 mt-4 transition-all hover:gap-3 hover:text-cyan-600"
              aria-label="Read the full research study"
            >
              Read Full Study
              <span aria-hidden="true">→</span>
            </a>
          </article>
        </section>

        {/* Features */}
        <section
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 mb-16 sm:mb-20 px-2 sm:px-0"
          aria-labelledby="features-heading"
        >
          <h2 id="features-heading" className="sr-only">
            Key Features
          </h2>
          <div className="p-6 sm:p-8 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 rounded-xl bg-gradient-to-br from-violet-100 to-teal-100 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-slate-800 mb-2 sm:mb-2.5 text-base sm:text-lg tracking-tight">
              Evidence-Based
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every argument backed by peer-reviewed research, not just plausible-sounding text.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 rounded-xl bg-gradient-to-br from-violet-100 to-teal-100 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-slate-800 mb-2 sm:mb-2.5 text-base sm:text-lg tracking-tight">
              Steel-Manned
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              The strongest form of opposing arguments, not weak straw-man versions.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl sm:col-span-2 md:col-span-1">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 rounded-xl bg-gradient-to-br from-violet-100 to-teal-100 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </div>
            <h3 className="font-display font-semibold text-slate-800 mb-2 sm:mb-2.5 text-base sm:text-lg tracking-tight">
              Respectful
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Never condescending. Honest about limitations. Promotes thinking, not
              &ldquo;winning.&rdquo;
            </p>
          </div>
        </section>

        {/* Status */}
        <div className="text-center py-6 sm:py-8 px-4 sm:px-6 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-2xl mx-2 sm:mx-0">
          <div className="text-xs sm:text-sm font-semibold text-violet-600 uppercase tracking-wide mb-1.5 sm:mb-2">
            Algolia Agent Studio Challenge
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1.5 sm:mb-2">
            Contest Submission
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 mb-3">
            Building an AI that challenges echo chambers
          </p>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>26 arguments indexed • GPT-4 powered</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/40 backdrop-blur-sm py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Built with{' '}
            <a
              href="https://www.algolia.com/products/agent-studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 hover:text-cyan-600 font-medium transition-colors"
            >
              Algolia Agent Studio
            </a>{' '}
            • Making AI that challenges us to think better
          </p>
        </div>
      </footer>
    </main>
  );
}
