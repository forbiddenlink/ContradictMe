import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_AUTHOR, SITE_NAME, SITE_URL } from '@/lib/site';

const PUBLISHED_DATE = '2026-02-07';
const ISO_DATE = `${PUBLISHED_DATE}T00:00:00.000Z`;

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `About ${SITE_NAME}`,
  url: `${SITE_URL}/about`,
  description:
    'Learn why ContradictMe exists, how evidence is evaluated, and how this project helps people pressure-test assumptions through stronger opposing arguments.',
  datePublished: ISO_DATE,
  dateModified: ISO_DATE,
  author: {
    '@type': 'Organization',
    name: DEFAULT_AUTHOR,
  },
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema).replace(/</g, '\\u003c'),
        }}
      />
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">About ContradictMe</h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6">
          By {DEFAULT_AUTHOR} • Published {PUBLISHED_DATE}
        </p>
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
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
          The core product standard is simple: represent opposing viewpoints accurately, anchor
          arguments to traceable evidence, and reveal uncertainty instead of hiding it. We iterate on
          ranking and retrieval quality as new topics emerge and as source quality shifts. If you are
          evaluating this for classroom use, team workshops, or editorial research, you can inspect
          the technical foundations in the{' '}
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 dark:text-violet-400 hover:underline"
          >
            Next.js documentation
          </a>{' '}
          and follow search quality guidance from{' '}
          <a
            href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 dark:text-violet-400 hover:underline"
          >
            Google Search Central
          </a>
          .
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
