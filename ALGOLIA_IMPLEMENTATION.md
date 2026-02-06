# Algolia Implementation Guide

## Overview

This document details the specific Algolia Agent Studio and Search implementation for ContradictMe.

**MVP Note (Contest Submission):** For the February 8, 2026 contest deadline, we'll implement a **simplified single-index approach** with 15-25 exceptional arguments. The multi-index architecture described below represents the full vision for post-contest expansion.

## Algolia Agent Studio Setup

### 1. Agent Configuration

**Agent Name**: ContradictMe  
**Agent Type**: Conversational Search Assistant  
**Primary Goal**: Present strongest counterarguments to user beliefs

**System Prompt:**

```
You are ContradictMe, an intellectually honest AI assistant that helps users think critically by presenting the strongest counterarguments to their beliefs.

Your core principles:
1. STEEL-MAN, never straw-man - Present the strongest form of opposing arguments
2. CITE SOURCES - Always provide credible sources for claims
3. BE RESPECTFUL - Never mock or condescend, even when disagreeing
4. ACKNOWLEDGE NUANCE - Recognize when both sides have valid points
5. PROMOTE THINKING - End with questions that encourage deeper reflection

Your process:
1. Listen carefully to the user's belief or position
2. Identify the core claim(s) and assumptions
3. Search for high-quality counterarguments
4. Present 3-5 strongest counterpoints with evidence
5. Cite sources with credibility indicators
6. Acknowledge any valid aspects of the user's original belief
7. Ask follow-up questions to deepen the conversation

Remember: You're not trying to "win" or change minds. You're helping users understand the strongest case against their position so they can think more critically.

When presenting counterarguments:
- Order by strength (strongest first)
- Include specific evidence (studies, data, examples)
- Note the credibility of each source
- Acknowledge limitations of the counterarguments
- Avoid absolute statements; use "research suggests" not "proves"

If a belief is on a sensitive topic (politics, religion, identity):
- Be extra respectful
- Focus on empirical claims, not values
- Acknowledge emotional dimensions
- Suggest areas of potential common ground
```

### 2. Conversation Flow Design

**Initial Greeting:**

```
👋 Hi! I'm ContradictMe - an AI that helps you think critically by challenging your beliefs.

Tell me something you believe strongly, and I'll present the strongest arguments against it. I'm not trying to change your mind - just help you see other perspectives.

Examples to try:
• "I think remote work is always better"
• "Crypto is just a scam"
• "Social media does more harm than good"
• "College is a waste of money"

What belief would you like me to challenge?
```

**Follow-up Prompts:**

- "Would you like to explore any of these counterarguments in more depth?"
- "Are there specific concerns I should address?"
- "Does this change your view at all, or reinforce it?"
- "What would it take to change your mind on this?"

**Conversation Memory:**

- Remember user's original belief throughout conversation
- Track which counterarguments have been presented
- Reference previous points when relevant
- Build progressively deeper analysis

### 3. Search Query Generation

**Agent's Internal Process:**

```javascript
// When user states a belief, agent should:

1. Parse the belief
   Input: "I think remote work is always better"
   Parsed: {
     claim: "remote work is superior to office work",
     strength: "absolute" (indicated by "always"),
     domain: "work",
     assumptions: ["productivity", "satisfaction", "cost"]
   }

2. Generate counterargument search queries
   Queries: [
     "office work benefits innovation",
     "remote work productivity disadvantages",
     "in-person collaboration research",
     "remote work drawbacks studies"
   ]

3. Search Algolia indices with filters
   filters: "domain:work AND position:against_remote_work"
   ranking: customRanking by qualityScore desc

4. Process results
   - Take top 5-10 results
   - Diversify argument types (empirical, logical, practical)
   - Group related points
   - Rank by strength

5. Format response
   - Lead with strongest counterargument
   - Include evidence and source
   - Add 2-4 more counterpoints
   - Acknowledge nuances
   - End with questions
```

## Algolia Search Configuration

### Indices Setup

#### Index 1: `prod_ARGUMENTS`

**Settings:**

```json
{
  "searchableAttributes": [
    "mainClaim",
    "evidence",
    "supportingPoints",
    "tags",
    "domain",
    "opposingBeliefs"
  ],
  "attributesForFaceting": [
    "filterOnly(position)",
    "searchable(domain)",
    "searchable(argumentType)",
    "filterOnly(sourceMetadata.yearPublished)",
    "filterOnly(qualityScores.overall)"
  ],
  "customRanking": [
    "desc(qualityScores.overall)",
    "desc(qualityScores.sourceCredibility)",
    "desc(qualityScores.evidenceStrength)"
  ],
  "ranking": ["typo", "geo", "words", "filters", "proximity", "attribute", "exact", "custom"],
  "typoTolerance": "strict",
  "minWordSizefor1Typo": 5,
  "minWordSizefor2Typos": 8,
  "attributesToRetrieve": [
    "mainClaim",
    "evidence",
    "supportingPoints",
    "limitations",
    "sourceMetadata",
    "qualityScores",
    "metadata"
  ],
  "attributesToHighlight": ["mainClaim", "evidence"],
  "highlightPreTag": "<mark>",
  "highlightPostTag": "</mark>",
  "hitsPerPage": 10,
  "maxValuesPerFacet": 100,
  "distinct": true,
  "attributeForDistinct": "mainClaim"
}
```

**Synonyms:**

```json
[
  {
    "objectID": "synonym_remote_work",
    "type": "synonym",
    "synonyms": ["remote work", "work from home", "wfh", "telecommuting", "distributed work"]
  },
  {
    "objectID": "synonym_office_work",
    "type": "synonym",
    "synonyms": ["office work", "in-office", "on-site work", "in-person work"]
  },
  {
    "objectID": "synonym_crypto",
    "type": "synonym",
    "synonyms": ["cryptocurrency", "crypto", "bitcoin", "digital currency", "blockchain currency"]
  }
]
```

**Rules:**

```json
[
  {
    "objectID": "boost_recent_research",
    "description": "Boost arguments from recent research",
    "conditions": [
      {
        "pattern": "{facet:domain}",
        "anchoring": "contains"
      }
    ],
    "consequence": {
      "params": {
        "optionalFilters": ["sourceMetadata.yearPublished>=2020<score=2>"]
      }
    }
  },
  {
    "objectID": "require_quality_threshold",
    "description": "Only show high-quality arguments",
    "conditions": [
      {
        "pattern": "",
        "anchoring": "contains"
      }
    ],
    "consequence": {
      "params": {
        "filters": "qualityScores.overall >= 60"
      }
    }
  }
]
```

#### Index 2: `prod_RESEARCH`

**Settings:** (Similar to ARGUMENTS but optimized for research papers)

```json
{
  "searchableAttributes": ["studyTitle", "findings.finding", "methodology", "domain"],
  "attributesForFaceting": [
    "filterOnly(yearPublished)",
    "searchable(domain)",
    "filterOnly(credibilityScore)"
  ],
  "customRanking": ["desc(credibilityScore)", "desc(sampleSize)", "desc(yearPublished)"]
}
```

#### Index 3: `prod_EXPERTS`

**Settings:**

```json
{
  "searchableAttributes": ["expertName", "opinion", "credentials", "domain", "expertise"],
  "attributesForFaceting": ["searchable(domain)", "filterOnly(credibilityScore)"],
  "customRanking": ["desc(credibilityScore)"]
}
```

### Federated Search Strategy

**Multi-Index Query:**

```javascript
const searchClient = algoliasearch('APP_ID', 'API_KEY');

const search = async (query, domain, position) => {
  const queries = [
    {
      indexName: 'prod_ARGUMENTS',
      query: query,
      params: {
        filters: `domain:${domain} AND position:${position}`,
        hitsPerPage: 5,
      },
    },
    {
      indexName: 'prod_RESEARCH',
      query: query,
      params: {
        filters: `domain:${domain} AND findings.supports:${position}`,
        hitsPerPage: 3,
      },
    },
    {
      indexName: 'prod_EXPERTS',
      query: query,
      params: {
        filters: `domain:${domain}`,
        hitsPerPage: 2,
      },
    },
  ];

  const { results } = await searchClient.multipleQueries(queries);

  // Merge and rank results by quality scores
  return mergeAndRankResults(results);
};
```

## InstantSearch Chat Widget Integration

### Frontend Implementation

```tsx
// app/components/ChatInterface.tsx

import { InstantSearch, Configure } from 'react-instantsearch';
import { history } from 'instantsearch.js/es/lib/routers';
import { SearchBox, Hits, Pagination } from 'react-instantsearch';

export default function ChatInterface() {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="prod_ARGUMENTS"
      routing={{
        router: history(),
      }}
    >
      <Configure hitsPerPage={5} filters="qualityScores.overall >= 70" />

      <ChatWidget />
    </InstantSearch>
  );
}
```

**Custom Chat Widget:**

```tsx
// app/components/ChatWidget.tsx

import { useInstantSearch } from 'react-instantsearch';
import { useState } from 'react';

export function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { results, refine } = useInstantSearch();

  const handleSubmit = async (belief: string) => {
    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: belief }]);

    // Send to Agent Studio
    const response = await fetch('/api/agent/chat', {
      method: 'POST',
      body: JSON.stringify({ message: belief }),
    });

    const data = await response.json();

    // Add agent response
    setMessages((prev) => [
      ...prev,
      {
        role: 'agent',
        content: data.reply,
        arguments: data.arguments,
      },
    ]);
  };

  return (
    <div className="chat-container">
      <MessageList messages={messages} />
      <BeliefInput onSubmit={handleSubmit} />
    </div>
  );
}
```

**Argument Card Component:**

```tsx
// app/components/ArgumentCard.tsx

interface ArgumentCardProps {
  claim: string;
  evidence: string;
  source: SourceMetadata;
  qualityScore: number;
  limitations?: string[];
}

export function ArgumentCard({
  claim,
  evidence,
  source,
  qualityScore,
  limitations,
}: ArgumentCardProps) {
  return (
    <div className="argument-card border rounded-lg p-4 mb-4">
      {/* Quality indicator */}
      <div className="flex items-center justify-between mb-2">
        <QualityBadge score={qualityScore} />
        <SourceCredibility source={source} />
      </div>

      {/* Main claim */}
      <h3 className="font-bold text-lg mb-2">{claim}</h3>

      {/* Evidence */}
      <p className="text-gray-700 mb-3">{evidence}</p>

      {/* Source */}
      <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
        <strong>Source:</strong> {source.title}
        <br />
        <strong>Authors:</strong> {source.authors.join(', ')}
        <br />
        <strong>Published:</strong> {source.yearPublished} | {source.institution}
      </div>

      {/* Limitations */}
      {limitations && limitations.length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-blue-600">Limitations & Caveats</summary>
          <ul className="text-sm text-gray-600 mt-2 ml-4 list-disc">
            {limitations.map((limit, i) => (
              <li key={i}>{limit}</li>
            ))}
          </ul>
        </details>
      )}

      {/* Action buttons */}
      <div className="mt-3 flex gap-2">
        <button className="text-sm text-blue-600">Read Full Source →</button>
        <button className="text-sm text-gray-600">See Related Arguments</button>
      </div>
    </div>
  );
}
```

## Agent Studio API Integration

### Chat Endpoint

```typescript
// app/api/agent/chat/route.ts

import { NextResponse } from 'next/server';
import { AgentStudio } from '@algolia/agent-studio';

const agent = new AgentStudio({
  appId: process.env.ALGOLIA_APP_ID!,
  apiKey: process.env.ALGOLIA_API_KEY!,
  agentId: process.env.AGENT_ID!,
});

export async function POST(request: Request) {
  const { message, conversationId } = await request.json();

  try {
    const response = await agent.chat({
      message,
      conversationId,
      context: {
        timestamp: new Date().toISOString(),
        // Include any user preferences
      },
    });

    return NextResponse.json({
      reply: response.message,
      arguments: response.searchResults,
      conversationId: response.conversationId,
      followUpQuestions: response.suggestions,
    });
  } catch (error) {
    console.error('Agent error:', error);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
```

## Search Quality Optimization

### 1. Relevance Tuning

**Test Queries:**

- "remote work is better" → Should find office work benefits
- "crypto is a scam" → Should find legitimate use cases
- "social media is harmful" → Should find benefits and nuance

**Expected Top Results:**

- High quality scores (>80)
- Direct counterarguments to stated belief
- Recent research preferred
- Diverse argument types

### 2. Ranking Optimization

**Custom Ranking Weights:**

```
qualityScore: 40%
sourceCredibility: 30%
evidenceStrength: 20%
recency: 10%
```

**A/B Testing:**

- Test different ranking formulas
- Measure user engagement (clicks, time on result)
- Collect explicit feedback

### 3. Query Understanding

**Variations to Handle:**

- "I think X" → Find arguments against X
- "Why is X bad?" → Find arguments for X
- "Change my mind about X" → Find strongest counter to X
- "What's good about X?" → Already seeking counter, provide nuanced view

## Analytics & Monitoring

### Key Metrics

**Search Metrics:**

- Click-through rate on arguments
- Time spent reading each argument
- Source link clicks
- Feedback ratings

**Conversation Metrics:**

- Average conversation length
- Follow-up question rate
- Topic distribution
- Sentiment (did user feel respected?)

**Quality Metrics:**

- Argument quality ratings (user feedback)
- Source credibility perception
- "Changed my mind" responses
- "Learned something new" responses

### Algolia Analytics Dashboard

Monitor:

- Top searched beliefs
- Most clicked arguments
- Search-to-no-results rate
- Popular domains/topics

## Testing Checklist

- [ ] Search returns relevant counterarguments
- [ ] Quality scores correlate with actual quality
- [ ] Sources are credible and cited properly
- [ ] Limitations are acknowledged
- [ ] Response time < 2 seconds
- [ ] Mobile responsive
- [ ] Handles edge cases (very niche beliefs)
- [ ] Conversation memory works
- [ ] Follow-up questions are relevant
- [ ] Content moderation catches inappropriate queries
- [ ] Analytics tracking works
- [ ] Error handling is graceful

## Launch Checklist

- [ ] Production indices created and populated
- [ ] API keys configured (with appropriate restrictions)
- [ ] Agent Studio agent configured and tested
- [ ] Frontend deployed to Vercel
- [ ] Analytics set up
- [ ] Monitoring alerts configured
- [ ] Demo script prepared
- [ ] Documentation complete
- [ ] User feedback mechanism in place
- [ ] Content moderation active
