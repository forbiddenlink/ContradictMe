'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/lib/types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatInterfaceProps {
  initialMessage?: string | null;
}

export default function ChatInterface({ initialMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm ContradictMe - an AI that helps you think critically by challenging your beliefs.\n\nTell me something you believe strongly, and I'll present the strongest arguments against it. I'm not trying to change your mind - just help you see other perspectives.",
      timestamp: Date.now(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasProcessedInitial = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-send initial message from URL
  useEffect(() => {
    if (initialMessage && !hasProcessedInitial.current) {
      hasProcessedInitial.current = true;
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // TODO: Call Algolia Agent Studio API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: content,
          conversationId: messages[0]?.id || Date.now().toString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        arguments: data.arguments,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response when API isn't ready
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm still getting set up! The Agent Studio API endpoint needs to be configured. In the meantime, here's what I would do:\n\nI would search for the strongest counterarguments to your belief, cite credible sources, and present them respectfully. Stay tuned! 🚀",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 min-h-0">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-navy-600">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-terracotta-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-terracotta-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-terracotta-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm">Searching for counterarguments...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (only show if no user messages yet) */}
      {messages.filter(m => m.role === 'user').length === 0 && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => handleSuggestedPrompt("Nuclear energy is too dangerous")}
              className="px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full text-sm font-medium text-deep-700 hover:bg-white hover:border-electric-200 hover:shadow-sm transition-all"
            >
              Nuclear energy
            </button>
            <button
              onClick={() => handleSuggestedPrompt("College is always worth it")}
              className="px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full text-sm font-medium text-deep-700 hover:bg-white hover:border-electric-200 hover:shadow-sm transition-all"
            >
              College ROI
            </button>
            <button
              onClick={() => handleSuggestedPrompt("AI will cause mass unemployment")}
              className="px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full text-sm font-medium text-deep-700 hover:bg-white hover:border-electric-200 hover:shadow-sm transition-all"
            >
              AI & Jobs
            </button>
            <button
              onClick={() => handleSuggestedPrompt("You need meat to be healthy")}
              className="px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-full text-sm font-medium text-deep-700 hover:bg-white hover:border-electric-200 hover:shadow-sm transition-all"
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
