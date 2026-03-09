<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import VideoEmbed from '$lib/components/VideoEmbed.svelte';

  export let data;

  $: post = data.post;
  $: formattedDate = new Date(post.publishedAt).toLocaleDateString('en-NZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
</script>

<Meta
  title="{post.title} - Eurotech Blog"
  description={post.excerpt}
  ogImage={post.featuredImage?.url}
/>

<article class="post">
  {#if post.featuredImage}
    <div class="post-hero">
      <img src={post.featuredImage.url} alt={post.featuredImage.alt} />
    </div>
  {/if}

  <div class="container">
    <div class="post-content">
      <div class="post-meta">
        {#if post.category}
          <span class="post-category">{post.category}</span>
        {/if}
        <time datetime={post.publishedAt}>{formattedDate}</time>
      </div>

      <h1>{post.title}</h1>

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
    width: 100%;
    max-height: 480px;
    overflow: hidden;
  }

  .post-hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .post-content {
    max-width: 740px;
    margin: 0 auto;
    padding: var(--space-12) 0 var(--space-16);
  }

  .post-meta {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    font-size: var(--text-sm);
    color: var(--text-tertiary);
  }

  .post-category {
    background: rgba(0, 0, 0, 0.08);
    padding: var(--space-1) var(--space-3);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  h1 {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--color-text);
    line-height: var(--leading-tight);
    margin-bottom: var(--space-8);
  }

  .post-body {
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
    color: var(--text-secondary);
  }

  .post-body :global(h2) {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--color-text);
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
    background: var(--color-neutral-100);
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
    color: var(--color-text);
  }

  @media (max-width: 768px) {
    .post-content {
      padding: var(--space-8) 0 var(--space-12);
    }

    h1 {
      font-size: var(--text-3xl);
    }

    .post-body {
      font-size: var(--text-base);
    }
  }
</style>
