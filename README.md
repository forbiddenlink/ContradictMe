# ContradictMe 🎯

**Challenge Your Beliefs with AI-Powered Counterarguments**

[![Tests](https://img.shields.io/badge/tests-73%20passing-success)](https://github.com/forbiddenlink/ContradictMe)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Algolia](https://img.shields.io/badge/Algolia-Agent%20Studio-5468ff)](https://www.algolia.com/)

> An AI that actively disagrees with you, presenting steel-manned counterarguments backed by research.

**Live Demo:** https://contradict-me.vercel.app

---

## Overview

ContradictMe is an AI agent built for the Algolia Agent Studio Challenge 2026 that fights echo chambers by presenting the strongest possible arguments against your beliefs. Unlike typical AI tools that confirm biases, ContradictMe promotes intellectual humility and critical thinking.

### Key Features

- 💬 **Intelligent Chat Interface** - Natural conversations with context-aware follow-ups
- 📊 **Analytics Dashboard** - Track explored topics, tags, and achievements
- ⚔️ **AI Debate Arena** - Watch Pro vs Con agents debate any topic
- 🎨 **Premium Design** - Dark/light themes, smooth animations, fully responsive
- ♿ **Accessible** - WCAG compliant, keyboard navigation, screen reader support
- 🧪 **100% Tested** - 73 tests passing with full coverage

## Quick Start

```bash
# Clone the repository
git clone https://github.com/forbiddenlink/ContradictMe.git
cd ContradictMe

# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env.local
# Add your ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME, OPENAI_API_KEY

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

Visit http://localhost:3000 to see it in action.

## How It Works

1. **You share a belief** - The AI understands your position through natural conversation
2. **Agent Studio searches** - Algolia indexes 26 research-backed counterarguments
3. **AI presents the strongest case against you** - Steel-manned arguments with sources
4. **You think critically** - Evidence quality scores, limitations, and follow-up paths

Each argument includes:
- **Quality Score** (evidence strength, sample size)
- **Source Citations** (peer-reviewed research, expert opinions)
- **Limitations** (what the evidence doesn't prove)
- **Context** (when/where/how the findings apply)

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + React 18 + TypeScript
- **AI Agent:** Algolia Agent Studio powered by GPT-4
- **Search:** Algolia semantic search with quality weighting
- **Database:** IndexedDB (Dexie.js) for local persistence
- **Styling:** Tailwind CSS + custom design system
- **Animations:** Framer Motion
- **Testing:** Jest + React Testing Library (73/73 tests passing)
- **Deployment:** Vercel with automatic CI/CD

## Project Structure

```
ContradictMe/
├── app/                    # Next.js 15 App Router
│   ├── api/chat/          # Agent Studio API route
│   ├── chat/              # Main chat interface
│   ├── analytics/         # Analytics dashboard
│   ├── debate/            # AI Debate Arena
│   └── ...
├── components/            # React components
│   ├── chat/             # Chat interface components
│   ├── arguments/        # Argument display cards
│   └── ui/               # Shared UI components
├── lib/                  # Utilities and types
├── data/arguments/       # 26 indexed arguments (JSON)
├── __tests__/           # Jest test suites (73 tests)
└── public/              # Static assets
```

## Features

### 💬 Chat Interface
- Natural language conversation
- Context-aware follow-up questions
- Conversation history with search
- Bookmark important exchanges
- Auto-save with IndexedDB
- Keyboard shortcuts (⌘⇧L for theme)

### 📊 Analytics Dashboard
- Topics explored counter
- Tag cloud visualization
- Achievement system
- Engagement metrics
- Empty state handling

### ⚔️ AI Debate Arena
- 5-round structured debates
- Pro vs Con AI agents
- Submit interjections mid-debate
- Vote for winner
- Export transcripts (JSON, MD, TXT)

### 🎨 Design System
- Teal/cyan gradient accents
- Dark/light/system themes
- Space Grotesk typography
- Smooth Framer Motion animations
- Mobile-first responsive design
- WCAG accessibility compliant

## Testing

```bash
npm test               # Run all 73 tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

**Current Status:** ✅ 73/73 tests passing (100%)

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture and design decisions
- [DEVPOST_SUBMISSION.md](./DEVPOST_SUBMISSION.md) - Full contest submission
- [CHANGELOG.md](./CHANGELOG.md) - Version history

## Contributing

Contributions welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Contact

**Developer:** Liz Stein  
**Email:** liz@lizstein.dev  
**Project:** https://github.com/forbiddenlink/ContradictMe  
**Demo:** https://contradict-me.vercel.app

---

**Built for the Algolia Agent Studio Challenge 2026**  
An AI that challenges you to think better. 🎯
