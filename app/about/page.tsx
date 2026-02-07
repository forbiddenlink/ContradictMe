import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About the ContradictMe Mission | ContradictMe',
  description:
    'Learn why ContradictMe exists, how evidence is evaluated, and how this project helps people pressure-test assumptions through stronger opposing arguments.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">About ContradictMe</h1>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
          ContradictMe is an AI project built to help people think through difficult topics by
          seeing the strongest case for the other side. Most online systems optimize for agreement
          and engagement. This project does the opposite. It prioritizes constructive disagreement
          so users can test their assumptions, identify blind spots, and improve judgment.
        </p>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
          Our approach emphasizes steel-manning over straw-manning. Each response aims to surface
          the most credible opposing evidence, explain limitations, and avoid personal attacks.
          This product is intended for education and critical thinking. It is not a replacement for
          professional medical, legal, or financial advice.
        </p>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
          We continue improving source quality, citation clarity, and topic coverage so arguments
          stay useful and honest. If you have feedback about quality, bias, or missing context,
          please visit the contact page and share specific examples.
        </p>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
          Editorially, we prefer claims that can be traced to public research, transparent methods,
          and verifiable sources. We also try to surface uncertainty whenever evidence is mixed,
          evolving, or context-dependent. When users ask complex policy questions, we aim to expose
          tradeoffs rather than force a single answer. This makes the tool useful for classrooms,
          writing preparation, decision memos, and strategy discussions where intellectual honesty
          matters more than rhetorical victory.
        </p>

        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">
            Home
          </Link>
          <Link href="/chat" className="text-violet-600 dark:text-violet-400 hover:underline">
            Start Chat
          </Link>
          <Link href="/contact" className="text-violet-600 dark:text-violet-400 hover:underline">
            Contact
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
