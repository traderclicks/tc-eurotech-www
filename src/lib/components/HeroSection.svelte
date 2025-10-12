<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import Button from './Button.svelte';

  export let title = '';
  export let subtitle = '';
  export let description = '';
  export let primaryCTA = { text: 'Get Started', action: null };
  export let secondaryCTA = { text: 'Learn More', href: '#' };
  export let trustIndicators = [];
  export let heroImage = '/images/hero-mockup.svg';
  export let heroImageAlt = 'Hero image';
  export let isVisible = false;
</script>

<section class="hero">
  <div class="container">
    {#if isVisible}
      <div class="hero-content" in:fade={{ delay: 100, duration: 800 }}>
        <h1 class="hero-title">
          {title}
          {#if subtitle}
            <span class="hero-gradient">{subtitle}</span>
          {/if}
        </h1>

        {#if description}
          <p class="hero-description">{description}</p>
        {/if}

        <div class="hero-cta">
          {#if primaryCTA.action}
            <Button variant="primary" size="large" on:click={primaryCTA.action}>
              {primaryCTA.text}
            </Button>
          {:else if primaryCTA.href}
            <Button variant="primary" size="large" href={primaryCTA.href}>
              {primaryCTA.text}
            </Button>
          {/if}

          {#if secondaryCTA.href}
            <Button variant="outline" size="large" href={secondaryCTA.href}>
              {secondaryCTA.text}
            </Button>
          {/if}
        </div>

        <!-- Trust Indicators -->
        {#if trustIndicators.length > 0}
          <div class="hero-trust" in:fly={{ y: 20, delay: 400, duration: 600 }}>
            {#each trustIndicators as indicator}
              <div class="trust-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-success)">
                  <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" fill="none" />
                </svg>
                <span>{indicator}</span>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Hero Image/Graphic -->
      {#if heroImage}
        <div class="hero-visual" in:scale={{ delay: 300, duration: 800 }}>
          <div class="hero-image">
            <img src={heroImage} alt={heroImageAlt} />
          </div>
        </div>
      {/if}
    {/if}
  </div>
</section>

<style>
  .hero {
    padding: var(--space-20) 0;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    min-height: 80vh;
    display: flex;
    align-items: center;
  }

  .hero-content {
    max-width: 600px;
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: var(--font-extrabold);
    line-height: 1.1;
    margin-bottom: var(--space-6);
  }

  .hero-gradient {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }

  .hero-description {
    font-size: var(--text-xl);
    color: var(--text-secondary);
    margin-bottom: var(--space-8);
    line-height: var(--leading-relaxed);
  }

  .hero-cta {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
    margin-bottom: var(--space-8);
  }

  .hero-trust {
    display: flex;
    gap: var(--space-6);
    flex-wrap: wrap;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-secondary);
  }

  .hero-visual {
    display: none;
  }

  .hero-image img {
    max-width: 100%;
    height: auto;
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .hero {
      padding: var(--space-12) 0;
      min-height: auto;
    }

    .hero-cta {
      flex-direction: column;
      align-items: stretch;
    }

    .hero-trust {
      flex-direction: column;
      gap: var(--space-3);
    }
  }

  @media (min-width: 768px) {
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-12);
      align-items: center;
    }

    .hero-visual {
      display: block;
    }
  }
</style>