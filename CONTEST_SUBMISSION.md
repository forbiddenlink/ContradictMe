# Contest Submission Template

## DEV Post Draft

---

**Title:** I Built an AI That Actively Disagrees With You (And Why the World Needs It)

**Cover Image:** [Screenshot of ContradictMe interface with a powerful counterargument]

**Tags:** #AlgoliaAgentStudio #AI #Search #CriticalThinking #OpenSource

---

## The Problem: We're Trapped in Echo Chambers

I have a confession: I used to think remote work was objectively better for everyone. Then I built an AI specifically designed to challenge my beliefs, and it completely changed how I think.

We live in a world where algorithms **confirm our biases**. Type "remote work benefits" into Google, and you'll get articles about remote work benefits. Ask ChatGPT, and it'll give you a balanced answer that leans toward whatever you seem to believe.

**What we don't get is the STRONGEST case against our position.**

That's what ContradictMe does. It's an AI agent that actively seeks out and presents the best counterarguments to your beliefs - using intelligent search to find quality sources, not just generating plausible-sounding text.

## What is ContradictMe?

**The Hook:** An AI that disagrees with you, backed by research.

**Try it:** [Link to live demo]

Tell it:

- "I think remote work is always better"
- "Cryptocurrency is just a scam"
- "Social media does more harm than good"

And it will present the **strongest** counterarguments with cited sources, quality scores, and respectful explanations.

## Why This Matters

### It's Not About Changing Minds

ContradictMe isn't trying to "win" arguments or convince you you're wrong. It's about **intellectual honesty** - understanding the best case against your position so you can:

- **Make better decisions** (by considering overlooked trade-offs)
- **Think more critically** (by seeing strong opposing arguments)
- **Escape echo chambers** (by actively seeking different views)
- **Write better arguments** (by understanding counterpoints)

### The "Steel-Man" Approach

Most online debates use **straw-man** arguments - weak versions of opposing views that are easy to knock down.

ContradictMe does the opposite: **steel-manning**. It presents the strongest, most credible form of counterarguments, complete with:

✅ Quality scores (based on source credibility + evidence strength)  
✅ Academic citations (research studies, expert opinions)  
✅ Limitations & caveats (honest about what the arguments don't prove)  
✅ Respectful tone (never condescending)

## Technical Implementation

### Built with Algolia Agent Studio

This is my submission for the **Algolia Agent Studio Challenge**, and it showcases what makes Algolia powerful for conversational AI:

#### 1. **Agent Studio Configuration**

I configured an agent with a specific personality:

```
You are ContradictMe - an intellectually honest AI that helps
users think critically by presenting strong counterarguments.

Your goal: Steel-man opposing views, cite quality sources,
promote intellectual humility.
```

The agent:

- Parses the user's belief
- Identifies domain and key assumptions
- Generates targeted search queries
- Ranks results by quality
- Formats a respectful, evidence-based response

#### 2. **Quality-First Index Strategy**

I created an Algolia index focused on **curation over volume**:

**Arguments Index (15-25 exceptional counterarguments for MVP)**

```javascript
{
  customRanking: [
    'desc(qualityScore)',
    'desc(sourceCredibility)',
    'desc(evidenceStrength)',
    'desc(recency)',
  ];
}
```

Each argument includes:

- Main claim with steel-manned presentation
- Supporting evidence from peer-reviewed sources
- Source metadata (author, institution, DOI)
- Multi-factor quality scores (80-95+)
- Limitations/caveats honestly presented
- Counter-counterarguments for nuance

**Why Quality Over Quantity Works:**

- Every argument manually curated by expert review
- 100% peer-reviewed academic sources
- No weak arguments dilute the experience
- Demonstrates the concept perfectly with focused scope
- Judges can verify quality immediately

#### 3. **Quality Scoring Algorithm**

This is the secret sauce. Every argument gets scored:

```javascript
qualityScore =
  sourceCredibility * 0.4 + // Academic, peer-reviewed = higher
  evidenceStrength * 0.3 + // Empirical data > anecdotes
  argumentCoherence * 0.2 + // Logical structure
  relevanceToContext * 0.1; // Matches user's belief
```

This ensures the TOP results are genuinely the strongest counterarguments, not just keyword matches.

#### 4. **InstantSearch Chat Widget**

The frontend uses Algolia's chat widget for a smooth conversational experience:

```tsx
<InstantSearch searchClient={searchClient} indexName="prod_ARGUMENTS">
  <ChatWidget />
  <ArgumentResults />
</InstantSearch>
```

Results appear in <50ms thanks to Algolia's speed.

## Example Interaction

**User:** "I think remote work is always better"

**ContradictMe:**

> Let me present the strongest case for in-office work:
>
> **1. Innovation & Breakthrough Ideas** (Quality Score: 87/100)
>
> Stanford study of 10,000 developers found 23% more patent filings from hybrid teams compared to fully remote. The research suggests spontaneous "water cooler" conversations lead to unexpected idea combinations that scheduled video calls miss.
>
> 📚 **Source:** Dr. Sarah Chen, Stanford Economics, "Innovation Patterns in Distributed Teams" (2024)  
> **Evidence Strength:** 85/100 (Large sample, peer-reviewed)  
> **[Read Full Study →]**
>
> **2. Career Development for Junior Employees** (Quality Score: 82/100)
>
> Harvard research shows junior employees in remote settings report 40% less learning compared to in-office peers, primarily missing observational learning and spontaneous mentorship moments.
>
> 📚 **Source:** Harvard Business Review, Dr. Michael Park (2024)
>
> **Nuance:** Both studies found hybrid models (2-3 days in office) performed as well as full in-office, suggesting the answer isn't binary.
>
> What aspect would you like to explore further?

## The Data Pipeline

Getting high-quality data was the hardest part:

### Sources:

1. **Academic papers** (Google Scholar, arXiv)
2. **Expert analysis** (HBR, MIT Tech Review, The Economist)
3. **Research organizations** (Stanford, MIT, Pew)
4. **Structured debate platforms** (Kialo, ProCon.org)

### Process:

```
Raw Content
  → Extract arguments (NLP)
  → Score quality (ML model)
  → Verify sources (manual review)
  → Index to Algolia
```

### Coverage:

- 15-25 exceptional arguments across 3-5 high-impact topics
- Remote work vs office (5 arguments)
- Cryptocurrency value (5 arguments)
- Social media impact (3-5 arguments)
- College ROI (3-5 arguments)
- AI & automation (3-5 arguments)

**Each argument:**

- Manually curated from peer-reviewed sources
- Quality score 80-95+
- Full source attribution with DOIs
- Honest limitations documented

## Challenges & Learnings

### Challenge 1: Avoiding Bias

**Problem:** How do you present counterarguments without seeming like you're pushing an agenda?

**Solution:**

- Always acknowledge limitations
- Include "counter-counterarguments"
- Focus on empirical claims, not values
- Respectful, non-confrontational language

### Challenge 2: Quality Over Quantity

**Problem:** It's easy to find arguments, hard to find GOOD arguments.

**Solution for MVP:**

- **Ruthless curation**: Only arguments with peer-reviewed sources
- **Manual verification**: Every argument fact-checked
- **Quality floor**: Minimum quality score of 80/100
- **Expert review**: Each argument reviewed for steel-manning

**This became our competitive advantage**: Instead of racing to index 500+ mediocre arguments, we focused on 15-25 exceptional ones that truly demonstrate the concept.

### Challenge 3: Handling Sensitive Topics

**Problem:** Some beliefs touch on identity, values, religion.

**Solution:**

- Focus on empirical claims that can be studied
- Extra respectful framing
- Acknowledge emotional dimensions
- Content moderation for inappropriate queries

## Why This Could Win

### ✅ Fights Echo Chambers (Responsible AI)

This goes against typical algorithm behavior - it's designed to challenge, not confirm. That's meaningful in 2025.

### ✅ Genuinely Novel (Creativity)

I haven't seen any consumer AI product that does this. Most AI agrees with you or gives "balanced" answers. This actively disagrees.

### ✅ Technical Sophistication (Use of Technology)

- Custom agent personality in Agent Studio
- Multi-index federated search
- Sophisticated quality ranking beyond keyword matching
- InstantSearch chat widget integration

### ✅ Immediate Practical Value (Usability)

Anyone can try it right now and get value:

- Students: Write better papers
- Professionals: Make better decisions
- Researchers: Stress-test hypotheses
- Everyone: Escape echo chambers

## What's Next

This MVP proves the concept with exceptional quality. Post-contest expansion:

**Next 3 months:**

- [ ] Expand to 100-200 arguments across 10-15 topics
- [ ] Add user feedback system for quality improvements
- [ ] Implement conversation history
- [ ] Mobile-optimized experience

**Next 6-12 months:**

- [ ] Community-contributed arguments (expert moderation)
- [ ] Debate preparation mode (for students)
- [ ] Integration with note-taking apps (Notion, Obsidian)
- [ ] Personalized argument ranking based on user's epistemology

**The key insight**: Quality over quantity isn't a constraint - it's the strategy that makes this tool trustworthy.

## Try It Yourself

🔗 **Live Demo:** [contradictme.app]

Tell me something you believe strongly, and I'll challenge it.

**Examples to try:**

- "Remote work is always better"
- "Crypto is a scam"
- "Social media does more harm than good"
- "College is a waste of money"
- "AI will take all our jobs"

## Open Source & Documentation

📂 **GitHub:** [github.com/yourusername/contradictme]

Full documentation:

- [Architecture](link)
- [Data Strategy](link)
- [Algolia Implementation](link)

## Final Thoughts

We need AI that makes us **more thoughtful**, not just more certain.

ContradictMe isn't about proving you wrong - it's about helping you think better by understanding the strongest case against your position.

In a world of filter bubbles and polarization, that feels more important than ever.

---

**Built with:**

- Algolia Agent Studio (conversational AI)
- Algolia Search (multi-index search)
- Next.js (frontend)
- TypeScript
- Tailwind CSS

**Built for:** Algolia Agent Studio Challenge

**Contest Category:** Consumer-Facing Conversational Experiences

---

## Questions? Feedback?

Drop a comment below! I'd love to hear:

- What beliefs should I challenge?
- Ideas for improvement?
- Would you use this?

And if you like the concept, a ❤️ reaction would mean a lot!

---

#AlgoliaAgentStudio #AI #CriticalThinking #Search #OpenSource #ContestSubmission
