# ContradictMe - DevPost Submission

## Algolia Agent Studio Challenge 2026

### 🎯 Challenge Your Beliefs with AI

**Live Demo:** https://contradict-me.vercel.app  
**Repository:** https://github.com/forbiddenlink/ContradictMe

---

## Inspiration 💡

In an age of algorithmic echo chambers and confirmation bias, we're rarely exposed to quality opposing arguments. Most AI tools reinforce what we already believe. **ContradictMe flips this on its head** - it's an AI that actively disagrees with you, presenting steel-manned counterarguments backed by research.

I wanted to build something that promotes intellectual humility and critical thinking. Not an AI that wins debates, but one that helps you think better.

---

## What It Does 🚀

ContradictMe takes your belief or position and returns:

1. **Steel-manned counterarguments** (the strongest form, not weak straw-men)
2. **Evidence-based reasoning** with peer-reviewed sources
3. **Quality scores** for each argument (research rigor, sample size)
4. **Honest limitations** (what the evidence can't prove)
5. **Follow-up questions** to deepen your understanding

### Key Features

**💬 Intelligent Chat Interface**
- Natural conversation about beliefs and positions
- Context-aware follow-up questions
- Conversation history with search and bookmarks
- Auto-save with IndexedDB persistence

**📊 Analytics Dashboard**
- Track topics you've explored
- Tag cloud of argument themes
- Achievement system for critical thinking milestones
- Engagement metrics

**⚔️ AI Debate Arena**
- Watch Pro vs Con AI agents debate any topic
- 5-round structured debates with rebuttals
- Submit interjections during the debate
- Vote for the winner and export transcripts

**🎨 Premium Experience**
- Dark/light/system theme preference
- Smooth animations with Framer Motion
- Responsive design (mobile, tablet, desktop)
- Accessibility compliant (WCAG)

---

## How I Built It 🛠️

### Tech Stack

- **Frontend:** Next.js 15 (App Router) + React 18
- **AI Agent:** Algolia Agent Studio powered by GPT-4
- **Search:** Algolia for argument indexing and retrieval
- **Database:** IndexedDB (Dexie.js) for local persistence
- **Styling:** Tailwind CSS with custom design system
- **Animations:** Framer Motion for smooth transitions
- **Testing:** Jest + React Testing Library (73 tests, 100% passing)
- **Deployment:** Vercel with automatic CI/CD

### Architecture Highlights

**Argument Index:**
- 26 carefully curated arguments covering diverse topics
- Each with quality scores (evidence strength, sample size, methodology)
- Peer-reviewed sources and expert citations
- Limitations explicitly documented

**Agent Studio Integration:**
- Custom prompts optimized for counterargument generation
- Context-aware responses that build on conversation history
- Fallback handling with retry logic
- Stream-enabled for real-time responses

**Data Strategy:**
- Semantic search for finding relevant counterarguments
- Quality-weighted ranking (not just keyword matching)
- Perspective diversity scoring
- Source credibility filtering

---

## Challenges I Faced 🧗

### 1. **Balancing Disagreement with Respect**
Finding the tone that challenges beliefs without being condescending required extensive prompt engineering. I tested dozens of variations to get the right balance of intellectual rigor and humility.

### 2. **Quality Over Quantity**
Rather than index hundreds of weak arguments, I focused on 26 high-quality, research-backed positions (avg quality score: 88.1/100). Each argument took 30-45 minutes to properly source and document.

### 3. **Context Preservation**
Building a conversation system that remembers what topics have been covered and generates contextually relevant follow-ups required careful state management and smart IndexedDB persistence.

### 4. **Test Coverage**
Achieving 100% test pass rate (73 tests) with complex async operations, theme context, and Framer Motion animations required robust mocking and careful test design.

### 5. **Performance Optimization**
Keeping the bundle size reasonable while adding analytics, debate arena, and rich animations required code splitting and careful component optimization.

---

## Accomplishments 🏆

✅ **73/73 tests passing** (100% success rate)  
✅ **26 research-backed arguments** indexed  
✅ **88.1/100 average quality score**  
✅ **Sub-second response times** with Agent Studio  
✅ **Full accessibility compliance** (WCAG)  
✅ **Mobile-first responsive design**  
✅ **Production-ready deployment** on Vercel  
✅ **Zero console errors** in production build  

### Innovation Highlights

- **Novel use case:** First AI that intentionally disagrees
- **Ethical AI design:** Fights echo chambers and confirmation bias
- **Educational value:** Helps users think critically
- **Real-world utility:** Preparation for debates, decision-making, research

---

## What I Learned 📚

### Technical
- **Agent Studio best practices:** Prompt optimization, context management, error handling
- **Algolia search patterns:** Semantic indexing, quality weighting, relevance tuning
- **Next.js 15 App Router:** Server components, metadata API, parallel routes
- **IndexedDB patterns:** Async storage, transaction handling, migration strategies

### Design
- **Dark mode isn't optional:** Users expect it, and system preference detection is key
- **Animations need purpose:** Every animation should enhance understanding, not just look cool
- **Accessibility from day one:** Building it in later is much harder
- **Mobile-first matters:** 60%+ of users will be on mobile

### Product
- **Quality beats quantity:** 26 great arguments > 100 mediocre ones
- **Intellectual humility:** Users respond better when AI admits limitations
- **Context is king:** Follow-up questions that reference previous messages feel magical
- **Debate format works:** Users love watching AI agents argue both sides

---

## What's Next? 🔮

### Immediate Enhancements
- **Source verification system:** Let users challenge sources and see evidence details
- **Argument submission:** Community-contributed counterarguments with peer review
- **Export/share:** One-click sharing of conversations and debate transcripts
- **Voice mode:** Audio input/output for hands-free exploration

### Long-term Vision
- **Multi-perspective mode:** 3+ viewpoints on complex issues (not just pro/con)
- **Argument graphs:** Visual maps of reasoning chains and dependencies
- **Collaborative debates:** Multiple users + AI agents in structured discussions
- **Educational integration:** Curriculum for critical thinking and debate preparation
- **API for developers:** Embed counterargument generation in other tools

---

## Try It Yourself 🎮

**Live Demo:** https://contradict-me.vercel.app

Try these commands:
- "I think nuclear energy is too dangerous" - Get evidence-based counterarguments
- "Defend remote work to me" - See the strongest case for in-office work
- Start a debate on universal basic income in the Debate Arena
- Explore the analytics dashboard after a few conversations

---

## Built With ❤️

This project was built for the **Algolia Agent Studio Challenge 2026** to demonstrate how AI can promote critical thinking instead of confirmation bias.

**Developer:** Liz Stein  
**Contact:** liz@lizstein.dev  
**License:** MIT

---

## Installation (for judges/developers)

```bash
# Clone the repository
git clone https://github.com/forbiddenlink/ContradictMe.git
cd ContradictMe

# Install dependencies
npm install

# Set up environment variables
# ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME, OPENAI_API_KEY

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

**Thank you for considering ContradictMe!** 🎯

An AI that challenges you to think better.
