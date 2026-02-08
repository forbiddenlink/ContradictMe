import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import ChatPageClient from './ChatPageClient';

type ChatPageProps = {
  searchParams: Promise<{ message?: string }>;
};

export async function generateMetadata({ searchParams }: ChatPageProps): Promise<Metadata> {
  const params = await searchParams;
  const message = params.message;

  const baseMetadata: Metadata = {
    title: `Live Debate Chat | ${SITE_NAME}`,
    description:
      'Start a ContradictMe session to challenge your position with research-backed opposing arguments, source context, and clear tradeoffs.',
    alternates: {
      canonical: '/chat',
    },
    openGraph: {
      title: `Live Debate Chat | ${SITE_NAME}`,
      description: 'Challenge positions with research-backed counterarguments and evidence.',
      type: 'website',
      url: `${SITE_URL}/chat`,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Live Debate Chat | ${SITE_NAME}`,
      description: 'Challenge positions with research-backed counterarguments.',
      images: ['/og-image.png'],
    },
  };

  if (message && message.length > 0) {
    // Max 60 chars total: 45 for message + " | " (3) + "ContradictMe" (12) = 60
    const truncated = message.length > 45 ? message.substring(0, 42) + '...' : message;

    return {
      ...baseMetadata,
      title: `${truncated} | ${SITE_NAME}`,
      description: `Challenge your belief: "${truncated}" with research-backed counterarguments and evidence.`,
    };
  }

  return baseMetadata;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const params = await searchParams;
  const initialMessage = params.message || null;

  return <ChatPageClient initialMessage={initialMessage} />;
}
