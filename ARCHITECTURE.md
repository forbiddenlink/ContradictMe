# Technical Architecture

## System Overview

ContradictMe is built as a conversational AI agent using Algolia Agent Studio, with a focus on intelligent argument retrieval and ranking.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                       │
│  (Next.js + Algolia InstantSearch Chat Widget)             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Algolia Agent Studio                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Agent Logic                                          │  │
│  │  • Parse user belief/position                         │  │
│  │  • Extract key claims                                 │  │
│  │  • Identify argument category                         │  │
│  │  • Generate counterargument queries                   │  │
│  │  • Rank by quality & relevance                        │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Algolia Search Indices                    │
│                                                              │
│  Index 1: ARGUMENTS                                          │
│  • Position (for/against what)                               │
│  • Main claim                                                │
│  • Evidence                                                  │
│  • Source quality score                                      │
│  • Argument type (empirical/logical/ethical/practical)       │
│  • Domain (work/tech/politics/lifestyle/etc)                 │
│                                                              │
│  Index 2: RESEARCH                                           │
│  • Study findings                                            │
│  • Academic credibility                                      │
│  • Publication date                                          │
│  • Sample size / methodology                                 │
│  • Domain                                                    │
│                                                              │
│  Index 3: EXPERT_OPINIONS                                    │
│  • Expert name & credentials                                 │
│  • Opinion/argument                                          │
│  • Context                                                   │
│  • Domain expertise                                          │
│                                                              │
│  Index 4: CASE_STUDIES                                       │
│  • Real-world examples                                       │
│  • Outcomes                                                  │
│  • Context/conditions                                        │
│  • Domain                                                    │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Frontend (Next.js)

**Key Components:**

- `ChatInterface.tsx` - Main conversation UI using Algolia's chat widget
- `ArgumentCard.tsx` - Displays individual counterarguments with sources
- `BeliefInput.tsx` - Initial belief statement input with helpful examples
- `QualityIndicator.tsx` - Visual indicators for argument quality/source credibility
- `FeedbackCollector.tsx` - User feedback on argument quality/helpfulness

**State Management:**

- React Context for conversation history
- Local storage for user preferences (argument types, depth level)

**Styling:**

- Tailwind CSS for responsive design
- Custom color scheme emphasizing neutrality and credibility

### 2. Algolia Agent Studio Configuration

**Agent Personality:**

```
You are ContradictMe, an intellectually honest AI that helps users
think critically by presenting strong counterarguments to their beliefs.

Your goal is to:
- Steel-man opposing views (strongest form, not straw-man)
- Cite quality sources and evidence
- Be respectful and non-confrontational
- Encourage intellectual humility
- Present multiple angles when appropriate

You are NOT trying to change minds, but to help users understand
the strongest case against their position.
```

**Prompt Engineering Strategy:**

1. **Belief Parsing:**

   ```
   Extract:
   - Main claim
   - Domain (tech, work, politics, lifestyle, etc.)
   - Strength of conviction (absolute/nuanced)
   - Key assumptions
   ```

2. **Counterargument Query Generation:**

   ```
   Generate search queries for:
   - Empirical evidence against the claim
   - Logical counterarguments
   - Real-world counterexamples
   - Expert opinions from credible sources
   - Nuances and conditions where belief doesn't hold
   ```

3. **Response Structuring:**
   ```
   Present counterarguments:
   1. Ordered by strength (strongest first)
   2. Each with clear evidence
   3. With source credibility indicators
   4. Acknowledging valid points on both sides
   5. Ending with questions for user to consider
   ```

### 3. Algolia Search Configuration

**Index: `arguments`**

```javascript
{
  searchableAttributes: [
    'mainClaim',
    'evidence',
    'supportingPoints',
    'tags',
    'domain'
  ],

  attributesForFaceting: [
    'filterOnly(position)', // for/against
    'argumentType',
    'domain',
    'sourceQuality',
    'evidenceType'
  ],

  customRanking: [
    'desc(qualityScore)',      // Argument quality (1-100)
    'desc(sourceCredibility)', // Source credibility (1-100)
    'desc(evidenceStrength)',  // Evidence strength (1-100)
    'desc(recency)'            // Newer research ranked higher
  ],

  ranking: [
    'typo',
    'geo',
    'words',
    'filters',
    'proximity',
    'attribute',
    'exact',
    'custom'
  ]
}
```

**Quality Scoring Algorithm:**

```javascript
qualityScore =
  sourceCredibility * 0.4 + // Academic, expert, reputable source
  evidenceStrength * 0.3 + // Empirical data, studies, examples
  argumentCoherence * 0.2 + // Logical structure
  relevanceToContext * 0.1; // Matches user's specific belief
```

### 4. Data Pipeline

**Sourcing:**

1. Academic papers (Google Scholar API, arXiv)
2. Expert opinion databases
3. High-quality journalism (AP, Reuters, specialist publications)
4. Research organizations (Pew, Stanford, MIT)
5. Curated argument databases (Kialo, debate resources)

**Processing:**

```
Raw Content → Extract Arguments → Score Quality → Index to Algolia
    │              │                   │              │
    │              │                   │              └─ With metadata
    │              │                   └─ ML-based scoring
    │              └─ NLP claim extraction
    └─ Web scraping / API fetching
```

**Data Structure Example:**

```json
{
  "objectID": "arg_001",
  "position": "against_remote_work",
  "mainClaim": "In-office work produces more innovation",
  "evidence": "Stanford 2024 study of 10,000 developers showed 23% more patent filings from in-office teams",
  "supportingPoints": [
    "Spontaneous collaboration",
    "Serendipitous encounters",
    "Whiteboard brainstorming effectiveness"
  ],
  "sourceTitle": "The Innovation Cost of Remote Work",
  "sourceAuthor": "Dr. Sarah Chen, Stanford Economics",
  "sourceUrl": "https://stanford.edu/research/...",
  "sourceType": "academic",
  "publicationYear": 2024,
  "qualityScore": 87,
  "sourceCredibility": 95,
  "evidenceStrength": 82,
  "argumentType": "empirical",
  "domain": "work",
  "tags": ["remote-work", "innovation", "collaboration"],
  "counterTo": ["remote work is always better", "office work is obsolete"]
}
```

## API Endpoints

### Agent Studio Integration

```javascript
// Agent Studio handles the conversational flow
POST /api/agent/chat
{
  "message": "I think remote work is always better",
  "conversationId": "uuid",
  "userId": "user_123"
}

// Returns structured response with counterarguments
Response:
{
  "reply": "Let me present the strongest case for in-office work...",
  "arguments": [
    {
      "claim": "...",
      "evidence": "...",
      "source": {...},
      "qualityScore": 87
    }
  ],
  "follow_up_questions": [
    "Would you like to explore the innovation aspect specifically?",
    "Are there particular concerns about in-office work I should address?"
  ]
}
```

## Performance Optimization

1. **Search Speed**: Algolia's <50ms search ensures instant responses
2. **Caching**: Cache common belief patterns and their counterarguments
3. **Progressive Loading**: Load top 3 arguments immediately, rest on demand
4. **Precomputed Scores**: Calculate quality scores during indexing, not query time

## Security & Safety

1. **Content Moderation**: Filter hate speech, misinformation, low-quality sources
2. **Source Verification**: Only index from verified, credible sources
3. **Bias Monitoring**: Track if certain viewpoints are under/over-represented
4. **User Safety**: Disclaimers for sensitive topics (health, legal, financial)

## Monitoring & Analytics

Track:

- Most common belief topics
- Argument quality ratings from users
- Source effectiveness (which sources convince users most)
- Conversation depth (how many follow-ups)
- Topic coverage gaps

## Deployment

- **Frontend**: Vercel (automatic deployments from main branch)
- **Algolia**: Production indices with replica for dev/testing
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Monitoring**: Vercel Analytics + Algolia Analytics Dashboard

## Development Roadmap

**Phase 1: MVP (Week 1-2)**

- Basic chat interface
- Single arguments index
- 100+ seed arguments across 5 domains
- Core agent prompting

**Phase 2: Enhancement (Week 2-3)**

- Multiple indices (research, experts, case studies)
- Quality scoring refinement
- Source credibility indicators
- Argument type filtering

**Phase 3: Polish (Week 3-4)**

- UI/UX improvements
- Conversation memory
- User feedback collection
- Demo preparation

**Phase 4: Contest Submission (Week 4)**

- Demo video
- Documentation
- DEV post
- Live demo deployment
