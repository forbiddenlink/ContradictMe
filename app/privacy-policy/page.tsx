import type { Metadata } from 'next';
import Link from 'next/link';
import { DEFAULT_AUTHOR, SITE_NAME, SITE_URL } from '@/lib/site';

const EFFECTIVE_DATE = '2026-02-07';
const EFFECTIVE_ISO_DATE = `${EFFECTIVE_DATE}T00:00:00.000Z`;

const privacySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${SITE_NAME} Privacy Policy`,
  url: `${SITE_URL}/privacy-policy`,
  datePublished: EFFECTIVE_ISO_DATE,
  dateModified: EFFECTIVE_ISO_DATE,
  author: {
    '@type': 'Organization',
    name: DEFAULT_AUTHOR,
  },
};

export const metadata: Metadata = {
  title: 'Privacy Policy and Data Use | ContradictMe',
  description:
    'Read the ContradictMe privacy policy, including what data we process, why we process it, retention expectations, and your available rights.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacySchema).replace(/</g, '\\u003c'),
        }}
      />
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-8">
          By {DEFAULT_AUTHOR} • Effective date: {EFFECTIVE_DATE}
        </p>

        <section className="mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">Information We Process</h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            ContradictMe processes the text you submit in chat prompts and related technical logs
            needed to operate the service. We use this information to generate responses, monitor
            reliability, and improve quality. Please avoid sharing sensitive personal information in
            prompts unless it is necessary for your question.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">How We Use Data</h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Data is used to provide the chat experience, detect abuse, troubleshoot errors, and
            evaluate product quality. We do not sell personal data. We may use service providers to
            host infrastructure and deliver AI responses under contractual safeguards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">Your Choices</h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            You can request deletion or correction of personal data associated with your support
            communications by contacting us. For privacy inquiries, use{' '}
            <a
              href="mailto:privacy@contradict-me.vercel.app"
              className="text-violet-600 dark:text-violet-400 hover:underline"
            >
              privacy@contradict-me.vercel.app
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">Retention and Security</h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            We retain operational logs only as long as needed for service continuity, abuse
            prevention, and debugging. Access is restricted to authorized personnel and service
            providers with a legitimate operational need. While no system is perfectly secure, we
            use standard safeguards for transport security and service configuration.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">Legal Rights and Frameworks</h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Depending on your location, you may have rights to access, correction, deletion, and
            portability of personal data. Our handling of requests follows applicable requirements
            under relevant frameworks such as GDPR and CCPA where applicable. For background on
            those frameworks, refer to{' '}
            <a
              href="https://gdpr-info.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-400 hover:underline"
            >
              GDPR reference guidance
            </a>{' '}
            and the{' '}
            <a
              href="https://oag.ca.gov/privacy/ccpa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-400 hover:underline"
            >
              California Attorney General CCPA overview
            </a>
            .
          </p>
        </section>

        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-violet-600 dark:text-violet-400 hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-violet-600 dark:text-violet-400 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
