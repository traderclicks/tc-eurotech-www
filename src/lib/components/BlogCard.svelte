<script lang="ts">
  export let title = '';
  export let excerpt = '';
  export let image = '';
  export let category = '';
  export let date = '';
  export let href = '#';
</script>

<a href={href} class="blog-card">
  <div class="blog-image">
    <img src={image} alt={title} />
    {#if category}
      <span class="blog-category">{category}</span>
    {/if}
  </div>

  <div class="blog-content">
    {#if date}
      <time class="blog-date">{date}</time>
    {/if}

    <h3 class="blog-title">{title}</h3>

    {#if excerpt}
      <p class="blog-excerpt">{excerpt}</p>
    {/if}

    <span class="blog-link">Read more →</span>
  </div>
</a>

<style>
  .blog-card {
    display: block;
    border-radius: 0;
    overflow: hidden;
    background: var(--bg-primary);
    border: none;
    transition: all var(--transition-base);
    text-decoration: none;
    height: 100%;
    cursor: pointer;
  }

  .blog-card:hover {
    opacity: 0.9;
  }

  .blog-card:hover .blog-link {
    text-decoration: underline;
  }

  .blog-image {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .blog-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
  }

  .blog-card:hover .blog-image img {
    transform: scale(1.05);
  }

  .blog-category {
    position: absolute;
    top: var(--space-4);
    left: var(--space-4);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: var(--space-2) var(--space-4);
    border-radius: 0;
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .blog-content {
    padding: var(--space-6) var(--space-6) var(--space-6) 0;
  }

  .blog-date {
    display: block;
    color: var(--color-gray-400);
    font-size: var(--text-sm);
    margin-bottom: var(--space-3);
  }

  .blog-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-3);
    line-height: var(--leading-tight);
  }

  .blog-excerpt {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-primary);
    font-weight: var(--font-medium);
    font-size: var(--text-sm);
  }

  @media (max-width: 768px) {
    .blog-content {
      padding: var(--space-4);
    }

    .blog-title {
      font-size: var(--text-lg);
    }
  }
</style>
