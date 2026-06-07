<!-- Enhanced SEO Meta Component -->
<script lang="ts">
  export let title = 'Eurotech Auto Repair Centre - European Vehicle Specialists Auckland';
  export let description = 'Factory-authorized Jaguar, Land Rover & BMW specialists. Expert collision repairs, panel beating & paint work in Mount Wellington, Auckland.';
  export let keywords = '';
  export let canonical: string | undefined = undefined;
  export let ogImage = '/og-image.png';
  export let ogType: 'website' | 'article' | 'product' | 'profile' = 'website';
  export let twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player' = 'summary_large_image';
  export let noindex = false;
  export let nofollow = false;

  // Article-specific props
  export let author = '';
  export let publishedTime = '';
  export let modifiedTime = '';
  export let section = '';
  export let tags: string[] = [];

  // Additional SEO props
  export let locale = 'en_NZ';
  export let siteName = 'Eurotech Auto Repair';
  export let twitterSite = '';
  export let twitterCreator = '';

  // Construct full title — append brand unless it's the default or already contains it
  const defaultTitle = 'Eurotech Auto Repair Centre - European Vehicle Specialists Auckland';
  const brandSuffix = 'Eurotech Auto Repair';
  const fullTitle = title === defaultTitle || title.includes(brandSuffix) ? title : `${title} | ${brandSuffix}`;

  // Get current URL for canonical and OG tags
  import { page } from '$app/stores';
  $: currentUrl = $page.url.href;
  $: canonicalUrl = canonical || currentUrl;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="title" content={fullTitle} />
  <meta name="description" content={description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}

  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalUrl} />

  <!-- Robots Meta -->
  {#if noindex || nofollow}
    <meta name="robots" content="{noindex ? 'noindex' : 'index'},{nofollow ? 'nofollow' : 'follow'}" />
  {:else}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  {/if}

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={ogType} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={fullTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${$page.url.origin}${ogImage}`} />
  <meta property="og:image:alt" content={title} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:locale" content={locale} />

  <!-- Article Metadata -->
  {#if ogType === 'article'}
    {#if author}
      <meta property="article:author" content={author} />
    {/if}
    {#if publishedTime}
      <meta property="article:published_time" content={publishedTime} />
    {/if}
    {#if modifiedTime}
      <meta property="article:modified_time" content={modifiedTime} />
    {/if}
    {#if section}
      <meta property="article:section" content={section} />
    {/if}
    {#each tags as tag}
      <meta property="article:tag" content={tag} />
    {/each}
  {/if}

  <!-- Twitter -->
  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={fullTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${$page.url.origin}${ogImage}`} />
  {#if twitterSite}
    <meta name="twitter:site" content={twitterSite} />
  {/if}
  {#if twitterCreator}
    <meta name="twitter:creator" content={twitterCreator} />
  {/if}

  <!-- Additional Meta Tags -->
  <meta name="author" content={author || siteName} />
  <meta name="generator" content="SvelteKit" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="alternate icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <!-- Theme Color -->
  <meta name="theme-color" content="#3B82F6" />
</svelte:head>