<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import BlogCard from '$lib/components/BlogCard.svelte';
  import BrandStrip from '$lib/components/BrandStrip.svelte';

  export let data;

  $: page = data.page;
</script>

<Meta
  title={page.meta.title}
  description={page.meta.description}
  keywords={page.meta.keywords}
/>

<div class="page">
  <div class="container">
    <div class="page-header">
      <div class="page-header-main">
        <h1>{page.title}</h1>
        {#if page.subtitle}<p class="page-subtitle">{page.subtitle}</p>{/if}
      </div>
      <div class="page-header-aside">
        <BrandStrip />
      </div>
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
  }

  h1 {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .page-subtitle {
    font-size: var(--text-xl);
    font-weight: var(--font-light);
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

    .page-header {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
