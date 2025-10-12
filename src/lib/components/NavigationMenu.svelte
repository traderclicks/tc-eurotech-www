<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { modal } from '$lib/stores/modal';

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

  function openContactModal() {
    closeMenu();
    modal.form({ title: 'Get a Quote' });
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

    <!-- Bottom Section -->
    <div class="menu-footer">
      <button class="quote-btn" on:click={openContactModal}>
        Get a Quote
      </button>

      <div class="contact-info">
        <a href="tel:095731093" class="contact-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
          (09) 573 1093
        </a>
        <a href="mailto:info@eurotech.co.nz" class="contact-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
          info@eurotech.co.nz
        </a>
      </div>
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

  .menu-footer {
    padding: var(--space-6);
    border-top: 1px solid #3A352F;
    background: rgba(0, 0, 0, 0.3);
  }

  .quote-btn {
    width: 100%;
    padding: var(--space-4);
    background: #000000;
    color: white;
    border: none;
    border-radius: 0;
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: background var(--transition-fast);
    margin-bottom: var(--space-4);
  }

  .quote-btn:hover {
    background: #1a1a1a;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: var(--text-sm);
    transition: color var(--transition-fast);
  }

  .contact-link:hover {
    color: white;
  }

  /* Mobile Styles */
  @media (max-width: 480px) {
    .navigation-menu {
      width: 100%;
    }
  }
</style>