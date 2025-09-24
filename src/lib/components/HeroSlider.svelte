<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import Button from './Button.svelte';
  import { photoPlaceholder, gradientPlaceholder } from '$lib/utils/placeholders';

  export let variant: 'full-width' | 'contained' | 'split' | 'parallax' | 'video-bg' = 'full-width';
  export let height: 'full' | 'large' | 'medium' | 'auto' = 'large';
  export let autoplay = true;
  export let interval = 5000;
  export let showIndicators = true;
  export let showArrows = true;
  export let transition: 'fade' | 'slide' | 'scale' = 'fade';

  // Default slides with placeholder images
  export let slides = [
    {
      id: 1,
      image: photoPlaceholder(1920, 800, 'hero-1'),
      title: 'Welcome to Our Platform',
      subtitle: 'Discover Amazing Features',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Build something amazing today.',
      primaryAction: { text: 'Get Started', href: '#' },
      secondaryAction: { text: 'Learn More', href: '#' },
      alignment: 'left' as 'left' | 'center' | 'right',
      overlay: true,
      overlayOpacity: 0.4
    },
    {
      id: 2,
      image: photoPlaceholder(1920, 800, 'hero-2'),
      title: 'Powerful Solutions',
      subtitle: 'For Modern Business',
      description: 'Streamline your workflow with our comprehensive toolkit designed for success.',
      primaryAction: { text: 'Start Free Trial', href: '#' },
      secondaryAction: { text: 'View Pricing', href: '#' },
      alignment: 'center' as 'left' | 'center' | 'right',
      overlay: true,
      overlayOpacity: 0.5
    },
    {
      id: 3,
      image: gradientPlaceholder(1920, 800, '#667eea', '#764ba2'),
      title: 'Innovation Driven',
      subtitle: 'Future Ready',
      description: 'Join thousands of companies already transforming their business.',
      primaryAction: { text: 'Contact Sales', href: '#' },
      alignment: 'right' as 'left' | 'center' | 'right',
      overlay: false,
      isGradient: true
    }
  ];

  let currentIndex = 0;
  let timer: ReturnType<typeof setInterval>;
  let isPaused = false;

  $: currentSlide = slides[currentIndex];

  // Height classes
  const heightClasses = {
    full: 'h-screen',
    large: 'h-[80vh]',
    medium: 'h-[60vh]',
    auto: 'h-auto min-h-[400px]'
  };

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
  }

  function prevSlide() {
    currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  }

  function goToSlide(index: number) {
    currentIndex = index;
    resetTimer();
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    if (autoplay && !isPaused) {
      timer = setInterval(nextSlide, interval);
    }
  }

  function handleMouseEnter() {
    isPaused = true;
    if (timer) clearInterval(timer);
  }

  function handleMouseLeave() {
    isPaused = false;
    resetTimer();
  }

  onMount(() => {
    if (autoplay) {
      timer = setInterval(nextSlide, interval);
    }
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });

  // Get transition functions
  function getTransition(type: string) {
    switch (type) {
      case 'slide':
        return { in: fly, out: fly, inProps: { x: 100, duration: 600 }, outProps: { x: -100, duration: 600 } };
      case 'scale':
        return { in: scale, out: scale, inProps: { duration: 600 }, outProps: { duration: 600 } };
      default:
        return { in: fade, out: fade, inProps: { duration: 600 }, outProps: { duration: 600 } };
    }
  }

  $: transitionFn = getTransition(transition);
</script>

<div
  class="hero-slider hero-slider--{variant} {heightClasses[height]}"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="region"
  aria-label="Hero carousel"
>
  {#each slides as slide, index}
    {#if index === currentIndex}
      <div
        class="slide"
        in:transitionFn.in={transitionFn.inProps}
        out:transitionFn.out={transitionFn.outProps}
      >
        <!-- Background Image/Video/Gradient -->
        {#if variant === 'video-bg' && slide.video}
          <video
            class="slide-bg slide-video"
            autoplay
            loop
            muted
            playsinline
          >
            <source src={slide.video} type="video/mp4">
          </video>
        {:else if slide.isGradient}
          <div
            class="slide-bg slide-gradient"
            style="background: {slide.image}"
          />
        {:else}
          <div
            class="slide-bg slide-image"
            style="background-image: url({slide.image})"
          />
        {/if}

        <!-- Overlay -->
        {#if slide.overlay && !slide.isGradient}
          <div
            class="slide-overlay"
            style="opacity: {slide.overlayOpacity || 0.5}"
          />
        {/if}

        <!-- Content Container -->
        <div class="slide-content slide-content--{slide.alignment || 'center'}">
          <div class="container">
            {#if variant === 'split'}
              <div class="split-layout">
                <div class="split-text">
                  {#if slide.subtitle}
                    <div class="slide-subtitle" in:fly={{ y: 20, delay: 100, duration: 600 }}>
                      {slide.subtitle}
                    </div>
                  {/if}
                  <h1 class="slide-title" in:fly={{ y: 20, delay: 200, duration: 600 }}>
                    {slide.title}
                  </h1>
                  {#if slide.description}
                    <p class="slide-description" in:fly={{ y: 20, delay: 300, duration: 600 }}>
                      {slide.description}
                    </p>
                  {/if}
                  <div class="slide-actions" in:fly={{ y: 20, delay: 400, duration: 600 }}>
                    {#if slide.primaryAction}
                      <Button
                        variant="primary"
                        size="large"
                        href={slide.primaryAction.href}
                      >
                        {slide.primaryAction.text}
                      </Button>
                    {/if}
                    {#if slide.secondaryAction}
                      <Button
                        variant="outline"
                        size="large"
                        href={slide.secondaryAction.href}
                      >
                        {slide.secondaryAction.text}
                      </Button>
                    {/if}
                  </div>
                </div>
                {#if slide.splitImage}
                  <div class="split-image">
                    <img src={slide.splitImage} alt={slide.title} />
                  </div>
                {/if}
              </div>
            {:else}
              <!-- Standard Layout -->
              {#if slide.subtitle}
                <div class="slide-subtitle" in:fly={{ y: 20, delay: 100, duration: 600 }}>
                  {slide.subtitle}
                </div>
              {/if}
              <h1 class="slide-title" in:fly={{ y: 20, delay: 200, duration: 600 }}>
                {slide.title}
              </h1>
              {#if slide.description}
                <p class="slide-description" in:fly={{ y: 20, delay: 300, duration: 600 }}>
                  {slide.description}
                </p>
              {/if}
              <div class="slide-actions" in:fly={{ y: 20, delay: 400, duration: 600 }}>
                {#if slide.primaryAction}
                  <Button
                    variant="primary"
                    size="large"
                    href={slide.primaryAction.href}
                  >
                    {slide.primaryAction.text}
                  </Button>
                {/if}
                {#if slide.secondaryAction}
                  <Button
                    variant="outline"
                    size="large"
                    href={slide.secondaryAction.href}
                  >
                    {slide.secondaryAction.text}
                  </Button>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  {/each}

  <!-- Navigation Arrows -->
  {#if showArrows && slides.length > 1}
    <button
      class="nav-arrow nav-arrow--prev"
      on:click={prevSlide}
      aria-label="Previous slide"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <button
      class="nav-arrow nav-arrow--next"
      on:click={nextSlide}
      aria-label="Next slide"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  {/if}

  <!-- Indicators -->
  {#if showIndicators && slides.length > 1}
    <div class="indicators">
      {#each slides as _, index}
        <button
          class="indicator"
          class:active={index === currentIndex}
          on:click={() => goToSlide(index)}
          aria-label="Go to slide {index + 1}"
        >
          <span class="indicator-progress" style="animation-duration: {interval}ms"></span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .hero-slider {
    position: relative;
    overflow: hidden;
    background: var(--bg-primary);
  }

  /* Height utilities */
  .h-screen { height: 100vh; }
  .h-\[80vh\] { height: 80vh; }
  .h-\[60vh\] { height: 60vh; }
  .h-auto { height: auto; }
  .min-h-\[400px\] { min-height: 400px; }

  /* Slide Styles */
  .slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .slide-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .slide-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .slide-video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .slide-gradient {
    width: 100%;
    height: 100%;
  }

  .slide-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
  }

  /* Content Styles */
  .slide-content {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 10;
    padding: var(--space-8) 0;
  }

  .slide-content--left {
    text-align: left;
  }

  .slide-content--center {
    text-align: center;
  }

  .slide-content--center .slide-actions {
    justify-content: center;
  }

  .slide-content--center .slide-description {
    margin-left: auto;
    margin-right: auto;
  }

  .slide-content--right {
    text-align: right;
  }

  .slide-content--right .slide-actions {
    justify-content: flex-end;
  }

  .slide-content--right .slide-description {
    margin-left: auto;
  }

  .slide-subtitle {
    font-size: var(--text-lg);
    color: var(--color-primary);
    margin-bottom: var(--space-3);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .slide-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: var(--font-extrabold);
    line-height: 1.1;
    margin-bottom: var(--space-6);
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .slide-description {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-8);
    max-width: 600px;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }

  .slide-actions {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  /* Split Layout Variant */
  .split-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  .split-image img {
    width: 100%;
    height: auto;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2xl);
  }

  /* Navigation Arrows */
  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
    z-index: 20;
  }

  .nav-arrow:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  .nav-arrow--prev {
    left: var(--space-6);
  }

  .nav-arrow--next {
    right: var(--space-6);
  }

  /* Indicators */
  .indicators {
    position: absolute;
    bottom: var(--space-6);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: var(--space-2);
    z-index: 20;
  }

  .indicator {
    width: 40px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
    overflow: hidden;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  .indicator.active {
    background: rgba(255, 255, 255, 0.5);
  }

  .indicator.active .indicator-progress {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: white;
    animation: progress linear forwards;
  }

  @keyframes progress {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  /* Variant: Contained */
  .hero-slider--contained .slide-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4);
  }

  /* Variant: Parallax */
  .hero-slider--parallax .slide-bg {
    transform: scale(1.1);
    transition: transform 10s ease-out;
  }

  .hero-slider--parallax:hover .slide-bg {
    transform: scale(1.2);
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .slide-title {
      font-size: clamp(2rem, 8vw, 3rem);
    }

    .slide-description {
      font-size: var(--text-base);
    }

    .slide-actions {
      flex-direction: column;
    }

    .nav-arrow {
      width: 40px;
      height: 40px;
    }

    .nav-arrow--prev {
      left: var(--space-3);
    }

    .nav-arrow--next {
      right: var(--space-3);
    }

    .split-layout {
      grid-template-columns: 1fr;
    }

    .split-image {
      display: none;
    }

    .indicators {
      bottom: var(--space-3);
    }
  }
</style>