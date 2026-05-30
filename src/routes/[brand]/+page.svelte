<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServicePageContent from '$lib/components/ServicePageContent.svelte';
  import GoogleReviewsSection from '$lib/components/GoogleReviewsSection.svelte';
  import { site } from '$lib/config/site';
  import { page } from '$app/stores';
  import type { FaqsByPage } from '$lib/cms/faqs';
  import type { PageData } from './$types';

  export let data: PageData;

  $: brand = data.brand;
  $: faqs = (($page.data.faqs as FaqsByPage | undefined)?.[data.slug] ?? []);
</script>

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
