<script lang="ts">
  import { dev } from '$app/environment';

  /**
   * Cloudflare-optimized responsive image component
   *
   * Automatically serves:
   * - AVIF format to Chrome/Edge (50% smaller)
   * - WebP to Safari (30% smaller)
   * - JPEG fallback to older browsers
   *
   * Features:
   * - Responsive srcset with 3 breakpoints
   * - Native lazy loading
   * - EXIF stripped for privacy
   * - Free tier: 5,000 transformations/month
   *
   * @example
   * <CloudflareImage
   *   src="/images/hero.jpg"
   *   alt="Workshop interior"
   *   width={1920}
   *   height={1080}
   *   eager
   * />
   */

  export let src: string;
  export let alt: string;
  export let width: number;
  export let height: number;
  export let eager = false;
  export let quality = 85;
  export let fit: 'scale-down' | 'cover' | 'contain' | 'crop' = 'scale-down';

  // Generate responsive sizes (0.5x, 1x, 1.5x)
  const sizes = [
    Math.floor(width * 0.5),
    width,
    Math.floor(width * 1.5)
  ];

  // Build Cloudflare transformation URL
  function buildUrl(w: number): string {
    if (dev) {
      // Development: serve originals directly (no Cloudflare transforms on localhost)
      return src;
    }
    // Production: use Cloudflare Image Resizing
    return `/cdn-cgi/image/width=${w},fit=${fit},quality=${quality},format=auto${src}`;
  }

  // Build srcset string
  $: srcset = dev
    ? undefined  // Skip srcset in dev (serves original only)
    : sizes.map(w => `${buildUrl(w)} ${w}w`).join(', ');

  // Build sizes attribute (responsive breakpoints)
  $: sizesAttr = `(max-width: 768px) 100vw, ${width}px`;
</script>

<img
  src={buildUrl(width)}
  {srcset}
  sizes={sizesAttr}
  {alt}
  {width}
  {height}
  loading={eager ? "eager" : "lazy"}
  decoding="async"
/>

<style>
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
</style>
