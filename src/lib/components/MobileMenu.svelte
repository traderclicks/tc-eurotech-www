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