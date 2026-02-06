# ContradictMe Deployment Guide

## Prerequisites

- Vercel account (free tier works)
- GitHub repository (optional but recommended)
- Environment variables ready

## Option 1: Deploy via Vercel CLI (Recommended)

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy from Project Directory

```bash
cd /Volumes/LizsDisk/ContradictMe
vercel
```

### 4. Configure Environment Variables

During deployment, Vercel will prompt for environment variables. Add:

```
ALGOLIA_APP_ID=2LAKFJBN4J
ALGOLIA_SEARCH_API_KEY=<your-search-api-key>
ALGOLIA_ADMIN_API_KEY=<your-admin-api-key>
ALGOLIA_AGENT_ENDPOINT=https://ai-sdk-5.api.algolia.com/1/agents/1ed2db11-e407-441c-9936-0bbf55e0604e?stream=false&compatibilityMode=ai-sdk-5
```

### 5. Deploy to Production

```bash
vercel --prod
```

## Option 2: Deploy via Vercel Dashboard

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - ContradictMe AI Agent"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel auto-detects Next.js settings

### 3. Configure Environment Variables

In Vercel dashboard:

1. Go to Project Settings > Environment Variables
2. Add each variable:
   - `ALGOLIA_APP_ID`
   - `ALGOLIA_SEARCH_API_KEY`
   - `ALGOLIA_ADMIN_API_KEY`
   - `ALGOLIA_AGENT_ENDPOINT`
3. Select environments: Production, Preview, Development

### 4. Deploy

Click "Deploy" - Vercel builds and deploys automatically

## Post-Deployment Checklist

### Verify Deployment

- [ ] Site loads at Vercel URL
- [ ] No build errors in Vercel logs
- [ ] Landing page displays correctly
- [ ] Chat interface works
- [ ] Agent responses coming through
- [ ] All 10 arguments accessible

### Test Production

1. Visit your Vercel URL (e.g., contradictme.vercel.app)
2. Try at least 3 different prompts
3. Verify formatting and responses
4. Check mobile responsiveness
5. Test on different browsers

### Monitor

- [ ] Check Vercel Analytics (free tier)
- [ ] Monitor Algolia usage (API calls)
- [ ] Check for errors in Vercel logs

### Optional: Custom Domain

1. Purchase domain (e.g., Namecheap, Google Domains)
2. In Vercel dashboard: Settings > Domains
3. Add custom domain
4. Configure DNS records as instructed
5. Wait for DNS propagation (can take 24-48 hours)

## Troubleshooting

### Build Fails

**Error:** "Module not found"

- Check all imports in code
- Run `npm install` locally to verify dependencies
- Check package.json is committed

**Error:** "Environment variable not found"

- Verify all env vars set in Vercel dashboard
- Use correct variable names (case-sensitive)

### Runtime Errors

**Agent not responding:**

- Check ALGOLIA_AGENT_ENDPOINT in production env vars
- Verify API keys are correct
- Check Algolia dashboard for API usage/errors

**404 on routes:**

- Ensure file structure matches Next.js app router conventions
- Check vercel.json if you have custom routing

### Performance Issues

**Slow loading:**

- Enable Vercel Analytics to identify bottleneck
- Check image optimization (use next/image)
- Verify API response times in Algolia dashboard

**API timeouts:**

- Increase timeout in API route (default 10s on free tier)
- Consider caching frequent responses
- Upgrade Vercel plan if needed

## Cost Estimates

### Vercel Free Tier

- ✅ 100 GB bandwidth/month
- ✅ Unlimited personal projects
- ✅ Analytics
- ✅ Automatic SSL
- **Cost: $0/month**

### Algolia Free Tier

- ✅ 10,000 search requests/month
- ✅ 10,000 records
- ✅ Up to 1M agent messages/month
- **Cost: $0/month**

**Total Cost: $0/month** for MVP! 🎉

### When to Upgrade

**Vercel Pro ($20/month)** if you need:

- Commercial use
- Team collaboration
- More bandwidth
- Priority support

**Algolia Standard ($0.50/1000 requests)** if you exceed:

- 10,000 searches/month
- Want advanced features

## Monitoring & Maintenance

### Weekly

- Check Vercel deployment status
- Monitor error logs
- Review Algolia usage

### Monthly

- Update dependencies (`npm outdated`)
- Review and improve arguments
- Analyze user engagement (if tracking added)

### As Needed

- Add new arguments
- Improve UI based on feedback
- Fix bugs reported in logs

## Rollback Plan

If deployment has critical issues:

```bash
# Revert to previous deployment in Vercel dashboard
# OR
# Rollback code and redeploy
git revert HEAD
git push origin main
```

---

## Ready to Deploy?

1. ✅ Complete TESTING_PLAN.md checklist
2. ✅ Ensure all environment variables ready
3. ✅ Run `npm run build` locally (should succeed)
4. ✅ Commit all changes to git
5. 🚀 Follow Option 1 or Option 2 above
6. 🎉 Share your deployed URL!

**Good luck with the Algolia Contest!** 🏆
