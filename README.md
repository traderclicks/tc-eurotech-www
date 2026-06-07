# tc-eurotech-www

Eurotech Auto Repair Centre client website — public content-consumer per **D658**.

## Quick links

- **Site config + environment:** [`_ENV.md`](./_ENV.md)
- **Universal workspace rules:** [`CLAUDE.md`](./CLAUDE.md) (symlinked to `_common/CLAUDE.md`)
- **Current state + open work:** `cc W43` (paused — awaiting DNS cutover)
- **Architectural context:** **D549** (Connector), **D658** (content-consumer model), **D670** (admin strip refines D658)

## Stack

- SvelteKit + TypeScript, Vercel adapter
- Content layer: filesystem JSON under `content/`
- Loaders: `src/lib/cms/` (one per content type — `pages.ts`, `brand-pages.ts`, `reviews.ts`, `insurers.ts`, `faqs.ts`, etc.)
- Images: Cloudflare Image Transformations via `src/lib/components/CloudflareImage.svelte`

## Run locally

```bash
cc env             # picks up port 3021 from starto.toml
# or:
npm install
npm run dev -- --port 3021
```

## Common commands

```bash
npm run check      # svelte-check (CI tolerates 3 pre-existing errors in CognitoForm.svelte — T1886)
npm run build      # production build via Vercel adapter
npm run check:images  # pre-deploy image validation (uses image-check.config.json)
```

## Editing content

Edit JSON files under `content/` and PR to `dev`. Token substitution (`{businessName}`, `{phone}`, etc.) is filled at render time from `content/store/live.json` via `src/lib/cms/interpolate.ts`.

Per-site `/admin` UI was removed 2026-05-31 (**W517**, refines **D658**). Editor surface will return when the Controlla Connector (**D549**) ships.
