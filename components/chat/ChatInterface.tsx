'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Message } from '@/lib/types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ThinkingIndicator from '../ui/ThinkingIndicator';
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
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasProcessedInitial = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const loadingPhaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const userMessages = useMemo(() => messages.filter((message) => message.role === 'user'), [messages]);
  const hasUserMessages = userMessages.length > 0;

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

    // Create placeholder assistant message for streaming
    const assistantMessageId = generateId();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };
    setStreamingMessageId(assistantMessageId);
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          conversationId: generateId(),
          stream: true,
        }),
        signal: signal || controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      // Check if response is streaming (SSE)
      const contentType = response.headers?.get?.('content-type') || '';

      if (contentType.includes('text/event-stream') && response.body) {
        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let streamedContent = '';
        let hasStartedStreaming = false;
        let streamBuffer = '';

        const applyStreamChunk = (rawLine: string) => {
          if (!rawLine.startsWith('data:')) return;
          const data = rawLine.slice(5).trimStart();
          if (!data || data === '[DONE]') return;

          try {
            const parsed = JSON.parse(data) as {
              text?: string;
              delta?: string;
              textDelta?: string;
            };
            const nextText = parsed.text || parsed.delta || parsed.textDelta;
            if (!nextText) return;

            // Start streaming mode on first content
            if (!hasStartedStreaming) {
              hasStartedStreaming = true;
              setIsStreaming(true);
              setIsLoading(false); // Hide loading phases once content arrives
            }

            streamedContent += nextText;
            // Update the message content incrementally
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: streamedContent }
                  : msg
              )
            );
          } catch {
            // Skip unparseable data
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          streamBuffer += decoder.decode(value, { stream: true });
          let lineBreakIndex = streamBuffer.indexOf('\n');

          while (lineBreakIndex >= 0) {
            const line = streamBuffer.slice(0, lineBreakIndex).replace(/\r$/, '');
            applyStreamChunk(line);
            streamBuffer = streamBuffer.slice(lineBreakIndex + 1);
            lineBreakIndex = streamBuffer.indexOf('\n');
          }
        }

        const finalText = decoder.decode();
        if (finalText) streamBuffer += finalText;
        if (streamBuffer.trim()) {
          applyStreamChunk(streamBuffer.replace(/\r$/, ''));
        }

        // Finalize the message
        setIsStreaming(false);
        setStreamingMessageId(null);
        if (!streamedContent) {
          streamedContent = 'No response received from the agent.';
        }
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: streamedContent }
              : msg
          )
        );
      } else {
        // Handle non-streaming JSON response (fallback)
        const data = await response.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: data.message, arguments: data.arguments }
              : msg
          )
        );
      }
    } catch (err) {
      // Don't show error if request was aborted
      if (err instanceof Error && err.name === 'AbortError') {
        // Remove the empty assistant message on abort
        setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
        setIsStreaming(false);
        setStreamingMessageId(null);
        return;
      }
      console.error('Error sending message:', err);
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);

      // Update the placeholder message with error content
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: getRandomErrorMessage() }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setStreamingMessageId(null);
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
            <m.div
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
              <ChatMessage message={message} isStreaming={isStreaming && message.id === streamingMessageId} />
            </m.div>
          ))}
        </AnimatePresence>
        {isLoading && !isStreaming && (
          <div className="flex justify-start animate-slide-up">
            <ThinkingIndicator
              phase={loadingPhase}
              message={LOADING_PHASES[loadingPhase].message}
              totalPhases={LOADING_PHASES.length}
            />
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
                      const lastUserMessage = userMessages[userMessages.length - 1];
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
      {!hasUserMessages && (
        <div className="px-4 pb-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium uppercase tracking-wide">
            Popular beliefs to challenge
          </p>
          <m.div
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
              <m.button
                key={item.label}
                onClick={() => handleSuggestedPrompt(item.prompt)}
                className="px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:border-violet-200 dark:hover:border-violet-500/50 hover:shadow-sm hover:text-violet-700 dark:hover:text-violet-300 transition-all"
                aria-label={item.label}
                variants={promptVariants}
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                {item.label}
              </m.button>
            ))}
          </m.div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 relative z-10">
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
