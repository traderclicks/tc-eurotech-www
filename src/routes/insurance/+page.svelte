<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import Button from '$lib/components/Button.svelte';
  import { modal } from '$lib/stores/modal';
  import { generateFAQSchema } from '$lib/utils/structuredData';
  import { page } from '$app/stores';
  import type { FaqsByPage } from '$lib/cms/faqs';
  import type { Insurer } from '$lib/cms/insurers';
  import { displayInsurers } from '$lib/cms/insurer-display';
  import type { PageData } from './$types';

  export let data: PageData;

  $: pageContent = data.page;
  $: insuranceFaqs = (($page.data.faqs as FaqsByPage | undefined)?.insurance ?? []);
  $: insurerLogos = displayInsurers(($page.data.insurers as Insurer[] | undefined) ?? []);
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(insuranceFaqs))}</script>`}
</svelte:head>

<Meta
  title={pageContent.meta.title}
  description={pageContent.meta.description}
  keywords={pageContent.meta.keywords}
/>

<div class="page-header">
  <div class="container">
    <div class="intro-row">
      <div class="intro-text">
        <h1>{pageContent.title}</h1>
        {#if pageContent.subtitle}<p class="intro">{pageContent.subtitle}</p>{/if}
      </div>
      <div class="cta-buttons-wrapper">
        <div class="cta-buttons">
          <Button variant="primary" size="large" on:click={() => modal.cognito()}>Get a Repair Quote</Button>
          <Button variant="link" size="large" on:click={() => modal.insurance()}>Insurance Contacts</Button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="page">
  <div class="container">
    <div class="two-col">
      <!-- Left Column -->
      <div class="col-left">
        <div class="faq-block">
          <div class="section-header text-center">
            <h2 class="section-title">Frequently Asked Questions</h2>
          </div>
          <FAQ items={insuranceFaqs} />
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-right">
        <div class="logos-block insurer-logos">
          <div class="insurer-grid">
            {#each insurerLogos as logo}
              <div class="insurer-logo" class:small-logo={logo.name === 'NZI'}>
                <img src={logo.logo} alt={logo.name} />
              </div>
            {/each}
          </div>
        </div>
      </div>
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
    margin-bottom: var(--space-4);
    color: var(--text-heading);
  }

  .intro-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
    margin-bottom: 0;
    align-items: center;
  }

  .intro {
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
    color: var(--text-secondary);
  }

  .cta-buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  /* Two-column layout */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: start;
  }

  .col-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
  }

  .col-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-12);
  }

  h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-6);
  }

  .logos-heading {
    text-align: center;
    margin-top: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .cta-buttons {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    white-space: nowrap;
  }

  .section-header {
    margin-bottom: var(--space-8);
  }

  .section-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  /* Insurer logos — full color grid */
  .insurer-grid {
    display: grid;
    /* 9 insurers → 3 rows of 3 */
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    align-items: center;
  }

  .insurer-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3);
  }

  .insurer-logo img {
    max-width: 115px;
    max-height: 48px;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  .small-logo img {
    max-width: 50px;
    max-height: 22px;
  }

  @media (max-width: 768px) {
    .page {
      padding: var(--space-8) 0;
    }

    h1 {
      font-size: clamp(2rem, 6vw, 3rem);
    }

    .intro-row {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

    .intro {
      font-size: var(--text-lg);
    }

    .section-title {
      font-size: var(--text-2xl);
    }

    .two-col {
      grid-template-columns: 1fr;
      gap: var(--space-10);
    }

    .insurer-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }

    .cta-buttons {
      flex-direction: column;
      gap: var(--space-4);
      align-items: center;
    }
  }
</style>
