'use client';

import { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tell me something you believe strongly..."
        disabled={isLoading}
        autoFocus
        className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 focus:border-terracotta-400 focus:ring-2 focus:ring-terracotta-100 outline-none transition-all placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || isLoading}
        className="px-6 py-4 bg-terracotta-500 text-white rounded-2xl font-semibold text-sm transition-all hover:bg-terracotta-400 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        Challenge Me
      </button>
    </div>
  );
}
