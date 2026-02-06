'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Message } from '@/lib/types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { saveConversation, loadConversation, clearConversation } from '@/lib/storage';

// Generate unique IDs using crypto
const generateId = () => crypto.randomUUID();

// Multi-phase loading states for better UX
const LOADING_PHASES = [
  { message: 'Understanding your belief...', duration: 1500 },
  { message: 'Researching counterevidence...', duration: 3000 },
  { message: 'Formulating counterarguments...', duration: 2500 },
  { message: 'Synthesizing response...', duration: 2000 },
] as const;

// Varied error messages for less robotic feel
const ERROR_MESSAGES = [
  "I'm having trouble thinking right now. Let me try again...",
  'My counterargument engine hit a snag. One more attempt?',
  'Connection hiccup. Want me to retry that analysis?',
  "Something went wrong on my end. I'll give it another shot.",
] as const;

// Expanded suggested prompts covering all argument topics
const SUGGESTED_PROMPTS = [
  // Row 1 - Popular debates
  { label: 'Nuclear energy', prompt: 'Nuclear energy is too dangerous' },
  { label: 'College ROI', prompt: 'College is always worth it' },
  { label: 'AI & Jobs', prompt: 'AI will cause mass unemployment' },
  { label: 'Plant-based diet', prompt: 'You need meat to be healthy' },
  // Row 2 - Economic/Policy
  { label: 'Remote work', prompt: 'Remote work hurts productivity' },
  { label: 'Minimum wage', prompt: 'Raising minimum wage kills jobs' },
  { label: 'UBI', prompt: 'Universal basic income would make people lazy' },
  { label: 'Crypto', prompt: 'Cryptocurrency is just a scam' },
  // Row 3 - Social/Health
  { label: 'Social media', prompt: 'Social media is destroying mental health' },
  { label: 'Gun control', prompt: 'Stricter gun laws reduce violence' },
  { label: 'Immigration', prompt: 'Immigration hurts the economy' },
  { label: 'Drug policy', prompt: 'Drug legalization increases addiction' },
  // Row 4 - Technology/Environment
  { label: 'Electric vehicles', prompt: "Electric vehicles aren't actually better for the environment" },
  { label: 'Space funding', prompt: 'Space exploration is a waste of money' },
  { label: 'Climate action', prompt: "Climate change action hurts the economy" },
  { label: 'Lab-grown meat', prompt: 'Lab-grown meat is unnatural and unsafe' },
  // Row 5 - Education/Work
  { label: '4-day workweek', prompt: "A 4-day workweek wouldn't work" },
  { label: 'School choice', prompt: 'School vouchers hurt public education' },
  { label: 'Standardized tests', prompt: 'Standardized testing is harmful' },
  { label: 'Gig economy', prompt: 'The gig economy exploits workers' },
  // Row 6 - Healthcare/Housing
  { label: 'Healthcare', prompt: 'Universal healthcare would be worse' },
  { label: 'Housing', prompt: 'Zoning laws protect neighborhoods' },
  { label: 'Abortion', prompt: 'Abortion restrictions protect life' },
  { label: 'Social regulation', prompt: 'Social media needs government regulation' },
] as const;

// Animation variants for Framer Motion
// Enter: larger movement (y: 20), with blur for polish
// Exit: subtler movement (y: -10), consistent vertical direction
const messageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10, scale: 0.99, filter: 'blur(4px)' },
};

const promptVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 },
};

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
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasProcessedInitial = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const loadingPhaseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Progress through loading phases for better perceived performance
  useEffect(() => {
    if (isLoading) {
      setLoadingPhase(0);
      let currentPhase = 0;

      const advancePhase = () => {
        if (currentPhase < LOADING_PHASES.length - 1) {
          currentPhase++;
          setLoadingPhase(currentPhase);
          loadingPhaseTimerRef.current = setTimeout(
            advancePhase,
            LOADING_PHASES[currentPhase].duration
          );
        }
      };

      loadingPhaseTimerRef.current = setTimeout(advancePhase, LOADING_PHASES[0].duration);

      return () => {
        if (loadingPhaseTimerRef.current) {
          clearTimeout(loadingPhaseTimerRef.current);
        }
      };
    }
  }, [isLoading]);

  // Get a random error message for variety
  const getRandomErrorMessage = useCallback(() => {
    return ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
  }, []);

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

      // Fallback response when API isn't ready (with varied messages)
      const fallbackMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: getRandomErrorMessage(),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [getRandomErrorMessage]);

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
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.3,
                delay: index === messages.length - 1 ? 0.1 : 0,
                ease: [0.4, 0, 0.2, 1],
              }}
              layout
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start animate-slide-up">
            <div
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 shadow-sm"
              role="status"
              aria-label={LOADING_PHASES[loadingPhase].message}
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
                <div className="flex flex-col">
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-medium transition-all duration-300">
                    {LOADING_PHASES[loadingPhase].message}
                  </span>
                  {/* Phase progress indicator */}
                  <div className="flex gap-1 mt-1.5" aria-hidden="true">
                    {LOADING_PHASES.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          idx <= loadingPhase ? 'bg-violet-500' : 'bg-gray-300 dark:bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="sr-only">{LOADING_PHASES[loadingPhase].message}</span>
            </div>
          </div>
        )}

        {/* Error display */}
        {error && !isLoading && (
          <div className="flex justify-center animate-slide-up">
            <div
              className="bg-red-50/90 dark:bg-red-950/50 backdrop-blur-sm border border-red-200 dark:border-red-800/50 rounded-2xl px-5 py-4 shadow-sm max-w-md"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl flex-shrink-0" aria-hidden="true">
                  ⚠️
                </span>
                <div>
                  <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-1">Connection Error</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
                      if (lastUserMessage) handleSendMessage(lastUserMessage.content);
                    }}
                    className="mt-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
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
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium uppercase tracking-wide">
            Popular beliefs to challenge
          </p>
          <motion.div
            className="flex flex-wrap gap-2 mb-4 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin"
            role="group"
            aria-label="Suggested topics to challenge"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.03,
                },
              },
            }}
          >
            {SUGGESTED_PROMPTS.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={() => handleSuggestedPrompt(item.prompt)}
                className="px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:border-violet-200 dark:hover:border-violet-500/50 hover:shadow-sm hover:text-violet-700 dark:hover:text-violet-300 transition-all"
                aria-label={`Challenge belief: ${item.prompt}`}
                variants={promptVariants}
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 relative z-10">
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
