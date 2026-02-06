'use client';

import { Message } from '@/lib/types';
import ArgumentCard from '../arguments/ArgumentCard';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // Parse the assistant message to extract structured data
  const parseAssistantMessage = (content: string) => {
    // Split by lines
    const lines = content.split('\n').filter((line) => line.trim());

    return {
      intro: lines.slice(0, 3).join('\n'), // First few lines before arguments
      rest: lines.slice(3).join('\n'),
    };
  };

  const parsed = !isUser ? parseAssistantMessage(message.content) : null;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div className={`max-w-[85%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300 ${
            isUser
              ? 'bg-gradient-to-br from-teal-600 to-cyan-600 text-white'
              : 'bg-gradient-to-br from-white/95 to-violet-50/50 backdrop-blur-sm border border-violet-100/50 text-slate-800'
          }`}
        >
          {isUser ? (
            <p className="text-white">{message.content}</p>
          ) : (
            <div className="space-y-4">
              {/* Intro text */}
              {parsed && parsed.intro && (
                <div className="prose prose-sm max-w-none">
                  {parsed.intro.split('\n').map((line, i) => (
                    <p key={i} className="text-slate-700 leading-relaxed mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* Main content - formatted */}
              {parsed && parsed.rest && (
                <div className="space-y-3">
                  {parsed.rest.split('---').map((section, idx) => {
                    if (!section.trim()) return null;

                    // Check if this section contains a numbered argument
                    const isArgument = section.match(/^\*\*\d+\./);

                    if (isArgument) {
                      return (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="prose prose-sm max-w-none">
                            {section.split('\n').map((line, i) => {
                              if (!line.trim()) return null;

                              // Bold headers
                              if (line.startsWith('**') && line.endsWith('**')) {
                                return (
                                  <p key={i} className="font-bold text-slate-900 text-base mb-2">
                                    {line.replace(/\*\*/g, '')}
                                  </p>
                                );
                              }

                              // Source citations
                              if (line.startsWith('📚')) {
                                return (
                                  <p
                                    key={i}
                                    className="text-sm text-slate-600 bg-white px-3 py-2 rounded-lg mt-3"
                                  >
                                    {line}
                                  </p>
                                );
                              }

                              // Evidence strength
                              if (line.includes('Evidence Strength:')) {
                                return (
                                  <p
                                    key={i}
                                    className="text-sm font-semibold text-success-500 mt-2"
                                  >
                                    {line}
                                  </p>
                                );
                              }

                              // Nuance section
                              if (line.startsWith('**Nuance**:')) {
                                return (
                                  <p
                                    key={i}
                                    className="text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg mt-3 border-l-4 border-amber-400"
                                  >
                                    {line.replace('**Nuance**:', '⚠️ Nuance:')}
                                  </p>
                                );
                              }

                              return (
                                <p key={i} className="text-slate-700 leading-relaxed mb-2">
                                  {line}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // Regular text
                    return (
                      <div key={idx} className="text-slate-700">
                        {section.split('\n').map(
                          (line, i) =>
                            line.trim() && (
                              <p key={i} className="mb-2">
                                {line}
                              </p>
                            )
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Arguments (if assistant message has them) */}
        {!isUser && message.arguments && message.arguments.length > 0 && (
          <div className="mt-4 space-y-4">
            {message.arguments.map((argument) => (
              <ArgumentCard key={argument.objectID} argument={argument} />
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className={`text-xs text-gray-500 mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
