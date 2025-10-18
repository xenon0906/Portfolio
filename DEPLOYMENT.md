# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/xenon0906/Portfolio)

## Manual Deployment Steps

### 1. Prerequisites
- Vercel account (free tier works)
- GitHub repository connected to Vercel

### 2. Environment Variables Setup

In your Vercel project settings, add these environment variables:

```env
VITE_GITHUB_USERNAME=xenon0906
VITE_GITHUB_TOKEN=your_github_token_here (optional, for higher rate limits)
VITE_GOOGLE_SHEETS_URL=your_google_sheets_url (optional)
VITE_FALLBACK_EMAIL=mailto:siddhanth.kunwar2015@gmail.com
```

#### How to add environment variables in Vercel:
1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable from above
4. Make sure to select **Production**, **Preview**, and **Development** for each variable

### 3. Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Deploy

#### Option A: Automatic Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Every push to `main` branch will trigger automatic deployment

#### Option B: Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Troubleshooting

### Issue: Blank Page or 404 Errors

**Solution**: Ensure `vercel.json` has proper rewrites configuration
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Issue: Environment Variables Not Working

**Solution**:
1. Make sure all env vars start with `VITE_` prefix
2. Redeploy after adding environment variables
3. Check Vercel deployment logs for errors

### Issue: Build Fails

**Solution**:
1. Run `npm run build` locally to check for errors
2. Check Node.js version compatibility (use Node 18+)
3. Clear Vercel build cache: Settings → General → Clear Build Cache

### Issue: Slow Loading

**Solution**: Already optimized! The app uses:
- localStorage caching for GitHub data
- 5-minute cache duration
- Aggressive code splitting
- README caching (1 hour)

## Performance Notes

The deployed app will:
- Load GitHub data from cache instantly (after first load)
- Refresh data in background every 5 minutes
- Cache READMEs for 1 hour
- Use Vercel Analytics for tracking

## Important Files

- `vercel.json` - Vercel configuration
- `vite.config.js` - Build optimization settings
- `.env.example` - Environment variable template
- `DEPLOYMENT.md` - This file

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Ensure GitHub token (if used) has correct permissions
4. Contact: siddhanth.kunwar2015@gmail.com
