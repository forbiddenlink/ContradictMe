import { Message } from './types';

export const saveConversation = (messages: Message[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('contradictme_conversation', JSON.stringify(messages));
    localStorage.setItem('contradictme_timestamp', Date.now().toString());
  } catch (error) {
    console.error('Failed to save conversation:', error);
  }
};

export const loadConversation = (): Message[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem('contradictme_conversation');
    const timestamp = localStorage.getItem('contradictme_timestamp');

    // Clear if older than 24 hours
    if (timestamp && Date.now() - parseInt(timestamp, 10) > 24 * 60 * 60 * 1000) {
      clearConversation();
      return null;
    }

    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load conversation:', error);
    return null;
  }
};

export const clearConversation = () => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('contradictme_conversation');
    localStorage.removeItem('contradictme_timestamp');
  } catch (error) {
    console.error('Failed to clear conversation:', error);
  }
};
