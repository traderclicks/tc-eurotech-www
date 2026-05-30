<script lang="ts">
  import type { PageData } from '$lib/cms/pages';
  import { interpolate } from '$lib/cms/interpolate';
  import { site } from '$lib/config/site';

  export let data: PageData;

  const tokens: Record<string, string | number> = {
    businessName: site.businessName,
    fullAddress: site.fullAddress,
    address: site.address,
    suburb: site.suburb,
    city: site.city,
    postcode: site.postcode,
    country: site.country,
    email: site.email,
    phone: site.phone,
    phoneTel: site.phoneTel,
    openingHours: site.openingHours
  };

  const fill = (s: string) => interpolate(s, tokens);
</script>

<div class="page-header">
  <div class="container">
    {#if data.title}<h1>{data.title}</h1>{/if}
    {#if data.updatedAt}<p class="updated">{data.updatedAt}</p>{/if}
  </div>
</div>

<div class="page">
  <div class="container">
    <div class="content">
      {#each data.sections as section}
        <section>
          {#if section.heading}<h2>{section.heading}</h2>{/if}
          {#if section.paragraphs}
            {#each section.paragraphs as p}
              <p>{fill(p)}</p>
            {/each}
          {/if}
          {#if section.list}
            {#if section.list.type === 'ordered'}
              <ol>
                {#each section.list.items as item}
                  <li>{@html fill(item)}</li>
                {/each}
              </ol>
            {:else}
              <ul class:tick-list={section.list.type === 'tick'}>
                {#each section.list.items as item}
                  <li>{@html fill(item)}</li>
                {/each}
              </ul>
            {/if}
          {/if}
          {#if section.html}
            {@html fill(section.html)}
          {/if}
        </section>
      {/each}
    </div>
  </div>
</div>

<style>
  .page-header {
    background: var(--bg-content);
    padding: var(--space-16) 0;
  }

  .page {
    padding: var(--space-16) 0;
    min-height: 60vh;
  }

  h1 {
    font-size: clamp(3rem, 7vw, 5rem);
    font-weight: var(--font-extrabold);
    line-height: 1.1;
    color: var(--text-heading);
    text-align: center;
  }

  .content {
    max-width: 740px;
    margin: 0 auto;
  }

  .updated {
    text-align: center;
    color: var(--text-tertiary);
    font-size: var(--text-sm);
    margin-bottom: 0;
  }

  section {
    margin-bottom: var(--space-10);
  }

  h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  p {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
    font-size: var(--text-lg);
  }

  :global(.text-page-content a) {
    color: var(--color-primary);
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
    padding: 0;
    margin: var(--space-4) 0;
  }

  li {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--color-gray-100);
    font-size: var(--text-lg);
  }

  li:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    .page {
      padding: var(--space-8) 0;
    }

    h1 {
      font-size: clamp(2rem, 6vw, 3rem);
    }

    p, li {
      font-size: var(--text-base);
    }
  }
</style>
