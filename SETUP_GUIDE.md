# Development Environment Setup Guide

## Prerequisites

Before starting development, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **VS Code** (recommended) or preferred code editor
- **Algolia account** (free tier)
- **Vercel account** (for deployment)

---

## Initial Setup

### 1. Project Initialization

```bash
# Navigate to project directory
cd /Volumes/LizsDisk/ContradictMe

# Initialize Next.js project with TypeScript
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"

# Install additional dependencies
npm install @algolia/client-search algoliasearch react-instantsearch
npm install @algolia/agent-studio
npm install axios zod
npm install -D @types/node @types/react

# Install development tools
npm install -D prettier eslint-config-prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 2. Environment Variables

Create `.env.local`:

```bash
# Algolia Configuration
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_search_api_key
ALGOLIA_ADMIN_API_KEY=your_admin_api_key

# Agent Studio
ALGOLIA_AGENT_ID=your_agent_id
ALGOLIA_AGENT_API_KEY=your_agent_api_key

# Optional: Data Collection APIs
SERPER_API_KEY=your_serper_api_key
OPENAI_API_KEY=your_openai_api_key

# Deployment
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Git Setup

```bash
# Initialize git repository
git init

# Create .gitignore
cat > .gitignore << EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env*.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDEs
.idea/
.vscode/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Data
data/raw/
data/processed/
*.csv
*.json.backup
EOF

# Initial commit
git add .
git commit -m "Initial project setup"

# Create GitHub repo and push
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

---

## Project Structure

```
ContradictMe/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── agent/
│   │   │       └── chat/
│   │   │           └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ChatInterface.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── ArgumentCard.tsx
│   │   ├── BeliefInput.tsx
│   │   ├── QualityIndicator.tsx
│   │   └── SourceCredibility.tsx
│   ├── lib/
│   │   ├── algolia.ts
│   │   ├── agent.ts
│   │   └── types.ts
│   └── utils/
│       ├── formatters.ts
│       └── validators.ts
├── scripts/
│   ├── data-collection/
│   │   ├── scrape-sources.py
│   │   ├── process-arguments.py
│   │   └── score-quality.py
│   └── indexing/
│       ├── create-indices.ts
│       ├── upload-data.ts
│       └── configure-settings.ts
├── data/
│   ├── arguments/
│   ├── research/
│   └── experts/
├── public/
│   ├── images/
│   └── logo.svg
├── docs/
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── DATA_STRATEGY.md
│   ├── ALGOLIA_IMPLEMENTATION.md
│   ├── DEMO_PLAN.md
│   └── CONTEST_SUBMISSION.md
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

---

## Algolia Setup

### 1. Create Account & App

1. Sign up at [algolia.com](https://www.algolia.com)
2. Create new application: "ContradictMe"
3. Select free tier (Community plan)
4. Get API keys from dashboard

### 2. Create Indices

```typescript
// scripts/indexing/create-indices.ts

import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_API_KEY!
);

async function createIndices() {
  // Create Arguments index
  const argumentsIndex = client.initIndex('prod_ARGUMENTS');
  await argumentsIndex.setSettings({
    searchableAttributes: [
      'mainClaim',
      'evidence',
      'supportingPoints',
      'tags',
      'domain',
      'opposingBeliefs',
    ],
    attributesForFaceting: [
      'filterOnly(position)',
      'searchable(domain)',
      'searchable(argumentType)',
      'filterOnly(sourceMetadata.yearPublished)',
      'filterOnly(qualityScores.overall)',
    ],
    customRanking: [
      'desc(qualityScores.overall)',
      'desc(qualityScores.sourceCredibility)',
      'desc(qualityScores.evidenceStrength)',
    ],
    typoTolerance: 'strict',
    distinct: true,
    attributeForDistinct: 'mainClaim',
  });

  // Create Research index
  const researchIndex = client.initIndex('prod_RESEARCH');
  await researchIndex.setSettings({
    searchableAttributes: ['studyTitle', 'findings.finding', 'methodology', 'domain'],
    customRanking: ['desc(credibilityScore)', 'desc(sampleSize)', 'desc(yearPublished)'],
  });

  // Create Experts index
  const expertsIndex = client.initIndex('prod_EXPERTS');
  await expertsIndex.setSettings({
    searchableAttributes: ['expertName', 'opinion', 'credentials', 'domain', 'expertise'],
    customRanking: ['desc(credibilityScore)'],
  });

  console.log('✅ Indices created successfully');
}

createIndices();
```

Run with:

```bash
npx tsx scripts/indexing/create-indices.ts
```

### 3. Configure Agent Studio

1. Go to Algolia Dashboard → Agent Studio
2. Create new agent: "ContradictMe"
3. Configure system prompt (see ALGOLIA_IMPLEMENTATION.md)
4. Connect to indices
5. Test conversation flow
6. Get Agent ID and API key

---

## Development Commands

### Start Development Server

```bash
npm run dev
# Server runs at http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

### Type Checking

```bash
npm run type-check
```

---

## Data Collection Scripts

### Python Setup (for data collection)

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install beautifulsoup4 requests pandas spacy openai
pip install algoliasearch
python -m spacy download en_core_web_sm
```

### Example: Scrape Academic Sources

```python
# scripts/data-collection/scrape-sources.py

import requests
from bs4 import BeautifulSoup
import json

def scrape_google_scholar(query, num_results=20):
    """Scrape Google Scholar for research papers"""
    # Note: Use Serper API or similar for production
    results = []
    # Implementation here
    return results

def extract_arguments(paper_text):
    """Extract arguments from paper text using NLP"""
    # Implementation here
    return arguments

def score_quality(argument, source):
    """Score argument quality"""
    score = {
        'sourceCredibility': calculate_source_score(source),
        'evidenceStrength': calculate_evidence_score(argument),
        'argumentCoherence': calculate_coherence_score(argument)
    }
    score['overall'] = (
        score['sourceCredibility'] * 0.4 +
        score['evidenceStrength'] * 0.3 +
        score['argumentCoherence'] * 0.3
    )
    return score

if __name__ == "__main__":
    topics = [
        "remote work benefits research",
        "cryptocurrency legitimate use cases",
        "social media positive effects studies"
    ]

    for topic in topics:
        papers = scrape_google_scholar(topic)
        arguments = [extract_arguments(p) for p in papers]
        # Save to data/arguments/
```

---

## Testing Setup

### Install Testing Libraries

```bash
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
npm install -D @playwright/test
```

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

### Example Test

```typescript
// src/components/__tests__/ArgumentCard.test.tsx

import { render, screen } from '@testing-library/react';
import { ArgumentCard } from '../ArgumentCard';

describe('ArgumentCard', () => {
  it('renders argument with quality score', () => {
    render(
      <ArgumentCard
        claim="Test claim"
        evidence="Test evidence"
        qualityScore={87}
        source={{
          title: 'Test Study',
          authors: ['Dr. Test'],
          yearPublished: 2024
        }}
      />
    );

    expect(screen.getByText('Test claim')).toBeInTheDocument();
    expect(screen.getByText(/87/)).toBeInTheDocument();
  });
});
```

---

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables in Vercel

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy

### Custom Domain (Optional)

1. Purchase domain (Namecheap, Google Domains, etc.)
2. Add to Vercel project
3. Configure DNS records
4. Wait for SSL certificate

---

## Monitoring & Analytics

### Algolia Analytics

- Enable in Algolia Dashboard
- Track: searches, clicks, conversions
- Review weekly for insights

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Troubleshooting

### Common Issues

**Issue: Algolia search not returning results**

- Check API keys are correct
- Verify indices are populated
- Check filters aren't too restrictive

**Issue: Agent Studio not responding**

- Verify Agent ID and API key
- Check system prompt configuration
- Test with simple queries first

**Issue: Slow build times**

- Enable Next.js incremental builds
- Optimize images
- Review bundle size

**Issue: TypeScript errors**

- Run `npm run type-check`
- Update type definitions
- Check tsconfig.json settings

---

## Useful Commands

```bash
# Check dependency versions
npm list

# Update dependencies
npm update

# Clear cache
rm -rf .next node_modules
npm install

# Check bundle size
npm run build
npx @next/bundle-analyzer

# Database/index inspection
npx algolia-cli indices list
```

---

## Resources

- [Algolia Documentation](https://www.algolia.com/doc/)
- [Agent Studio Docs](https://www.algolia.com/doc/agent-studio/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Next Steps

1. ✅ Complete this setup
2. [ ] Initialize Next.js project
3. [ ] Set up Algolia account
4. [ ] Create indices
5. [ ] Start data collection
6. [ ] Build first component

**Ready to start building! 🚀**
