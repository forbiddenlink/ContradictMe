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
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="title-page mb-6 text-balance">
            An AI that <span className="text-terracotta-500">disagrees</span> with you
          </h1>
          <p className="text-xl text-navy-700 leading-relaxed max-w-2xl mx-auto text-balance">
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
              className="w-full px-5 py-4 pr-40 rounded-2xl border border-gray-200 focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100 outline-none transition-all placeholder:text-gray-400 bg-white"
              placeholder="Tell me something you believe strongly..."
            />
            <button
              onClick={() => handleChallenge()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-terracotta-500 text-white rounded-xl font-semibold text-sm transition-all hover:bg-terracotta-400 hover:-translate-y-[calc(50%+2px)]"
            >
              Challenge Me
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button 
              onClick={() => handleChallenge("I think remote work is always better")}
              className="px-5 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-navy-700 hover:bg-white/80 hover:border-gray-300 transition-all"
            >
              "Remote work is always better"
            </button>
            <button 
              onClick={() => handleChallenge("Crypto is just a scam")}
              className="px-5 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-navy-700 hover:bg-white/80 hover:border-gray-300 transition-all"
            >
              "Crypto is just a scam"
            </button>
            <button 
              onClick={() => handleChallenge("Social media does more harm than good")}
              className="px-5 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-navy-700 hover:bg-white/80 hover:border-gray-300 transition-all"
            >
              "Social media does more harm than good"
            </button>
          </div>
        </div>

        {/* Example Argument Card */}
        <div className="mb-16">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">
            Here's what you'll get:
          </h2>
          <div className="argument-card">
            {/* Header with Quality Score */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="title-argument flex-1">
                Innovation requires serendipity
              </h3>
              <div className="quality-score ml-4">
                <span className="text-score text-sage-600">87</span>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Quality
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="text-body mb-6">
              Stanford study of 10,000 developers found 23% more patent filings from
              hybrid teams compared to fully remote. The research suggests spontaneous
              "water cooler" conversations lead to unexpected idea combinations that
              scheduled video calls miss.
            </div>

            {/* Source Card */}
            <div className="source-card">
              <div className="text-citation font-medium text-navy-800 mb-1">
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
              <div className="flex items-center gap-2 text-sm font-semibold text-navy-800 mb-2">
                <span>⚠</span>
                <span>Limitations</span>
              </div>
              <ul className="list-none p-0 m-0 space-y-1">
                <li className="text-sm text-navy-700 pl-4 relative">
                  <span className="absolute left-0 text-amber-500">•</span>
                  Study focused on tech industry
                </li>
                <li className="text-sm text-navy-700 pl-4 relative">
                  <span className="absolute left-0 text-amber-500">•</span>
                  Hybrid model (2-3 days) equally effective
                </li>
              </ul>
            </div>

            {/* CTA Link */}
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-terracotta-500 mt-4 transition-all hover:gap-3"
            >
              Read Full Study
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-semibold text-navy-800 mb-2">Evidence-Based</h3>
            <p className="text-sm text-navy-700 leading-relaxed">
              Every argument backed by peer-reviewed research, not just plausible-sounding text.
            </p>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-semibold text-navy-800 mb-2">Steel-Manned</h3>
            <p className="text-sm text-navy-700 leading-relaxed">
              The strongest form of opposing arguments, not weak straw-man versions.
            </p>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl">
            <div className="text-2xl mb-3">🤝</div>
            <h3 className="font-semibold text-navy-800 mb-2">Respectful</h3>
            <p className="text-sm text-navy-700 leading-relaxed">
              Never condescending. Honest about limitations. Promotes thinking, not "winning."
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="text-center py-8 px-6 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-2xl">
          <div className="text-sm font-semibold text-terracotta-500 uppercase tracking-wide mb-2">
            Contest Submission
          </div>
          <h3 className="text-xl font-semibold text-navy-800 mb-2">
            Algolia Agent Studio Challenge
          </h3>
          <p className="text-sm text-navy-700">
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
              className="text-terracotta-500 hover:text-terracotta-400 font-medium"
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
