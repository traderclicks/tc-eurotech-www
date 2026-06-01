<script lang="ts">
  import '../lib/styles/global.css';
  import Modal from '$lib/components/Modal.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import FooterCTA from '$lib/components/FooterCTA.svelte';
  import { site } from '$lib/config/site';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

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

    {@html `<script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": site.businessName,
      "alternateName": "Eurotech Panel Beaters",
      "url": "https://eurotechauto.co.nz",
      "logo": "https://eurotechauto.co.nz/eurotech-main-logo.png",
      "description": "Factory-authorized European vehicle specialists. NZ's only Jaguar/Land Rover structural repairer and accredited BMW Carbon Fibre Body Shop.",
      "foundingDate": "2003",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": site.address,
        "addressLocality": site.suburb,
        "addressRegion": site.city,
        "postalCode": site.postcode,
        "addressCountry": "NZ"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": `+64-9-${site.phone.replace(/[()]/g, '').replace(/^09\s*/, '')}`,
        "contactType": "customer service",
        "email": site.email,
        "areaServed": "NZ",
        "availableLanguage": ["English"]
      },
      "sameAs": [
        site.facebookUrl,
        site.instagramUrl,
        site.googleMapsUrl
      ]
    })}
    </script>`}

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
