# Algolia Setup Guide

**Quick Reference**: This guide walks you through setting up your Algolia account, creating indices, and configuring Agent Studio for ContradictMe.

## Step 1: Create Algolia Account

1. Go to [https://www.algolia.com/users/sign_up](https://www.algolia.com/users/sign_up)
2. Sign up for a **free Build plan** (no credit card required)
3. Choose a data center region (US East recommended for US users)
4. Complete the account setup

**Important**: The free Build plan includes:
- 10,000 search requests/month
- 1 million records
- Perfect for the contest submission

## Step 2: Get API Credentials

After signing up:

1. Navigate to **Settings** → **API Keys** in the Algolia dashboard
2. Copy these credentials (you'll need them):
   - **Application ID**
   - **Search-Only API Key** (for frontend)
   - **Admin API Key** (for indexing - keep this secret!)

3. Create a `.env.local` file in your project root:

```bash
# Algolia Credentials
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id_here
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_search_key_here
ALGOLIA_ADMIN_API_KEY=your_admin_key_here
```

**Security Note**: Never commit `.env.local` to git (already in .gitignore)

## Step 3: Create Your Index

### Option A: Via Dashboard (Recommended for MVP)

1. In Algolia dashboard, go to **Search** → **Index**
2. Click **Create Index**
3. Name it: `contradictme_arguments`
4. Click **Create**

### Option B: Via API (Programmatic)

We'll create a script for this in the next step.

## Step 4: Configure Index Settings

1. Click on your `contradictme_arguments` index
2. Go to **Configuration** tab
3. Click **Searchable Attributes**
4. Add these attributes (in order of importance):
   ```
   1. mainClaim
   2. evidence
   3. supportingPoints
   4. tags
   5. opposingBeliefs
   ```

5. Go to **Custom Ranking**
6. Add these ranking factors (in order):
   ```
   1. desc(qualityScore)
   2. desc(sourceCredibility)
   3. desc(evidenceStrength)
   ```

7. Go to **Facets**
8. Add these filterable attributes:
   ```
   - position (filter only)
   - domain (searchable)
   - argumentType (searchable)
   ```

9. Click **Save** (top right)

## Step 5: Set Up Agent Studio

### Access Agent Studio

1. In Algolia dashboard, navigate to **AI Products** → **Agent Studio**
2. Click **Create Agent** (or it might auto-create one)

### Configure Your Agent

**Agent Name**: `ContradictMe`

**System Prompt**:

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
3. Search the contradictme_arguments index for high-quality counterarguments
4. Present 2-3 strongest counterpoints with evidence
5. Cite sources with credibility indicators (qualityScore, sourceCredibility)
6. Acknowledge any valid aspects of the user's original belief
7. Ask follow-up questions to deepen the conversation

Remember: You're not trying to "win" or change minds. You're helping users understand the strongest case against their position so they can think more critically.

When presenting counterarguments:
- Order by strength (highest qualityScore first)
- Include specific evidence from the "evidence" field
- Note the credibility of each source from sourceMetadata
- Acknowledge limitations from the "limitations" field
- Use respectful language; say "research suggests" not "proves"

Format your responses like this:

[Brief acknowledgment of their belief]

Here are the strongest counterarguments:

**1. [Main Claim]** (Quality: [qualityScore]/100)

[Evidence from the indexed argument]

📚 Source: [author], [institution], [year]
Evidence Strength: [evidenceStrength]/100

**2. [Main Claim]** (Quality: [qualityScore]/100)

[Evidence]

📚 Source: [details]

**Nuance**: [Acknowledge limitations or valid aspects of user's belief]

What aspect would you like to explore further?
```

**Connected Indices**:
- Select `contradictme_arguments` as your primary index

**Conversation Settings**:
- Enable conversation memory: **Yes**
- Max conversation turns: **10**
- Temperature: **0.7** (balanced creativity)

**Save the agent**

## Step 6: Test Your Agent

1. In Agent Studio, click **Test** or **Playground**
2. Try a test message: "I think remote work is always better"
3. The agent should:
   - Acknowledge your belief
   - Search the index
   - Return formatted counterarguments (even if index is empty for now)

**Expected behavior with empty index**:
"I don't have any specific counterarguments indexed yet, but I can help you think critically about this..."

## Step 7: Create Sample Data Structure

Create a file: `data/sample-argument.json`

```json
{
  "objectID": "arg_remote_work_001",
  "position": "against_remote_work",
  "opposingBeliefs": [
    "remote work is always better",
    "offices are obsolete",
    "remote increases productivity"
  ],
  "mainClaim": "Remote work reduces innovation and breakthrough creativity",
  "evidence": "Stanford study of 10,000 software developers found 23% fewer patent filings from fully remote teams compared to hybrid teams over 2 years",
  "supportingPoints": [
    "Spontaneous 'water cooler' conversations lead to idea combination",
    "Whiteboard collaboration enables rapid iteration",
    "Serendipitous encounters connect disparate knowledge domains"
  ],
  "limitations": [
    "Study focused on R&D roles, may not apply to routine work",
    "Hybrid model showed similar innovation to full in-office",
    "Results may reflect poor remote collaboration tools"
  ],
  "sourceMetadata": {
    "title": "Innovation Patterns in Distributed Teams",
    "authors": ["Dr. Sarah Chen", "Dr. Michael Park"],
    "institution": "Stanford University",
    "publicationType": "peer-reviewed journal",
    "journal": "Journal of Organizational Behavior",
    "yearPublished": 2024,
    "doi": "10.1002/job.2024.001"
  },
  "qualityScore": 87,
  "sourceCredibility": 95,
  "evidenceStrength": 85,
  "argumentCoherence": 82,
  "domain": "work",
  "argumentType": "empirical",
  "tags": ["remote-work", "innovation", "collaboration", "productivity"]
}
```

## Step 8: Index Your First Argument

### Option A: Via Dashboard (Quick Test)

1. Go to your `contradictme_arguments` index
2. Click **Add Records** → **Manually**
3. Paste the JSON from `sample-argument.json`
4. Click **Save**

### Option B: Via Script (Scalable)

Create `scripts/index-arguments.ts`:

```typescript
import algoliasearch from 'algoliasearch';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Algolia client
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_API_KEY!
);

const index = client.initIndex('contradictme_arguments');

async function indexArguments() {
  // Read sample argument
  const samplePath = path.join(process.cwd(), 'data', 'sample-argument.json');
  const argument = JSON.parse(fs.readFileSync(samplePath, 'utf-8'));

  // Index to Algolia
  try {
    const { objectIDs } = await index.saveObject(argument);
    console.log('✅ Indexed argument:', objectIDs[0]);
    console.log('🔍 Test it in Agent Studio!');
  } catch (error) {
    console.error('❌ Error indexing:', error);
  }
}

indexArguments();
```

Run it:
```bash
npx tsx scripts/index-arguments.ts
```

## Step 9: Test End-to-End

1. Go to Agent Studio **Playground**
2. Type: "I think remote work is always better"
3. You should get a response with your indexed counterargument!

**Expected response format**:
```
I hear you on remote work. Let me present the strongest case for in-office work:

**1. Remote work reduces innovation and breakthrough creativity** (Quality: 87/100)

Stanford study of 10,000 software developers found 23% fewer patent filings...

📚 Source: Dr. Sarah Chen, Stanford University, 2024
Evidence Strength: 85/100

**Nuance**: The study found hybrid models (2-3 days in office) performed
as well as full in-office, suggesting flexibility matters more than absolutes.

What aspect of this would you like to explore further?
```

## Step 10: Get Agent Studio API Endpoint

1. In Agent Studio, click on your agent
2. Go to **API** or **Integration** tab
3. Copy the **Agent API Endpoint**
4. Add to `.env.local`:

```bash
NEXT_PUBLIC_ALGOLIA_AGENT_ENDPOINT=https://agent-studio.algolia.com/api/v1/agents/your-agent-id
```

## Step 11: Integrate in Next.js

Create `lib/algolia-agent.ts`:

```typescript
export async function queryAgent(message: string) {
  const response = await fetch(process.env.NEXT_PUBLIC_ALGOLIA_AGENT_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Algolia-Application-Id': process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
      'X-Algolia-API-Key': process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!,
    },
    body: JSON.stringify({
      message,
      conversationId: null, // Will be returned for follow-ups
    }),
  });

  const data = await response.json();
  return data;
}
```

## Next Steps

Now that your Algolia setup is complete:

1. **Curate Arguments**: Create 15-25 exceptional arguments (see DATA_STRATEGY.md)
2. **Build Chat UI**: Integrate the agent into your Next.js app
3. **Test Thoroughly**: Ensure quality scores and sources display correctly
4. **Deploy**: Push to Vercel with environment variables

## Troubleshooting

### Agent returns empty results
- **Check**: Are arguments indexed? Go to dashboard → Browse records
- **Check**: Is the agent connected to the right index?
- **Check**: Try a direct search in the Algolia dashboard

### API Key errors
- **Check**: Did you copy the Search-Only key (not Admin key) for frontend?
- **Check**: Are environment variables loaded? Restart dev server after changing .env.local

### Agent not using indexed data
- **Check**: System prompt mentions the index name: `contradictme_arguments`
- **Check**: Agent has "Connected Indices" configured in Agent Studio

### Quality scores not showing
- **Check**: Did you include `qualityScore`, `sourceCredibility`, `evidenceStrength` in your JSON?
- **Check**: Are these fields set as "Retrieve" attributes in index settings?

## Resources

- [Algolia Agent Studio Docs](https://www.algolia.com/doc/guides/algolia-ai/agent-studio/)
- [Algolia Search API Docs](https://www.algolia.com/doc/api-reference/search-api/)
- [Algolia InstantSearch React](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/)

---

**Status Check**: After completing this guide, you should have:
- ✅ Algolia account created
- ✅ API keys in `.env.local`
- ✅ Index created and configured
- ✅ Agent Studio agent configured
- ✅ Sample argument indexed
- ✅ End-to-end test successful

**Next**: Move on to building the chat interface and argument card components!
