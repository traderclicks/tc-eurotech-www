<script lang="ts">
  import '../lib/styles/global.css';
  import Modal from '$lib/components/Modal.svelte';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  // Admin pages get a completely clean pass-through
  $: isAdminPage = $page.url.pathname.startsWith('/admin');

  let scrollY = 0;
  let cmsDropdownOpen = false;

  $: hasHero = $page.url.pathname === '/';
  $: isLoginPage = $page.url.pathname === '/login';
  $: isPreviewMode = data.isPreviewMode;

  function toggleCmsDropdown() {
    cmsDropdownOpen = !cmsDropdownOpen;
  }

  function closeCmsDropdown() {
    cmsDropdownOpen = false;
  }

  onMount(() => {
    if (isAdminPage) return;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.cms-dropdown')) {
        cmsDropdownOpen = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<svelte:head>
  {#if !isAdminPage}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

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
  {/if}
</svelte:head>

{#if isAdminPage}
  <!-- Admin: clean pass-through, admin layout handles everything -->
  <slot />
{:else}
  <!-- Website: full layout -->
  {#if data.cmsUser && !isLoginPage}
    <div class="admin-bar">
      <div class="admin-bar-content">
        <div class="cms-dropdown">
          <button class="cms-dropdown-trigger" on:click|stopPropagation={toggleCmsDropdown}>
            <span class="admin-bar-brand">CMS</span>
            <svg class="dropdown-arrow" class:open={cmsDropdownOpen} width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
              <path d="M1 1l4 4 4-4"/>
            </svg>
          </button>
          {#if cmsDropdownOpen}
            <div class="cms-dropdown-menu">
              <a href="/admin" class="cms-dropdown-item" on:click={closeCmsDropdown}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                Image Slots
              </a>
              <div class="cms-dropdown-divider"></div>
              <form method="POST" action="/admin/login?/logout">
                <button type="submit" class="cms-dropdown-item cms-dropdown-logout">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </form>
            </div>
          {/if}
        </div>
        <span class="admin-bar-user">
          {data.cmsUser.email}
          <span class="admin-bar-role">{data.cmsUser.role}</span>
        </span>
      </div>
    </div>
  {/if}

  {#if isPreviewMode && !isLoginPage}
    <div class="preview-bar">
      <span class="preview-text">Preview Mode — Viewing unpublished changes</span>
      <a href="/api/preview/disable?return={$page.url.pathname}" class="preview-exit">Exit Preview</a>
    </div>
  {/if}

  <div class="app" class:has-admin-bar={data.cmsUser && !isLoginPage} class:has-preview-bar={isPreviewMode && !isLoginPage}>
    {#if !isLoginPage}
      <Header isScrolled={scrollY > 50} {hasHero} />
    {/if}

    <main class="main">
      <slot />
    </main>

    {#if !isLoginPage}
      <Footer />
    {/if}

    <Modal />

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
{/if}

<style>
  :global(:root) {
    --admin-bar-height: 28px;
    --preview-bar-height: 40px;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .app.has-admin-bar {
    margin-top: var(--admin-bar-height);
    transform: translateY(0);
  }

  .app.has-preview-bar {
    margin-top: var(--preview-bar-height);
  }

  .app.has-admin-bar.has-preview-bar {
    margin-top: calc(var(--admin-bar-height) + var(--preview-bar-height));
  }

  .main {
    flex: 1;
    width: 100%;
  }

  .admin-bar {
    background: #ff1493;
    color: white;
    font-size: 11px;
    width: 100%;
    height: var(--admin-bar-height);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  .preview-bar {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    height: var(--preview-bar-height);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }

  .admin-bar + .preview-bar,
  .admin-bar ~ .preview-bar {
    top: var(--admin-bar-height);
  }

  .preview-text::before {
    content: '⚡ ';
  }

  .preview-exit {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 6px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s;
  }

  .preview-exit:hover {
    background: rgba(255, 255, 255, 0.3);
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
    margin-left: auto;
  }

  .admin-bar-role {
    background: rgba(0, 0, 0, 0.2);
    padding: 1px 6px;
    border-radius: 3px;
    font-size: 9px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .cms-dropdown {
    position: relative;
  }

  .cms-dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    color: white;
    padding: 4px 10px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
  }

  .cms-dropdown-trigger:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  .dropdown-arrow {
    transition: transform 0.2s;
  }

  .dropdown-arrow.open {
    transform: rotate(180deg);
  }

  .cms-dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    background: white;
    border-radius: 6px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-width: 180px;
    padding: 6px 0;
    z-index: 10000;
  }

  .cms-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    color: #333;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.15s;
    border: none;
    background: none;
    width: 100%;
    cursor: pointer;
    text-align: left;
  }

  .cms-dropdown-item:hover {
    background: #f5f5f5;
  }

  .cms-dropdown-item svg {
    opacity: 0.6;
  }

  .cms-dropdown-divider {
    height: 1px;
    background: #eee;
    margin: 6px 0;
  }

  .cms-dropdown-logout {
    color: #dc2626;
  }

  .cms-dropdown-logout:hover {
    background: #fef2f2;
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
