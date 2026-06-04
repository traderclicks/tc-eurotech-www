<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import BlogCard from '$lib/components/BlogCard.svelte';

  export let data;
</script>

<Meta
  title="Workshop Updates"
  description="Expert insights, maintenance tips, and industry news from Auckland's European vehicle repair specialists."
/>

<div class="page">
  <div class="container">
    <div class="page-header">
      <div class="page-header-main">
        <h1>Workshop Updates</h1>
        <p class="page-subtitle">Tips, guides, and insights from our European vehicle specialists</p>
      </div>
      <aside class="page-header-aside" aria-label="Eurotech specialisations">
        <div class="brand-logos">
          <img src="/jaguar-logo-black.svg" alt="" style="height: 9px" />
          <img src="/landrover-logo-black.svg" alt="" style="height: 26px" />
          <img src="/range-rover-logo-black.svg" alt="" style="height: 18px" />
          <img src="/bmw-logo-black.svg" alt="" style="height: 32px" />
          <img src="/mini-black.svg" alt="" style="height: 20px" />
        </div>
        <p class="tagline">Expert &amp; Factory Authorised European Specialists · Auckland</p>
      </aside>
    </div>

    {#if data.posts.length === 0}
      <p class="no-posts">No articles yet. Check back soon.</p>
    {:else}
      <div class="blog-grid">
        {#each data.posts as post}
          <BlogCard
            title={post.title}
            excerpt={post.excerpt}
            image={post.featuredImage?.url ?? data.defaultPostImage ?? ''}
            category={post.category}
            date={new Date(post.publishedAt).toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}
            href={`/blog/${post.slug}`}
          />
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .page {
    padding: var(--space-16) 0;
    min-height: 60vh;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--space-8);
    margin-bottom: var(--space-12);
  }

  .page-header-main {
    flex: 1 1 auto;
    min-width: 0;
  }

  .page-header-aside {
    flex: 0 0 auto;
    text-align: right;
    opacity: 0.55;
  }

  .brand-logos {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-4);
    margin-bottom: var(--space-2);
  }

  .brand-logos img {
    display: block;
    width: auto;
  }

  .tagline {
    font-size: var(--text-xs);
    color: var(--text-secondary);
    letter-spacing: 0.02em;
    margin: 0;
  }

  h1 {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .page-subtitle {
    font-size: var(--text-lg);
    color: var(--text-secondary);
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
  }

  .no-posts {
    color: var(--text-secondary);
    font-size: var(--text-lg);
  }

  @media (max-width: 768px) {
    .page {
      padding: var(--space-8) 0;
    }

    h1 {
      font-size: var(--text-3xl);
    }

    .blog-grid {
      grid-template-columns: 1fr;
    }

    .page-header-aside {
      display: none;
    }
  }
</style>
