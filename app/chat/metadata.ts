import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';

export function generateChatMetadata(message?: string | null): Metadata {
  if (message && message.length > 0) {
    const truncated = message.length > 50 
      ? message.substring(0, 47) + '...' 
      : message;
    
    return {
      title: `${truncated} - Chat | ${SITE_NAME}`,
      description: `Explore counterarguments to: "${truncated}" - Challenge your beliefs with research-backed opposing views.`,
    };
  }
  
  return {
    title: `Live Debate Chat | ${SITE_NAME}`,
    description: 'Start a ContradictMe session to challenge your position with research-backed counterarguments and steel-manned opposing views.',
  };
}
