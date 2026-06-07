# Testing brief — tc-eurotech-www pre-cutover verification

## Project context

- **Repo path**: `/Users/duncanmcgill/workspace/tc-eurotech-www`
- **Active branch**: `dev` (no in-flight branches)
- **Production hostname**: `eurotechauto.co.nz` (currently serves the old Webflow site — DNS cutover not yet done)
- **Preview hostname**: `preview.eurotechauto.co.nz` (the new SvelteKit site, served via Vercel behind Cloudflare — **this is what you test**)
- **Stack**: SvelteKit + TypeScript + Vercel adapter, Cloudflare in front (image transforms, WAF), Cognito Forms for contact, Turnstile for anti-spam, GA4 for analytics

## What to do

**Working directory**: `cd /Users/duncanmcgill/workspace/tc-eurotech-www` before running anything. Phases 1, 7, 8, and 12 use repo-relative commands (`npm`, `git`, `git grep`, `python3 -c "...open('content/pages/...')"`). Phases 2–6 and 9–11 are pure HTTP and would work from anywhere — but keep cwd consistent for simplicity.

**Read-only guarantee**: this brief operates on the existing repo **in place** (no worktree). It is *deliberately read-only* — every command is `curl`, `grep`, `git fetch`, `git grep`, or `npm run check`/`build` (which only writes to the gitignored `.svelte-kit/output/`). **Do not commit, edit, or otherwise mutate any tracked file.** If you observe a regression and feel tempted to fix it, capture it in the report and stop.

Run all checks against `https://preview.eurotechauto.co.nz`. Treat each check as pass/fail/n-a, collect findings in a single report at the end, and DO NOT fix anything — observation only. Most checks are AI-runnable via `curl`, `dig`, `gh`, `python3`. Visual rendering is human-only (per RULE #10 — you can't see rendered output, only report what's in code/responses).

## Out of scope (don't flag these)

- The production hostname currently serving old Webflow → expected until DNS cutover
- `content/insurers/live.json` is a top-level array — has no `dateCreated`/`dateModified` (deliberately skipped)
- `text/live.json` has orphan `home-hero-headline` and `home-hero-subheadline` keys (unused, retained, deletion is a future task)
- Hero CSS-background images bypass Cloudflare transforms (known, tracked as W534)
- The 1.2 MB origin homepage hero image (same — W534)
- T1885 (tc-traderclicks-www admin strip) is a separate project — RULE #7
- Cookie consent banner (NZ doesn't require one; decision pending if client wants)

## Phase 1 — Local build health

```bash
cd /Users/duncanmcgill/workspace/tc-eurotech-www
git fetch origin --quiet && git status -s     # expect clean
git log --oneline -5                          # confirm latest commits are W43/W550 work
npm run check 2>&1 | tail -3                  # expect 0 errors
npm run build 2>&1 | tail -5                  # expect "✓ done"
npm run check:images 2>&1 | tail -10          # expect only the known Footer tc-heart.svg warning
gh pr list --state open --base dev            # expect empty
```

## Phase 2 — Route availability (all should return 200)

```bash
BASE="https://preview.eurotechauto.co.nz"
for r in / /about /blog /insurance /gallery /privacy /terms /jaguar /bmw /mini /land-rover /range-rover; do
  printf "  %-25s %s\n" "$r" "$(curl -sI -o /dev/null -w '%{http_code}' $BASE$r)"
done
# All blog post slugs:
for f in content/blog/*.json; do
  slug=$(basename "$f" .json)
  printf "  /blog/%-45s %s\n" "$slug" "$(curl -sI -o /dev/null -w '%{http_code}' $BASE/blog/$slug)"
done
# 404 behaviour:
curl -sI -o /dev/null -w "/nonexistent → %{http_code}\n" "$BASE/nonexistent-page"
curl -sI -o /dev/null -w "/blog/nonexistent → %{http_code}\n" "$BASE/blog/nonexistent"
curl -sI -o /dev/null -w "/not-a-brand → %{http_code}\n" "$BASE/not-a-brand"
```

## Phase 3 — SEO

### 3a. H1 on every key page (must be exactly 1)

```bash
for r in / /about /blog /insurance /gallery /privacy /terms /jaguar /bmw /mini /land-rover /range-rover /blog/glasurit-100-line-paint-system; do
  count=$(curl -s "$BASE$r" | grep -oE '<h1[^>]*>' | wc -l | tr -d ' ')
  printf "  %-50s H1=%s\n" "$r" "$count"
done
# Expect: every route shows H1=1. If 0 on /, /about, brand pages → REGRESSION (was fixed in PR #20, T1926).
```

### 3b. Meta tags

```bash
for r in / /about /blog /insurance /jaguar /bmw /blog/glasurit-100-line-paint-system; do
  p=$(curl -s "$BASE$r")
  t=$(echo "$p" | grep -oE '<title>[^<]*</title>' | head -1 | sed 's/<[^>]*>//g')
  d=$(echo "$p" | grep -oE '<meta name="description" content="[^"]*"' | head -1 | sed -E 's/.*content="([^"]*)".*/\1/')
  c=$(echo "$p" | grep -oE '<link rel="canonical" href="[^"]*"' | head -1)
  echo "--- $r ---"
  echo "  title: $t (${#t} chars)"
  echo "  desc : ${d:0:80}... (${#d} chars)"
  echo "  $c"
done
# Expect: every title unique, non-empty, ~37-91 chars. Description present, ~84-160 chars.
# Canonical present, self-referential.
```

### 3c. Structured data (JSON-LD)

```bash
# LocalBusiness should appear on EVERY route (site-wide via +layout.svelte)
for r in / /about /blog /insurance /jaguar /privacy /terms /blog/glasurit-100-line-paint-system; do
  c=$(curl -s "$BASE$r" | grep -c '"@type":"LocalBusiness"')
  printf "  %-50s LocalBusiness=%s\n" "$r" "$c"
done
# Expect: 1 per route. If 0 anywhere → REGRESSION (T1931).

# BreadcrumbList on brand + blog post routes
for r in /jaguar /bmw /mini /land-rover /range-rover /blog/glasurit-100-line-paint-system /blog/common-bmw-repair-issues; do
  c=$(curl -s "$BASE$r" | grep -c '"@type":"BreadcrumbList"')
  printf "  %-50s BreadcrumbList=%s\n" "$r" "$c"
done
# Expect: 1 per route. (T1932)

# Article schema on blog posts
curl -s "$BASE/blog/glasurit-100-line-paint-system" | grep -c '"@type":"Article"'
# Expect: 1

# FAQ schema on /, /jaguar, /insurance
for r in / /jaguar /insurance; do
  c=$(curl -s "$BASE$r" | grep -c '"@type":"FAQPage"')
  printf "  %-15s FAQPage=%s\n" "$r" "$c"
done
```

### 3d. robots.txt + sitemap.xml

```bash
curl -sI -o /dev/null -w "  /robots.txt: %{http_code}\n" "$BASE/robots.txt"
curl -sI -o /dev/null -w "  /sitemap.xml: %{http_code}\n" "$BASE/sitemap.xml"
# Distinct lastmod values (should be more than 1 — earlier was lying with render-time-all-the-same)
curl -s "$BASE/sitemap.xml" | grep -oE '<lastmod>[^<]+</lastmod>' | sort -u | wc -l
# Expect: > 1 (was 1 with the lying impl; now expect ~6+ distinct values from real per-file dateModified)
```

### 3e. Lang attribute on html

```bash
curl -s "$BASE/" | grep -oE '<html[^>]*lang="[^"]*"'
# Expect: lang="en-NZ" (was "en", changed in PR #21 / T1930)
```

## Phase 4 — Security headers

```bash
curl -sI "$BASE/" | grep -iE "strict-transport|x-content-type|x-frame|referrer-policy|content-security|permissions-policy"
# Expect:
#   strict-transport-security: max-age=63072000; includeSubDomains; preload
#   x-content-type-options: nosniff
#   x-frame-options: SAMEORIGIN
#   referrer-policy: strict-origin-when-cross-origin
# CSP + Permissions-Policy intentionally absent (separate followups).
```

## Phase 5 — Image pipeline (Cloudflare transforms)

```bash
# AVIF transform should be ~10x smaller than origin
echo "Origin:"
curl -sI "$BASE/images/punchy.jpg" | grep -i content-length
echo "AVIF transform:"
curl -sI -H "Accept: image/avif" "$BASE/cdn-cgi/image/width=400,format=auto/images/punchy.jpg" | grep -iE "content-type|content-length"
# Expect: content-type: image/avif, content-length around 20-30 KB

# WebP fallback
curl -sI -H "Accept: image/webp" "$BASE/cdn-cgi/image/width=400,format=auto/images/punchy.jpg" | grep -i content-type
# Expect: content-type: image/webp

# 404 on nonexistent transform target (not 5xx)
curl -sI -o /dev/null -w "  transform 404: %{http_code}\n" "$BASE/cdn-cgi/image/width=400,format=auto/images/does-not-exist.jpg"
```

## Phase 6 — Analytics

```bash
# GA4 measurement ID should appear in every page's <head>
for r in / /about /blog /jaguar; do
  c=$(curl -s "$BASE$r" | grep -c "G-4J1YZ423N3")
  printf "  %-15s GA4 refs=%s\n" "$r" "$c"
done
# Expect: at least 2 per page (script src + gtag config call)
```

## Phase 7 — CMS dynamic-data verification (W550 work)

Each page now reads from `content/pages/*.json` (or `content/text/live.json` for the BrandStrip). Verify the JSON values actually drive the rendered HTML.

```bash
# Diff what's in JSON vs what's in HTML
for slug in home blog insurance gallery about privacy terms; do
  json_title=$(python3 -c "import json; d=json.load(open('content/pages/$slug.json')); print(d.get('meta',{}).get('title',''))" 2>/dev/null)
  echo "  $slug → JSON title: $json_title"
done
# Cross-check: the rendered <title> on each route should match (with " | Eurotech Auto Repair" suffix on most).
```

### Specific W550 spot-checks
- `/` hero h1 reads "Eurotech Auto Repair Centre" (from `content/pages/home.json` hero.title)
- `/` services grid renders 6 cards (Jaguar, Land Rover, Range Rover, BMW, Mini, Insurance Claims) — from `content/pages/home.json` services array
- `/` "From the Workshop" section subtitle reads "Updates and articles from your European vehicle repair specialist" — from `pageContent.blogSectionSubtitle`
- `/blog` h1 reads "From the Workshop", subtitle "Updates from the workshop and industry news"
- `/insurance` h1 reads "Insurance Claims", intro paragraph (long, starts "Had an accident?")
- `/gallery` h1 reads "Eurotech Gallery", subtitle "See our team and facility in action"
- BrandStrip (visible on `/blog` and `/blog/<slug>`, top-right): tagline reads "Expert & Factory Authorised European Auto Repair Specialists"

## Phase 8 — Business-identity from store JSON

These should match `content/store/live.json` keys:

```bash
curl -s "$BASE/" | python3 -c "
import sys, re, json
html = sys.stdin.read()
for m in re.finditer(r'<script type=\"application/ld\\+json\">([^<]+)</script>', html):
    try:
        d = json.loads(m.group(1))
        if d.get('@type') == 'LocalBusiness':
            print('  name:', d.get('name'))
            print('  alternateName:', d.get('alternateName'))
            print('  foundingDate:', d.get('foundingDate'))
            print('  description:', d.get('description', '')[:80])
            print('  geo:', d.get('geo'))
            print('  openingHours:', d.get('openingHoursSpecification'))
            print('  rating:', d.get('aggregateRating'))
            break
    except: pass
"
```

## Phase 9 — Form integrations (browser)

- Open `/` → click "Get a Repair Quote" → Cognito modal opens with form
- Open `/insurance` → click "Get a Repair Quote" → same modal
- Click "Insurance Contacts" → insurer list modal, 14 insurers, top 5 = Provident, MAS, AA, Vero, QBE
- Header → "Mt Wellington, Auckland" → address modal opens
- T1019 — synthetic Cognito Forms submission, confirm receipt at `info@eurotechauto.co.nz`

## Phase 10 — Mobile + responsive (browser)

- Open preview on a real phone or DevTools at 375px width
- BrandStrip hides under 768px
- Service grid stacks 1-column on mobile
- Hero text legible over carousel
- Menu opens/closes; active item has gold left-strip + bold
- Insurance Claim asterisk shows gold next to the menu item

## Phase 11 — Performance baseline

```bash
curl -s -H "Accept-Encoding: br" "$BASE/" -o /dev/null -w "  homepage br: %{size_download} bytes\n"
curl -sI "$BASE/images/DSC00748.jpg" | grep -i content-length
# Hero is ~1.2MB — known W534 issue, not a regression.
# Lighthouse (mobile) baseline target: SEO 95+, A11y 90+, Best Practices 90+, Performance 60-80.
```

## Phase 12 — Cross-cutting sanity

```bash
# No stale "Workshop Updates" anywhere
git grep -i "workshop updates" -- src/ content/
# Expect: empty

# No hardcoded mentions of removed dirs
git grep -E "(admin|theme|cms_preview)" src/ content/ 2>/dev/null | grep -v "cms_preview cookie was dead" | head -5
# Expect: only deliberate doc references in comments

# No lorem ipsum or TODO leaking to shipped pages
for r in / /about /blog /insurance /jaguar /bmw; do
  curl -s "$BASE$r" | grep -iE "lorem|placeholder|\\bTODO\\b|FIXME" | head -2
done
```

## What constitutes PASS

For every phase, expect the listed outcomes. Anything that diverges is a finding. Compile into a single report with:

- Per-phase verdict (PASS / FAIL / partial)
- Specific failures with the route + observed vs expected
- Any concerns the brief didn't anticipate

**Do not fix anything.** Report only.
