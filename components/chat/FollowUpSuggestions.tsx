/**
 * Follow-up Question Suggestions
 * Shows contextual AI-generated questions after each assistant response
 * Boosts engagement by helping users explore topics deeper
 */

'use client';

import { m } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FollowUpSuggestionsProps {
  conversationContext: string;
  lastAssistantMessage: string;
  onSelectQuestion: (question: string) => void;
  isVisible?: boolean;
}

// Predefined follow-up templates based on common patterns
const FOLLOW_UP_TEMPLATES = {
  ethics: [
    'What are the ethical implications of this?',
    'How does this affect vulnerable populations?',
    'What moral principles are at stake here?',
  ],
  economics: [
    'What are the economic trade-offs?',
    'Who benefits financially from this?',
    'What are the long-term economic consequences?',
  ],
  evidence: [
    'What does the latest research say?',
    'Are there any contradictory studies?',
    'What do experts in the field think?',
  ],
  alternatives: [
    'What are viable alternatives?',
    'How do other countries handle this?',
    'What middle-ground solutions exist?',
  ],
  implementation: [
    'How would this work in practice?',
    'What are the implementation challenges?',
    'What would a transition look like?',
  ],
  counterarguments: [
    'What do critics say about this?',
    'What are the strongest objections?',
    'How do proponents respond to criticism?',
  ],
  realWorld: [
    'Can you give me a concrete example?',
    'How has this played out historically?',
    'What case studies support this view?',
  ],
  futureImpact: [
    'How might this evolve in the next 10 years?',
    'What are the potential unintended consequences?',
    'How does this affect future generations?',
  ],
};

// Generate contextual follow-ups based on the conversation
function generateFollowUps(context: string, lastMessage: string): string[] {
  const suggestions: string[] = [];
  const lowerContext = (context + ' ' + lastMessage).toLowerCase();

  // Always add one core follow-up
  suggestions.push('Can you elaborate on that?');

  // Add contextual follow-ups based on keywords
  if (
    lowerContext.includes('ethical') ||
    lowerContext.includes('moral') ||
    lowerContext.includes('right') ||
    lowerContext.includes('wrong')
  ) {
    suggestions.push(
      FOLLOW_UP_TEMPLATES.ethics[Math.floor(Math.random() * FOLLOW_UP_TEMPLATES.ethics.length)]
    );
  }

  if (
    lowerContext.includes('cost') ||
    lowerContext.includes('econom') ||
    lowerContext.includes('money') ||
    lowerContext.includes('price')
  ) {
    suggestions.push(
      FOLLOW_UP_TEMPLATES.economics[
        Math.floor(Math.random() * FOLLOW_UP_TEMPLATES.economics.length)
      ]
    );
  }

  if (
    lowerContext.includes('study') ||
    lowerContext.includes('research') ||
    lowerContext.includes('evidence') ||
    lowerContext.includes('data')
  ) {
    suggestions.push(
      FOLLOW_UP_TEMPLATES.evidence[Math.floor(Math.random() * FOLLOW_UP_TEMPLATES.evidence.length)]
    );
  }

  if (
    lowerContext.includes('instead') ||
    lowerContext.includes('alternative') ||
    lowerContext.includes('other way')
  ) {
    suggestions.push(
      FOLLOW_UP_TEMPLATES.alternatives[
        Math.floor(Math.random() * FOLLOW_UP_TEMPLATES.alternatives.length)
      ]
    );
  }

  if (
    lowerContext.includes('how would') ||
    lowerContext.includes('implement') ||
    lowerContext.includes('in practice')
  ) {
    suggestions.push(
      FOLLOW_UP_TEMPLATES.implementation[
        Math.floor(Math.random() * FOLLOW_UP_TEMPLATES.implementation.length)
      ]
    );
  }

  // Add counter-arguments question if we have less than 4 suggestions
  if (suggestions.length < 4) {
    suggestions.push(
      FOLLOW_UP_TEMPLATES.counterarguments[
        Math.floor(Math.random() * FOLLOW_UP_TEMPLATES.counterarguments.length)
      ]
    );
  }

  // Add real-world examples question if we have less than 5 suggestions
  if (suggestions.length < 5) {
    suggestions.push(
      FOLLOW_UP_TEMPLATES.realWorld[
        Math.floor(Math.random() * FOLLOW_UP_TEMPLATES.realWorld.length)
      ]
    );
  }

  // Add future impact question if we still need more
  if (suggestions.length < 5) {
    suggestions.push(
      FOLLOW_UP_TEMPLATES.futureImpact[
        Math.floor(Math.random() * FOLLOW_UP_TEMPLATES.futureImpact.length)
      ]
    );
  }

  // Return 4-5 unique suggestions
  return Array.from(new Set(suggestions)).slice(0, 5);
}

export default function FollowUpSuggestions({
  conversationContext,
  lastAssistantMessage,
  onSelectQuestion,
  isVisible = true,
}: FollowUpSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Generate suggestions when the component mounts or context changes
    const newSuggestions = generateFollowUps(conversationContext, lastAssistantMessage);
    setSuggestions(newSuggestions);
  }, [conversationContext, lastAssistantMessage]);

  if (!isVisible || suggestions.length === 0) {
    return null;
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="my-4 max-w-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 px-2">
        <Sparkles className="w-4 h-4 text-violet-500 dark:text-violet-400" />
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
          Continue the conversation
        </p>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <m.button
            key={`${suggestion}-${index}`}
            onClick={() => onSelectQuestion(suggestion)}
            className="group relative px-4 py-2.5 bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-900/70 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:from-violet-50 hover:to-teal-50 dark:hover:from-violet-950/30 dark:hover:to-teal-950/30 hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-md hover:shadow-violet-200/30 dark:hover:shadow-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300 transition-all duration-200 flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span>{suggestion}</span>
          </m.button>
        ))}
      </div>

      {/* Subtle hint */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 px-2 italic">
        Or ask your own follow-up question below
      </p>
    </m.div>
  );
}
