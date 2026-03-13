<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';
  import { modal } from '$lib/stores/modal';
  import { site } from '$lib/config/site';
  import { generateFAQSchema } from '$lib/utils/structuredData';

  function openContactModal() {
    modal.cognito();
  }

  const heroImages = [
    '/gallery/mini/huntleytography-d_6pVSQip3I-unsplash.jpg',
    '/gallery/mini/damiangoh-0f4B4UDk8T0-unsplash.jpg',
    '/gallery/mini/huntleytography-G0GRk2bzJiU-unsplash.jpg',
    '/gallery/mini/v1d-kySbGWdOmio-unsplash.jpg',
    '/gallery/mini/sonniehiles-PUBt7UPbJFY-unsplash.jpg'
  ];

  const faqs = [
    {
      question: 'Do you specialize in Mini repairs?',
      answer: 'Yes, we are European vehicle specialists with extensive experience in Mini collision repairs, panel beating, and paint work.'
    },
    {
      question: 'Can you work with my insurance company?',
      answer: 'Absolutely. We work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of Mini repairs do you perform?',
      answer: 'We perform comprehensive repairs including collision damage, panel beating, paint work, and structural repairs for all Mini models.'
    },
    {
      question: 'How long do Mini repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(faqs))}</script>`}
</svelte:head>

<Meta
  title="Mini Specialist Repairs - European Vehicle Experts | Eurotech Auto Repair"
  description={`Expert Mini collision repairs, panel beating & paint work. European vehicle specialists with 20+ years experience. Insurance approved. Call ${site.phone}`}
  keywords="mini repair auckland, mini panel beaters, mini collision repair, mini cooper repair, european vehicle specialists"
/>

<ServiceHero
  title="Mini Repairs"
  description="European vehicle specialists • Precision repairs • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<!-- Main Content Section with Mixed Layout -->
<section class="section content-section">
  <div class="container">

    <!-- Intro Text -->
    <div class="intro-block">
      <h2 class="content-heading">European Vehicle Specialists for Mini</h2>
      <p class="lead-text">
        Mini is part of the BMW Group, and modern Minis share the same engineering standards and advanced materials as their larger siblings. At Eurotech, we bring our BMW Group accreditation and 20+ years of European vehicle expertise to every Mini repair.
      </p>
    </div>

    <!-- Image + Text Grid Layout -->
    <div class="content-grid">
      <div class="content-image">
        <CloudflareImage src="/gallery/mini/huntleytography-0jdnuETGLRg-unsplash.jpg" alt="Mini Cooper repair specialist" width={1200} height={800} />
      </div>
      <div class="content-text">
        <h3>Repair Done Right</h3>
        <p>
          Whether it's a Hatchback, Countryman, Clubman, or Convertible, we follow the manufacturer's prescribed repair procedures for every Mini model. Our technicians are trained in the specific techniques required for Mini's construction methods.
        </p>
        <p>
          We use genuine parts and the Glasurit 100 Line paint system to ensure colour accuracy and a factory-quality finish. Every repair is backed by a written guarantee.
        </p>
      </div>
    </div>

    <!-- Reversed Layout -->
    <div class="content-grid reverse">
      <div class="content-text">
        <h3>Full Insurance Support</h3>
        <p>
          We work with all major New Zealand insurance companies and handle the entire claims process on your behalf — from initial assessment and quoting through to final inspection and delivery.
        </p>
        <p>
          Our experience with European vehicles means we know how to work within insurer requirements while maintaining the repair quality your Mini deserves. No shortcuts, no compromises.
        </p>
      </div>
      <div class="content-image">
        <CloudflareImage src="/gallery/mini/picsbyjameslee-msFTpW3g9CA-unsplash.jpg" alt="Mini repair workshop" width={1200} height={800} />
      </div>
    </div>

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
  .section {
    padding: var(--space-16) 0;
  }

  .content-section {
    background: white;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-6);
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

  /* FAQ Section */
  .bg-secondary {
    background: var(--bg-secondary);
  }

  .text-center {
    text-align: center;
  }

  .section-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  .section-header {
    margin-bottom: var(--space-12);
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
