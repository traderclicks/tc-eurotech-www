<script lang="ts">
  import '../lib/styles/global.css';
  import Modal from '$lib/components/Modal.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let scrollY = 0;

  // Only the homepage has a hero image
  $: hasHero = $page.url.pathname === '/';

  // Hide header/footer on login page
  $: isLoginPage = $page.url.pathname === '/login';

  // Hide admin bar on admin pages (they have their own header)
  $: isAdminPage = $page.url.pathname.startsWith('/admin');

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

<div class="app" class:has-admin-bar={data.cmsUser && !isAdminPage && !isLoginPage}>
  {#if data.cmsUser && !isAdminPage && !isLoginPage}
    <div class="admin-bar">
      <div class="admin-bar-content">
        <span class="admin-bar-brand">Eurotech CMS</span>
        <span class="admin-bar-user">
          {data.cmsUser.email}
          <span class="admin-bar-role">{data.cmsUser.role}</span>
        </span>
        <a href="/admin" class="admin-bar-link">Dashboard</a>
        <form method="POST" action="/admin/login?/logout" class="admin-bar-logout">
          <button type="submit">Logout</button>
        </form>
      </div>
    </div>
  {/if}

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

  /* Admin bar - compact strip above header */
  .admin-bar {
    background: #ff1493; /* Hot pink - garish */
    color: white;
    font-size: 11px;
    width: 100%;
    z-index: 9999;
  }

  .admin-bar-content {
    padding: 4px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .admin-bar-brand {
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .admin-bar-user {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .admin-bar-role {
    background: rgba(0, 0, 0, 0.2);
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 9px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .admin-bar-link {
    color: white;
    text-decoration: none;
    padding: 2px 8px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    margin-left: auto;
    font-weight: 600;
  }

  .admin-bar-link:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  .admin-bar-logout {
    display: inline;
  }

  .admin-bar-logout button {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: white;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
    cursor: pointer;
  }

  .admin-bar-logout button:hover {
    background: rgba(0, 0, 0, 0.2);
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