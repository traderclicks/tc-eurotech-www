<script lang="ts">
  import '../lib/styles/global.css';
  import Modal from '$lib/components/Modal.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import FooterCTA from '$lib/components/FooterCTA.svelte';
  import { site } from '$lib/config/site';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { generateLocalBusinessSchema } from '$lib/utils/structuredData';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  // Site-wide LocalBusiness JSON-LD — emitted on every route so every URL
  // is a candidate for Google's knowledge panel. LocalBusiness is a subtype
  // of Organization; emitting LocalBusiness alone covers both roles.
  const businessSchema = {
    ...generateLocalBusinessSchema({
      name: site.businessName,
      description: site.shortDescription,
      address: {
        street: site.address,
        city: `${site.suburb}, ${site.city}`,
        state: site.city,
        postalCode: site.postcode,
        country: 'NZ'
      },
      phone: site.phone,
      email: site.email,
      hours: site.businessHours,
      rating: {
        value: site.googleReviewRating,
        count: site.googleReviewCount
      },
      geo: site.geo
    }),
    // Additional Organization-level fields. LocalBusiness inherits these
    // via its supertype.
    url: 'https://eurotechauto.co.nz',
    logo: 'https://eurotechauto.co.nz/eurotech-main-logo.png',
    alternateName: site.alternateName,
    foundingDate: site.foundingDate,
    sameAs: [site.facebookUrl, site.instagramUrl, site.googleMapsUrl]
  };

  let scrollY = 0;
  // Pages that use ServiceHero — header overlays the hero image
  const heroPages = ['/', '/jaguar', '/land-rover', '/range-rover', '/bmw', '/mini', '/about'];
  $: hasHero = heroPages.includes($page.url.pathname);

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

    {@html `<script type="application/ld+json">${JSON.stringify(businessSchema)}</script>`}

    {@html `<script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": site.businessName,
      "url": "https://eurotechauto.co.nz"
    })}
    </script>`}
</svelte:head>

<div class="app">
  <Header isScrolled={scrollY > 50} {hasHero} />

  <main class="main">
    <slot />
  </main>

  <FooterCTA />
  <Footer />

  <Modal />

  {#if scrollY > 300}
    <button
      class="back-to-top"
      on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  {/if}
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main {
    flex: 1;
    width: 100%;
  }

  .back-to-top {
    position: fixed;
    bottom: var(--space-6);
    right: var(--space-6);
    width: 48px;
    height: 48px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);
    z-index: var(--z-fixed);
    animation: slideInUp var(--transition-base);
  }

  .back-to-top:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .back-to-top {
      bottom: var(--space-4);
      right: var(--space-4);
      width: 40px;
      height: 40px;
    }
  }
</style>
