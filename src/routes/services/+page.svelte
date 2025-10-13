<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import HeroSlider from '$lib/components/HeroSlider.svelte';
  import ReviewCarousel from '$lib/components/ReviewCarousel.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import { modal } from '$lib/stores/modal';

  // This is a template page - customize these props for each service
  export let data: {
    serviceName: string;
    title: string;
    subtitle?: string;
    description: string;
    heroImages: string[];
    metaDescription: string;
    keywords: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };

  function openContactModal() {
    modal.form({ title: `Get a Quote - ${data.serviceName}` });
  }

  const heroConfig = {
    title: data.title,
    subtitle: data.subtitle || '',
    description: data.description,
    images: data.heroImages,
    primaryCTA: {
      text: 'Get a Quote',
      action: openContactModal
    },
    secondaryCTA: {
      text: 'Call (09) 573 1093',
      href: 'tel:095731093'
    },
    showLogoBar: true
  };
</script>

<Meta
  title="{data.serviceName} Specialist - Eurotech Auto Repair Centre"
  description={data.metaDescription}
  keywords={data.keywords}
/>

<!-- Hero Section with Slider -->
<HeroSlider {...heroConfig} />

<!-- Service Features Section -->
<section class="section bg-light">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="section-title">Why Choose Eurotech for {data.serviceName}?</h2>
    </div>

    <div class="features-grid">
      {#each data.features as feature}
        <div class="feature-card">
          <div class="feature-icon" aria-hidden="true">
            {@html feature.icon}
          </div>
          <h3 class="feature-title">{feature.title}</h3>
          <p class="feature-description">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Service Details Section -->
<section class="section">
  <div class="container">
    <div class="content-wrapper">
      <slot name="service-details">
        <!-- Default content or pass custom content via slot -->
        <h2>Our {data.serviceName} Services</h2>
        <p>Eurotech provides comprehensive repair and maintenance services for {data.serviceName} vehicles.</p>
      </slot>
    </div>
  </div>
</section>

<!-- Google Reviews Section -->
<section class="section bg-dark reviews-section">
  <div class="container">
    <div class="section-header text-inverse">
      <h2 class="section-title reviews-title">
        What Our Customers Say
        <span class="title-separator">|</span>
        <span class="google-rating">
          <img src="/icons/google.svg" alt="Google" class="google-logo-inline" />
          <span class="star filled">★</span>
          4.7 (64 reviews)
        </span>
      </h2>
    </div>
  </div>
  <ReviewCarousel />
</section>

<!-- FAQ Section -->
<section class="section bg-secondary">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>
    <div class="faq-container">
      <FAQ items={data.faqs} />
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="section bg-light">
  <div class="container">
    <div class="cta-box">
      <h2 class="cta-title">Ready to Book Your {data.serviceName} Service?</h2>
      <p class="cta-text">Contact us today for expert {data.serviceName} repairs and maintenance.</p>
      <div class="cta-actions">
        <button class="btn btn-primary" on:click={openContactModal}>Get a Quote</button>
        <a href="tel:095731093" class="btn btn-secondary">Call (09) 573 1093</a>
      </div>
    </div>
  </div>
</section>

<style>
  .section {
    padding: var(--space-16) 0;
  }

  .bg-light {
    background: #f5f5f5;
  }

  .bg-dark {
    background: #1a1a1a;
  }

  .bg-secondary {
    background: var(--bg-secondary);
  }

  .section-header {
    margin-bottom: var(--space-12);
  }

  .text-center {
    text-align: center;
  }

  .text-inverse {
    color: var(--text-inverse);
  }

  .text-inverse .section-title {
    color: var(--text-inverse);
  }

  .section-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  .reviews-title {
    font-size: var(--text-lg);
  }

  .title-separator {
    margin: 0 var(--space-4);
    opacity: 0.5;
  }

  .google-rating {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 0.8em;
    font-weight: normal;
  }

  .google-logo-inline {
    height: 1.3em;
    width: auto;
    filter: brightness(0) invert(1);
  }

  .google-rating .star {
    color: #fbbc04;
    font-size: 1.3em;
  }

  .reviews-section {
    padding-bottom: var(--space-8);
  }

  .reviews-section .section-header {
    margin-bottom: var(--space-6);
  }

  /* Features Grid */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
  }

  .feature-card {
    background: white;
    padding: var(--space-8);
    border-radius: var(--radius-lg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    text-align: center;
  }

  .feature-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto var(--space-4);
    color: var(--color-primary);
  }

  .feature-icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .feature-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-2);
  }

  .feature-description {
    font-size: var(--text-base);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
  }

  /* Content Wrapper */
  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }

  .content-wrapper :global(h2) {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .content-wrapper :global(p) {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  /* FAQ Container */
  .faq-container {
    max-width: 800px;
    margin: 0 auto;
  }

  /* CTA Box */
  .cta-box {
    background: white;
    padding: var(--space-12);
    border-radius: var(--radius-xl);
    text-align: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .cta-title {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .cta-text {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    margin-bottom: var(--space-8);
  }

  .cta-actions {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: var(--space-3) var(--space-8);
    border-radius: var(--radius-full);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    text-decoration: none;
    display: inline-block;
    border: none;
  }

  .btn-primary {
    background: var(--color-primary);
    color: white;
  }

  .btn-primary:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .btn-secondary {
    background: white;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  .btn-secondary:hover {
    background: var(--color-primary);
    color: white;
  }

  @media (max-width: 768px) {
    .section {
      padding: var(--space-8) 0;
    }

    .section-title {
      font-size: var(--text-2xl);
    }

    .features-grid {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

    .cta-box {
      padding: var(--space-8);
    }

    .cta-title {
      font-size: var(--text-2xl);
    }

    .cta-actions {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }
  }
</style>
