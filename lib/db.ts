/**
 * IndexedDB Database Setup with Dexie
 * Handles conversation persistence, bookmarks, and user preferences
 */

import Dexie, { type EntityTable } from 'dexie';

// Database schema types
export interface Conversation {
  id: string;
  title: string;
  messages: ConversationMessage[];
  createdAt: number;
  updatedAt: number;
  tags: string[];
  isBookmarked: boolean;
  messageCount: number;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  arguments?: ArgumentData[];
}

export interface ArgumentData {
  id: string;
  mainClaim: string;
  evidence: string;
  sources: Array<{
    title: string;
    url: string;
    credibility: number;
  }>;
  qualityScore: number;
  domain?: string;
  createdAt: number;
}

export interface SavedArgument {
  id: string;
  conversationId: string;
  argument: ArgumentData;
  notes?: string;
  savedAt: number;
  tags: string[];
}

export interface UserPreference {
  key: string;
  value: string | number | boolean | object;
  updatedAt: number;
}

export interface ConversationAnalytics {
  id: string;
  conversationId: string;
  duration: number; // milliseconds
  messageCount: number;
  topicsDiscussed: string[];
  argumentsViewed: number;
  date: number;
}

// Database class
class ContradictMeDB extends Dexie {
  // Define tables
  conversations!: EntityTable<Conversation, 'id'>;
  savedArguments!: EntityTable<SavedArgument, 'id'>;
  preferences!: EntityTable<UserPreference, 'key'>;
  analytics!: EntityTable<ConversationAnalytics, 'id'>;

  constructor() {
    super('ContradictMeDB');

    // Database schema version 1
    this.version(1).stores({
      conversations: 'id, title, createdAt, updatedAt, isBookmarked, *tags',
      savedArguments: 'id, conversationId, savedAt, *tags',
      preferences: 'key',
      analytics: 'id, conversationId, date',
    });
  }
}

// Create and export database instance
export const db = new ContradictMeDB();

// Utility functions
export const conversationUtils = {
  /**
   * Generate auto-title from first user message
   */
  generateTitle(firstMessage: string): string {
    const cleanMessage = firstMessage.trim();
    if (cleanMessage.length <= 50) return cleanMessage;
    return cleanMessage.substring(0, 47) + '...';
  },

  /**
   * Extract tags from conversation messages
   */
  extractTags(messages: ConversationMessage[]): string[] {
    const tags = new Set<string>();
    messages.forEach((msg) => {
      if (msg.arguments) {
        msg.arguments.forEach((arg) => {
          if (arg.domain) tags.add(arg.domain);
        });
      }
    });
    return Array.from(tags);
  },

  /**
   * Calculate conversation duration
   */
  calculateDuration(messages: ConversationMessage[]): number {
    if (messages.length < 2) return 0;
    const first = messages[0].timestamp;
    const last = messages[messages.length - 1].timestamp;
    return last - first;
  },

  /**
   * Group conversations by date
   */
  groupByDate(conversations: Conversation[]): {
    today: Conversation[];
    yesterday: Conversation[];
    thisWeek: Conversation[];
    thisMonth: Conversation[];
    older: Conversation[];
  } {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const oneWeekMs = 7 * oneDayMs;
    const oneMonthMs = 30 * oneDayMs;

    const today: Conversation[] = [];
    const yesterday: Conversation[] = [];
    const thisWeek: Conversation[] = [];
    const thisMonth: Conversation[] = [];
    const older: Conversation[] = [];

    conversations.forEach((conv) => {
      const age = now - conv.updatedAt;
      if (age < oneDayMs) {
        today.push(conv);
      } else if (age < 2 * oneDayMs) {
        yesterday.push(conv);
      } else if (age < oneWeekMs) {
        thisWeek.push(conv);
      } else if (age < oneMonthMs) {
        thisMonth.push(conv);
      } else {
        older.push(conv);
      }
    });

    return { today, yesterday, thisWeek, thisMonth, older };
  },
};

// Database operations
export const dbOperations = {
  /**
   * Create a new conversation
   */
  async createConversation(
    firstMessage: string,
    id?: string
  ): Promise<Conversation> {
    const now = Date.now();
    const conversation: Conversation = {
      id: id || crypto.randomUUID(),
      title: conversationUtils.generateTitle(firstMessage),
      messages: [],
      createdAt: now,
      updatedAt: now,
      tags: [],
      isBookmarked: false,
      messageCount: 0,
    };

    await db.conversations.add(conversation);
    return conversation;
  },

  /**
   * Add message to conversation
   */
  async addMessage(
    conversationId: string,
    message: ConversationMessage
  ): Promise<void> {
    const conversation = await db.conversations.get(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    conversation.messages.push(message);
    conversation.messageCount = conversation.messages.length;
    conversation.updatedAt = Date.now();
    conversation.tags = conversationUtils.extractTags(conversation.messages);

    await db.conversations.put(conversation);
  },

  /**
   * Update conversation title
   */
  async updateTitle(conversationId: string, title: string): Promise<void> {
    await db.conversations.update(conversationId, {
      title,
      updatedAt: Date.now(),
    });
  },

  /**
   * Toggle bookmark
   */
  async toggleBookmark(conversationId: string): Promise<boolean> {
    const conversation = await db.conversations.get(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    const newBookmarkState = !conversation.isBookmarked;
    await db.conversations.update(conversationId, {
      isBookmarked: newBookmarkState,
      updatedAt: Date.now(),
    });

    return newBookmarkState;
  },

  /**
   * Delete conversation
   */
  async deleteConversation(conversationId: string): Promise<void> {
    await db.conversations.delete(conversationId);
    // Also delete related saved arguments
    const savedArgs = await db.savedArguments
      .where('conversationId')
      .equals(conversationId)
      .toArray();
    await db.savedArguments.bulkDelete(savedArgs.map((arg) => arg.id));
  },

  /**
   * Get all conversations (sorted by update time)
   */
  async getAllConversations(): Promise<Conversation[]> {
    return await db.conversations
      .orderBy('updatedAt')
      .reverse()
      .toArray();
  },

  /**
   * Search conversations
   */
  async searchConversations(query: string): Promise<Conversation[]> {
    const lowerQuery = query.toLowerCase();
    const conversations = await db.conversations.toArray();

    return conversations.filter((conv) => {
      // Search in title
      if (conv.title.toLowerCase().includes(lowerQuery)) return true;

      // Search in messages
      return conv.messages.some(
        (msg) =>
          msg.content.toLowerCase().includes(lowerQuery) ||
          msg.arguments?.some(
            (arg) =>
              arg.mainClaim.toLowerCase().includes(lowerQuery) ||
              arg.evidence.toLowerCase().includes(lowerQuery)
          )
      );
    });
  },

  /**
   * Save argument for later
   */
  async saveArgument(
    conversationId: string,
    argument: ArgumentData,
    notes?: string
  ): Promise<void> {
    const savedArg: SavedArgument = {
      id: crypto.randomUUID(),
      conversationId,
      argument,
      notes,
      savedAt: Date.now(),
      tags: argument.domain ? [argument.domain] : [],
    };

    await db.savedArguments.add(savedArg);
  },

  /**
   * Get saved arguments
   */
  async getSavedArguments(): Promise<SavedArgument[]> {
    return await db.savedArguments.orderBy('savedAt').reverse().toArray();
  },

  /**
   * Save user preference
   */
  async setPreference(
    key: string,
    value: string | number | boolean | object
  ): Promise<void> {
    await db.preferences.put({
      key,
      value,
      updatedAt: Date.now(),
    });
  },

  /**
   * Get user preference
   */
  async getPreference(key: string): Promise<any> {
    const pref = await db.preferences.get(key);
    return pref?.value;
  },

  /**
   * Track conversation analytics
   */
  async trackConversation(conversationId: string): Promise<void> {
    const conversation = await db.conversations.get(conversationId);
    if (!conversation) return;

    const analytics: ConversationAnalytics = {
      id: crypto.randomUUID(),
      conversationId,
      duration: conversationUtils.calculateDuration(conversation.messages),
      messageCount: conversation.messageCount,
      topicsDiscussed: conversation.tags,
      argumentsViewed: conversation.messages.reduce(
        (total, msg) => total + (msg.arguments?.length || 0),
        0
      ),
      date: Date.now(),
    };

    await db.analytics.add(analytics);
  },

  /**
   * Get analytics summary
   */
  async getAnalyticsSummary(days: number = 30): Promise<{
    totalConversations: number;
    totalMessages: number;
    totalArguments: number;
    averageDuration: number;
    topTopics: Array<{ topic: string; count: number }>;
  }> {
    const cutoffDate = Date.now() - days * 24 * 60 * 60 * 1000;
    const analytics = await db.analytics
      .where('date')
      .above(cutoffDate)
      .toArray();

    const totalConversations = analytics.length;
    const totalMessages = analytics.reduce(
      (sum, a) => sum + a.messageCount,
      0
    );
    const totalArguments = analytics.reduce(
      (sum, a) => sum + a.argumentsViewed,
      0
    );
    const averageDuration =
      totalConversations > 0
        ? analytics.reduce((sum, a) => sum + a.duration, 0) / totalConversations
        : 0;

    // Count topic occurrences
    const topicCounts = new Map<string, number>();
    analytics.forEach((a) => {
      a.topicsDiscussed.forEach((topic) => {
        topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
      });
    });

    const topTopics = Array.from(topicCounts.entries())
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalConversations,
      totalMessages,
      totalArguments,
      averageDuration,
      topTopics,
    };
  },

  /**
   * Export conversation as JSON
   */
  async exportConversation(conversationId: string): Promise<string> {
    const conversation = await db.conversations.get(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    return JSON.stringify(conversation, null, 2);
  },

  /**
   * Export conversation as Markdown
   */
  async exportConversationMarkdown(conversationId: string): Promise<string> {
    const conversation = await db.conversations.get(conversationId);
    if (!conversation) throw new Error('Conversation not found');

    let markdown = `# ${conversation.title}\n\n`;
    markdown += `**Created:** ${new Date(conversation.createdAt).toLocaleString()}\n`;
    markdown += `**Messages:** ${conversation.messageCount}\n`;
    if (conversation.tags.length > 0) {
      markdown += `**Topics:** ${conversation.tags.join(', ')}\n`;
    }
    markdown += '\n---\n\n';

    conversation.messages.forEach((msg, idx) => {
      markdown += `## ${msg.role === 'user' ? 'You' : 'ContradictMe'}\n\n`;
      markdown += `${msg.content}\n\n`;

      if (msg.arguments && msg.arguments.length > 0) {
        markdown += `### Arguments\n\n`;
        msg.arguments.forEach((arg, argIdx) => {
          markdown += `**${argIdx + 1}. ${arg.mainClaim}**\n`;
          markdown += `Quality Score: ${arg.qualityScore}/100\n\n`;
          markdown += `${arg.evidence}\n\n`;
          if (arg.sources.length > 0) {
            markdown += `Sources:\n`;
            arg.sources.forEach((source) => {
              markdown += `- [${source.title}](${source.url})\n`;
            });
            markdown += '\n';
          }
        });
      }

      if (idx < conversation.messages.length - 1) {
        markdown += '---\n\n';
      }
    });

    return markdown;
  },
};

export default db;
