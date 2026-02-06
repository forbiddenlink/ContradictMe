import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0D9A9B',
};

export const metadata: Metadata = {
  title: 'ContradictMe - Challenge Your Beliefs with AI',
  description:
    'An AI that actively seeks and presents the strongest counterarguments to your views. Steel-man opposing perspectives with research-backed arguments. Fight echo chambers and think critically.',
  keywords: [
    'AI',
    'critical thinking',
    'counterarguments',
    'debate',
    'intellectual honesty',
    'steel-manning',
    'echo chambers',
    'rational discourse',
  ],
  authors: [{ name: 'ContradictMe' }],
  creator: 'ContradictMe',
  publisher: 'ContradictMe',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'ContradictMe - An AI That Disagrees With You',
    description:
      'Challenge your beliefs with research-backed counterarguments. Think critically, escape echo chambers, and understand opposing perspectives.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ContradictMe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ContradictMe - Challenge Your Beliefs',
    description:
      'An AI that disagrees with you, backed by research. Fight echo chambers, think critically.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
