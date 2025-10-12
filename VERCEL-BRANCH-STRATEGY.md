# Vercel Branch Strategy Configuration

This document explains how to configure Vercel to follow the portfolio-wide branch strategy.

## Branch Strategy Overview

```
WB-* (Local only)     → No Vercel deployment
  ↓ merge
dev (Staging)         → staging.yourdomain.com
  ↓ merge
main (Production)     → yourdomain.com
```

## Required Vercel Configuration

### 1. Production Branch (Dashboard Setting)

**Location**: Vercel Dashboard → Project Settings → Git → Production Branch

**Setting**: `main`

**What it does**: Only the `main` branch deploys to your production domain.

**Scope**: **PROJECT-LEVEL** (affects only this project)

---

### 2. Preview Deployments for dev Branch

**Location**: Vercel Dashboard → Project Settings → Git → Deploy Previews

**Settings**:
- ✅ Enable automatic deployments from Git
- Production Branch: `main`
- Preview deployments: Enable for `dev` branch only

**What it does**: The `dev` branch gets its own preview URL that you can map to a staging subdomain.

**Scope**: **PROJECT-LEVEL** (affects only this project)

---

### 3. Ignore WB-* Branches (Ignored Build Step)

**Location**: Vercel Dashboard → Project Settings → Git → Ignored Build Step

**Command to add**:
```bash
if [[ "$VERCEL_GIT_COMMIT_REF" =~ ^WB- ]] ; then exit 0; else exit 1; fi
```

**What it does**:
- Checks if the branch name starts with "WB-"
- If yes: exits 0 (build cancelled, no deployment created)
- If no: exits 1 (proceeds with normal build)

**Alternative Method** (via vercel.json):
```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "dev": true
    }
  }
}
```
This whitelists only `main` and `dev` for deployments.

**Scope**: **PROJECT-LEVEL** (affects only this project)

**Why it's project-level**:
- Each Vercel project has independent Git settings
- You might have different branch strategies for different projects
- Settings are stored per project, not account-wide
- This allows flexibility (e.g., some projects might use `staging` instead of `dev`)

---

## Domain Configuration

### Production (main branch)

**Recommended Setup**:
- Primary domain: `eurotechauto.com` (or client's actual domain)
- Vercel subdomain: `client-eurotechauto-svelte.vercel.app`

**Steps**:
1. Go to Project Settings → Domains
2. Add custom domain
3. Configure DNS records as instructed
4. SSL certificate auto-generated

### Staging (dev branch)

**Recommended Setup**:
- Staging subdomain: `staging.eurotechauto.com`
- Or use Vercel preview URL: `client-eurotechauto-svelte-git-dev-traderclicks.vercel.app`

**Steps**:
1. Deploy `dev` branch once
2. Find the preview URL in deployments
3. Go to Project Settings → Domains
4. Add `staging.eurotechauto.com` and assign it to the `dev` branch
5. Configure DNS CNAME: `staging.eurotechauto.com` → `cname.vercel-dns.com`

---

## Environment Variables by Branch

Configure different environment variables for each deployment context.

**Location**: Vercel Dashboard → Project Settings → Environment Variables

### Production (main)
```bash
PUBLIC_SITE_URL=https://eurotechauto.com
# Add other production-specific variables
```
**Apply to**: Production

### Staging (dev)
```bash
PUBLIC_SITE_URL=https://staging.eurotechauto.com
# Add other staging-specific variables
```
**Apply to**: Preview (dev branch only)

---

## Current Configuration Status

- [x] Vercel project created: `client-eurotechauto-svelte`
- [x] Node.js 22.x runtime configured
- [x] vercel.json with branch whitelist
- [ ] **TODO**: Set production branch to `main` in dashboard
- [ ] **TODO**: Configure ignored build step for WB-* branches
- [ ] **TODO**: Set up staging subdomain for `dev` branch
- [ ] **TODO**: Configure environment variables per branch

---

## How to Apply These Settings

### Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/traderclicks/client-eurotechauto-svelte/settings/git

2. **Set Production Branch**:
   - Production Branch: `main`
   - Click "Save"

3. **Configure Ignored Build Step**:
   - Scroll to "Ignored Build Step"
   - Add: `if [[ "$VERCEL_GIT_COMMIT_REF" =~ ^WB- ]] ; then exit 0; else exit 1; fi`
   - Click "Save"

4. **Set up Domains**:
   - Go to Settings → Domains
   - Add production domain
   - Add staging domain and assign to `dev` branch

5. **Configure Environment Variables**:
   - Go to Settings → Environment Variables
   - Add `PUBLIC_SITE_URL` for Production and Preview (dev)
   - Add any other environment variables needed

### Testing the Configuration

1. **Push to WB-* branch**:
   ```bash
   git push origin WB-2025-10-12-003-vercel-deployment
   ```
   **Expected**: No deployment triggered

2. **Merge to dev and push**:
   ```bash
   git checkout dev
   git merge WB-2025-10-12-003-vercel-deployment
   git push origin dev
   ```
   **Expected**: Preview deployment to staging URL

3. **Merge to main and push**:
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```
   **Expected**: Production deployment to main domain

---

## Why This Matters

**Safety**: WB-* branches are for AI development and shouldn't be accessible to the public
**Cost Control**: Only 2 active deployments (production + staging) instead of unlimited previews
**Clarity**: staging.domain.com vs domain.com makes it obvious which environment you're testing
**Revenue Protection**: Prevents accidental AI deployments from reaching TraderClicks clients

---

## Scope Summary

| Setting | Scope | Set Where | Applies To |
|---------|-------|-----------|------------|
| Production Branch | **Project-level** | Dashboard → Git | This project only |
| Ignored Build Step | **Project-level** | Dashboard → Git or vercel.json | This project only |
| Domain Configuration | **Project-level** | Dashboard → Domains | This project only |
| Environment Variables | **Project-level** | Dashboard → Env Variables | This project only |
| Git Integration | **Account-level** | Account Settings → Git | All projects |
| Team Access | **Account-level** | Account Settings → Team | All projects |

**Bottom line**: All deployment and branch settings are **PROJECT-SPECIFIC**. You configure them once per project, and they don't affect other projects in your account.

---

## References

- Portfolio Strategy: `/workspace/_common/news/2025-01-09-branch-strategy-vercel.md`
- Vercel Git Docs: https://vercel.com/docs/git
- Vercel Environment Variables: https://vercel.com/docs/environment-variables
