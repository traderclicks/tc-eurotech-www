<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, scale } from 'svelte/transition';
  import { modal } from '$lib/stores/modal';
  import Meta from '$lib/components/Meta.svelte';
  import Button from '$lib/components/Button.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import FeatureCard from '$lib/components/FeatureCard.svelte';
  import TestimonialCard from '$lib/components/TestimonialCard.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import CTASection from '$lib/components/CTASection.svelte';
  import GoogleReviews from '$lib/components/GoogleReviews.svelte';
  import TrustBadges from '$lib/components/TrustBadges.svelte';
  import ClientLogos from '$lib/components/ClientLogos.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import StatsGrid from '$lib/components/StatsGrid.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import ReviewCarousel from '$lib/components/ReviewCarousel.svelte';
  import { PLACEHOLDERS, iconPlaceholder } from '$lib/utils/placeholders';
  import { generateFAQSchema, generateLocalBusinessSchema } from '$lib/utils/structuredData';

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });

  function openContactModal() {
    modal.form({ title: 'Get a Quote' });
  }

  // Eurotech Features
  const features = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 11H3v2h6v-2zm0-4H3v2h6V7zm0 8H3v2h6v-2zm12-4h-6v2h6v-2zm0-4h-6v2h6V7zm0 8h-6v2h6v-2z"/>
      </svg>`,
      title: 'Factory Authorized',
      description: 'New Zealand\'s only Jaguar/Land Rover factory-authorized structural repairer'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
        <path d="M3 3h18v2H3zm0 16h18v2H3zm0-8h18v2H3z"/>
      </svg>`,
      title: 'CRA Accredited',
      description: '20+ years experience with I-Car Gold certification and CRA accreditation'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>`,
      title: 'Insurance Approved',
      description: 'Trusted by all major insurance companies for quality repairs'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </svg>`,
      title: 'Latest Technology',
      description: 'State-of-the-art equipment ensuring precision repairs'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>`,
      title: '4.7★ Google Rating',
      description: '64+ reviews from satisfied customers averaging 4.7 stars'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 8V7l-3 2-3-2v1l3 2 3-2zm1-5H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm8-6h-8V6h8v6z"/>
      </svg>`,
      title: 'European Specialists',
      description: 'BMW, Jaguar, Land Rover, and Mini repair specialists'
    }
  ];

  // Real Testimonials from Eurotech
  const testimonials = [
    {
      name: 'Victor',
      role: 'BMW Owner',
      content: 'They know what they are doing. Great job.',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
      name: 'Lesley',
      role: 'Land Rover Owner',
      content: 'Have had a few vehicles repaired with Marino and his team, always friendly and efficient service with cars returned in excellent condition, thank you.',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      name: 'Eric',
      role: 'Jaguar Owner',
      content: 'The team at Eurotech have been brilliant repairing my 2 vehicles. They\'ve made it super easy with dealing with insurance etc and the repairs are exceptional!',
      avatar: 'https://i.pravatar.cc/150?img=11'
    },
    {
      name: 'George',
      role: 'BMW Owner',
      content: 'Great service and quality of workmanship.',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      name: 'Philip',
      role: 'Land Rover Owner',
      content: 'I was unfortunate to have to make a claim but have been stoked with the outcome. Thanks!',
      avatar: 'https://i.pravatar.cc/150?img=7'
    },
    {
      name: 'John',
      role: 'Mini Owner',
      content: 'Great service. Good communication. Happy client.',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ];

  const faqs = [
    {
      question: 'What brands do you specialize in?',
      answer: 'We are European vehicle specialists, focusing on BMW, Jaguar, Land Rover, and Mini. We are New Zealand\'s only factory-authorized Jaguar/Land Rover structural repairer.'
    },
    {
      question: 'Do you work with insurance companies?',
      answer: 'Yes, we work with all major insurance companies and can handle your claim from start to finish, making the process as smooth as possible for you.'
    },
    {
      question: 'What certifications do you have?',
      answer: 'We are CRA accredited, I-Car Gold certified, and MTA members. We\'re also the only factory-authorized Jaguar/Land Rover structural repairer in New Zealand.'
    },
    {
      question: 'Where are you located?',
      answer: 'We are located in Mount Wellington, Auckland. Our facility is equipped with the latest technology for European vehicle repairs.'
    },
    {
      question: 'How long have you been in business?',
      answer: 'Eurotech has been providing quality European vehicle repairs for over 20 years, building a reputation for excellence and reliability.'
    }
  ];

  const stats = [
    { number: '20+', label: 'Years Experience' },
    { number: '4.7★', label: 'Google Rating' },
    { number: '100%', label: 'Insurance Approved' },
    { number: '#1', label: 'JLR Authorized' }
  ];

  // Hero section data
  const heroData = {
    title: 'European Vehicle',
    subtitle: 'Repair Specialists',
    description: 'New Zealand\'s only factory-authorized Jaguar/Land Rover structural repairer. Expert BMW and Mini repairs with 20+ years experience.',
    primaryCTA: {
      text: 'Get a Quote',
      action: openContactModal
    },
    secondaryCTA: {
      text: 'Call (09) 573 1093',
      href: 'tel:095731093'
    },
    trustIndicators: ['Factory Authorized', 'Insurance Approved', 'CRA Accredited']
  };

  // Services data
  const services = [
    {
      icon: PLACEHOLDERS.serviceIcon(1),
      title: 'Jaguar & Land Rover',
      description: 'Factory-authorized structural repairs with genuine parts',
      buttonHref: '#jaguar-landrover'
    },
    {
      icon: PLACEHOLDERS.serviceIcon(2),
      title: 'BMW & Mini',
      description: 'Specialist repairs using latest BMW repair techniques',
      buttonHref: '#bmw-mini'
    },
    {
      icon: PLACEHOLDERS.serviceIcon(3),
      title: 'Insurance Claims',
      description: 'Complete claim management from assessment to completion',
      buttonHref: '#insurance'
    }
  ];

  // Mock Google Reviews data
  const googleReviews = {
    rating: 4.7,
    totalReviews: 64,
    reviews: [
      {
        author: 'Sarah M.',
        rating: 5,
        text: 'Excellent service! My BMW looks brand new after the repair.',
        time: '2 weeks ago'
      },
      {
        author: 'Michael T.',
        rating: 5,
        text: 'Professional team, great communication throughout the process.',
        time: '1 month ago'
      },
      {
        author: 'Emma L.',
        rating: 5,
        text: 'Best panel beaters in Auckland for European vehicles!',
        time: '1 month ago'
      }
    ]
  };

  // Local Business Schema
  const businessSchema = generateLocalBusinessSchema({
    name: 'Eurotech Auto Repair Centre',
    description: 'European vehicle repair specialists. New Zealand\'s only factory-authorized Jaguar/Land Rover structural repairer.',
    address: {
      street: 'Mount Wellington',
      city: 'Auckland',
      state: 'Auckland',
      postalCode: '1060',
      country: 'NZ'
    },
    phone: '(09) 573 1093',
    email: 'info@eurotech.co.nz',
    hours: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00'
      }
    ],
    rating: {
      value: 4.7,
      count: 64
    },
    geo: {
      latitude: -36.909,
      longitude: 174.836
    }
  });
</script>

<!-- SEO Meta Tags -->
<Meta
  title="Eurotech Auto Repair Centre - European Vehicle Specialists Auckland"
  description="New Zealand's only factory-authorized Jaguar/Land Rover structural repairer. Expert BMW and Mini repairs. Insurance approved. Call (09) 573 1093"
  keywords="european car repair auckland, bmw repair, jaguar repair, land rover repair, mini repair, panel beaters auckland, insurance repairs"
  ogImage="/og-eurotech.png"
/>

<!-- Structured Data -->
<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(faqs))}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(businessSchema)}</script>`}
</svelte:head>

<!-- Hero Section -->
<section class="hero" style="background-image: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2940&auto=format&fit=crop')">
  <div class="hero-overlay"></div>
  <div class="container hero-container">
    {#if isVisible}
      <div class="hero-content" in:fly={{ y: 20, duration: 800, delay: 100 }}>
        <h1 class="hero-title">
          {heroData.title}
          <span class="hero-gradient">{heroData.subtitle}</span>
        </h1>
        <p class="hero-description">{heroData.description}</p>

        <div class="hero-cta">
          <Button variant="primary" size="large" on:click={heroData.primaryCTA.action}>
            {heroData.primaryCTA.text}
          </Button>
          <Button variant="outline" size="large" href={heroData.secondaryCTA.href}>
            {heroData.secondaryCTA.text}
          </Button>
        </div>

        <div class="hero-trust" in:fly={{ y: 20, delay: 400, duration: 600 }}>
          {#each heroData.trustIndicators as indicator}
            <div class="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-success)">
                <path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
              <span>{indicator}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<!-- Stats Section -->
<StatsGrid {stats} />

<!-- Features Section -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Why Choose Eurotech</h2>
      <p class="section-subtitle">Auckland's premier European vehicle repair specialists</p>
    </div>

    <div class="features-grid">
      {#each features as feature}
        <FeatureCard {...feature} />
      {/each}
    </div>
  </div>
</section>

<!-- Google Reviews Carousel -->
<ReviewCarousel />

<!-- Services Section -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Our Services</h2>
      <p class="section-subtitle">Comprehensive repair solutions for European vehicles</p>
    </div>

    <div class="services-grid">
      {#each services as service}
        <ServiceCard {...service} />
      {/each}
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="section bg-gradient">
  <div class="container">
    <div class="section-header text-inverse">
      <h2 class="section-title">What Our Customers Say</h2>
    </div>

    <div class="testimonials-grid">
      {#each testimonials.slice(0, 3) as testimonial}
        <TestimonialCard {...testimonial} />
      {/each}
    </div>
  </div>
</section>

<!-- Brand Logos Carousel -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Authorized Repairer</h2>
      <p class="section-subtitle">Factory-authorized for premium European brands</p>
    </div>
    <ClientLogos />
  </div>
</section>

<!-- FAQ Section -->
<section class="section bg-secondary">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>
    <div class="faq-container">
      <FAQ items={faqs} />
    </div>
  </div>
</section>

<!-- CTA Section -->
<CTASection
  title="Ready to Get Your European Vehicle Repaired?"
  subtitle="Contact Auckland's premier European vehicle specialists today"
  buttonText="Get a Quote"
  buttonAction={openContactModal}
/>

<style>
  /* Google Reviews Styles */
  .google-rating {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    margin-top: var(--space-4);
  }

  .rating-number {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  .rating-stars {
    display: flex;
    gap: 2px;
  }

  .review-count {
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }

  .google-reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
    margin: var(--space-8) 0;
  }

  .google-review-card {
    background: var(--bg-primary);
    padding: var(--space-6);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-base);
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--space-2);
  }

  .review-author {
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  .review-time {
    font-size: var(--text-sm);
    color: var(--text-muted);
  }

  .review-rating {
    display: flex;
    gap: 2px;
    margin-bottom: var(--space-3);
  }

  .review-text {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
  }

  .google-reviews-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    margin-top: var(--space-8);
  }

  .view-all-reviews {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-medium);
    transition: color var(--transition-fast);
  }

  .view-all-reviews:hover {
    color: var(--color-primary-dark);
    text-decoration: underline;
  }

  /* Other section styles */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-8);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-8);
    margin-top: var(--space-8);
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-8);
  }

  .faq-container {
    max-width: 800px;
    margin: var(--space-8) auto 0;
  }

  .text-inverse {
    color: var(--text-inverse);
  }

  .text-inverse .section-title {
    color: var(--text-inverse);
  }

  /* Hero Section Styles */
  .hero {
    position: relative;
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 100%);
    z-index: 1;
  }

  .hero-container {
    position: relative;
    z-index: 2;
  }

  .hero-content {
    max-width: 700px;
    color: white;
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: var(--font-extrabold);
    line-height: 1.1;
    margin-bottom: var(--space-6);
    color: white;
  }

  .hero-gradient {
    display: block;
    background: linear-gradient(135deg, #ffffff 0%, #ffcc00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-description {
    font-size: var(--text-xl);
    margin-bottom: var(--space-8);
    line-height: var(--leading-relaxed);
    color: rgba(255, 255, 255, 0.95);
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
    color: rgba(255, 255, 255, 0.9);
  }

  .trust-item svg {
    color: #4ade80;
  }

  @media (max-width: 768px) {
    .google-rating {
      flex-direction: column;
    }

    .google-reviews-footer {
      flex-direction: column;
    }

    .hero {
      min-height: 60vh;
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
</style>