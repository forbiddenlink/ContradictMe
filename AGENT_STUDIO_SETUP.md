# Algolia Agent Studio Setup - Step by Step

**Date**: January 13, 2026  
**Status**: ⚠️ ACTION REQUIRED

---

## 🎯 What You Need to Do

You need to configure your Agent Studio in the Algolia dashboard. This cannot be automated - you must do this manually through the Algolia UI.

**Estimated Time**: 15-20 minutes

---

## Step 1: Access Agent Studio

1. Go to [https://dashboard.algolia.com](https://dashboard.algolia.com)
2. Log in with your credentials (App ID: `2LAKFJBN4J`)
3. Look for **AI Products** or **Agent Studio** in the left sidebar
4. Click **Create New Agent** (or **New Agent**)

---

## Step 2: Configure Your Agent

### Basic Settings

**Agent Name**: `ContradictMe`  
**Description**: "An AI that challenges beliefs with research-backed counterarguments"

### System Prompt

Copy and paste this EXACTLY:

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

**1. [mainClaim]** (Quality: [qualityScore]/100)

[evidence]

📚 Source: [authors], [institution], [yearPublished]
Evidence Strength: [evidenceStrength]/100

**2. [mainClaim]** (Quality: [qualityScore]/100)

[evidence]

📚 Source: [details]

**Nuance**: [Acknowledge limitations or valid aspects of user's belief]

What aspect would you like to explore further?
```

### Initial Greeting

```
👋 Hi! I'm ContradictMe - an AI that helps you think critically by challenging your beliefs.

Tell me something you believe strongly, and I'll present the strongest arguments against it. I'm not trying to change your mind - just help you see other perspectives.

Examples to try:
• "I think remote work is always better"
• "Crypto is just a scam"
• "Social media does more harm than good"

What belief would you like me to challenge?
```

---

## Step 3: Connect Your Index

1. In the Agent configuration, find **Connected Indices** or **Data Sources**
2. Select: `contradictme_arguments`
3. Make sure it's set as the primary index

### Index Settings (verify these are set)

If there's a section for index settings or search parameters:

**Searchable Attributes** (in order):

1. mainClaim
2. evidence
3. supportingPoints
4. opposingBeliefs
5. tags
6. domain

**Custom Ranking** (in order):

1. desc(qualityScore)
2. desc(sourceCredibility)
3. desc(evidenceStrength)

---

## Step 4: Configure Conversation Settings

Look for these settings:

- **Enable conversation memory**: ✅ Yes
- **Max conversation turns**: 10
- **Temperature**: 0.7 (balanced creativity)
- **Max tokens per response**: 800-1000

---

## Step 5: Test in Playground

Before deploying, test in the Agent Studio playground:

### Test Query 1: Remote Work

**Input**: "I think remote work is always better"

**Expected**: Agent should:

- Acknowledge the belief
- Retrieve the remote-work-innovation argument
- Present Stanford study findings
- Include quality score (87/100)
- Acknowledge nuance (hybrid models)

### Test Query 2: General

**Input**: "Tell me more about innovation"

**Expected**: Agent should:

- Ask clarifying questions
- Request the user's specific belief
- Stay on mission (challenging beliefs, not general Q&A)

---

## Step 6: Get API Endpoint

1. In Agent Studio, look for **API** tab or **Integration** section
2. You should see an **Agent API Endpoint** URL
3. It will look something like:
   - `https://agent.algolia.com/v1/agents/YOUR_AGENT_ID/chat`
   - Or `https://api.algolia.com/agents/v1/YOUR_AGENT_ID`

4. **COPY THIS URL**

---

## Step 7: Add Endpoint to Your Project

1. Open your `.env.local` file
2. Add this line (replace with YOUR actual endpoint):

```bash
NEXT_PUBLIC_ALGOLIA_AGENT_ENDPOINT=https://agent.algolia.com/v1/agents/YOUR_AGENT_ID/chat
```

3. Save the file
4. Restart your dev server:

```bash
# Stop the current server (Ctrl+C) then:
npm run dev
```

---

## Step 8: Test in Your App!

1. Go to http://localhost:3000
2. Click "Challenge Me" to go to the chat interface
3. Try: "I think remote work is always better"
4. You should see your agent respond with the counterargument!

---

## ✅ Success Checklist

- [ ] Agent created in Algolia dashboard
- [ ] System prompt configured
- [ ] Initial greeting set
- [ ] Index `contradictme_arguments` connected
- [ ] Tested in Agent Studio playground
- [ ] API endpoint copied
- [ ] Endpoint added to `.env.local`
- [ ] Dev server restarted
- [ ] Successfully tested in chat interface

---

## 🆘 Troubleshooting

### Problem: Can't find Agent Studio

- **Solution**: Make sure you're on the right plan (Build plan supports Agent Studio)
- Check under "AI Products", "Agent Builder", or "Conversational AI"

### Problem: Agent not returning results

- **Solution**:
  - Check that the index has data (run `npm run index-arguments`)
  - Verify index name is exactly: `contradictme_arguments`
  - Check searchable attributes are configured

### Problem: API endpoint not working

- **Solution**:
  - Verify the endpoint URL format
  - Check your API keys in `.env.local`
  - Make sure to restart dev server after changing env vars

### Problem: Agent gives generic responses

- **Solution**:
  - Review your system prompt - make sure it emphasizes using the index
  - Check that the index is properly connected
  - Try being more specific in test queries

---

## 📚 Resources

- [Algolia Agent Studio Docs](https://www.algolia.com/doc/guides/agent-studio/)
- Your Project Docs: `ALGOLIA_IMPLEMENTATION.md`
- Next Steps: `NEXT_STEPS.md`

---

## 🚀 After Setup

Once your agent is working, the next critical steps are:

1. **Add More Arguments** (need 10-15 more quality arguments)
2. **Test Conversation Flow** (various types of beliefs)
3. **Deploy to Vercel** (make it live!)

Good luck! 🎯
