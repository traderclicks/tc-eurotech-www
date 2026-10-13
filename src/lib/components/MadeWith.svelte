<!--
  MadeWith — TraderClicks "Made with ♥" footer credit (W867).
  Master copy lives in tc-eurotech-www; every tc-*-www site carries a byte-identical copy.
  Do not edit a site's copy: change the master and run _admin/scripts/made-with-sync.sh.

  Usage: <MadeWith slug="jimmeates" bg="dark" />
    slug — the site's tc-<slug>-www name; the link goes to traderclicks.nz/client-story/<slug>
    bg   — "light" (dark ink), "dark" (light ink) or "theme" (the surrounding text colour)

  Tune per site with CSS variables on any ancestor, e.g. .footer { --mw-bottom: 0.5; }
    --mw-colour       credit colour (overrides bg)
    --mw-top          top (humps) opacity          default 0.75
    --mw-bottom       bottom (point) opacity       default 0.45
    --mw-hover-shift  added to both on hover       default 0.25
    --mw-text         "Made with" resting opacity  default 0.8
    --mw-size         heart width                  default 16px
-->
<script lang="ts">
  let {
    slug,
    bg = 'theme',
    class: className = ''
  }: { slug: string; bg?: 'light' | 'dark' | 'theme'; class?: string } = $props();
</script>

<a
  class="made-with made-with--{bg} {className}"
  href="https://www.traderclicks.nz/client-story/{slug}"
  rel="noopener"
  target="_blank"
  title="TraderClicks | Branding, Marketing, Websites"
>
  <span class="made-with-text">Made with</span>
  <svg class="made-with-heart" viewBox="0 11.6 496 472" aria-hidden="true" focusable="false">
    <path
      class="made-with-top"
      d="M8.788,223.029L27.194,252.516C52.521,213.347 102.218,186.495 159.2,186.495C193.6,186.495 224,205.8 248,222.245C272,205.085 302.4,186.495 336.4,186.495C393.207,186.495 442.778,213.168 467.997,252.143L486.394,222.282C492.176,205.649 495.2,188 495.2,170.003C496,82.803 424.8,11.603 336.8,11.603C302.4,11.603 272,32.403 248,51.603C224,33.203 193.6,11.603 159.2,11.603C71.2,11.603 0,82.803 0,170.803C0,188.781 3.018,206.412 8.788,223.029Z"
    />
    <path
      class="made-with-bottom"
      d="M27.194,252.516C52.521,213.347 102.218,186.495 159.2,186.495C193.6,186.495 224,205.8 248,222.245C272,205.085 302.4,186.495 336.4,186.495C393.207,186.495 442.778,213.168 467.997,252.143L449.6,282.003C445.6,285.203 441.6,289.203 437.6,292.403L257.6,472.403L248,483.603L236,471.603L57.6,292.403C52.8,289.203 49.6,286.003 45.6,282.003Z"
    />
  </svg>
  <span class="made-with-sr">by TraderClicks</span>
</a>

<style>
  .made-with {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    color: var(--mw-colour, currentColor);
    text-decoration: none;
    white-space: nowrap;
  }
  .made-with--light {
    color: var(--mw-colour, rgba(0, 0, 0, 0.6));
  }
  .made-with--dark {
    color: var(--mw-colour, rgba(255, 255, 255, 0.7));
  }
  /* The credit owns its hover: site-wide a:hover colour/underline rules don't apply */
  .made-with:hover,
  .made-with:focus-visible {
    color: var(--mw-colour, currentColor);
    text-decoration: none;
  }
  .made-with--light:hover,
  .made-with--light:focus-visible {
    color: var(--mw-colour, rgba(0, 0, 0, 0.6));
  }
  .made-with--dark:hover,
  .made-with--dark:focus-visible {
    color: var(--mw-colour, rgba(255, 255, 255, 0.7));
  }

  .made-with-text {
    opacity: var(--mw-text, 0.8);
    transition: opacity 0.2s ease;
  }
  .made-with-heart {
    width: var(--mw-size, 16px);
    height: auto;
    aspect-ratio: 496 / 472;
    flex: none;
    display: block;
  }
  .made-with-top,
  .made-with-bottom {
    fill: currentColor;
    transition: opacity 0.2s ease;
  }
  .made-with-top {
    opacity: var(--mw-top, 0.75);
  }
  .made-with-bottom {
    opacity: var(--mw-bottom, 0.45);
  }
  .made-with:hover .made-with-text,
  .made-with:focus-visible .made-with-text {
    opacity: 1;
  }
  .made-with:hover .made-with-top,
  .made-with:focus-visible .made-with-top {
    opacity: calc(var(--mw-top, 0.75) + var(--mw-hover-shift, 0.25));
  }
  .made-with:hover .made-with-bottom,
  .made-with:focus-visible .made-with-bottom {
    opacity: calc(var(--mw-bottom, 0.45) + var(--mw-hover-shift, 0.25));
  }

  .made-with-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .made-with-text,
    .made-with-top,
    .made-with-bottom {
      transition: none;
    }
  }
</style>
