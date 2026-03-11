<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { modal } from '$lib/stores/modal';
  import { site } from '$lib/config/site';

  export let isOpen = false;

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Insurance Claims', href: '/insurance' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact Us', href: '#contact' },
  ];

  function closeMenu() {
    isOpen = false;
  }

  function openContactModal() {
    closeMenu();
    modal.cognito();
  }

  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
</script>

{#if isOpen}
  <div class="mobile-menu" transition:fade={{ duration: 200 }}>
    <div
      class="menu-backdrop"
      on:click={closeMenu}
      on:keydown={(e) => e.key === 'Escape' && closeMenu()}
      role="button"
      tabindex="0"
      aria-label="Close menu"
    ></div>

    <nav class="menu-content" transition:fly={{ x: 300, duration: 300 }}>
      <div class="menu-header">
        <a href="/" class="menu-logo" on:click={closeMenu}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
            <rect width="32" height="32" rx="4" />
          </svg>
          <span>Eurotech</span>
        </a>
        <button class="menu-close" on:click={closeMenu} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <ul class="menu-nav">
        {#each navItems as item}
          <li>
            <a
              href={item.href}
              class="menu-link"
              on:click={closeMenu}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>

      <div class="menu-cta">
        <button class="cta-button" on:click={openContactModal}>
          Get a Repair Quote
        </button>
        <a href="tel:{site.phoneTel}" class="cta-phone">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>{site.phone}</span>
        </a>
      </div>

      <div class="menu-social">
        <a href={site.facebookUrl} aria-label="Facebook">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a href={site.instagramUrl} aria-label="Instagram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
        <a href={site.googleMapsUrl} aria-label="Google Business">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </a>
      </div>
    </nav>
  </div>
{/if}

<style>
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: var(--z-modal);
  }

  .menu-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  .menu-content {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: 320px;
    background: var(--bg-primary);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-8);
  }

  .menu-logo {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-weight: var(--font-bold);
    font-size: var(--text-xl);
    color: var(--text-primary);
    text-decoration: none;
  }

  .menu-close {
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: var(--space-2);
  }

  .menu-nav {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
  }

  .menu-link {
    display: block;
    padding: var(--space-3) 0;
    color: var(--text-primary);
    text-decoration: none;
    font-size: var(--text-lg);
    font-weight: var(--font-medium);
    border-bottom: 1px solid var(--color-gray-200);
    transition: all var(--transition-fast);
  }

  .menu-link:hover {
    color: var(--color-primary);
    padding-left: var(--space-2);
  }

  .menu-cta {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin: var(--space-8) 0;
  }

  .cta-button {
    width: 100%;
    padding: var(--space-4);
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .cta-button:hover {
    background: var(--color-primary-dark);
  }

  .cta-phone {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-4);
    color: var(--color-primary);
    text-decoration: none;
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-md);
    font-weight: var(--font-medium);
    transition: all var(--transition-fast);
  }

  .cta-phone:hover {
    background: var(--color-primary);
    color: white;
  }

  .menu-social {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
  }

  .menu-social a {
    color: var(--text-secondary);
    transition: all var(--transition-fast);
  }

  .menu-social a:hover {
    color: var(--color-primary);
    transform: translateY(-2px);
  }
</style>