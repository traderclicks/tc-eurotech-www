<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';
  import type { PageData as RouteData } from './$types';

  export let data: RouteData;

  $: page = data.page;
</script>

<Meta title={page.meta.title} description={page.meta.description} keywords={page.meta.keywords} />

{#if page.hero}
  <ServiceHero
    title={page.hero.title}
    description={page.hero.description ?? ''}
    images={page.hero.images}
    showLogoBar={page.hero.showLogoBar ?? false}
  />
{/if}

<div class="page">
  {#each page.sections as section, i}
    {@const side = section.image?.side ?? (i % 2 === 0 ? 'right' : 'left')}
    <section class="split-section" class:alt={i % 2 === 0}>
      <div class="container split" class:reverse={side === 'left'}>
        <div class="split-text">
          {#if section.heading}<h2>{section.heading}</h2>{/if}
          {#if section.leadText}<p class="lead">{section.leadText}</p>{/if}
          {#if section.paragraphs}
            {#each section.paragraphs as p}<p>{p}</p>{/each}
          {/if}
          {#if section.list}
            <ul class:tick-list={section.list.type === 'tick'}>
              {#each section.list.items as item}
                <li>{@html item}</li>
              {/each}
            </ul>
          {/if}
        </div>
        {#if section.image}
          <div class="split-image">
            <CloudflareImage
              src={section.image.src}
              alt={section.image.alt}
              width={section.image.width ?? 800}
              height={section.image.height ?? 534}
            />
          </div>
        {/if}
      </div>
    </section>

    {#if page.team && (page.team.afterSection ?? page.sections.length - 1) === i}
      <section class="team-panel">
        <div class="container">
          <h2>{page.team.heading}</h2>
          <div class="team-grid">
            {#each page.team.members as member}
              <figure class="team-member">
                <div class="team-photo">
                  <CloudflareImage
                    src={member.image}
                    alt={member.alt}
                    width={240}
                    height={288}
                    fit="cover"
                  />
                </div>
                <figcaption class="team-name">
                  {member.name}
                  {#if member.role}<span class="team-role">{member.role}</span>{/if}
                </figcaption>
              </figure>
            {/each}
          </div>
        </div>
      </section>
    {/if}
  {/each}
</div>

<style>
  .page {
    min-height: 60vh;
  }

  .split-section {
    padding: var(--space-20, 5rem) 0;
  }

  .split-section.alt {
    background: var(--bg-content);
  }

  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  .split.reverse .split-image {
    order: -1;
  }

  .split-text h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-6);
  }

  .split-text .lead {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .split-text p {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
    font-size: var(--text-lg);
  }

  .split-text ul {
    list-style: none;
    padding: 0;
    margin: var(--space-4) 0;
  }

  .split-text li {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    padding: var(--space-4) 0 var(--space-4) var(--space-16);
    border-bottom: 1px solid var(--color-gray-200);
    font-size: var(--text-lg);
    position: relative;
  }

  .split-text li:last-child {
    border-bottom: none;
  }

  /* Tick-list — used for Factory Authorisations */
  .split-text ul.tick-list li::before {
    content: "";
    position: absolute;
    left: var(--space-3);
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230066cc' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg>");
    background-repeat: no-repeat;
    background-size: contain;
  }

  /* Team panel — horizontal passport photos with names underneath */
  .team-panel {
    padding: var(--space-20, 5rem) 0;
    text-align: center;
  }

  .team-panel h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-12);
  }

  .team-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-10);
  }

  .team-member {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 180px;
  }

  .team-photo {
    width: 180px;
    height: 216px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-content);
  }

  .team-photo :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .team-name {
    margin-top: var(--space-4);
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  .team-role {
    display: block;
    font-size: var(--text-base);
    font-weight: var(--font-normal);
    color: var(--text-secondary);
    margin-top: var(--space-1);
  }

  @media (max-width: 768px) {
    .team-panel {
      padding: var(--space-12) 0;
    }

    .team-panel h2 {
      margin-bottom: var(--space-8);
    }

    /* Two-up grid on phones — smaller frames + tighter gap so two fit per row */
    .team-grid {
      gap: var(--space-6) var(--space-5);
    }

    .team-member {
      width: 130px;
    }

    .team-photo {
      width: 130px;
      height: 156px;
    }
  }

  .split-image {
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .split-image :global(img) {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    .split-section {
      padding: var(--space-12) 0;
    }

    .split {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .split.reverse .split-image {
      order: 0;
    }

    .split-text h2 {
      font-size: var(--text-2xl);
    }

    .split-text .lead {
      font-size: var(--text-lg);
    }

    .split-text p,
    .split-text li {
      font-size: var(--text-base);
    }
  }
</style>
