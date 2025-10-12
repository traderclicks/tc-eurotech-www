<script lang="ts">
  import { modal } from '$lib/stores/modal';
  import Button from './Button.svelte';
  import NavigationMenu from './NavigationMenu.svelte';

  export let isScrolled = false;
  export let hasHero = false;

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function openContactModal() {
    modal.form({ title: 'Get a Quote' });
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
    justify-content: space-between;
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
    gap: var(--space-4);
    margin-left: auto;
    position: relative;
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
  }

</style>