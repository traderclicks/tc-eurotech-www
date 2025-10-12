<script lang="ts">
  import { fly, fade } from 'svelte/transition';

  export let isOpen = false;

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Jaguar Repair', href: '#jaguar' },
    { label: 'Land Rover Repair', href: '#landrover' },
    { label: 'BMW Repair', href: '#bmw' },
    { label: 'Mini Repair', href: '#mini' },
    { label: 'Insurance Claims', href: '#insurance' },
  ];

  function closeMenu() {
    isOpen = false;
  }

  function handleNavClick() {
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
      {#each navItems as item}
        <li class="nav-item">
          <a
            href={item.href}
            class="nav-link"
            on:click={handleNavClick}
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>

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
    background: #5C544A;
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
    padding: calc(var(--space-16) + var(--space-4)) 0 var(--space-4) 0;
    flex: 1;
  }

  .nav-item {
    border-bottom: 1px solid #3A352F;
  }

  .nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-4) var(--space-6);
    color: white;
    text-decoration: none;
    font-size: var(--text-lg);
    font-weight: var(--font-regular);
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

  /* Mobile Styles */
  @media (max-width: 480px) {
    .navigation-menu {
      width: 100%;
    }
  }
</style>