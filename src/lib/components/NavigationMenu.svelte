<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let isOpen = false;

  const dispatch = createEventDispatcher();

  const primaryItems = [
    { label: 'Home', href: '/' },
    { label: 'Make an Insurance Claim', href: '/insurance', flag: '*' },
    { label: 'About Eurotech', href: '/about' },
    { label: 'From the Workshop', href: '/blog' },
    { label: 'Contact Us', href: '#contact', action: 'contact' },
  ];

  const secondaryItems = [
    { label: 'Jaguar Repair', href: '/jaguar', logo: '/jaguar-logo-white.svg', logoHeight: 7 },
    { label: 'Land Rover Repair', href: '/land-rover', logo: '/landrover-logo-white.svg', logoHeight: 20 },
    { label: 'Range Rover Repair', href: '/range-rover', logo: '/range-rover-logo-white.svg', logoHeight: 14 },
    { label: 'BMW Repair', href: '/bmw', logo: '/bmw-logo-white.svg', logoHeight: 28 },
    { label: 'Mini Repair', href: '/mini', logo: '/mini-white.svg', logoHeight: 16 },
  ];

  function closeMenu() {
    isOpen = false;
  }

  function handleNavClick(e: Event, item: typeof primaryItems[0]) {
    if (item.action) {
      e.preventDefault();
      closeMenu();
      dispatch(item.action);
      return;
    }
    closeMenu();
  }
</script>

{#if isOpen}
  <!-- Overlay -->
  <button
    class="overlay"
    on:click={closeMenu}
    transition:fade={{ duration: 300 }}
    aria-label="Close navigation menu"
    type="button"
  ></button>

  <!-- Menu Panel -->
  <nav
    class="navigation-menu"
    transition:fly={{ x: -400, duration: 300 }}
  >
    <!-- Close Button (Top Right) -->
    <button class="close-btn" on:click={closeMenu} aria-label="Close menu">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" stroke-width="2"/>
        <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>

    <!-- Navigation Items -->
    <ul class="nav-list">
      {#each primaryItems as item}
        <li class="nav-item">
          <a
            href={item.href}
            class="nav-link"
            on:click={(e) => handleNavClick(e, item)}
          >
            <span>{item.label}{#if item.flag} <span class="nav-flag">{item.flag}</span>{/if}</span>
          </a>
        </li>
      {/each}
    </ul>

    <!-- Secondary Navigation -->
    <div class="secondary-nav">
      <div class="secondary-title">Our services</div>
      <ul class="nav-list secondary-list">
        {#each secondaryItems as item}
          <li class="nav-item secondary-item">
            <a
              href={item.href}
              class="nav-link secondary"
              on:click={(e) => handleNavClick(e, item)}
            >
              <span>{item.label}</span>
              {#if item.logo}
                <img src={item.logo} alt="" class="nav-logo" style="height: {item.logoHeight}px" />
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </div>

  </nav>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 998;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .navigation-menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 400px;
    max-width: 100vw;
    background: #2a2a2a;
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
  }

  .close-btn {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all var(--transition-fast);
    color: white;
    z-index: 10;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .close-btn svg {
    width: 32px;
    height: 32px;
  }

  .nav-list {
    list-style: none;
    margin: 0;
    padding: calc(var(--space-16) + var(--space-4)) 0 var(--space-8) 0;
  }

  .nav-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .secondary-nav {
    margin-top: var(--space-4);
    background: rgba(0, 0, 0, 0.15);
  }

  .secondary-title {
    font-size: var(--text-xs);
    font-weight: var(--font-bold);
    color: rgba(255, 255, 255, 0.35);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: var(--space-3) var(--space-6) var(--space-3);
  }

  .secondary-list {
    padding: 0 0 var(--space-4) 0;
  }

  .secondary-item {
    border-bottom: none;
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-4) var(--space-6);
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: var(--text-lg);
    font-weight: var(--font-medium);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all var(--transition-fast);
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.05);
    padding-left: calc(var(--space-6) + 4px);
  }

  .nav-link.secondary {
    font-size: var(--text-base);
    padding: var(--space-3) var(--space-6);
    opacity: 0.8;
  }

  .nav-logo {
    width: auto;
    opacity: 0.85;
  }

  .nav-flag {
    color: #d4af37;
    font-weight: var(--font-bold);
    margin-left: 0.15em;
  }

  /* Mobile Styles */
  @media (max-width: 480px) {
    .navigation-menu {
      width: 100%;
    }
  }
</style>