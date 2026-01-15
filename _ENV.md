# tc-eurotech-www Environment Variables

Eurotech Auto client website with CMS.

## Required Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `SITE_PASSWORD` | Password for site preview protection | Set a secure password |
| `CMS_JWT_SECRET` | Secret for CMS authentication tokens | Generate with `openssl rand -hex 32` |
| `ORIGIN` | Site origin for magic links | e.g. `https://eurotechauto.co.nz` |
| `TC_SERVICES_URL` | tc-services API URL | `https://tc-services-traderclicks.vercel.app` |
| `TC_SERVICES_SECRET` | Shared secret for tc-services auth | Must match tc-services TC_SERVICES_SECRET |

## Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PUBLIC_SITE_URL` | Public site URL for sitemap/robots | `https://example.com` |

## Notes

- **TC_SERVICES_SECRET**: Must match the value in tc-services Vercel project
- **CMS_JWT_SECRET**: Used for magic link token generation and verification
- **ORIGIN**: Required for magic link URLs to work correctly in production

## Vercel Project

- Project: `client-eurotechauto-svelte` in traderclicks team
- Production URL: `https://eurotechauto.co.nz`
