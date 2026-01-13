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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20 relative overflow-hidden">
      {/* Animated Background Orbs for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-slate-900 via-teal-700 to-cyan-600 bg-clip-text text-transparent bg-liquid">
            An AI that disagrees with you
          </h1>
          <p className="text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto text-balance">
            Challenge your beliefs with the strongest counterarguments, backed by research.
            Fight echo chambers. Think critically.
          </p>
        </div>

        {/* Chat Input Preview */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChallenge()}
              className="w-full px-5 py-4 pr-40 rounded-2xl border-2 border-gray-200/60 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 outline-none transition-all placeholder:text-gray-400 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl hover:bg-white/80"
              placeholder="Tell me something you believe strongly..."
            />
            <button
              onClick={() => handleChallenge()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold text-sm btn-magnetic shadow-lg"
            >
              Challenge Me
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button 
              onClick={() => handleChallenge("Nuclear energy is too dangerous")}
              className="px-5 py-3 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
            >
              Nuclear energy
            </button>
            <button 
              onClick={() => handleChallenge("College is always worth it")}
              className="px-5 py-3 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
            >
              College ROI
            </button>
            <button 
              onClick={() => handleChallenge("AI will cause mass unemployment")}
              className="px-5 py-3 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
            >
              AI & Jobs
            </button>
            <button 
              onClick={() => handleChallenge("UBI makes people lazy")}
              className="px-5 py-3 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
            >
              Universal basic income
            </button>
            <button 
              onClick={() => handleChallenge("EVs are always better for the environment")}
              className="px-5 py-3 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-teal-400 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
            >
              Electric vehicles
            </button>
          </div>
        </div>

        {/* Example Argument Card */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Here&apos;s what you&apos;ll get:
          </h2>
          <div className="argument-card">
            {/* Header with Quality Score */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="title-argument flex-1">
                Innovation requires serendipity
              </h3>
              <div className="quality-score ml-4">
                <span className="text-score text-success-500">87</span>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Quality
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="text-body mb-6">
              Stanford study of 10,000 developers found 23% more patent filings from
              hybrid teams compared to fully remote. The research suggests spontaneous
              &ldquo;water cooler&rdquo; conversations lead to unexpected idea combinations that
              scheduled video calls miss.
            </div>

            {/* Source Card */}
            <div className="source-card">
              <div className="text-citation font-medium text-slate-800 mb-1">
                Dr. Sarah Chen
              </div>
              <div className="text-citation">
                Stanford Economics, 2024
              </div>
              <div className="flex gap-4 mt-3 text-xs text-gray-600">
                <span>Evidence: 85/100</span>
                <span>•</span>
                <span>Sample: 10,000</span>
              </div>
            </div>

            {/* Limitations */}
            <div className="limitations">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-2">
                <span>⚠</span>
                <span>Limitations</span>
              </div>
              <ul className="list-none p-0 m-0 space-y-1">
                <li className="text-sm text-slate-700 pl-4 relative">
                  <span className="absolute left-0 text-amber-500">•</span>
                  Study focused on tech industry
                </li>
                <li className="text-sm text-slate-700 pl-4 relative">
                  <span className="absolute left-0 text-amber-500">•</span>
                  Hybrid model (2-3 days) equally effective
                </li>
              </ul>
            </div>

            {/* CTA Link */}
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 mt-4 transition-all hover:gap-3 hover:text-cyan-600"
            >
              Read Full Study
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl">
            <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Evidence-Based</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Every argument backed by peer-reviewed research, not just plausible-sounding text.
            </p>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl">
            <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Steel-Manned</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              The strongest form of opposing arguments, not weak straw-man versions.
            </p>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl">
            <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Respectful</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Never condescending. Honest about limitations. Promotes thinking, not &ldquo;winning.&rdquo;
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="text-center py-8 px-6 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-2xl">
          <div className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-2">
            Algolia Agent Studio Challenge
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Contest Submission
          </h3>
          <p className="text-sm text-slate-700">
            Building an AI that challenges echo chambers • Live Demo Coming Soon
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/40 backdrop-blur-sm py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">
            Built with{" "}
            <a
              href="https://www.algolia.com/products/agent-studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-cyan-600 font-medium transition-colors"
            >
              Algolia Agent Studio
            </a>
            {" "}• Making AI that challenges us to think better
          </p>
        </div>
      </footer>
    </main>
  );
}
