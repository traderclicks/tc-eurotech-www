<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import BlogCard from '$lib/components/BlogCard.svelte';

  export let data;
</script>

<Meta
  title="Blog - Eurotech Auto Repair Centre"
  description="Expert insights, maintenance tips, and industry news from Auckland's European vehicle repair specialists."
/>

<div class="page">
  <div class="container">
    <div class="page-header">
      <h1>From the Workshop</h1>
      <p class="page-subtitle">Tips, guides, and insights from our European vehicle specialists</p>
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
    margin-bottom: var(--space-12);
  }

  h1 {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--color-text);
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
  }
</style>
