'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-950">
              Contradict<span className="text-teal-600">Me</span>
            </h1>
            <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">
              BETA
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-slate-700 hover:text-slate-950 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 min-h-0 max-w-4xl w-full mx-auto flex flex-col">
        <Suspense
          fallback={<div className="flex items-center justify-center h-full">Loading...</div>}
        >
          <ChatContent />
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 px-6 py-3">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
          <p>
            ContradictMe uses AI to challenge your beliefs. Not medical, legal, or financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
