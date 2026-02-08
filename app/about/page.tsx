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
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-6">
          By <span itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">{DEFAULT_AUTHOR}</span>
          </span> • Published <time dateTime={ISO_DATE}>{PUBLISHED_DATE}</time>
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

        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-4">Common Use Cases</h2>
          <ul className="space-y-4 text-base sm:text-lg text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
              <div>
                <strong>Debate Preparation:</strong> Students and professionals use ContradictMe to anticipate counterarguments before presentations, debates, or policy discussions.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
              <div>
                <strong>Critical Thinking Practice:</strong> Educators assign prompts to help students engage with opposing evidence and develop intellectual humility.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
              <div>
                <strong>Decision-Making:</strong> Individuals exploring career changes, policy positions, or personal beliefs use the tool to surface blind spots before making commitments.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
              <div>
                <strong>Research Starting Point:</strong> Writers and researchers use responses as a curated starting point for exploring opposing perspectives and evidence gaps.
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-4">Evidence Standards</h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            ContradictMe prioritizes arguments backed by peer-reviewed research, transparent methodologies,
            and verifiable sources. Each argument includes quality scores based on evidence strength,
            sample size, and study design. We explicitly flag limitations, conflicts of interest,
            and areas where scientific consensus is absent or evolving.
          </p>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Unlike generative AI models that produce plausible-sounding text, our system is designed
            to cite specific studies and acknowledge when evidence is thin, contradictory, or
            context-dependent. This approach helps users distinguish between well-supported claims
            and speculative arguments.
          </p>
        </section>

        <section className="mb-10 p-6 rounded-2xl border border-violet-200 dark:border-violet-900 bg-violet-50/30 dark:bg-violet-950/10">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-4">About the Creator</h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            ContradictMe was created by {DEFAULT_AUTHOR}, a developer focused on building tools that promote critical thinking and intellectual honesty. This project emerged from a desire to create an AI system that challenges beliefs rather than reinforcing them.
          </p>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            The project is built using Next.js, Algolia Agent Studio, and curated argument databases with peer-reviewed sources. All arguments are evaluated for quality, credibility, and evidence strength before being included in the system. For questions or feedback, please visit the <Link href="/contact" className="text-violet-600 dark:text-violet-400 hover:underline font-medium">contact page</Link>.
          </p>
        </section>

        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">
            Home
          </Link>
          <Link href="/learn" className="text-violet-600 dark:text-violet-400 hover:underline">
            Learn
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
