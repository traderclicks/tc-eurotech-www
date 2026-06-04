<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import VideoEmbed from '$lib/components/VideoEmbed.svelte';
  import BrandStrip from '$lib/components/BrandStrip.svelte';
  import { generateArticleSchema } from '$lib/utils/structuredData';
  import { page } from '$app/stores';

  export let data;

  $: post = data.post;
  $: formattedDate = new Date(post.publishedAt).toLocaleDateString('en-NZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  $: articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.excerpt,
    author: 'Eurotech Auto Repair',
    datePublished: post.publishedAt,
    image: post.featuredImage?.url ?? data.defaultPostImage,
    url: $page.url.href
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(articleSchema)}</script>`}
</svelte:head>

<Meta
  title={post.title}
  description={post.excerpt}
  ogType="article"
  publishedTime={post.publishedAt}
  section={post.category}
  tags={post.tags}
  ogImage={post.featuredImage?.url ?? data.defaultPostImage}
/>

<article class="post">
  <div class="post-hero">
    <img src={post.featuredImage?.url ?? data.defaultPostImage} alt={post.featuredImage?.alt ?? post.title} />
    <div class="hero-title-wrap">
      <div class="hero-title-inner">
        <a href="/blog" class="hero-back-link"><span class="back-arrow">&larr;</span> <span class="back-text">Latest posts</span></a>
        <h1 class="hero-title">{post.title}</h1>
      </div>
    </div>
    {#if post.featuredImage?.credit}
      <div class="hero-credit">
        Image:
        {#if post.featuredImage.credit.url}
          <a href={post.featuredImage.credit.url} target="_blank" rel="noopener noreferrer">{post.featuredImage.credit.text}</a>
        {:else}
          {post.featuredImage.credit.text}
        {/if}
      </div>
    {/if}
  </div>

  <div class="container">
    <div class="post-content">
      <div class="post-meta">
        {#if post.category}
          <span class="post-category">{post.category}</span>
        {/if}
        <time datetime={post.publishedAt}>{formattedDate}</time>
        <div class="post-meta-spacer"></div>
        <BrandStrip />
      </div>

      {#if post.video}
        <VideoEmbed video={post.video} />
      {/if}

      <div class="post-body">
        {@html post.body}
      </div>

      {#if post.tags.length > 0}
        <div class="post-tags">
          {#each post.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}

      <div class="post-nav">
        <a href="/blog" class="back-link">&larr; Back to all articles</a>
      </div>
    </div>
  </div>
</article>

<style>
  .post-hero {
    position: relative;
    width: 100%;
    height: 420px;
    overflow: hidden;
  }

  .hero-back-link {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: var(--space-4);
    background: #08141a;
    color: white;
    padding: var(--space-1) var(--space-4);
    text-decoration: none;
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    transition: background var(--transition-fast);
    margin-bottom: var(--space-3);
  }

  .hero-back-link:hover {
    background: #000;
  }

  .back-text {
    text-decoration: underline;
  }

  .post-hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .hero-credit {
    position: absolute;
    bottom: var(--space-3);
    right: var(--space-3);
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
  }

  .hero-credit a {
    color: inherit;
    text-decoration: underline;
  }

  .hero-credit a:hover {
    text-decoration: none;
  }

  .post-content {
    max-width: 740px;
    margin: 0 auto;
    padding: var(--space-6) 0 var(--space-16);
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-10);
    font-size: var(--text-sm);
    color: var(--text-tertiary);
  }

  .post-meta-spacer {
    flex: 1 1 auto;
  }

  .post-category {
    background: rgba(0, 0, 0, 0.08);
    padding: var(--space-1) var(--space-3);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .hero-title-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding: var(--space-8) var(--space-4);
  }

  .hero-title-inner {
    display: flex;
    flex-direction: column;
    max-width: 740px;
    margin: 0 auto;
  }

  .hero-title {
    font-size: var(--text-5xl);
    font-weight: var(--font-bold);
    color: white;
    line-height: var(--leading-tight);
    margin: 0;
    text-shadow:
      0 2px 8px rgba(0, 0, 0, 0.6),
      0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .post-body {
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
    color: var(--text-secondary);
  }

  .post-body :global(h2) {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin: var(--space-10) 0 var(--space-4);
  }

  .post-body :global(p) {
    margin-bottom: var(--space-6);
  }

  .post-body :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-sm);
    margin: var(--space-6) 0;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-10);
    padding-top: var(--space-8);
    border-top: 1px solid var(--color-neutral-200);
  }

  .tag {
    background: var(--color-gray-100);
    color: var(--text-secondary);
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-sm);
  }

  .post-nav {
    margin-top: var(--space-10);
  }

  .back-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: var(--font-medium);
  }

  .back-link:hover {
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    .post-content {
      padding: var(--space-8) 0 var(--space-12);
    }

    .hero-title {
      font-size: var(--text-4xl);
    }

    .post-body {
      font-size: var(--text-base);
    }
  }
</style>
