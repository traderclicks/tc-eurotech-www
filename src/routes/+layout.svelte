<script lang="ts">
  import '../lib/styles/global.css';
  import Modal from '$lib/components/Modal.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let scrollY = 0;

  // Only the homepage has a hero image
  $: hasHero = $page.url.pathname === '/';

  // Hide header/footer on login page
  $: isLoginPage = $page.url.pathname === '/login';

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

  <!-- Organization Schema for SEO -->
  {@html `<script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Page One",
    "alternateName": "Page One Solutions",
    "url": "https://example.com",
    "logo": "https://example.com/logo.png",
    "description": "Premium solutions and services to help you achieve success",
    "foundingDate": "2020",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0100",
      "contactType": "customer service",
      "email": "contact@example.com",
      "areaServed": "US",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.facebook.com/pageone",
      "https://twitter.com/pageone",
      "https://www.linkedin.com/company/pageone",
      "https://www.instagram.com/pageone"
    ]
  })}
  </script>`}

  <!-- Website Schema -->
  {@html `<script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Page One",
    "url": "https://example.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://example.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  })}
  </script>`}
</svelte:head>

<div class="app">
  {#if !isLoginPage}
    <Header isScrolled={scrollY > 50} {hasHero} />
  {/if}

  <main class="main">
    <slot />
  </main>

  {#if !isLoginPage}
    <Footer />
  {/if}

  <!-- Global Modal Container -->
  <Modal />

  <!-- Back to Top Button -->
  {#if scrollY > 300 && !isLoginPage}
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