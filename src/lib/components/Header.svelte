<script lang="ts">
  import { fade, scale } from 'svelte/transition';
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
        <!-- Location Button -->
        <button class="header-link location-btn" on:click={toggleLocation}>
          Mount Wellington
        </button>

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

<!-- Location Modal -->
{#if isLocationOpen}
  <div class="modal-overlay" on:click={toggleLocation} transition:fade={{ duration: 200 }}>
    <div class="modal-content" on:click|stopPropagation transition:scale={{ duration: 200, start: 0.95 }}>
      <button class="modal-close" on:click={toggleLocation} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="modal-image-wrapper">
        <img src="/images/DSC00931.jpg" alt="Eurotech Auto Repair Centre Building" class="modal-image" />
        <div class="modal-image-overlay"></div>
      </div>

      <div class="modal-body">
        <h3 class="modal-title">Eurotech Auto Repair Center</h3>
        <div class="modal-address">
          6 Sylvia Park Road<br>
          Mount Wellington<br>
          Auckland 1060<br>
          New Zealand
        </div>

        <div class="modal-contact">
          <div class="contact-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <a href="tel:095731093">(09) 573 1093</a>
          </div>
          <div class="contact-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <a href="mailto:info@eurotech.co.nz">info@eurotech.co.nz</a>
          </div>
          <div class="contact-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>Mon-Fri: 8:00 AM - 5:00 PM</span>
          </div>
        </div>

        <a href="https://maps.app.goo.gl/UBNDpYGwr4AKyjq38" target="_blank" rel="noopener noreferrer" class="modal-maps-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Open in Google Maps
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #08141a;
    z-index: var(--z-sticky);
    transition: all var(--transition-base);
  }

  .header.scrolled {
    background: #08141a;
    position: fixed;
  }

  /* Black header for pages without hero */
  .header.no-hero {
    background: #08141a;
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
    margin-left: calc(var(--space-12) * 2);
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
    text-decoration-thickness: 3px;
    text-underline-offset: 5px;
    font-size: var(--text-base);
    font-weight: normal;
    transition: opacity var(--transition-fast);
    padding: var(--space-2);
    border-radius: var(--radius-md);
    opacity: 0.9;
  }

  .header-link:hover {
    opacity: 0.7;
    text-decoration: none;
  }

  .location-btn {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-4);
  }

  .modal-content {
    position: relative;
    background: #f5f5f5;
    backdrop-filter: blur(10px);
    border-radius: var(--radius-lg);
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .modal-close {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all var(--transition-fast);
    color: white;
    z-index: 10;
  }

  .modal-close:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: rotate(90deg);
  }

  .modal-image-wrapper {
    position: relative;
  }

  .modal-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  .modal-image-overlay {
    position: absolute;
    inset: 0;
    background: rgba(8, 20, 26, 0.15);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }

  .modal-body {
    padding: var(--space-8);
  }

  .modal-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: #1a1a1a;
    margin-bottom: var(--space-4);
  }

  .modal-address {
    color: #4a4a4a;
    font-size: var(--text-xl);
    line-height: 1.8;
    margin-bottom: var(--space-6);
  }

  .modal-contact {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
    padding: var(--space-4);
  }

  .contact-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: #4a4a4a;
    font-size: var(--text-lg);
  }

  .contact-row svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  .contact-row a {
    color: #4a4a4a;
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .contact-row a:hover {
    color: var(--color-primary);
  }

  .modal-maps-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    width: 100%;
    padding: var(--space-3) var(--space-8);
    background: #1a1a1a;
    color: white;
    text-decoration: none;
    border-radius: var(--radius-full);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    transition: all var(--transition-base);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .modal-maps-btn:hover {
    background: #000000;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .modal-maps-btn svg {
    width: 24px;
    height: 24px;
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