import type { Metadata } from 'next';
import { DEFAULT_AUTHOR } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Live Debate Chat | ContradictMe',
  description:
    'Start a ContradictMe session to challenge your position with research-backed opposing arguments, source context, and clear tradeoffs.',
  alternates: {
    canonical: '/chat',
  },
  authors: [{ name: DEFAULT_AUTHOR }],
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
