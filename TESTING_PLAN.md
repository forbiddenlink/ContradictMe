# ContradictMe Testing Plan

## Manual Testing Checklist

### 1. Landing Page

- [ ] Page loads without errors
- [ ] Input field is clickable and functional
- [ ] All 3 suggestion buttons work
- [ ] Clicking suggestions navigates to /chat with message
- [ ] Responsive design works on mobile
- [ ] Animations play smoothly

### 2. Chat Interface

- [ ] Initial welcome message displays
- [ ] User can type and send messages
- [ ] Enter key sends message
- [ ] Loading animation appears while waiting
- [ ] Assistant response renders correctly
- [ ] Message formatting looks good (intro text, arguments, citations)
- [ ] Animations (slide-up) work for messages
- [ ] Scroll to bottom works automatically

### 3. Test Each Argument Topic

#### Remote Work

**Test input:** "Remote work is always better than office work"

- [ ] Agent retrieves remote-work-innovation argument
- [ ] Response challenges the belief
- [ ] Citations formatted correctly
- [ ] Quality score visible

#### Cryptocurrency

**Test input:** "Crypto is just a scam"

- [ ] Agent retrieves crypto-financial-inclusion argument
- [ ] Presents use case for unbanked populations
- [ ] Sources cited properly

#### Social Media

**Test input:** "Social media is harmless"

- [ ] Agent retrieves social-media-mental-health argument
- [ ] Presents mental health research
- [ ] Adolescent data highlighted

#### College ROI

**Test input:** "College is always worth it"

- [ ] Agent retrieves college-roi-declining argument
- [ ] Discusses financial analysis
- [ ] Skilled trades comparison mentioned

#### AI Jobs

**Test input:** "AI will cause mass unemployment"

- [ ] Agent retrieves ai-job-creation argument
- [ ] Historical job creation data presented
- [ ] New job categories mentioned

#### Nuclear Energy

**Test input:** "Nuclear energy is too dangerous"

- [ ] Agent retrieves nuclear-energy-clean argument
- [ ] Safety statistics presented
- [ ] Comparison to other energy sources

#### Plant-Based Diet

**Test input:** "You need meat to be healthy"

- [ ] Agent retrieves plant-based-diet-health argument
- [ ] Health benefits presented
- [ ] Protein sources discussed

#### Universal Basic Income

**Test input:** "UBI makes people lazy"

- [ ] Agent retrieves ubi-productivity argument
- [ ] Finland/Kenya trial data presented
- [ ] Employment statistics shown

#### Minimum Wage

**Test input:** "Raising minimum wage helps everyone"

- [ ] Agent retrieves minimum-wage-automation argument
- [ ] Seattle study data presented
- [ ] Automation acceleration discussed

#### Electric Vehicles

**Test input:** "EVs are always better for the environment"

- [ ] Agent retrieves electric-vehicles-environment argument
- [ ] Grid composition nuance presented
- [ ] Lifecycle analysis explained

### 4. Edge Cases

- [ ] Very long user message (500+ characters)
- [ ] Special characters in input (@#$%^&\*)
- [ ] Empty message doesn't send
- [ ] Multiple rapid messages
- [ ] Belief not in database - agent responds appropriately
- [ ] Network error handling

### 5. Performance

- [ ] Page loads in < 2 seconds
- [ ] Agent responses arrive in < 5 seconds
- [ ] No memory leaks after 10+ messages
- [ ] Smooth scrolling with many messages

### 6. Design/UX

- [ ] Colors match design system (Navy, Terracotta, Sage)
- [ ] Glass effect looks good
- [ ] Typography is readable
- [ ] Spacing is consistent
- [ ] Mobile responsive breakpoints work
- [ ] Animations don't feel janky
- [ ] Loading states are clear

### 7. Accessibility

- [ ] Tab navigation works
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader friendly (basic check)

## Automated Testing (Future)

- [ ] Unit tests for parsing functions
- [ ] E2E tests for critical user flows
- [ ] API integration tests
- [ ] Performance benchmarks

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Pre-Deployment Checklist

- [ ] All 10 arguments tested manually
- [ ] No console errors in browser
- [ ] Environment variables set correctly
- [ ] .env.local not committed to git
- [ ] API keys secure
- [ ] Build succeeds (`npm run build`)
- [ ] Production mode tested locally

---

_Complete this checklist before deploying to Vercel!_
