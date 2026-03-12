<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fly } from 'svelte/transition';
  import StatsGrid from './StatsGrid.svelte';
  import HeroCTAButtons from './HeroCTAButtons.svelte';

  export let title: string;
  export let subtitle: string = '';
  export let description: string = '';
  export let images: string[] = [];
  export let showLogoBar: boolean = true;
  export let minHeight: number = 700;

  let isVisible = false;
  let currentSlide = 0;
  let isTransitioning = true;
  let slideInterval: number | null = null;
  let trackEl: HTMLDivElement;

  // Repeat images 10 times for longer slideshow before reset
  const heroBackgrounds = Array(10).fill(images).flat();
  const totalSlides = heroBackgrounds.length;

  // Calculate widths dynamically based on number of slides
  const totalSlidesWithDuplicate = totalSlides + 1;
  const trackWidth = totalSlidesWithDuplicate * 100;
  const slideWidth = 100 / totalSlidesWithDuplicate;

  function nextSlide() {
    currentSlide++;

    if (currentSlide === totalSlides) {
      setTimeout(() => {
        isTransitioning = false;
        void trackEl?.offsetHeight;
        currentSlide = 0;

        requestAnimationFrame(() => {
          isTransitioning = true;
        });
      }, 800);
    }
  }

  function prevSlide() {
    if (currentSlide === 0) {
      isTransitioning = false;
      currentSlide = totalSlides;
      void trackEl?.offsetHeight;

      requestAnimationFrame(() => {
        isTransitioning = true;
        currentSlide = totalSlides - 1;
      });
    } else {
      currentSlide--;
    }
  }

  onMount(() => {
    isVisible = true;
    slideInterval = setInterval(nextSlide, 6000) as unknown as number;
  });

  onDestroy(() => {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  });
</script>

<section class="hero" style="min-height: {minHeight}px">
  <div class="hero-slider-track" bind:this={trackEl} style="width: {trackWidth}%; transform: translateX(-{currentSlide * slideWidth}%); transition: {isTransitioning ? 'transform 0.8s ease-in-out' : 'none'}">
    {#each [...heroBackgrounds, heroBackgrounds[0]] as bg, i}
      <div
        class="hero-background"
        style="flex: 0 0 {slideWidth}%; width: {slideWidth}%; background-image: url('{bg}')"
      ></div>
    {/each}
  </div>
  <div class="hero-overlay"></div>

  <!-- Slider Controls -->
  <button class="hero-nav-btn prev" on:click={prevSlide} aria-label="Previous slide">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  <button class="hero-nav-btn next" on:click={nextSlide} aria-label="Next slide">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>

  <div class="container hero-container">
    {#if isVisible}
      <div class="hero-content" in:fly={{ y: 20, duration: 800, delay: 100 }}>
        <HeroCTAButtons />

        <h1 class="hero-title">
          {title}
          {#if subtitle}
            <span class="hero-gradient">{subtitle}</span>
          {/if}
        </h1>
      </div>
    {/if}
  </div>

  <!-- White background block for half-on-half effect -->
  <div class="hero-white-block"></div>

  <!-- Logo Bar Section inside Hero -->
  {#if showLogoBar && description}
    <div class="logo-bar">
      <StatsGrid backgroundColor="transparent" textColor="white" description={description} />
    </div>
  {/if}
</section>

<style>
  /* Hero Section Styles */
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding-bottom: var(--space-8);
  }

  .hero-slider-track {
    position: absolute;
    inset: 0;
    display: flex;
    height: 100%;
    z-index: 0;
  }

  .hero-background {
    height: 100%;
    background-size: cover;
    background-position: center 65%;
    background-repeat: no-repeat;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 60%, rgba(0, 0, 0, 0.8) 100%);
    z-index: 1;
  }

  .hero-container {
    position: relative;
    z-index: 2;
  }

  .hero-content {
    color: white;
    text-align: center;
    margin-top: 0;
    position: relative;
    padding: var(--space-16);
    border-radius: var(--radius-2xl);
  }

  .hero-content::before {
    content: '';
    position: absolute;
    inset: -20%;
    background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, transparent 70%);
    border-radius: inherit;
    z-index: -1;
  }

  .hero-white-block {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: var(--bg-content);
    z-index: 2;
  }

  .logo-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    padding-top: calc(var(--space-12) * 1.5);
  }

  .logo-bar :global(.logo-bar-section) {
    background: transparent !important;
  }

  .hero-title {
    font-size: clamp(3rem, 7vw, 5rem);
    font-weight: var(--font-extrabold);
    line-height: 1.1;
    margin-bottom: var(--space-6);
    color: white;
  }

  .hero-gradient {
    display: block;
    color: white;
  }

  /* Hero Navigation Buttons */
  .hero-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: var(--radius-full);
    color: white;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    opacity: 1;
    transition: all var(--transition-fast);
  }

  .hero-nav-btn:hover {
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.7);
  }

  .hero-nav-btn.prev {
    left: var(--space-8);
  }

  .hero-nav-btn.next {
    right: var(--space-8);
  }

  @media (max-width: 768px) {
    .hero {
      min-height: 600px !important;
    }

    .hero-nav-btn {
      width: 40px;
      height: 40px;
    }

    .hero-nav-btn svg {
      width: 20px;
      height: 20px;
    }

    .hero-nav-btn.prev {
      left: var(--space-4);
    }

    .hero-nav-btn.next {
      right: var(--space-4);
    }
  }
</style>
