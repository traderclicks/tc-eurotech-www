# tc-eurotech-www Environment Variables

Eurotech Auto client website. Public read-only content-consumer per **D658**.

## CMS

- Storage: filesystem JSON under `content/` (no DB)
  - Reusable data: `content/{reviews,insurers,faqs,store,overlays,meta,slots,text,media}/live.json`
  - Static pages: `content/pages/<slug>.json` via `src/lib/cms/pages.ts`
  - Dynamic pages: `content/brand-pages/<slug>.json` via `src/lib/cms/brand-pages.ts`
  - Blog: `content/blog/<slug>.json`
- Token substitution: `{businessName}`, `{phone}`, `{email}`, etc. via `src/lib/cms/interpolate.ts`
- No per-site `/admin` UI — stripped 2026-05-31 per **W517** (see **D670**). Editor surface returns when the Controlla Connector ships (**D549**).

## Required Variables

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `PUBLIC_USE_CLOUDFLARE_IMAGES` | `true` on Cloudflare-proxied hostnames (production + `preview.eurotechauto.co.nz`), `false` on `*.vercel.app` previews where `/cdn-cgi/` paths don't resolve | Set per Vercel environment |

## Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PUBLIC_SITE_URL` | Public site URL for sitemap / robots | `https://eurotechauto.co.nz` |

## Vercel Project

- Project: `tc-eurotech-www` in `traderclicks` team
- Production URL: `https://eurotechauto.co.nz` (apex 301→`www` via Cloudflare; `www` = Vercel Production. DNS cutover complete.)
- Preview: **disabled** as of 2026-06-23 — `dev` auto-deploys off (`vercel.json` `deploymentEnabled.dev=false`) and the `preview.eurotechauto.co.nz` domain deleted from Vercel. It was a public, indexable duplicate of prod. See **R641** for status + how to restore.
- Other previews: `*.vercel.app` (no Cloudflare proxy — image transforms broken there by design)

## Cloudflare

- Zone: `eurotechauto.co.nz`
- Image Transformations: enabled, origin policy "This zone only"
- SSL mode: **Full** (zone-wide, set at DNS cutover — T1873 done; the old preview-only "SSL Full" Page Rule was deleted)

## Notes

- Auth removed entirely as of W517 — `CMS_SESSION_SECRET`, `TC_SERVICES_URL`, and the magic-link flow (previously delegated to tc-services) are no longer used.
- The Controlla Connector (**D549**) will reintroduce an editor identity layer + preview mode when it ships. Until then, the loader signatures `getXWithPreview()` in `src/lib/cms/*.ts` are the kept integration surface — they're all called with `false` today. See **D671** for the rationale on stripping the cookie hooks pre-Connector.
