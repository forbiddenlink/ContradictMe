import { SITE_NAME, SITE_URL } from './site';

export interface GuideCounterargument {
  title: string;
  summary: string;
  evidence: string;
  limitation: string;
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface TopicGuide {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  beliefToChallenge: string;
  starterPrompt: string;
  publishDate: string;
  counterarguments: GuideCounterargument[];
  reflectionQuestions: string[];
  faq: GuideFaqItem[];
  primarySources: string[];
}

const GUIDE_DATE = '2026-02-07';

export const TOPIC_GUIDES: TopicGuide[] = [
  {
    slug: 'remote-work-productivity',
    title: 'Remote Work Productivity: Strong Counterarguments',
    seoTitle: 'Is Remote Work Always Better? Counterarguments and Evidence',
    description:
      'A practical guide to the strongest research-backed objections to the claim that remote work is always better for productivity, innovation, and career growth.',
    beliefToChallenge: 'Remote work is always better than in-office work.',
    starterPrompt:
      'I believe remote work is always better than in-office work. Give me the strongest counterarguments with evidence and limitations.',
    publishDate: GUIDE_DATE,
    counterarguments: [
      {
        title: 'Innovation often depends on unplanned collaboration',
        summary:
          'Teams can lose cross-functional idea flow when all collaboration is scheduled and mediated through tools.',
        evidence:
          'Multiple productivity studies report weaker rates of spontaneous cross-team coordination and lower perceived innovation in fully remote structures.',
        limitation:
          'High-trust remote teams with strong documentation and periodic in-person workshops can reduce this gap.',
      },
      {
        title: 'Early-career development can slow down',
        summary:
          'Junior staff often learn through observation, quick feedback, and context pickup that is harder to replicate asynchronously.',
        evidence:
          'Mentorship and onboarding outcomes are frequently stronger in hybrid models where new hires spend structured in-person time with experienced teammates.',
        limitation:
          'Remote-first teams with explicit mentoring systems can compensate, but this requires disciplined management design.',
      },
      {
        title: 'Operational coordination costs can rise',
        summary:
          'Distributed teams may spend more time on process overhead to maintain alignment and decision clarity.',
        evidence:
          'Organizations that shifted rapidly to fully remote models often added meeting load, tooling complexity, and delayed decisions before process maturity improved.',
        limitation:
          'Once remote operating norms are mature, some teams recover and outperform office baselines on focused individual work.',
      },
    ],
    reflectionQuestions: [
      'Are you optimizing for deep focus output, long-term innovation, or mentorship quality?',
      'Would a hybrid model preserve remote flexibility while reducing collaboration costs?',
      'Which team functions in your context actually benefit most from physical co-location?',
    ],
    faq: [
      {
        question: 'Does this mean remote work is bad?',
        answer:
          'No. The point is that remote work has tradeoffs and may not dominate on every objective or team composition.',
      },
      {
        question: 'When does remote work usually perform best?',
        answer:
          'It often performs well for experienced, documentation-heavy teams doing focused execution work.',
      },
      {
        question: 'What is the practical middle ground?',
        answer:
          'Many teams use hybrid structures with clear in-person goals: planning, mentoring, and high-friction collaboration sessions.',
      },
    ],
    primarySources: [
      'Stanford and MIT distributed-work studies',
      'OECD future-of-work analysis',
      'Large-scale HR and productivity benchmarking reports',
    ],
  },
  {
    slug: 'nuclear-energy-safety',
    title: 'Nuclear Energy Safety: Strong Counterarguments',
    seoTitle: 'Is Nuclear Energy Too Dangerous? Counterarguments and Evidence',
    description:
      'A steel-manned guide to the strongest case against the belief that nuclear energy is inherently too dangerous to include in modern energy policy.',
    beliefToChallenge: 'Nuclear energy is too dangerous to use at scale.',
    starterPrompt:
      'I believe nuclear energy is too dangerous. Give me the strongest case for including nuclear in energy policy, with evidence and caveats.',
    publishDate: GUIDE_DATE,
    counterarguments: [
      {
        title: 'Lifecycle risk can be lower than fossil-heavy alternatives',
        summary:
          'When measured per unit of electricity, modern nuclear systems can compare favorably on mortality and emissions outcomes.',
        evidence:
          'Comparative energy assessments consistently show severe public-health impacts from air pollution in fossil generation at far larger scale.',
        limitation:
          'Low-probability nuclear incidents can still produce concentrated long-term local harm and social disruption.',
      },
      {
        title: 'Grid decarbonization may need firm low-carbon power',
        summary:
          'Intermittent renewables plus storage may not alone satisfy reliability constraints in every region and season.',
        evidence:
          'Energy-transition models frequently include some firm low-carbon generation to stabilize supply during extended low-wind or low-sun periods.',
        limitation:
          'Economics vary significantly by region, regulatory regime, and project execution quality.',
      },
      {
        title: 'Modern reactor design has materially improved safety',
        summary:
          'Current reactor classes include passive safety features that reduce reliance on active intervention during faults.',
        evidence:
          'Post-accident regulation, engineering standards, and monitoring practices have tightened compared with legacy plant eras.',
        limitation:
          'Waste management, capital overruns, and deployment timelines remain major barriers independent of reactor safety engineering.',
      },
    ],
    reflectionQuestions: [
      'Are you weighting catastrophe severity more than expected-value public health impacts?',
      'How should policy compare chronic fossil harm versus rare high-visibility incidents?',
      'Which energy mix gives your region the best reliability-carbon-cost balance?',
    ],
    faq: [
      {
        question: 'Is this guide pro-nuclear?',
        answer:
          'It is pro-clarity. It presents the strongest objections to an anti-nuclear belief so decisions can be made on tradeoffs, not slogans.',
      },
      {
        question: 'What still makes nuclear difficult?',
        answer:
          'Project delivery risk, financing, public trust, waste politics, and regulatory complexity.',
      },
      {
        question: 'Does this dismiss renewables?',
        answer:
          'No. The guide assumes renewables are central and asks where additional firm low-carbon capacity may still be valuable.',
      },
    ],
    primarySources: [
      'Our World in Data energy risk comparisons',
      'IEA and IPCC transition scenarios',
      'IAEA safety and regulatory updates',
    ],
  },
  {
    slug: 'ai-jobs-automation',
    title: 'AI and Jobs: Strong Counterarguments',
    seoTitle: 'Will AI Cause Mass Unemployment? Counterarguments and Evidence',
    description:
      'A balanced guide to the strongest counterarguments to the claim that AI will mainly produce mass permanent unemployment.',
    beliefToChallenge: 'AI will cause mass permanent unemployment.',
    starterPrompt:
      'I believe AI will cause mass permanent unemployment. Give me the strongest counterarguments with evidence, uncertainty, and policy implications.',
    publishDate: GUIDE_DATE,
    counterarguments: [
      {
        title: 'Automation often changes tasks before it removes occupations',
        summary:
          'Most jobs bundle many tasks, and AI usually substitutes specific activities rather than whole roles overnight.',
        evidence:
          'Labor-economics analyses show technology shocks frequently recompose work content and raise productivity before full role elimination occurs.',
        limitation:
          'Some occupations with highly codified routine tasks may still face sharp displacement waves.',
      },
      {
        title: 'Productivity gains can create new demand and roles',
        summary:
          'Lower costs and higher output can expand markets, which increases demand for complementary human work.',
        evidence:
          'Historical adoption curves in software, manufacturing, and services often show job churn with net creation in adjacent functions.',
        limitation:
          'The transition period can be painful, and gains may concentrate unevenly without policy intervention.',
      },
      {
        title: 'Adoption friction slows real-world disruption',
        summary:
          'Integration limits, compliance risk, model reliability constraints, and human trust concerns can delay full replacement scenarios.',
        evidence:
          'Enterprise deployment data shows many firms remain in pilot or partial-automation phases due to workflow and governance bottlenecks.',
        limitation:
          'If model reliability and governance tooling improve quickly, disruption pace could accelerate materially.',
      },
    ],
    reflectionQuestions: [
      'Are you forecasting short-term displacement or long-run labor equilibrium?',
      'Which jobs in your sector are task-substitutable versus human-complementary?',
      'What retraining and mobility policies would reduce downside risk fastest?',
    ],
    faq: [
      {
        question: 'Does this mean job displacement is overblown?',
        answer:
          'No. Displacement risk is real; the key argument is that outcomes are likely heterogeneous rather than a single mass-unemployment endpoint.',
      },
      {
        question: 'What determines whether workers benefit?',
        answer:
          'Transition speed, bargaining power, access to retraining, and whether institutions channel productivity gains into broad wage growth.',
      },
      {
        question: 'What should companies do now?',
        answer:
          'Adopt AI with job redesign plans, transparent skill pathways, and explicit internal mobility programs.',
      },
    ],
    primarySources: [
      'OECD and IMF labor market analysis',
      'NBER automation and task composition research',
      'World Economic Forum future-of-jobs datasets',
    ],
  },
];

export function getTopicGuide(slug: string): TopicGuide | undefined {
  return TOPIC_GUIDES.find((guide) => guide.slug === slug);
}

export function getTopicGuideUrl(slug: string): string {
  return `${SITE_URL}/learn/${slug}`;
}

export const LEARN_HUB_TITLE = `${SITE_NAME} Topic Guides`;
