'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from '@/lib/types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { saveConversation, loadConversation, clearConversation } from '@/lib/storage';

// Generate unique IDs using crypto
const generateId = () => crypto.randomUUID();

interface ChatInterfaceProps {
  initialMessage?: string | null;
}

export default function ChatInterface({ initialMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = loadConversation();
      if (saved && Array.isArray(saved) && saved.length > 0) return saved;
    } catch (error) {
      console.error('Failed to load conversation:', error);
      clearConversation();
    }
    return [
      {
        id: generateId(),
        role: 'assistant',
        content:
          "I'm ContradictMe — an AI designed to challenge your beliefs with the strongest possible counterarguments.\n\nTell me something you believe strongly. I'll present research-backed opposing perspectives, not to change your mind, but to help you understand the full picture.",
        timestamp: Date.now(),
      },
    ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasProcessedInitial = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Debounced save to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      const timer = setTimeout(() => saveConversation(messages), 300);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessage = useCallback(async (content: string, signal?: AbortSignal) => {
    // Cancel any in-flight requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          conversationId: generateId(),
        }),
        signal: signal || controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.message,
        arguments: data.arguments,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      // Don't show error if request was aborted
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.error('Error sending message:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);

      // Fallback response when API isn't ready
      const fallbackMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content:
          "I'm having trouble connecting right now. Please check that the Agent Studio is configured and try again. 🚀",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  // Auto-send initial message from URL
  useEffect(() => {
    if (initialMessage && !hasProcessedInitial.current) {
      hasProcessedInitial.current = true;
      const controller = new AbortController();
      handleSendMessage(initialMessage, controller.signal);
      return () => controller.abort();
    }
  }, [initialMessage, handleSendMessage]);

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6 min-h-0"
        role="log"
        aria-live="polite"
        aria-label="Chat conversation"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start animate-slide-up">
            <div
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl px-5 py-4 shadow-sm"
              role="status"
              aria-label="Analyzing perspectives"
            >
              <div className="flex items-center gap-3">
                {/* Abstract thinking blob */}
                <div
                  className="w-8 h-8 thinking-blob opacity-80"
                  aria-hidden="true"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #0D9A9B 50%, #7C3AED 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'think-morph 4s ease-in-out infinite, gradient-shift 3s ease-in-out infinite',
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  }}
                />
                <span className="text-sm text-slate-600 font-medium">Analyzing perspectives...</span>
              </div>
              <span className="sr-only">Analyzing perspectives and finding counterarguments...</span>
            </div>
          </div>
        )}

        {/* Error display */}
        {error && !isLoading && (
          <div className="flex justify-center animate-slide-up">
            <div
              className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-2xl px-5 py-4 shadow-sm max-w-md"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl flex-shrink-0" aria-hidden="true">
                  ⚠️
                </span>
                <div>
                  <p className="text-sm text-red-800 font-medium mb-1">Connection Error</p>
                  <p className="text-sm text-red-700">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
                      if (lastUserMessage) handleSendMessage(lastUserMessage.content);
                    }}
                    className="mt-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Retry sending last message"
                  >
                    Retry →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (only show if no user messages yet) */}
      {messages.filter((m) => m.role === 'user').length === 0 && (
        <div className="px-4 pb-4">
          <div
            className="flex flex-wrap gap-2 mb-4"
            role="group"
            aria-label="Suggested topics to challenge"
          >
            <button
              onClick={() => handleSuggestedPrompt('Nuclear energy is too dangerous')}
              className="px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-electric-200 hover:shadow-sm transition-all"
              aria-label="Challenge belief about nuclear energy"
            >
              Nuclear energy
            </button>
            <button
              onClick={() => handleSuggestedPrompt('College is always worth it')}
              className="px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-electric-200 hover:shadow-sm transition-all"
            >
              College ROI
            </button>
            <button
              onClick={() => handleSuggestedPrompt('AI will cause mass unemployment')}
              className="px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-electric-200 hover:shadow-sm transition-all"
            >
              AI & Jobs
            </button>
            <button
              onClick={() => handleSuggestedPrompt('You need meat to be healthy')}
              className="px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:border-electric-200 hover:shadow-sm transition-all"
            >
              Plant-based diet
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-4 py-4 relative z-10">
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
