<script lang="ts">
  import { modal } from '$lib/stores/modal';
  import Button from './Button.svelte';
  import NavigationMenu from './NavigationMenu.svelte';

  export let isScrolled = false;
  export let hasHero = false;

  let isMenuOpen = false;
  let isLocationOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function openContactModal() {
    modal.form({ title: 'Get a Quote' });
  }

  function toggleLocation() {
    isLocationOpen = !isLocationOpen;
  }
</script>

<header class="header" class:scrolled={isScrolled} class:no-hero={!hasHero}>
  <!-- Menu Toggle (Outside Container) -->
  <button
    class="menu-toggle"
    on:click={toggleMenu}
    aria-label="Toggle menu"
    aria-expanded={isMenuOpen}
  >
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <line x1="6" y1="14" x2="42" y2="14" stroke="currentColor" stroke-width="3.5"/>
      <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" stroke-width="3.5"/>
      <line x1="6" y1="34" x2="42" y2="34" stroke="currentColor" stroke-width="3.5"/>
    </svg>
  </button>

  <nav class="nav">
    <div class="container nav-container">
      <!-- Main Logo (Left) -->
      <a href="/" class="logo">
        <img src="/eurotech-main-logo.png" alt="Eurotech Auto Repair Centre" />
      </a>

      <!-- Right side items -->
      <div class="nav-right">
        <!-- Location Dropdown -->
        <div class="location-dropdown">
          <button class="header-link location-btn" on:click={toggleLocation}>
            Mount Wellington
          </button>

          {#if isLocationOpen}
            <div class="dropdown-content">
              <div class="address">
                <strong>Eurotech Auto Repair Centre</strong><br>
                6 Sylvia Park Road<br>
                Mount Wellington<br>
                Auckland 1060<br>
                New Zealand
              </div>
            </div>
          {/if}
        </div>

        <span class="separator">•</span>

        <!-- Phone Link -->
        <a href="tel:095731093" class="header-link phone-link">
          (09) 573 1093
        </a>
      </div>
    </div>
  </nav>
</header>

<!-- Navigation Menu Component -->
<NavigationMenu bind:isOpen={isMenuOpen} />

<style>
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #000000;
    z-index: var(--z-sticky);
    transition: all var(--transition-base);
  }

  .header.scrolled {
    background: #000000;
    position: fixed;
  }

  /* Black header for pages without hero */
  .header.no-hero {
    background: #000000;
    position: sticky;
  }

  .header.no-hero .menu-toggle {
    color: white;
  }

  .nav {
    height: 110px;
    padding: 0;
  }

  .nav-container {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-weight: var(--font-bold);
    font-size: var(--text-xl);
    color: var(--text-primary);
    text-decoration: none;
  }

  .logo img {
    height: 99px;
    width: auto;
    margin-top: calc(var(--space-2) / -2);
    margin-bottom: calc(var(--space-2) / -2);
  }


  .nav-right {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-left: var(--space-6);
    position: relative;
  }

  .separator {
    color: white;
    opacity: 0.5;
    font-size: var(--text-sm);
  }

  .header-link {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: underline;
    text-decoration-color: rgba(255, 255, 255, 0.4);
    text-decoration-thickness: 2px;
    text-underline-offset: 5px;
    font-size: var(--text-sm);
    font-weight: normal;
    transition: opacity var(--transition-fast);
    padding: var(--space-2);
    border-radius: var(--radius-md);
  }

  .header-link:hover {
    opacity: 0.8;
  }

  .location-dropdown {
    position: relative;
  }

  .location-btn {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--space-2);
    background: white;
    border-radius: var(--radius-md);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: var(--space-4);
    min-width: 250px;
    z-index: 100;
  }

  .address {
    color: #1a1a1a;
    font-size: var(--text-sm);
    line-height: 1.6;
  }

  .address strong {
    display: block;
    margin-bottom: var(--space-2);
    font-size: var(--text-base);
  }

  /* Menu Toggle Button */
  .menu-toggle {
    position: absolute;
    left: 28px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    padding: 0;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    transition: all var(--transition-fast);
    z-index: 10;
  }

  .menu-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .header.scrolled .menu-toggle {
    color: white;
  }

  .header.scrolled .menu-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .menu-toggle svg {
    width: 48px;
    height: 48px;
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .logo img {
      height: 60px;
    }

    .nav-right {
      display: none;
    }
  }

</style>