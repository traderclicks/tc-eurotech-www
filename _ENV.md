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
| `PUBLIC_TURNSTILE_SITEKEY` | Cloudflare Turnstile site key (used by ContactForm) | Cloudflare dashboard → Turnstile → eurotech-auth widget |
| `PUBLIC_USE_CLOUDFLARE_IMAGES` | `true` on Cloudflare-proxied hostnames (production + `preview.eurotechauto.co.nz`), `false` on `*.vercel.app` previews where `/cdn-cgi/` paths don't resolve | Set per Vercel environment |

## Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PUBLIC_SITE_URL` | Public site URL for sitemap / robots | `https://eurotechauto.co.nz` |

## Vercel Project

- Project: `tc-eurotech-www` in `traderclicks` team
- Production URL: `https://eurotechauto.co.nz` (post-cutover — pending **T1017**)
- Preview branch: `dev` → `https://preview.eurotechauto.co.nz` (Cloudflare-proxied)
- Other previews: `*.vercel.app` (no Cloudflare proxy — image transforms broken there by design)

## Cloudflare

- Zone: `eurotechauto.co.nz`
- Image Transformations: enabled, origin policy "This zone only"
- SSL mode: Flexible at zone level while live Webflow remains on apex; overridden to Full for `preview.eurotechauto.co.nz` via Page Rule (cleanup tracked as **T1873** — fire at DNS cutover)

## Notes

- Auth removed entirely as of W517 — `CMS_SESSION_SECRET`, `TC_SERVICES_URL`, and the magic-link flow (previously delegated to tc-services) are no longer used. The Connector (**D549**) will reintroduce an editor identity layer when it ships.
- `cms_preview` cookie is still read by `hooks.server.ts` and `+layout.server.ts` as forward-compat for the Connector. Today nothing sets it, so preview mode is always off.
