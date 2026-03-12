<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';
  import { modal } from '$lib/stores/modal';

  function openContactModal() {
    modal.cognito();
  }

  const heroImages = [
    '/gallery/range-rover/range-rover-1725815761.jpg',
    '/gallery/range-rover/range-rover-1604054094.jpg',
    '/gallery/range-rover/range-rover-1604054089.jpg',
    '/gallery/range-rover/range-rover-1658547737.jpg',
    '/gallery/range-rover/range-rover-1736746419.jpg'
  ];

  const faqs = [
    {
      question: 'Are you authorized for Range Rover repairs?',
      answer: 'Yes, Eurotech is NZ\'s only authorized Jaguar/Land Rover structural repairer, ensuring repairs meet manufacturer standards.'
    },
    {
      question: 'Do you use genuine Range Rover parts?',
      answer: 'Absolutely. We only use genuine Range Rover parts for all repairs to maintain your vehicle\'s integrity, performance, and warranty.'
    },
    {
      question: 'Can you handle insurance claims for Range Rover repairs?',
      answer: 'Yes, we work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of Range Rover repairs do you perform?',
      answer: 'We perform comprehensive repairs including structural damage, panel beating, paint work, and collision repairs for all Range Rover models.'
    },
    {
      question: 'How long do Range Rover repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<Meta
  title="Range Rover Specialist Repairs - Authorized | Eurotech Auto Repair"
  description="NZ's only authorized Range Rover structural repairer. Expert collision repairs, panel beating & genuine parts. Insurance approved. Call (09) 573 1093"
  keywords="range rover repair auckland, range rover panel beaters, range rover collision repair, authorized range rover, genuine range rover parts"
/>

<ServiceHero
  title="Range Rover Repairs"
  description="NZ's only authorized Range Rover repairer • Genuine parts only • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<!-- Main Content Section with Mixed Layout -->
<section class="section content-section">
  <div class="container">

    <!-- Intro Text -->
    <div class="intro-block">
      <h2 class="content-heading">Authorized Range Rover Repairs</h2>
      <p class="lead-text">
        As NZ's only authorized Jaguar/Land Rover structural repairer, Eurotech is equipped to handle the full Range Rover family — from the Sport and Velar to the full-size Range Rover. Every repair meets the manufacturer's exact specifications.
      </p>
    </div>

    <!-- Image + Text Grid Layout -->
    <div class="content-grid">
      <div class="content-image">
        <CloudflareImage src="/gallery/range-rover/range-rover-1529438636731.jpg" alt="Range Rover repair specialist" width={1200} height={900} />
      </div>
      <div class="content-text">
        <h3>Premium Materials, Premium Repair</h3>
        <p>
          Range Rovers are built with lightweight aluminium architectures that deliver performance and refinement — but they demand specialist repair methods. Incorrect techniques can compromise structural integrity and void your manufacturer's warranty.
        </p>
        <p>
          Our factory-trained technicians use approved tooling and repair procedures specific to each Range Rover model. Dedicated aluminium repair bays prevent cross-contamination, and every structural dimension is verified against manufacturer tolerances.
        </p>
      </div>
    </div>

    <!-- Reversed Layout -->
    <div class="content-grid reverse">
      <div class="content-text">
        <h3>Seamless Insurance Claims</h3>
        <p>
          We work with all major New Zealand insurers and manage the entire claims process on your behalf — from the initial damage assessment through to final quality inspection and delivery.
        </p>
        <p>
          All repairs are completed using genuine parts and the Glasurit 100 Line paint system for factory-accurate colour matching. Every Range Rover repair carries a written manufacturer guarantee, giving you complete confidence in the result.
        </p>
      </div>
      <div class="content-image">
        <CloudflareImage src="/gallery/range-rover/range-rover-1736746871.jpg" alt="Range Rover repair workshop" width={1200} height={675} />
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
