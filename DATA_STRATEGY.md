# Data Strategy

## Overview

ContradictMe's effectiveness depends entirely on high-quality, diverse counterarguments. This document outlines our strategy for sourcing, processing, and indexing argument data.

## Data Sources

### Tier 1: Academic & Research (Highest Quality)

**Sources:**
- Google Scholar (via Serper API)
- arXiv.org (preprints)
- PubMed (health/science)
- JSTOR (if access available)
- ResearchGate (academic network)
- Academic institutional repositories

**Why:**
- Peer-reviewed credibility
- Empirical evidence
- Methodology transparency
- Citation graphs

**Example Extraction:**
```
Paper: "The Productivity Paradox of Remote Work" (MIT, 2024)
Finding: "While individual productivity increased 5%, team productivity decreased 12%"
→ Argument Against: "Remote work decreases team productivity"
```

### Tier 2: Expert Opinion & Analysis

**Sources:**
- Harvard Business Review
- MIT Technology Review
- The Economist
- Foreign Affairs
- Nature/Science commentary sections
- Expert blogs (curated list)
- TED talks transcripts

**Why:**
- Expert synthesis of research
- Real-world context
- Accessible explanations
- Multiple perspectives

### Tier 3: Quality Journalism

**Sources:**
- AP, Reuters (fact-based reporting)
- New York Times, Wall Street Journal (analysis pieces)
- The Atlantic, New Yorker (long-form)
- Domain-specific publications (e.g., Ars Technica for tech)

**Why:**
- Timely coverage
- Investigative reporting
- Case studies
- Diverse perspectives

### Tier 4: Structured Debate Platforms

**Sources:**
- Kialo (structured debate platform)
- ProCon.org (curated arguments)
- Stanford Encyclopedia of Philosophy
- IEP (Internet Encyclopedia of Philosophy)

**Why:**
- Pre-structured arguments
- Both sides represented
- Clear claim/evidence format
- Already organized by topic

### Tier 5: Expert Testimony & Interviews

**Sources:**
- Congressional hearing transcripts
- Expert witness statements
- Academic interviews
- Conference presentations

**Why:**
- High-credibility sources
- Nuanced positions
- Addressing specific questions
- Cross-examination reveals weaknesses

## Domain Coverage Strategy

### Initial Launch Domains (MVP)

1. **Work & Productivity** (25% of content)
   - Remote vs office work
   - 4-day work week
   - Hustle culture
   - Work-life balance
   - Automation/AI impact

2. **Technology** (25%)
   - Cryptocurrency
   - AI risk/benefit
   - Social media effects
   - Privacy vs convenience
   - Tech regulation

3. **Lifestyle & Health** (20%)
   - Diet approaches (vegan, keto, etc.)
   - Exercise routines
   - Sleep schedules
   - Productivity methods
   - Parenting approaches

4. **Economics & Policy** (15%)
   - Universal basic income
   - Minimum wage
   - Housing policy
   - Education systems
   - Healthcare models

5. **General/Popular Topics** (15%)
   - Climate solutions
   - Urban vs suburban living
   - Higher education value
   - Social norms
   - Cultural trends

### Content Balance

For each topic, aim for:
- **60% evidence-based arguments** (studies, data, research)
- **25% expert opinion** (credentialed experts weighing in)
- **15% case studies** (real-world examples, outcomes)

## Data Collection Process

### Phase 1: Automated Scraping

```python
# Pseudocode for data collection pipeline

topics = [
  {
    "belief": "remote work is always better",
    "search_queries": [
      "office work benefits research study",
      "remote work disadvantages productivity",
      "in-person collaboration innovation research"
    ]
  }
]

for topic in topics:
  for query in topic.search_queries:
    results = google_scholar_search(query, limit=20)
    
    for paper in results:
      if quality_check(paper):
        arguments = extract_arguments(paper)
        for arg in arguments:
          arg.source_credibility = score_source(paper.journal)
          arg.evidence_strength = score_evidence(paper.methodology)
          index_to_algolia(arg)
```

### Phase 2: Manual Curation

**Quality Control:**
1. Review auto-extracted arguments
2. Verify source credibility
3. Check for bias or misrepresentation
4. Add context notes
5. Tag with metadata

**Curator Guidelines:**
- Steel-man: Present strongest form of argument
- Avoid straw-man versions
- Ensure evidence actually supports claim
- Note limitations and caveats
- Cross-reference claims

### Phase 3: Continuous Updates

- Weekly: Add arguments on trending topics
- Monthly: Review and update outdated content
- Quarterly: Re-score source credibility
- User feedback: Flag low-quality arguments

## Data Structure

### Arguments Index

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
    "Results may reflect poor remote collaboration tools, not remote work itself"
  ],
  "counterCounterArguments": [
    "Deep work requires uninterrupted focus (favors remote)",
    "Digital collaboration tools are improving rapidly",
    "Innovation metrics are hard to measure/attribute"
  ],
  "sourceMetadata": {
    "title": "Innovation Patterns in Distributed Teams",
    "authors": ["Dr. Sarah Chen", "Dr. Michael Park"],
    "institution": "Stanford University",
    "publicationType": "peer-reviewed journal",
    "journal": "Journal of Organizational Behavior",
    "yearPublished": 2024,
    "citationCount": 47,
    "doi": "10.1002/job.2024.001",
    "url": "https://..."
  },
  "qualityScores": {
    "overall": 87,
    "sourceCredibility": 95,
    "evidenceStrength": 85,
    "argumentCoherence": 82,
    "relevance": 88
  },
  "metadata": {
    "argumentType": "empirical",
    "evidenceType": "quantitative_study",
    "domain": "work",
    "subDomain": "remote_work",
    "strength": "strong",
    "tags": ["remote-work", "innovation", "collaboration", "productivity"],
    "createdAt": "2025-01-15",
    "lastUpdated": "2025-01-15",
    "reviewStatus": "verified"
  }
}
```

### Research Index

```json
{
  "objectID": "research_001",
  "studyTitle": "The Productivity Paradox of Remote Work",
  "researchers": ["Dr. Emily Zhang", "Dr. James Wilson"],
  "institution": "MIT Sloan School of Management",
  "yearPublished": 2024,
  "findings": [
    {
      "finding": "Individual productivity increased 5%",
      "supports": "for_remote_work"
    },
    {
      "finding": "Team productivity decreased 12%",
      "supports": "against_remote_work"
    }
  ],
  "methodology": "Longitudinal study, 500 companies, 2020-2024",
  "sampleSize": 50000,
  "limitations": "Self-reported productivity metrics, limited to knowledge workers",
  "domain": "work",
  "credibilityScore": 92
}
```

### Expert Opinions Index

```json
{
  "objectID": "expert_001",
  "expertName": "Dr. Adam Grant",
  "credentials": "Organizational Psychologist, Wharton Professor, NYT Bestselling Author",
  "domain": "work",
  "expertise": ["organizational behavior", "workplace culture", "productivity"],
  "opinion": "The remote work debate misses the point - it's not about location, it's about synchrony. The most innovative teams have high synchronous collaboration, whether that's in-person or virtual.",
  "context": "Interview on the Future of Work, December 2024",
  "relevantTo": ["remote work", "collaboration", "innovation"],
  "source": "Harvard Business Review Interview",
  "credibilityScore": 88
}
```

## Quality Scoring Methodology

### Source Credibility (1-100)

**Academic Sources:**
- Tier 1 journals (Nature, Science, Cell): 90-100
- Top institution research (MIT, Stanford, Harvard): 85-95
- Peer-reviewed journals: 70-85
- Preprints (arXiv): 60-75

**Expert Opinion:**
- Nobel laureate / field leader: 90-100
- Tenured professor at top institution: 80-90
- Published expert with credentials: 70-80
- Recognized practitioner: 60-70

**Journalism:**
- AP, Reuters: 80-85
- Major newspapers (NYT, WSJ): 75-80
- Quality magazines (The Atlantic): 70-75
- Domain-specific trade publications: 65-70

### Evidence Strength (1-100)

**Quantitative:**
- Large RCT (n>1000): 90-100
- Medium RCT (n>100): 80-90
- Observational study (large sample): 70-80
- Small study (n<100): 60-70

**Qualitative:**
- Systematic review/meta-analysis: 85-95
- Multiple case studies: 70-80
- Single case study: 60-70
- Expert synthesis: 55-65

**Logical:**
- Formal logical proof: 90-100
- Strong deductive reasoning: 80-90
- Inductive reasoning: 70-80
- Analogical reasoning: 60-70

### Argument Coherence (1-100)

Calculated by:
- Clear claim: +25
- Evidence directly supports claim: +25
- Addresses counterarguments: +20
- Acknowledges limitations: +15
- Logical structure: +15

## Data Volume Goals

### Strategic MVP Approach: Quality Over Quantity

**Philosophy:** For the contest submission (Feb 8, 2026), we prioritize **depth over breadth**. Better to have 15-25 exceptional, deeply-researched arguments that win the contest than 500 mediocre ones.

### MVP (Contest Submission - Feb 8, 2026)

**Core Arguments:**
- **15-25 exceptional arguments** across 3-5 high-impact topics
- **Each argument manually curated and verified**
- **100% of arguments include peer-reviewed sources**
- **Every limitation and caveat documented**

**Focused Topics (3-5 only):**
1. **Remote work vs office work** (5 arguments against remote)
2. **Cryptocurrency value proposition** (5 arguments for crypto)
3. **Social media impact** (3-5 arguments on both sides)
4. **College ROI** (3-5 arguments questioning college value)
5. **AI impact on jobs** (3-5 arguments on automation benefits)

**Per-Topic Breakdown:**
- 3-5 steel-manned counterarguments
- Mix of empirical studies, expert opinions, case studies
- Quality scores 80-95+ (no weak arguments)
- Full source attribution with DOIs/URLs

**Why This Wins:**
- Demonstrates curation quality (judges will test with these topics)
- Shows technical sophistication (quality scoring, source credibility)
- Proves concept viability (even with limited data, it works)
- Highlights design excellence (not buried in volume)

### Post-Contest (3-6 months)

After winning, expand to:
- **100-200 arguments** across 10-15 domains
- **50+ research studies** indexed separately
- **30+ expert opinions** as standalone index
- User-submitted arguments (moderated)

**Long-term Vision (1 year):**
- **1,000+ arguments**
- **500+ research studies**
- **200+ expert opinions**
- Community-driven content with expert moderation

## Data Maintenance

### Weekly:
- Add arguments on trending topics (from social media, news)
- User feedback review (flag low-quality arguments)

### Monthly:
- Update citation counts
- Add new research papers
- Review and improve argument quality

### Quarterly:
- Re-score source credibility (journals, experts)
- Archive outdated content
- Rebalance domain coverage

### Annually:
- Comprehensive quality audit
- Methodology review
- Coverage gap analysis

## Ethical Considerations

### Bias Mitigation:
- Include arguments from diverse political/cultural perspectives
- Avoid cherry-picking evidence
- Present limitations alongside arguments
- Regular bias audits

### Content Moderation:
- No hate speech, harassment, or harmful content
- Filter conspiracy theories and debunked claims
- Age-appropriate content filters
- Disclaimers for sensitive topics (health, legal, financial)

### Transparency:
- Always cite sources
- Show quality scores
- Explain limitations
- Disclose when evidence is weak

## Testing & Validation

**Pre-Launch Testing:**

1. **Accuracy Test**: Do arguments accurately represent source material?
2. **Quality Test**: Do highest-ranked arguments feel highest quality?
3. **Diversity Test**: Are multiple perspectives represented?
4. **Steel-man Test**: Are these the STRONGEST counterarguments?
5. **User Test**: Do users find arguments convincing and well-sourced?

**Success Metrics:**

- User rating >4/5 on argument quality
- Source click-through rate >30%
- User feedback: "Changed my perspective" >20%
- "Learned something new" >80%

## Tools & Services

**Data Collection:**
- Serper API (Google Scholar access)
- Scrapy (web scraping)
- BeautifulSoup (HTML parsing)
- OpenAI API (argument extraction)

**Data Processing:**
- Python (data pipeline)
- Pandas (data manipulation)
- spaCy (NLP - claim extraction)
- scikit-learn (quality scoring ML)

**Storage & Search:**
- Algolia (primary search index)
- PostgreSQL (backup, analytics)
- Redis (caching)

**Monitoring:**
- Algolia Analytics
- Custom dashboard (argument quality metrics)
- User feedback system
