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
  import BlogCard from '$lib/components/BlogCard.svelte';
  import { PLACEHOLDERS, iconPlaceholder} from '$lib/utils/placeholders';
  import { generateFAQSchema, generateLocalBusinessSchema } from '$lib/utils/structuredData';

  let isVisible = false;
  let currentSlide = 0;
  let isTransitioning = true;

  const baseImages = [
    '/gallery/mini-PUBt7UPbJFY-unsplash.jpeg',
    '/gallery/jaguar-oUoLi5k7esA-unsplash.jpeg',
    '/images/DSC00720.jpg',
    '/images/DSC00773.jpg'
  ];

  // Repeat images 10 times for longer slideshow before reset
  const heroBackgrounds = Array(10).fill(baseImages).flat();
  const totalSlides = heroBackgrounds.length; // 40 slides (4 images × 10 repetitions)

  function nextSlide() {
    currentSlide++;

    // If we've reached the duplicate (last slide), reset to first after transition
    if (currentSlide === totalSlides) {
      setTimeout(() => {
        isTransitioning = false;
        // Force a reflow to ensure transition is disabled
        void document.querySelector('.hero-slider-track')?.offsetHeight;
        currentSlide = 0;

        // Re-enable transition on next frame
        requestAnimationFrame(() => {
          isTransitioning = true;
        });
      }, 800); // Match the transition duration
    }
  }

  onMount(() => {
    isVisible = true;

    // Auto-slide every 6 seconds
    const slideInterval = setInterval(nextSlide, 6000);

    return () => clearInterval(slideInterval);
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
    title: 'European Repair Specialist',
    subtitle: '',
    description: 'NZ\'s only factory-authorized Jaguar/Land Rover repairer  •  Expert BMW & Mini repairs  •  Over 20 years experience',
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
      icon: '/jaguar-logo-white.svg',
      title: 'Jaguar',
      description: 'Factory-authorized structural repairs with genuine parts',
      buttonHref: '#jaguar',
      backgroundImage: '/gallery/jaguar-6pDXbba2cQk-unsplash.jpeg'
    },
    {
      icon: '/landrover-logo-white.svg',
      title: 'Land Rover',
      description: 'Factory-authorized Land Rover specialist repairs',
      buttonHref: '#landrover',
      backgroundImage: '/gallery/lasnd-rover-EiYV7GWsR78-unsplash.jpeg'
    },
    {
      icon: '/range-rover-logo-white.svg',
      title: 'Range Rover',
      description: 'Premium Range Rover repair and maintenance',
      buttonHref: '#range-rover',
      backgroundImage: '/gallery/range-rover-LyhzCmT23QM-unsplash.jpeg'
    },
    {
      icon: '/bmw-logo-white.svg',
      title: 'BMW',
      description: 'Specialist BMW repairs using latest repair techniques',
      buttonHref: '#bmw',
      backgroundImage: '/bmw.jpg'
    },
    {
      icon: '/mini-white.svg',
      title: 'Mini',
      description: 'Expert Mini servicing and collision repairs',
      buttonHref: '#mini',
      backgroundImage: '/gallery/mini-G0GRk2bzJiU-unsplash.jpeg'
    },
    {
      icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1"%3E%3Cpath d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/%3E%3Cpath d="M9 12l2 2 4-4"/%3E%3C/svg%3E',
      title: 'Insurance Claims',
      description: 'Complete claim management from assessment to completion',
      buttonHref: '#insurance',
      backgroundImage: '/gallery/jaguar-kalamar-pJ5Nm5QfB7k-unsplash.jpeg'
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

  // Blog articles
  const blogArticles = [
    {
      title: 'Why Choose Factory-Authorized Repairs for Your Jaguar or Land Rover',
      excerpt: 'Learn about the importance of factory-authorized repairs and how they protect your vehicle\'s value and warranty.',
      image: '/gallery/jaguar-kalamar-pJ5Nm5QfB7k-unsplash.jpeg',
      category: 'Expert Advice',
      date: 'March 15, 2025',
      href: '#blog'
    },
    {
      title: 'Common BMW Repair Issues and How to Prevent Them',
      excerpt: 'Discover the most common repair issues for BMW vehicles and our expert tips for preventative maintenance.',
      image: '/bmw.jpg',
      category: 'Maintenance',
      date: 'March 10, 2025',
      href: '#blog'
    },
    {
      title: 'Understanding Your Insurance Claim Process',
      excerpt: 'A comprehensive guide to navigating insurance claims for European vehicle repairs in New Zealand.',
      image: '/gallery/mini-G0GRk2bzJiU-unsplash.jpeg',
      category: 'Insurance',
      date: 'March 5, 2025',
      href: '#blog'
    }
  ];

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
<section class="hero">
  <div class="hero-slider-track" style="transform: translateX(-{currentSlide * (100 / (totalSlides + 1))}%); transition: {isTransitioning ? 'transform 0.8s ease-in-out' : 'none'}">
    {#each [...heroBackgrounds, heroBackgrounds[0]] as bg, i}
      <div
        class="hero-background"
        style="background-image: url('{bg}')"
      ></div>
    {/each}
  </div>
  <div class="hero-overlay"></div>
  <div class="container hero-container">
    {#if isVisible}
      <div class="hero-content" in:fly={{ y: 20, duration: 800, delay: 100 }}>
        <h1 class="hero-title">
          {heroData.title}
          <span class="hero-gradient">{heroData.subtitle}</span>
        </h1>
      </div>
    {/if}
  </div>

  <!-- White background block for half-on-half effect -->
  <div class="hero-white-block"></div>

  <!-- Logo Bar Section inside Hero -->
  <div class="logo-bar">
    <StatsGrid {stats} backgroundColor="transparent" textColor="white" description={heroData.description} />
  </div>
</section>

<!-- Services Section -->
<section class="section bg-blog">
  <div class="container">
    <div class="services-grid">
      {#each services as service}
        <ServiceCard {...service} />
      {/each}
    </div>
  </div>
</section>

<!-- Blog Articles -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Expert Insights & Advice</h2>
      <p class="section-subtitle">Latest articles from our European vehicle repair specialists</p>
    </div>

    <div class="blog-grid">
      {#each blogArticles as article}
        <BlogCard {...article} />
      {/each}
    </div>
  </div>
</section>

<!-- Google Reviews Section with Dark Background -->
<section class="section bg-dark reviews-section">
  <div class="container">
    <div class="section-header text-center text-inverse">
      <h2 class="section-title reviews-title">
        What Our Customers Say
        <span class="title-separator">|</span>
        <span class="google-rating">
          <img src="/icons/google.svg" alt="Google" class="google-logo-inline" />
          <span class="star filled">★</span>
          {googleReviews.rating} ({googleReviews.totalReviews} reviews)
        </span>
      </h2>
    </div>
    <ReviewCarousel />
  </div>
</section>

<!-- FAQ Section -->
<section class="section bg-secondary">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>
    <div class="faq-container">
      <FAQ items={faqs} />
    </div>
  </div>
</section>

<style>
  /* Section Grid Styles */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-8);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
    margin-top: var(--space-8);
  }

  .bg-blog {
    background: #f5f5f5;
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

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
    margin-top: var(--space-8);
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
    min-height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    padding-bottom: var(--space-8);
  }

  .hero-slider-track {
    position: absolute;
    inset: 0;
    display: flex;
    width: 4100%; /* 41 slides (40 + 1 duplicate) */
    height: 100%;
    z-index: 0;
  }

  .hero-background {
    flex: 0 0 2.439%; /* 100% / 41 slides */
    width: 2.439%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.3) 100%);
    z-index: 1;
  }

  .hero-container {
    position: relative;
    z-index: 2;
  }

  .hero-content {
    color: white;
    text-align: center;
  }

  .hero-white-block {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: #f5f5f5;
    z-index: 2;
  }

  .logo-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    padding-top: var(--space-12);
  }

  .logo-bar :global(.logo-bar-section) {
    background: transparent !important;
  }

  .hero-eyebrow {
    font-size: var(--text-base);
    font-weight: bold;
    letter-spacing: 0.30em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--space-4);
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
    color: white;
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

  .bg-dark {
    background: #1a1a1a;
  }

  .text-center {
    text-align: center;
  }

  .reviews-section {
    padding-bottom: var(--space-8);
  }

  .reviews-section .section-header {
    margin-bottom: var(--space-6);
  }

  .reviews-title {
    font-size: var(--text-3xl);
  }

  .title-separator {
    margin: 0 var(--space-4);
    opacity: 0.5;
  }

  .google-rating {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 0.6em;
    font-weight: normal;
  }

  .google-logo-inline {
    height: 1.2em;
    width: auto;
    filter: brightness(0) invert(1);
  }

  .google-rating .star {
    color: #fbbc04;
    font-size: 1.2em;
  }

  @media (max-width: 768px) {
    .hero {
      min-height: 500px;
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