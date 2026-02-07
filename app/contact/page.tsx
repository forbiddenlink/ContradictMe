import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact and Support | ContradictMe',
  description:
    'Contact ContradictMe for bug reports, source-quality feedback, partnership discussions, and support questions about responses or reliability.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">Contact</h1>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          We welcome feedback on argument quality, missing sources, factual errors, and product
          improvements. Please include the topic you asked about and the response details so we can
          reproduce the issue quickly.
        </p>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          For the fastest support, include screenshots, timestamps, and the exact prompt text you
          submitted. If your report is about evidence quality, tell us which claims looked weak and
          what source type you expected to see instead. Actionable reports help us improve ranking,
          citation quality, and coverage depth much faster than general complaints.
        </p>

        <section className="mb-8" aria-labelledby="contact-methods">
          <h2
            id="contact-methods"
            className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-4"
          >
            Contact Methods
          </h2>
          <ul className="space-y-3 text-base sm:text-lg text-slate-700 dark:text-slate-300">
            <li>
              Email: <a className="text-violet-600 dark:text-violet-400 hover:underline" href="mailto:hello@contradict-me.vercel.app">hello@contradict-me.vercel.app</a>
            </li>
            <li>
              Product support: <a className="text-violet-600 dark:text-violet-400 hover:underline" href="mailto:support@contradict-me.vercel.app">support@contradict-me.vercel.app</a>
            </li>
            <li>
              Privacy questions: <a className="text-violet-600 dark:text-violet-400 hover:underline" href="mailto:privacy@contradict-me.vercel.app">privacy@contradict-me.vercel.app</a>
            </li>
            <li>
              Response window: Monday through Friday, typically within 2 business days.
            </li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">
            Home
          </Link>
          <Link href="/chat" className="text-violet-600 dark:text-violet-400 hover:underline">
            Start Chat
          </Link>
          <Link href="/about" className="text-violet-600 dark:text-violet-400 hover:underline">
            About
          </Link>
          <Link
            href="/privacy-policy"
            className="text-violet-600 dark:text-violet-400 hover:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
