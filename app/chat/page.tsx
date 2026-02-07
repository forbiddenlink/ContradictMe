'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import ThemeToggle from '@/components/ThemeToggle';

function ChatContent() {
  const searchParams = useSearchParams();
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setInitialMessage(message);
    }
  }, [searchParams]);

  return <ChatInterface initialMessage={initialMessage} />;
}

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-1">
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
                Contradict<span className="text-teal-600 dark:text-teal-400">Me</span>
              </h1>
            </Link>
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold">
              BETA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/"
              className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium transition-colors"
            >
              ← Home
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main id="main-content" className="flex-1 min-h-0 max-w-4xl w-full mx-auto flex flex-col">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full text-slate-600 dark:text-slate-400">
              Loading...
            </div>
          }
        >
          <ChatContent />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-t border-gray-200 dark:border-slate-800 px-6 py-3">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600 dark:text-slate-400">
          <nav className="mb-2 flex justify-center gap-4 text-xs sm:text-sm" aria-label="Legal and company links">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
          </nav>
          <p>
            ContradictMe uses AI to challenge your beliefs. Not medical, legal, or financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
