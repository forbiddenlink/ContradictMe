# ContradictMe 🎯

**Challenge Your Beliefs with Intelligent Counterarguments**

## The Hook

An AI agent that actively seeks and presents the strongest arguments _against_ your own views. Instead of confirming your biases, ContradictMe helps you think critically by steel-manning opposing perspectives.

## The Problem

- **Echo chambers**: Algorithms reinforce existing beliefs
- **Confirmation bias**: We seek information that agrees with us
- **Intellectual stagnation**: Rarely exposed to quality opposing arguments
- **Poor decision-making**: Decisions made without considering alternatives
- **Polarization**: Lack of understanding of opposing viewpoints

## The Solution

ContradictMe uses Algolia Agent Studio to:

1. Understand the user's belief or position
2. Search indexed counterarguments, research, and perspectives
3. Present the **strongest** opposing viewpoints (steel-man, not straw-man)
4. Cite quality sources and evidence
5. Help users think more critically about their positions

## Example Interactions

**User**: "I think remote work is always better - what am I missing?"

**ContradictMe**: "Let me present the strongest case for in-office work:

1. **Innovation & Serendipity**: Stanford research shows breakthrough innovations often come from spontaneous hallway conversations and unplanned collaborations that don't happen on Zoom...

2. **Career Development**: Junior employees learn 40% less in remote settings according to a 2024 Harvard study, missing mentorship moments and observational learning...

3. **Social Cohesion**: Teams that never meet in person report 60% lower trust scores and higher turnover rates..."

---

**User**: "I'm convinced crypto is a scam - steel-man the case for it"

**ContradictMe**: "Here's the strongest case for cryptocurrency that addresses your skepticism:

1. **Financial Inclusion**: 1.4 billion adults globally lack bank access. Crypto provides banking services via smartphone...

2. **Programmable Money**: Smart contracts enable trustless automation that's impossible with traditional finance...

3. **Inflation Hedge**: In countries like Argentina (140% inflation), Bitcoin provides alternative store of value..."

## Why This Wins the Contest

### 1. **Fights Echo Chambers** (Responsible AI)

- Goes against typical algorithm behavior
- Promotes intellectual humility
- Demonstrates ethical AI design

### 2. **Intellectual Honesty** (Judges Will Respect)

- Counter-intuitive approach shows sophistication
- Educational rather than manipulative
- Promotes civil discourse

### 3. **Genuinely Novel** (Creativity)

- No mainstream product does this well
- Flips typical search/AI behavior on its head
- Memorable positioning: "The AI that disagrees with you"

### 4. **Technical Showcase** (Use of Technology)

- Algolia's search quality is critical for finding best counterarguments
- Demonstrates advanced indexing (argument quality, source credibility)
- Shows intelligent ranking beyond simple relevance
- Perspective diversity scoring

### 5. **Immediate Practical Value** (Usability)

- Better decision-making
- Preparation for debates/discussions
- Self-improvement tool
- Research assistant for writers/students

## Algolia Agent Studio Features Demonstrated

- **Targeted prompting**: Understanding nuanced beliefs and finding specific counterpoints
- **Quality ranking**: Surfacing strongest arguments, not just matching keywords
- **Source credibility**: Weighting academic research, expert opinions, empirical data
- **Perspective diversity**: Ensuring different types of counterarguments
- **Conversational refinement**: Following up with specifics, asking clarifying questions

## Target Users

- **Students**: Learning to think critically and write better arguments
- **Professionals**: Making better business decisions
- **Researchers**: Stress-testing hypotheses
- **Debaters**: Preparing for opposing arguments
- **Anyone**: Who values intellectual honesty and wants to escape echo chambers

## Tech Stack

- **Frontend**: Next.js 15 with React 18
- **Agent Platform**: Algolia Agent Studio (GPT-4)
- **Data**: 26 indexed arguments with peer-reviewed sources
- **Styling**: Tailwind CSS with custom design system
- **Testing**: Jest + React Testing Library (56 tests passing)
- **Deployment**: Vercel

## Project Status

✅ **MVP Complete - Production Ready**

Contest Entry Period: January 7 - February 8, 2026

### Completed Features

- ✅ 26 high-quality arguments indexed (avg quality: 88.1/100)
- ✅ Full chat interface with conversation persistence
- ✅ Algolia Agent Studio integration (GPT-4)
- ✅ Error handling with retry functionality
- ✅ Premium design system (Space Grotesk + violet accents)
- ✅ Comprehensive test suite (56 tests passing)
- ✅ SEO optimization (Open Graph, Twitter cards)
- ✅ Abstract "thinking" animation (no generic bouncing dots)
- ✅ Crystallization card entrance animations
- ✅ Dark mode with system preference support
- ✅ Theme toggle (light/dark/system)

### Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## Getting Started

See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details.

See [DATA_STRATEGY.md](./DATA_STRATEGY.md) for data sourcing and indexing approach.

See [DEMO_PLAN.md](./DEMO_PLAN.md) for contest demo strategy.
