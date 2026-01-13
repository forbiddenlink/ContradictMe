'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';

export default function ChatPage() {
  const searchParams = useSearchParams();
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setInitialMessage(message);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-navy-900">
              Contradict<span className="text-terracotta-500">Me</span>
            </h1>
            <span className="px-3 py-1 bg-terracotta-100 text-terracotta-700 rounded-full text-xs font-semibold">
              BETA
            </span>
          </div>
          <a 
            href="/"
            className="text-sm text-navy-600 hover:text-navy-900 font-medium transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 min-h-0 max-w-4xl w-full mx-auto flex flex-col">
        <ChatInterface initialMessage={initialMessage} />
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
