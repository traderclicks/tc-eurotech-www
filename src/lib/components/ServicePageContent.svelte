<script lang="ts">
  import CloudflareImage from './CloudflareImage.svelte';
  import FAQ from './FAQ.svelte';
  import { generateFAQSchema } from '$lib/utils/structuredData';

  interface ContentSection {
    image: string;
    imageAlt: string;
    imageWidth?: number;
    imageHeight?: number;
    title: string;
    paragraphs: string[];
  }

  interface FAQItem {
    question: string;
    answer: string;
  }

  export let heading: string;
  export let leadText: string;
  export let sections: ContentSection[];
  export let faqs: FAQItem[];
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(faqs))}</script>`}
</svelte:head>

<section class="section content-section">
  <div class="container">
    <div class="intro-block">
      <h2 class="content-heading">{heading}</h2>
      <p class="lead-text">{leadText}</p>
    </div>

    {#each sections as section, i}
      <div class="content-grid" class:reverse={i % 2 === 1}>
        {#if i % 2 === 0}
          <div class="content-image">
            <CloudflareImage
              src={section.image}
              alt={section.imageAlt}
              width={section.imageWidth ?? 1200}
              height={section.imageHeight ?? 800}
            />
          </div>
          <div class="content-text">
            <h3>{section.title}</h3>
            {#each section.paragraphs as paragraph}
              <p>{paragraph}</p>
            {/each}
          </div>
        {:else}
          <div class="content-text">
            <h3>{section.title}</h3>
            {#each section.paragraphs as paragraph}
              <p>{paragraph}</p>
            {/each}
          </div>
          <div class="content-image">
            <CloudflareImage
              src={section.image}
              alt={section.imageAlt}
              width={section.imageWidth ?? 1200}
              height={section.imageHeight ?? 800}
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<slot name="after-content" />

<section class="section bg-secondary">
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
  .section {
    padding: var(--space-16) 0;
  }

  .content-section {
    background: var(--bg-secondary);
  }

  .bg-secondary {
    background: white;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-6);
  }

  .section-header {
    margin-bottom: var(--space-12);
  }

  .text-center {
    text-align: center;
  }

  .section-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  /* Intro Block */
  .intro-block {
    max-width: 800px;
    margin: 0 auto var(--space-16);
    text-align: center;
  }

  .content-heading {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-6);
  }

  .lead-text {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    color: var(--text-secondary);
  }

  /* Content Grid Layout */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    margin-bottom: var(--space-16);
    align-items: center;
  }

  .content-grid.reverse {
    direction: rtl;
  }

  .content-grid.reverse > * {
    direction: ltr;
  }

  .content-image {
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .content-text h3 {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .content-text p {
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: var(--text-secondary);
    margin-bottom: var(--space-4);
  }

  .faq-container {
    max-width: 800px;
    margin: 0 auto;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
  }

  @media (max-width: 768px) {
    .section {
      padding: var(--space-8) 0;
    }

    .content-heading {
      font-size: var(--text-2xl);
    }

    .lead-text {
      font-size: var(--text-base);
    }

    .content-text h3 {
      font-size: var(--text-xl);
    }

    .section-title {
      font-size: var(--text-2xl);
    }
  }
</style>
