import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_AUTHOR, SITE_NAME, SITE_URL } from '@/lib/site';
import { LEARN_HUB_TITLE, TOPIC_GUIDES, getTopicGuideUrl } from '@/lib/topicGuides';

const LEARN_UPDATED_DATE = '2026-02-07';
const LEARN_UPDATED_ISO_DATE = `${LEARN_UPDATED_DATE}T00:00:00.000Z`;

const learnHubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: LEARN_HUB_TITLE,
      url: `${SITE_URL}/learn`,
      description:
        'Topic guides that pressure-test common beliefs with strong counterarguments, tradeoffs, and evidence quality notes.',
      datePublished: LEARN_UPDATED_ISO_DATE,
      dateModified: LEARN_UPDATED_ISO_DATE,
      author: {
        '@type': 'Organization',
        name: DEFAULT_AUTHOR,
      },
    },
    {
      '@type': 'ItemList',
      itemListElement: TOPIC_GUIDES.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: getTopicGuideUrl(guide.slug),
        name: guide.seoTitle,
      })),
    },
  ],
};

export const metadata: Metadata = {
  title: `Learn Counterargument Guides | ${SITE_NAME}`,
  description:
    'Read deep guides on remote work, nuclear energy, and AI job disruption to pressure-test beliefs with rigorous counterarguments.',
  alternates: {
    canonical: '/learn',
  },
};

export default function LearnHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(learnHubSchema).replace(/</g, '\\u003c'),
        }}
      />

      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
        <header className="mb-10">
          <p className="text-xs sm:text-sm uppercase tracking-wide text-violet-600 dark:text-violet-400 font-semibold mb-3">
            Learn Hub
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Counterargument Topic Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            Each guide breaks down a popular belief, then presents the strongest opposing case with
            evidence signals, uncertainty notes, and reflection questions you can use in class,
            writing, policy work, and decision reviews.
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            By {DEFAULT_AUTHOR} • Last updated {LEARN_UPDATED_DATE}
          </p>
        </header>

        <section className="grid gap-5 sm:gap-6 md:grid-cols-3" aria-label="Topic guide cards">
          {TOPIC_GUIDES.map((guide) => (
            <article
              key={guide.slug}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
            >
              <h2 className="font-display text-xl font-semibold tracking-tight mb-3">
                {guide.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {guide.description}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mb-5">
                Belief tested: {guide.beliefToChallenge}
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <Link
                  href={`/learn/${guide.slug}`}
                  className="inline-flex justify-center rounded-xl px-4 py-2 bg-violet-600 text-white hover:bg-violet-700 transition-colors font-medium"
                >
                  Open Guide
                </Link>
                <Link
                  href={`/chat?message=${encodeURIComponent(guide.starterPrompt)}`}
                  className="inline-flex justify-center rounded-xl px-4 py-2 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-colors font-medium"
                >
                  Run Prompt in Chat
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-3">
            How to Use These Guides
          </h2>
          <ul className="space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <li>1. Start with the belief statement and identify your current confidence level.</li>
            <li>2. Read the strongest objections and note which assumptions are challenged.</li>
            <li>3. Use the linked chat prompt to pressure-test your position with follow-up questions.</li>
          </ul>
        </section>

        <nav className="mt-10 flex flex-wrap gap-4 text-sm sm:text-base" aria-label="Learn hub links">
          <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">
            Home
          </Link>
          <Link href="/chat" className="text-violet-600 dark:text-violet-400 hover:underline">
            Start Chat
          </Link>
          <Link href="/about" className="text-violet-600 dark:text-violet-400 hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-violet-600 dark:text-violet-400 hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </main>
  );
}
