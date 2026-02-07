import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Debate Chat | ContradictMe',
  description:
    'Start a ContradictMe session to challenge your position with research-backed opposing arguments, source context, and clear tradeoffs.',
  alternates: {
    canonical: '/chat',
  },
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
