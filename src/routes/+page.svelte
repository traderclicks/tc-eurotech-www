<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import GoogleReviewsSection from '$lib/components/GoogleReviewsSection.svelte';
  import BlogCard from '$lib/components/BlogCard.svelte';
  import { generateFAQSchema } from '$lib/utils/structuredData';
  import { page } from '$app/stores';
  import type { FaqsByPage } from '$lib/cms/faqs';
  import type { PageData as RouteData } from './$types';

  export let data: RouteData;

  $: pageContent = data.page;
  $: faqs = (($page.data.faqs as FaqsByPage | undefined)?.home ?? []);

  // Blog articles from CMS
  $: blogArticles = (data.latestPosts ?? []).map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    image: post.featuredImage?.url ?? data.defaultPostImage ?? '',
    category: post.category,
    date: new Date(post.publishedAt).toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' }),
    href: `/blog/${post.slug}`
  }));

  // LocalBusiness schema is emitted by +layout.svelte site-wide; not duplicated here.
</script>

<!-- SEO Meta Tags -->
<Meta
  title={pageContent.meta.title}
  description={pageContent.meta.description}
  keywords={pageContent.meta.keywords}
  ogImage={pageContent.meta.ogImage}
/>

<!-- Structured Data -->
<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(faqs))}</script>`}
</svelte:head>

<!-- Hero Section -->
{#if pageContent.hero}
  <ServiceHero
    title={pageContent.hero.title}
    description={pageContent.hero.description ?? ''}
    images={pageContent.hero.images}
    showLogoBar={pageContent.hero.showLogoBar ?? true}
    minHeight={pageContent.hero.minHeight ?? 700}
  />
{/if}

<!-- Services Section -->
{#if pageContent.services && pageContent.services.length > 0}
  <section class="section bg-blog">
    <div class="container">
      <div class="services-grid">
        {#each pageContent.services as service}
          <ServiceCard {...service} />
        {/each}
      </div>
    </div>
  </section>
{/if}

<!-- Blog Articles -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <div class="section-title-row">
        <h2 class="section-title">From the Workshop</h2>
        <span class="section-title-pipe"><span class="pipe">|</span> <a href="/blog" class="section-more-link">View all posts →</a></span>
      </div>
      {#if pageContent.blogSectionSubtitle}<p class="section-subtitle">{pageContent.blogSectionSubtitle}</p>{/if}
    </div>

    <div class="blog-grid">
      {#each blogArticles as article}
        <BlogCard {...article} />
      {/each}
    </div>
  </div>
</section>

<!-- Google Reviews Section -->
<GoogleReviewsSection />

<!-- FAQ Section -->
<section class="section">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>
    <div class="faq-container">
      <FAQ items={faqs} />
    </div>
  </div>
</section>

<style>
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
    margin-top: var(--space-8);
  }

  @media (min-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .bg-blog {
    background: var(--bg-content);
    padding-top: var(--space-12);
  }

  .faq-container {
    max-width: 800px;
    margin: var(--space-8) auto 0;
  }

  .section-title-row {
    display: flex;
    align-items: baseline;
    gap: var(--space-4);
  }

  .section-title-pipe {
    margin-left: var(--space-4);
    font-size: var(--text-sm);
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-3);
  }

  .pipe {
    color: var(--text-secondary);
  }

  .section-more-link {
    font-size: var(--text-sm);
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    white-space: nowrap;
    transition: color var(--transition-fast);
  }

  .section-more-link:hover {
    color: var(--text-primary);
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
    margin-top: var(--space-8);
  }

  @media (max-width: 1024px) {
    .blog-grid :global(:last-child:nth-child(odd)) {
      display: none;
    }
  }

  .text-center {
    text-align: center;
  }
</style>
