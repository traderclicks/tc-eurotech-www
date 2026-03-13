<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ReviewSection from '$lib/components/ReviewSection.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';
  import { modal } from '$lib/stores/modal';
  import { site } from '$lib/config/site';
  import { generateFAQSchema } from '$lib/utils/structuredData';

  function openContactModal() {
    modal.cognito();
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
      title: 'Authorized',
      description: 'NZ\'s only Jaguar authorized structural repairer'
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
      question: 'Are you authorized for Jaguar repairs?',
      answer: 'Yes, Eurotech is NZ\'s only authorized Jaguar/Land Rover structural repairer, ensuring repairs meet manufacturer standards.'
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

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(faqs))}</script>`}
</svelte:head>

<Meta
  title="Jaguar Specialist Repairs - Authorized | Eurotech Auto Repair"
  description={`NZ's only authorized Jaguar structural repairer. Expert collision repairs, panel beating & genuine parts. Insurance approved. Call ${site.phone}`}
  keywords="jaguar repair auckland, jaguar panel beaters, jaguar collision repair, authorized jaguar, genuine jaguar parts"
/>

<ServiceHero
  title="Jaguar Repairs"
  description="NZ's only authorized Jaguar repairer • Genuine parts only • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<!-- Main Content Section with Mixed Layout -->
<section class="section content-section">
  <div class="container">

    <!-- Intro Text -->
    <div class="intro-block">
      <h2 class="content-heading">NZ's Only Authorized Jaguar Repairer</h2>
      <p class="lead-text">
        Eurotech is the only body shop in New Zealand fully authorized by Jaguar to carry out structural aluminium repairs. That means every repair meets the exact specifications set by the manufacturer — protecting your vehicle's integrity, warranty, and resale value.
      </p>
    </div>

    <!-- Image + Text Grid Layout -->
    <div class="content-grid">
      <div class="content-image">
        <CloudflareImage src="/gallery/jaguar/imlst-OnppPkl1d3U-unsplash.jpg" alt="Jaguar repair specialist" width={1200} height={800} />
      </div>
      <div class="content-text">
        <h3>Aluminium Structural Expertise</h3>
        <p>
          Modern Jaguars are built with advanced aluminium architectures that require specialist knowledge, tooling, and training to repair safely. Our technicians have completed Jaguar's own aluminium structural repair courses — training only available to authorized repairers.
        </p>
        <p>
          We use dedicated aluminium repair bays with climate-controlled environments to prevent contamination, along with Jaguar-approved measuring and pulling equipment to restore every dimension to factory specification.
        </p>
      </div>
    </div>

    <div class="content-grid reverse">
      <div class="content-text">
        <h3>Factory-Grade Finish</h3>
        <p>
          Our refinish team uses the Glasurit 100 Line paint system — the same premium system trusted by manufacturers worldwide. With digital colour matching and over 90 tinting bases, we achieve colour accuracy that's indistinguishable from factory.
        </p>
        <p>
          Every Jaguar repair we complete carries a written manufacturer guarantee. We work directly with all major NZ insurers to manage your claim from assessment through to completion, so you can focus on getting back on the road.
        </p>
      </div>
      <div class="content-image">
        <CloudflareImage src="/gallery/jaguar/switch_dtp_fotografie-01dxABUoCQA-unsplash.jpg" alt="Jaguar repair workshop" width={1200} height={801} />
      </div>
    </div>

  </div>
</section>

<ReviewSection />

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

  .bg-secondary {
    background: var(--bg-secondary);
  }

  .section-header {
    margin-bottom: var(--space-12);
  }

  .text-center {
    text-align: center;
  }

  .section-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
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
