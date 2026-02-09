/**
 * Custom React hooks for conversation management with IndexedDB
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import type { Conversation, ConversationMessage } from '../db';
import { db, dbOperations, conversationUtils } from '../db';

/**
 * Hook to get all conversations with live updates
 */
export function useConversations() {
  const conversations = useLiveQuery(() => dbOperations.getAllConversations());

  const grouped = conversations
    ? conversationUtils.groupByDate(conversations)
    : null;

  return {
    conversations: conversations || [],
    grouped,
    isLoading: !conversations,
  };
}

/**
 * Hook to get a single conversation with live updates
 */
export function useConversation(conversationId: string | null) {
  const conversation = useLiveQuery(
    async () => {
      if (!conversationId) return null;
      return await db.conversations.get(conversationId);
    },
    [conversationId]
  );

  return {
    conversation: conversation || null,
    isLoading: conversationId ? !conversation : false,
  };
}

/**
 * Hook for conversation operations
 */
export function useConversationOperations() {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createConversation = useCallback(
    async (firstMessage: string, id?: string) => {
      setIsCreating(true);
      setError(null);
      try {
        const conversation = await dbOperations.createConversation(
          firstMessage,
          id
        );
        return conversation;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to create conversation';
        setError(message);
        throw err;
      } finally {
        setIsCreating(false);
      }
    },
    []
  );

  const addMessage = useCallback(
    async (conversationId: string, message: ConversationMessage) => {
      setIsUpdating(true);
      setError(null);
      try {
        await dbOperations.addMessage(conversationId, message);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to add message';
        setError(message);
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  const updateTitle = useCallback(
    async (conversationId: string, title: string) => {
      setIsUpdating(true);
      setError(null);
      try {
        await dbOperations.updateTitle(conversationId, title);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to update title';
        setError(message);
        throw err;
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  const toggleBookmark = useCallback(async (conversationId: string) => {
    setIsUpdating(true);
    setError(null);
    try {
      const newState = await dbOperations.toggleBookmark(conversationId);
      return newState;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to toggle bookmark';
      setError(message);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteConversation = useCallback(async (conversationId: string) => {
    setIsUpdating(true);
    setError(null);
    try {
      await dbOperations.deleteConversation(conversationId);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to delete conversation';
      setError(message);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    createConversation,
    addMessage,
    updateTitle,
    toggleBookmark,
    deleteConversation,
    isCreating,
    isUpdating,
    error,
  };
}

/**
 * Hook for searching conversations
 */
export function useConversationSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Conversation[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const search = async () => {
      setIsSearching(true);
      try {
        const found = await dbOperations.searchConversations(query);
        setResults(found);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(search, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isSearching,
  };
}

/**
 * Hook for saved arguments
 */
export function useSavedArguments() {
  const savedArguments = useLiveQuery(() => dbOperations.getSavedArguments());

  return {
    savedArguments: savedArguments || [],
    isLoading: !savedArguments,
  };
}

/**
 * Hook for analytics
 */
export function useAnalytics(days: number = 30) {
  const [summary, setSummary] = useState<Awaited<
    ReturnType<typeof dbOperations.getAnalyticsSummary>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await dbOperations.getAnalyticsSummary(days);
        setSummary(data);
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [days]);

  return {
    summary,
    isLoading,
  };
}

/**
 * Hook for user preferences
 */
export function usePreference<T extends string | number | boolean | object>(
  key: string,
  defaultValue: T
): [T, (value: T) => Promise<void>] {
  const [value, setValue] = useState<T>(defaultValue);
  const [_isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const storedValue = await dbOperations.getPreference(key);
        if (storedValue !== undefined && storedValue !== null) {
          setValue(storedValue as T);
        }
      } catch (err) {
        console.error('Failed to load preference:', err);
      } finally {
        setIsLoaded(true);
      }
    };

    load();
  }, [key]);

  const updateValue = useCallback(
    async (newValue: T) => {
      try {
        await dbOperations.setPreference(key, newValue);
        setValue(newValue);
      } catch (err) {
        console.error('Failed to save preference:', err);
        throw err;
      }
    },
    [key]
  );

  return [value, updateValue];
}

/**
 * Hook for export functionality
 */
export function useConversationExport() {
  const exportAsJSON = useCallback(async (conversationId: string) => {
    try {
      const json = await dbOperations.exportConversation(conversationId);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `conversation-${conversationId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      throw err;
    }
  }, []);

  const exportAsMarkdown = useCallback(async (conversationId: string) => {
    try {
      const markdown =
        await dbOperations.exportConversationMarkdown(conversationId);
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `conversation-${conversationId}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      throw err;
    }
  }, []);

  const copyAsText = useCallback(async (conversationId: string) => {
    try {
      const markdown =
        await dbOperations.exportConversationMarkdown(conversationId);
      await navigator.clipboard.writeText(markdown);
    } catch (err) {
      console.error('Copy failed:', err);
      throw err;
    }
  }, []);

  return {
    exportAsJSON,
    exportAsMarkdown,
    copyAsText,
  };
}

/**
 * Hook for tracking conversation sessions
 */
export function useConversationTracking(conversationId: string | null) {
  useEffect(() => {
    if (!conversationId) return;

    // Track when conversation ends (component unmount or ID change)
    return () => {
      dbOperations.trackConversation(conversationId).catch(console.error);
    };
  }, [conversationId]);
}
