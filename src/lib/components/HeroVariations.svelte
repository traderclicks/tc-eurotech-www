<script lang="ts">
  import Button from './Button.svelte';
  import { photoPlaceholder, gradientPlaceholder } from '$lib/utils/placeholders';
  import { fly, fade } from 'svelte/transition';

  export let variant: 'minimal' | 'stats' | 'video' | 'particles' | 'angled' | 'cards' = 'minimal';
  export let title = 'Hero Title';
  export let subtitle = 'Subtitle Text';
  export let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  export let primaryAction = { text: 'Get Started', href: '#' };
  export let secondaryAction = { text: 'Learn More', href: '#' };
  export let backgroundImage = photoPlaceholder(1920, 800, 'hero-bg');

  // Sample stats for stats variant
  const stats = [
    { value: '99%', label: 'Satisfaction' },
    { value: '24/7', label: 'Support' },
    { value: '10K+', label: 'Users' },
    { value: '150+', label: 'Countries' }
  ];

  // Sample cards for cards variant
  const cards = [
    { icon: '🚀', title: 'Fast Setup', description: 'Get started in minutes' },
    { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
    { icon: '📈', title: 'Scalable', description: 'Grow with your needs' }
  ];
</script>

{#if variant === 'minimal'}
  <!-- Minimal Hero: Clean, centered, focus on typography -->
  <section class="hero hero-minimal">
    <div class="hero-bg-gradient"></div>
    <div class="container hero-content">
      <h1 class="hero-title-minimal" in:fade={{ delay: 100, duration: 800 }}>
        {title}
      </h1>
      <p class="hero-description-minimal" in:fade={{ delay: 200, duration: 800 }}>
        {description}
      </p>
      <div class="hero-actions" in:fade={{ delay: 300, duration: 800 }}>
        <Button variant="primary" size="large" href={primaryAction.href}>
          {primaryAction.text}
        </Button>
      </div>
    </div>
  </section>

{:else if variant === 'stats'}
  <!-- Stats Hero: Hero with key metrics -->
  <section class="hero hero-stats">
    <div class="hero-bg-image" style="background-image: url({backgroundImage})"></div>
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="hero-text">
        <h1 class="hero-title" in:fly={{ y: 20, delay: 100, duration: 600 }}>
          {title}
        </h1>
        <p class="hero-description" in:fly={{ y: 20, delay: 200, duration: 600 }}>
          {description}
        </p>
        <div class="hero-actions" in:fly={{ y: 20, delay: 300, duration: 600 }}>
          <Button variant="primary" size="large" href={primaryAction.href}>
            {primaryAction.text}
          </Button>
          <Button variant="outline" size="large" href={secondaryAction.href}>
            {secondaryAction.text}
          </Button>
        </div>
      </div>
      <div class="hero-stats" in:fly={{ x: 20, delay: 400, duration: 600 }}>
        {#each stats as stat}
          <div class="stat-item">
            <div class="stat-value">{stat.value}</div>
            <div class="stat-label">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

{:else if variant === 'video'}
  <!-- Video Background Hero -->
  <section class="hero hero-video">
    <div class="hero-video-wrapper">
      <div class="hero-video-placeholder">
        <img src={backgroundImage} alt="Video placeholder" />
        <div class="play-button">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
      </div>
    </div>
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <h1 class="hero-title" in:fade={{ delay: 100, duration: 800 }}>
        {title}
      </h1>
      <p class="hero-description" in:fade={{ delay: 200, duration: 800 }}>
        {description}
      </p>
      <div class="hero-actions" in:fade={{ delay: 300, duration: 800 }}>
        <Button variant="secondary" size="large" href={primaryAction.href}>
          {primaryAction.text}
        </Button>
      </div>
    </div>
  </section>

{:else if variant === 'particles'}
  <!-- Particles/Animation Hero -->
  <section class="hero hero-particles">
    <div class="particles-bg">
      {#each Array(20) as _, i}
        <div class="particle" style="--delay: {i * 0.5}s; --duration: {10 + i}s"></div>
      {/each}
    </div>
    <div class="container hero-content">
      <div class="hero-badge" in:fly={{ y: -20, delay: 100, duration: 600 }}>
        {subtitle}
      </div>
      <h1 class="hero-title-gradient" in:fly={{ y: 20, delay: 200, duration: 600 }}>
        {title}
      </h1>
      <p class="hero-description" in:fly={{ y: 20, delay: 300, duration: 600 }}>
        {description}
      </p>
      <div class="hero-actions" in:fly={{ y: 20, delay: 400, duration: 600 }}>
        <Button variant="primary" size="large" href={primaryAction.href}>
          {primaryAction.text}
        </Button>
      </div>
    </div>
  </section>

{:else if variant === 'angled'}
  <!-- Angled/Geometric Hero -->
  <section class="hero hero-angled">
    <div class="hero-bg-angled">
      <div class="angle-left"></div>
      <div class="angle-right"></div>
    </div>
    <div class="container hero-content">
      <div class="hero-grid">
        <div class="hero-text">
          <h1 class="hero-title" in:fly={{ x: -20, delay: 100, duration: 600 }}>
            {title}
          </h1>
          <p class="hero-description" in:fly={{ x: -20, delay: 200, duration: 600 }}>
            {description}
          </p>
          <div class="hero-actions" in:fly={{ x: -20, delay: 300, duration: 600 }}>
            <Button variant="primary" size="large" href={primaryAction.href}>
              {primaryAction.text}
            </Button>
          </div>
        </div>
        <div class="hero-graphic" in:fly={{ x: 20, delay: 400, duration: 600 }}>
          <img src={photoPlaceholder(600, 400, 'hero-graphic')} alt="Hero graphic" />
        </div>
      </div>
    </div>
  </section>

{:else if variant === 'cards'}
  <!-- Cards Hero: Hero with feature cards -->
  <section class="hero hero-cards">
    <div class="hero-bg-gradient"></div>
    <div class="container hero-content">
      <h1 class="hero-title" in:fade={{ delay: 100, duration: 800 }}>
        {title}
      </h1>
      <p class="hero-description" in:fade={{ delay: 200, duration: 800 }}>
        {description}
      </p>
      <div class="hero-actions" in:fade={{ delay: 300, duration: 800 }}>
        <Button variant="primary" size="large" href={primaryAction.href}>
          {primaryAction.text}
        </Button>
      </div>
      <div class="hero-cards" in:fly={{ y: 20, delay: 400, duration: 600 }}>
        {#each cards as card, i}
          <div class="hero-card" in:fly={{ y: 20, delay: 500 + i * 100, duration: 600 }}>
            <div class="card-icon">{card.icon}</div>
            <h3 class="card-title">{card.title}</h3>
            <p class="card-description">{card.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>
{/if}

<style>
  /* Base Hero Styles */
  .hero {
    position: relative;
    overflow: hidden;
    min-height: 600px;
    display: flex;
    align-items: center;
    padding: var(--space-20) 0;
  }

  .hero-content {
    position: relative;
    z-index: 10;
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: var(--font-extrabold);
    line-height: 1.1;
    margin-bottom: var(--space-6);
    color: white;
  }

  .hero-description {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-8);
    max-width: 600px;
    color: rgba(255, 255, 255, 0.9);
  }

  .hero-actions {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  .hero-bg-image {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
  }

  /* Minimal Variant */
  .hero-minimal {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    text-align: center;
  }

  .hero-minimal .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-title-minimal {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: var(--font-extrabold);
    line-height: 1;
    margin-bottom: var(--space-6);
    color: white;
  }

  .hero-description-minimal {
    font-size: var(--text-2xl);
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--space-8);
  }

  .hero-minimal .hero-actions {
    justify-content: center;
  }

  /* Stats Variant */
  .hero-stats .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  .hero-stats .hero-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }

  .stat-item {
    text-align: center;
    padding: var(--space-4);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .stat-value {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: white;
    margin-bottom: var(--space-2);
  }

  .stat-label {
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.7);
  }

  /* Video Variant */
  .hero-video {
    background: var(--bg-primary);
  }

  .hero-video-wrapper {
    position: absolute;
    inset: 0;
  }

  .hero-video-placeholder {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .hero-video-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .play-button:hover {
    background: var(--color-primary);
    transform: translate(-50%, -50%) scale(1.1);
  }

  .hero-video .hero-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }

  /* Particles Variant */
  .hero-particles {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    text-align: center;
  }

  .particles-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: var(--radius-full);
    animation: float var(--duration) ease-in-out infinite;
    animation-delay: var(--delay);
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(100px);
      opacity: 0;
    }
  }

  .hero-badge {
    display: inline-block;
    padding: var(--space-2) var(--space-4);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: white;
    margin-bottom: var(--space-4);
  }

  .hero-title-gradient {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: var(--font-extrabold);
    background: linear-gradient(135deg, white 0%, rgba(255,255,255,0.7) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: var(--space-6);
  }

  /* Angled Variant */
  .hero-angled {
    background: var(--bg-primary);
  }

  .hero-bg-angled {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .angle-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: var(--color-primary);
    transform: skewX(-10deg);
    transform-origin: top right;
  }

  .angle-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%);
    transform: skewX(-10deg);
    transform-origin: top left;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  .hero-angled .hero-title {
    color: var(--text-primary);
  }

  .hero-angled .hero-description {
    color: var(--text-secondary);
  }

  .hero-graphic img {
    width: 100%;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2xl);
  }

  /* Cards Variant */
  .hero-cards {
    background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    text-align: center;
    padding-bottom: var(--space-24);
  }

  .hero-cards .hero-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .hero-cards .hero-title {
    color: var(--text-primary);
  }

  .hero-cards .hero-description {
    color: var(--text-secondary);
    margin: 0 auto var(--space-8);
  }

  .hero-cards .hero-actions {
    justify-content: center;
    margin-bottom: var(--space-12);
  }

  .hero-cards .hero-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
    margin-top: var(--space-12);
  }

  .hero-card {
    padding: var(--space-6);
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-base);
  }

  .hero-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  .card-icon {
    font-size: 3rem;
    margin-bottom: var(--space-4);
  }

  .card-title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    margin-bottom: var(--space-2);
  }

  .card-description {
    color: var(--text-secondary);
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .hero {
      padding: var(--space-12) 0;
    }

    .hero-stats .hero-content,
    .hero-grid {
      grid-template-columns: 1fr;
    }

    .hero-stats .hero-stats {
      margin-top: var(--space-8);
    }

    .hero-cards .hero-cards {
      grid-template-columns: 1fr;
    }

    .hero-actions {
      flex-direction: column;
    }

    .hero-graphic {
      display: none;
    }
  }

  /* Gradient Background Helper */
  .hero-bg-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    opacity: 0.95;
  }
</style>