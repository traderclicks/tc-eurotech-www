<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServicePageContent from '$lib/components/ServicePageContent.svelte';
  import GoogleReviewsSection from '$lib/components/GoogleReviewsSection.svelte';
  import { site } from '$lib/config/site';
  import { page } from '$app/stores';
  import { generateBreadcrumbSchema } from '$lib/utils/structuredData';
  import type { FaqsByPage } from '$lib/cms/faqs';
  import type { PageData } from './$types';

  export let data: PageData;

  $: brand = data.brand;
  $: faqs = (($page.data.faqs as FaqsByPage | undefined)?.[data.slug] ?? []);

  $: breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://eurotechauto.co.nz/' },
    { name: brand.hero.title, url: `https://eurotechauto.co.nz/${data.slug}` }
  ]);
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
</svelte:head>

<Meta
  title={brand.meta.title}
  description={`${brand.meta.description} Call ${site.phone}`}
  keywords={brand.meta.keywords}
/>

{#key data.slug}
  <ServiceHero
    title={brand.hero.title}
    description={brand.hero.description}
    images={brand.hero.images}
    showLogoBar={true}
  />

  <ServicePageContent
    heading={brand.content.heading}
    leadText={brand.content.leadText}
    sections={brand.content.sections}
    {faqs}
  >
    <svelte:fragment slot="after-content">
      {#if brand.showReviews}
        <GoogleReviewsSection />
      {/if}
    </svelte:fragment>
  </ServicePageContent>
{/key}
