import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_AUTHOR, SITE_NAME, SITE_URL } from '@/lib/site';

const UPDATED_DATE = '2026-02-08';
const UPDATED_ISO_DATE = `${UPDATED_DATE}T00:00:00.000Z`;

const contactPageSchema = {
  '@type': 'ContactPage',
  name: `Contact ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  datePublished: UPDATED_ISO_DATE,
  dateModified: UPDATED_ISO_DATE,
  author: {
    '@type': 'Organization',
    name: DEFAULT_AUTHOR,
  },
};

const FAQ_ITEMS = [
  {
    question: 'How quickly will I get a response?',
    answer:
      'I aim to respond within 2 business days (Monday-Friday). Urgent technical issues affecting service availability receive priority attention.',
  },
  {
    question: 'Can I suggest new topics or arguments?',
    answer:
      "Yes. I welcome topic suggestions, especially for areas where public discourse would benefit from seeing steel-manned counterarguments. Include the topic, why it matters, and any high-quality sources you've already found.",
  },
  {
    question: 'What if I think a response contains factual errors?',
    answer:
      "Please email me with the specific claim, why you believe it's incorrect, and links to credible sources that contradict it. I review all factual correction requests and update my argument database when warranted.",
  },
  {
    question: 'Do you offer educational or institutional partnerships?',
    answer:
      'Yes. Schools, universities, and research organizations can contact me about bulk access, custom topic coverage, or integration support. Please use the general contact email and include details about your institution and intended use case.',
  },
] as const;

const faqPageSchema = {
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const contactPageGraph = {
  '@context': 'https://schema.org',
  '@graph': [contactPageSchema, faqPageSchema],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageGraph).replaceAll('<', String.raw`\u003c`),
        }}
      />
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">Contact</h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-6">
          By{' '}
          <a
            href="/about"
            rel="author"
            itemProp="author"
            itemScope
            itemType="https://schema.org/Person"
          >
            <span itemProp="name">{DEFAULT_AUTHOR}</span>
          </a>{' '}
          • Last updated{' '}
          <time dateTime={UPDATED_ISO_DATE} itemProp="dateModified">
            {UPDATED_DATE}
          </time>
        </p>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          I welcome feedback on argument quality, missing sources, factual errors, and product
          improvements. Please include the topic you asked about and the response details so I can
          reproduce the issue quickly.
        </p>

        <div className="mb-8 p-5 bg-violet-50 dark:bg-violet-950/20 border border-violet-200 dark:border-violet-900 rounded-xl">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">What&apos;s New</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">ContradictMe now includes several new features to enhance critical thinking:</p>
          <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
            <li>• <strong>Analytics Dashboard:</strong> Track your exploration topics, view tag clouds, and earn critical thinking achievements</li>
            <li>• <strong>AI Debate Arena:</strong> Watch Pro vs Con agents debate any topic through 5 structured rounds</li>
            <li>• <strong>Conversation History:</strong> Search and bookmark past conversations with full context preservation</li>
            <li>• <strong>Smart Follow-ups:</strong> AI-generated contextual questions to deepen your understanding</li>
            <li>• <strong>Share & Export:</strong> Export conversations in multiple formats (JSON, Markdown, TXT)</li>
          </ul>
        </div>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          For the fastest support, include screenshots, timestamps, and the exact prompt text you
          submitted. If your report is about evidence quality, tell me which claims looked weak and
          what source type you expected to see instead. Actionable reports help me improve ranking,
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
              Email:{' '}
              <a
                className="text-violet-600 dark:text-violet-400 hover:underline"
                href="mailto:purplegumdropz@gmail.com"
              >
                purplegumdropz@gmail.com
              </a>
            </li>
            <li>Response window: Monday through Friday, typically within 2 business days.</li>
          </ul>
        </section>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
          For deployment-related incidents, include affected route URLs and the time window so I
          can correlate logs quickly. If your issue relates to how results are sourced or ranked,
          include at least one external reference URL to compare against. You can also review the
          platform deployment model at{' '}
          <a
            href="https://vercel.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 dark:text-violet-400 hover:underline"
          >
            Vercel Docs
          </a>{' '}
          and API reliability practices in the{' '}
          <a
            href="https://datatracker.ietf.org/doc/html/rfc9110"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 dark:text-violet-400 hover:underline"
          >
            HTTP Semantics standard
          </a>.
        </p>

        <section className="mb-8" aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-4"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-2">
                  {item.question}
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
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
