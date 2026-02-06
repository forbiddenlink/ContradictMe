'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const MAX_MESSAGE_LENGTH = 2000;

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter to send (without shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    // Ctrl/Cmd + Enter to send (alternative)
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
    // Escape to clear input
    if (e.key === 'Escape') {
      setInput('');
      inputRef.current?.blur();
    }
  };

  // Global keyboard shortcut: / to focus input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if already typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      // / to focus chat input
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="flex gap-2">
      <label htmlFor="chat-message-input" className="sr-only">
        Type your belief or message
      </label>
      <input
        ref={inputRef}
        id="chat-message-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
        onKeyDown={handleKeyDown}
        placeholder="Tell me something you believe strongly..."
        disabled={isLoading}
        autoFocus
        maxLength={MAX_MESSAGE_LENGTH}
        className="flex-1 px-5 sm:px-6 py-4 sm:py-5 rounded-2xl border-2 border-gray-200 dark:border-slate-700 focus:border-teal-500 dark:focus:border-teal-400 focus:ring-4 focus:ring-teal-100 dark:focus:ring-teal-900/50 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-base sm:text-lg"
        aria-label="Chat message input. Press Enter to send, Escape to clear, / to focus"
        aria-describedby={isLoading ? 'loading-status' : 'keyboard-shortcuts'}
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        className="px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500 text-white rounded-2xl font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        aria-label={isLoading ? 'Sending message...' : 'Send message to challenge your belief'}
      >
        Challenge Me
      </button>
      {isLoading && (
        <span id="loading-status" className="sr-only" role="status" aria-live="polite">
          Sending message, please wait...
        </span>
      )}
      <span id="keyboard-shortcuts" className="sr-only">
        Press Enter to send message, Escape to clear input, or forward slash to focus from anywhere
      </span>
    </div>
  );
}
