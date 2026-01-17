# tc-eurotech-www Environment Variables

Eurotech Auto client website with CMS.

## Required Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `SITE_PASSWORD` | Password for site preview protection | Set a secure password |
| `CMS_SESSION_SECRET` | Secret for local session tokens | Generate with `openssl rand -hex 32` |
| `TC_SERVICES_URL` | tc-services API URL | `https://tc-services-traderclicks.vercel.app` |

## Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PUBLIC_SITE_URL` | Public site URL for sitemap/robots | `https://example.com` |

## Notes

- **Auth is delegated to tc-services** - magic link tokens are generated/verified there
- **CMS_SESSION_SECRET**: Only used for local session cookies after tc-services verifies the user
- **TC_SERVICES_URL**: Points to centralized auth service
- **User whitelist**: Managed via `site-user-add eurotech <email>` CLI command (not local config)

## Auth Flow

1. User enters email → site calls tc-services `/api/auth/request`
2. tc-services checks whitelist, sends magic link email
3. User clicks link → site calls tc-services `/api/auth/verify`
4. Site creates local session cookie with CMS_SESSION_SECRET

## Vercel Project

- Project: `tc-eurotech-www` in traderclicks team
- Production URL: `https://eurotechauto.co.nz`
