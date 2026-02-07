# ContradictMe: Building an AI That Disagrees With You

*An AI-powered counterargument engine for the Algolia Agent Studio Challenge*

---

## The Problem: Echo Chambers Are Everywhere

We live in an age of algorithmic curation. Every platform—social media, news, search—optimizes for engagement, which means showing you content that *confirms* what you already believe.

The result? **Echo chambers.** We become more certain of our views while understanding opposing perspectives less.

I wanted to build something different: **an AI that actively disagrees with you.**

## What I Built

**ContradictMe** is a conversational AI that challenges your beliefs with the strongest possible counterarguments—backed by research, not rhetoric.

🔗 **[Try it live: contradict-me.vercel.app](https://contradict-me.vercel.app)**

### How It Works

1. **You share a belief** you hold strongly
2. **The AI searches** a curated index of research-backed arguments
3. **You receive steel-manned counterarguments**—the strongest form of the opposing view, not a weak straw man

![ContradictMe Screenshot](/og-image.png)

### Key Features

- **26 indexed arguments** covering topics from nuclear energy to universal basic income
- **Quality scores** for each argument (evidence strength, source credibility, coherence)
- **Source citations** with research metadata
- **Streaming responses** for real-time feedback
- **Dark mode** with system preference detection
- **Fully accessible** (WCAG 2.2 AA compliant)

## The Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### AI & Search
- **Algolia Agent Studio** - The core of the application
- **Algolia Search** - For argument indexing and retrieval
- **GPT-4** - Via Agent Studio for response generation

### Design Decisions

I deliberately avoided generic "AI chat" patterns:

❌ No bouncing dots loading indicator
✅ Multi-phase loading states ("Understanding your belief..." → "Researching counterevidence...")

❌ No excessive emoji or exclamation marks
✅ Confident, professional prose

❌ No generic robot/neural network imagery
✅ Abstract, premium design with violet + teal accents

## Algolia Agent Studio Integration

The magic happens through Algolia's Agent Studio. Here's the architecture:

```
User Input → Next.js API Route → Algolia Agent Studio
                                       ↓
                              1. Parse user's belief
                              2. Search argument index
                              3. Rank by relevance + quality
                              4. Generate response via GPT-4
                                       ↓
                              Streaming SSE Response → Frontend
```

### Why Agent Studio?

Agent Studio solves a critical problem: **grounding AI responses in real data**.

Without grounding, an LLM might generate plausible-sounding but invented "counterarguments." With Algolia's retrieval layer, every argument comes from my curated, indexed dataset.

This means:
- **No hallucinated sources**
- **Consistent quality scoring**
- **Traceable citations**

### Streaming Implementation

I enabled streaming for better UX:

```typescript
// API route with streaming
url.searchParams.set('stream', 'true');
url.searchParams.set('compatibilityMode', 'ai-sdk-5');

// Return SSE response
return new Response(response.body.pipeThrough(transformStream), {
  headers: { 'Content-Type': 'text/event-stream' }
});
```

The frontend consumes the stream and updates the message in real-time with a blinking cursor.

## What I Learned

### 1. Curation > Volume

I started planning to index 500+ arguments. Reality check: **26 high-quality, well-researched arguments beat 500 mediocre ones.**

Quality scoring matters. Each argument has:
- Evidence strength (1-100)
- Source credibility (1-100)
- Argument coherence (1-100)
- Documented limitations

### 2. Steel-Manning Is Hard

The goal isn't to "gotcha" users—it's to present the **strongest possible version** of opposing views. This requires:
- Academic sources over opinion pieces
- Acknowledging limitations honestly
- Respecting the user's intelligence

### 3. UX Details Matter

Small things that made a big difference:
- **Varied error messages** (less robotic)
- **Keyboard shortcuts** (Enter to send, / to focus)
- **Loading phase progression** (shows the AI is "thinking" purposefully)
- **Reduced motion support** (accessibility)

## Try It Yourself

🔗 **Live Demo:** [contradict-me.vercel.app](https://contradict-me.vercel.app)

📂 **Source Code:** [GitHub](https://github.com/yourusername/contradictme) *(if public)*

### Example Prompts to Try

- "Nuclear energy is too dangerous"
- "College is always worth it"
- "AI will cause mass unemployment"
- "Universal basic income makes people lazy"
- "Remote work hurts productivity"

## What's Next

Future improvements I'm considering:
- **More argument topics** (currently 26, could expand)
- **User feedback loop** (rate argument quality)
- **Conversation export** (save debates for later)
- **Voice input** (Web Speech API)

---

## About This Project

Built for the **Algolia Agent Studio Challenge** on DEV.to.

The goal was to demonstrate how retrieval-augmented generation can create AI experiences that are *grounded in real data*—not just plausible-sounding hallucinations.

If you believe something strongly, I challenge you to try ContradictMe. You might not change your mind—but you'll understand the other side better.

---

*What belief would you like challenged? Drop it in the comments and I'll tell you what ContradictMe thinks!*

---

**Tags:** #algoliachallenge #ai #nextjs #typescript
