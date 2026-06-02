<script lang="ts">
  import { dev } from '$app/environment';
  import { env } from '$env/dynamic/public';

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
   * - Skeleton shimmer placeholder until the image fires `load`
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

  let loaded = false;

  // Generate responsive sizes (0.5x, 1x, 1.5x)
  const sizes = [
    Math.floor(width * 0.5),
    width,
    Math.floor(width * 1.5)
  ];

  // Cloudflare Image Resizing only works when the domain is proxied through Cloudflare.
  // Defaults to enabled — set PUBLIC_USE_CLOUDFLARE_IMAGES=false for environments
  // where the /cdn-cgi/ path doesn't resolve (e.g. *.vercel.app preview URLs).
  const useCloudflareTransform = env.PUBLIC_USE_CLOUDFLARE_IMAGES?.trim() !== 'false';

  // Build Cloudflare transformation URL
  function buildUrl(w: number): string {
    if (dev || !useCloudflareTransform) {
      // Development or Cloudflare disabled: serve originals directly
      return src;
    }
    // Production with Cloudflare enabled: use Cloudflare Image Resizing
    return `/cdn-cgi/image/width=${w},fit=${fit},quality=${quality},format=auto${src}`;
  }

  // Build srcset string
  $: srcset = (dev || !useCloudflareTransform)
    ? undefined  // Skip srcset in dev or when Cloudflare is disabled
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
  class:loaded
  on:load={() => (loaded = true)}
/>

<style>
  img {
    max-width: 100%;
    height: auto;
    display: block;
    /* Skeleton shimmer while the bytes arrive. Disappears the moment the
       img fires its `load` event, so there's no flash for cache hits. */
    background-color: var(--bg-content, #f3f4f6);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.55) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-position: 100% 0;
    animation: img-shimmer 1.4s ease-in-out infinite;
  }

  img.loaded {
    background: none;
    animation: none;
  }

  @keyframes img-shimmer {
    0%   { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }

  /* Respect users who don't want motion */
  @media (prefers-reduced-motion: reduce) {
    img {
      animation: none;
      background-image: none;
    }
  }
</style>
