import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';
import ChatPageClient from './ChatPageClient';

type ChatPageProps = {
  searchParams: Promise<{ message?: string }>;
};

export async function generateMetadata({ searchParams }: ChatPageProps): Promise<Metadata> {
  const params = await searchParams;
  const message = params.message;

  if (message && message.length > 0) {
    const truncated = message.length > 50 ? message.substring(0, 47) + '...' : message;

    return {
      title: `${truncated} | ${SITE_NAME}`,
      description: `Challenge your belief: "${truncated}" with research-backed counterarguments and evidence.`,
      alternates: {
        canonical: '/chat',
      },
    };
  }

  return {
    title: `Live Debate Chat | ${SITE_NAME}`,
    description:
      'Start a ContradictMe session to challenge your position with research-backed opposing arguments, source context, and clear tradeoffs.',
    alternates: {
      canonical: '/chat',
    },
  };
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const params = await searchParams;
  const initialMessage = params.message || null;

  return <ChatPageClient initialMessage={initialMessage} />;
}
