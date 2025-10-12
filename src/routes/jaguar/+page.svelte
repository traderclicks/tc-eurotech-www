<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ReviewCarousel from '$lib/components/ReviewCarousel.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import { modal } from '$lib/stores/modal';

  function openContactModal() {
    modal.form({ title: 'Get a Quote - Jaguar Service' });
  }

  const heroImages = [
    '/gallery/jaguar/introspectivedsgn-oUoLi5k7esA-unsplash.jpg',
    '/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg',
    '/gallery/jaguar/davidgeneugelijk-mdUbSHdebO0-unsplash.jpg',
    '/gallery/jaguar/escobar_kanishk-J1kmixRfys0-unsplash.jpg',
    '/gallery/jaguar/taylor65s-EIs247QDxZk-unsplash.jpg'
  ];

  const features = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>`,
      title: 'Factory Authorized',
      description: 'New Zealand\'s only Jaguar factory-authorized structural repairer'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>`,
      title: 'Genuine Parts',
      description: 'Only genuine Jaguar parts used for all repairs and replacements'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>`,
      title: '20+ Years Experience',
      description: 'Over two decades of specialized Jaguar repair expertise'
    }
  ];

  const faqs = [
    {
      question: 'Are you factory-authorized for Jaguar repairs?',
      answer: 'Yes, Eurotech is New Zealand\'s only factory-authorized Jaguar/Land Rover structural repairer, ensuring repairs meet manufacturer standards.'
    },
    {
      question: 'Do you use genuine Jaguar parts?',
      answer: 'Absolutely. We only use genuine Jaguar parts for all repairs to maintain your vehicle\'s integrity, performance, and warranty.'
    },
    {
      question: 'Can you handle insurance claims for Jaguar repairs?',
      answer: 'Yes, we work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of Jaguar repairs do you perform?',
      answer: 'We perform comprehensive repairs including structural damage, panel beating, paint work, and collision repairs for all Jaguar models.'
    },
    {
      question: 'How long do Jaguar repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<Meta
  title="Jaguar Specialist Repairs - Factory Authorized | Eurotech Auto Repair"
  description="NZ's only factory-authorized Jaguar structural repairer. Expert collision repairs, panel beating & genuine parts. Insurance approved. Call (09) 573 1093"
  keywords="jaguar repair auckland, jaguar panel beaters, jaguar collision repair, factory authorized jaguar, genuine jaguar parts"
/>

<ServiceHero
  title="Jaguar Repairs"
  description="NZ's only factory-authorized Jaguar repairer • Genuine parts only • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<!-- Main Content Section with Mixed Layout -->
<section class="section content-section">
  <div class="container">

    <!-- Intro Text -->
    <div class="intro-block">
      <h2 class="content-heading">Excellence in Jaguar Repair</h2>
      <p class="lead-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>

    <!-- Image + Text Grid Layout -->
    <div class="content-grid">
      <div class="content-image">
        <img src="/gallery/jaguar/imlst-OnppPkl1d3U-unsplash.jpg" alt="Jaguar repair specialist" />
      </div>
      <div class="content-text">
        <h3>Precision Craftsmanship</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
      </div>
    </div>

    <!-- Reversed Layout -->
    <div class="content-grid reverse">
      <div class="content-text">
        <h3>State-of-the-Art Equipment</h3>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
        </p>
        <p>
          Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
        </p>
      </div>
      <div class="content-image">
        <img src="/gallery/jaguar/switch_dtp_fotografie-01dxABUoCQA-unsplash.jpg" alt="Jaguar repair workshop" />
      </div>
    </div>

  </div>
</section>

<section class="section bg-dark reviews-section">
  <div class="container">
    <div class="section-header text-inverse">
      <h2 class="section-title reviews-title">
        What Our Customers Say
        <span class="title-separator">|</span>
        <span class="google-rating">
          <img src="/icons/google-wordmark-white.svg" alt="Google" class="google-logo-inline" />
          <span class="star filled">★</span>
          4.7 (64 reviews)
        </span>
      </h2>
    </div>
  </div>
  <ReviewCarousel />
</section>

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
  .section {
    padding: var(--space-16) 0;
  }

  .content-section {
    background: white;
  }

  .bg-dark {
    background: #1a2a30eb;
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
    font-size: var(--text-2xl);
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

  /* Intro Block */
  .intro-block {
    max-width: 800px;
    margin: 0 auto var(--space-16);
    text-align: center;
  }

  .content-heading {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-6);
  }

  .content-heading.center {
    text-align: center;
  }

  .lead-text {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    color: var(--text-secondary);
  }

  /* Content Grid Layout */
  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    margin-bottom: var(--space-16);
    align-items: center;
  }

  .content-grid.reverse {
    direction: rtl;
  }

  .content-grid.reverse > * {
    direction: ltr;
  }

  .content-image {
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .content-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    aspect-ratio: 4 / 3;
  }

  .content-text h3 {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .content-text p {
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: var(--text-secondary);
    margin-bottom: var(--space-4);
  }

  .faq-container {
    max-width: 800px;
    margin: 0 auto;
  }


  /* Responsive Design */
  @media (max-width: 1024px) {
    .content-grid {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
  }

  @media (max-width: 768px) {
    .section {
      padding: var(--space-8) 0;
    }

    .content-heading {
      font-size: var(--text-2xl);
    }

    .lead-text {
      font-size: var(--text-base);
    }

    .content-text h3 {
      font-size: var(--text-xl);
    }

    .section-title {
      font-size: var(--text-2xl);
    }
  }
</style>
