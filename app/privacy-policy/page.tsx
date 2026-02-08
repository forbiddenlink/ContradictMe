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
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-8">
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
          • Effective date:{' '}
          <time dateTime={EFFECTIVE_ISO_DATE} itemProp="datePublished">
            {EFFECTIVE_DATE}
          </time>
        </p>

        <section className="mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">
            Information We Process
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            ContradictMe processes the text you submit in chat prompts and related technical logs
            needed to operate the service. We use this information to generate responses, monitor
            reliability, and improve quality. Please avoid sharing sensitive personal information in
            prompts unless it is necessary for your question.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">
            How We Use Data
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Data is used to provide the chat experience, detect abuse, troubleshoot errors, and
            evaluate product quality. We do not sell personal data. We may use service providers to
            host infrastructure and deliver AI responses under contractual safeguards.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">
            Your Choices
          </h2>
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
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">
            Retention and Security
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            We retain operational logs only as long as needed for service continuity, abuse
            prevention, and debugging. Access is restricted to authorized personnel and service
            providers with a legitimate operational need. While no system is perfectly secure, we
            use standard safeguards for transport security and service configuration.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">
            Legal Rights and Frameworks
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
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
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            If you wish to exercise these rights, please contact us with sufficient detail to
            identify the request scope. We will respond within the timeframe required by applicable
            law and may request verification of your identity before processing certain requests.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">
            Cookies and Tracking
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            ContradictMe uses minimal analytics to understand usage patterns and improve service
            quality. We use Vercel Analytics and Speed Insights to collect aggregate performance
            metrics and page view data. These tools do not use third-party advertising cookies.
          </p>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            We store your theme preference (light/dark mode) in local browser storage to improve
            your experience. This data never leaves your device and is not transmitted to our
            servers. You can clear this at any time through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">
            Third-Party Services
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            ContradictMe uses the following third-party services to deliver functionality:
          </p>
          <ul className="list-none space-y-3 text-base sm:text-lg text-slate-700 dark:text-slate-300 ml-6">
            <li className="flex gap-3">
              <span className="text-violet-600 dark:text-violet-400">•</span>
              <div>
                <strong>Vercel</strong> - Hosting and edge delivery infrastructure
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-600 dark:text-violet-400">•</span>
              <div>
                <strong>Algolia Agent Studio</strong> - AI-powered search and response generation
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-violet-600 dark:text-violet-400">•</span>
              <div>
                <strong>Vercel Analytics</strong> - Privacy-focused analytics without cookies
              </div>
            </li>
          </ul>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
            Each provider operates under their own privacy policies and data processing agreements.
            We select providers that maintain strong security standards and limit data use to
            operational necessities.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-3">
            Policy Updates
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            We may update this policy to reflect changes in our practices, legal requirements, or
            service features. Material changes will be posted on this page with an updated effective
            date. Continued use of the service after changes constitutes acceptance of the updated
            policy. We recommend reviewing this page periodically to stay informed.
          </p>
        </section>

        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <Link href="/" className="text-violet-600 dark:text-violet-400 hover:underline">
            Home
          </Link>
          <Link href="/learn" className="text-violet-600 dark:text-violet-400 hover:underline">
            Learn
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
