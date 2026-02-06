import { saveConversation, loadConversation, clearConversation } from '@/lib/storage';
import { Message } from '@/lib/types';

describe('Storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveConversation', () => {
    it('saves messages to localStorage', () => {
      const messages: Message[] = [
        {
          id: '1',
          role: 'assistant',
          content: 'Hello',
          timestamp: Date.now(),
        },
      ];

      saveConversation(messages);

      const saved = localStorage.getItem('contradictme_conversation');
      expect(saved).toBeTruthy();
      expect(JSON.parse(saved!)).toEqual(messages);
    });

    it('saves timestamp', () => {
      const messages: Message[] = [];
      saveConversation(messages);

      const timestamp = localStorage.getItem('contradictme_timestamp');
      expect(timestamp).toBeTruthy();
      expect(parseInt(timestamp!)).toBeGreaterThan(Date.now() - 1000);
    });
  });

  describe('loadConversation', () => {
    it('loads saved messages', () => {
      const messages: Message[] = [
        {
          id: '1',
          role: 'user',
          content: 'Test',
          timestamp: Date.now(),
        },
      ];

      localStorage.setItem('contradictme_conversation', JSON.stringify(messages));
      localStorage.setItem('contradictme_timestamp', Date.now().toString());

      const loaded = loadConversation();
      expect(loaded).toEqual(messages);
    });

    it('returns null when no conversation saved', () => {
      const loaded = loadConversation();
      expect(loaded).toBeNull();
    });

    it('clears old conversations (>24 hours)', () => {
      const messages: Message[] = [
        {
          id: '1',
          role: 'user',
          content: 'Old message',
          timestamp: Date.now(),
        },
      ];

      const oldTimestamp = Date.now() - 25 * 60 * 60 * 1000; // 25 hours ago
      localStorage.setItem('contradictme_conversation', JSON.stringify(messages));
      localStorage.setItem('contradictme_timestamp', oldTimestamp.toString());

      const loaded = loadConversation();
      expect(loaded).toBeNull();
      expect(localStorage.getItem('contradictme_conversation')).toBeNull();
    });
  });

  describe('clearConversation', () => {
    it('removes conversation from localStorage', () => {
      const messages: Message[] = [
        {
          id: '1',
          role: 'user',
          content: 'Test',
          timestamp: Date.now(),
        },
      ];

      localStorage.setItem('contradictme_conversation', JSON.stringify(messages));
      localStorage.setItem('contradictme_timestamp', Date.now().toString());

      clearConversation();

      expect(localStorage.getItem('contradictme_conversation')).toBeNull();
      expect(localStorage.getItem('contradictme_timestamp')).toBeNull();
    });
  });
});
