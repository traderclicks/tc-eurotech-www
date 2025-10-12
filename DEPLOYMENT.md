# Vercel Deployment Guide

## Prerequisites

This project is configured for deployment on Vercel with the following setup:

- **Framework**: SvelteKit
- **Adapter**: @sveltejs/adapter-vercel
- **Node Runtime**: Node.js 22.x
- **Build Command**: `npm run build`

## Configuration Files

### vercel.json
Contains Vercel-specific build configuration:
- Build command
- Dev command
- Install command
- Framework detection
- Output directory

### svelte.config.js
Configured with Vercel adapter and Node.js 22.x runtime specification.

### .env.example
Documents required environment variables:
- `PUBLIC_SITE_URL`: Your production domain URL (used for SEO: robots.txt, sitemap.xml)

## Deployment Options

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub:
   ```bash
   git push origin dev  # or your deployment branch
   ```

2. Go to [Vercel Dashboard](https://vercel.com/new)

3. Click "Import Project" and select your GitHub repository

4. Configure your project:
   - **Framework Preset**: SvelteKit (auto-detected)
   - **Root Directory**: `./` (or `codebase-www/` if deploying from monorepo)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.svelte-kit` (auto-detected)

5. Add Environment Variables:
   - `PUBLIC_SITE_URL`: Your production domain (e.g., `https://eurotechauto.com`)

6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   # For preview deployment
   vercel

   # For production deployment
   vercel --prod
   ```

4. Follow the prompts to:
   - Link to existing project or create new one
   - Configure project settings
   - Add environment variables

5. Set environment variables via CLI:
   ```bash
   vercel env add PUBLIC_SITE_URL production
   # Enter your domain when prompted
   ```

## Environment Variables

Required environment variables for production:

| Variable | Description | Example |
|----------|-------------|---------|
| `PUBLIC_SITE_URL` | Production domain URL | `https://eurotechauto.com` |

Set these in:
- **Vercel Dashboard**: Project Settings → Environment Variables
- **Vercel CLI**: `vercel env add <key> <environment>`

## Post-Deployment

### Verify Deployment

1. Check that the site loads correctly
2. Test all pages:
   - Homepage (`/`)
   - Gallery (`/gallery`)
   - Theme page (`/theme`) - consider removing from robots.txt for production
3. Verify SEO files:
   - Robots.txt: `https://yourdomain.com/robots.txt`
   - Sitemap: `https://yourdomain.com/sitemap.xml`

### Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel:
   - For root domain: Add A record pointing to Vercel's IP
   - For www subdomain: Add CNAME pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (can take up to 48 hours)

### SSL Certificate

- Vercel automatically provisions SSL certificates via Let's Encrypt
- Certificate renewal is handled automatically
- HTTPS is enforced by default

## Continuous Deployment

Once connected to GitHub:
- Pushes to `main` branch trigger production deployments
- Pushes to other branches create preview deployments
- Pull requests get unique preview URLs

## Monitoring

- **Deployment logs**: Vercel Dashboard → Deployments → View logs
- **Analytics**: Enable Vercel Analytics in project settings
- **Performance**: Use Vercel Speed Insights for Core Web Vitals

## Troubleshooting

### Build Fails
- Check deployment logs in Vercel Dashboard
- Verify all dependencies are in package.json
- Ensure Node.js version compatibility (22.x)

### Environment Variables Not Working
- Verify variable names start with `PUBLIC_` for client-side access
- Check that variables are set for correct environment (production/preview/development)
- Redeploy after adding/modifying environment variables

### Pages Not Found (404)
- Ensure proper SvelteKit routing structure
- Check that adapter-vercel is properly configured
- Verify build output includes all routes

## Local Testing

Test the production build locally before deploying:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

## Rollback

To rollback to a previous deployment:
1. Go to Vercel Dashboard → Deployments
2. Find the working deployment
3. Click "..." → "Promote to Production"

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [SvelteKit Vercel Adapter](https://kit.svelte.dev/docs/adapter-vercel)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
