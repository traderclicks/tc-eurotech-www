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
    '/gallery/land-rover/finding_dan-lXvycA58ZfQ-unsplash.jpg',
    '/gallery/land-rover/grantritchie-j0YPbvXu4t0-unsplash.jpg',
    '/gallery/land-rover/richhemingway-UbTktGx_vdQ-unsplash.jpg',
    '/gallery/land-rover/woeiman-4C-x7CQNwvw-unsplash.jpg'
  ];

  const faqs = [
    {
      question: 'Are you factory-authorized for Land Rover repairs?',
      answer: 'Yes, Eurotech is New Zealand\'s only factory-authorized Jaguar/Land Rover structural repairer, ensuring repairs meet manufacturer standards.'
    },
    {
      question: 'Do you use genuine Land Rover parts?',
      answer: 'Absolutely. We only use genuine Land Rover parts for all repairs to maintain your vehicle\'s integrity, performance, and warranty.'
    },
    {
      question: 'Can you handle insurance claims for Land Rover repairs?',
      answer: 'Yes, we work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of Land Rover repairs do you perform?',
      answer: 'We perform comprehensive repairs including structural damage, panel beating, paint work, and collision repairs for all Land Rover models.'
    },
    {
      question: 'How long do Land Rover repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<Meta
  title="Land Rover Specialist Repairs - Factory Authorized | Eurotech Auto Repair"
  description="NZ's only factory-authorized Land Rover structural repairer. Expert collision repairs, panel beating & genuine parts. Insurance approved. Call (09) 573 1093"
  keywords="land rover repair auckland, land rover panel beaters, land rover collision repair, factory authorized land rover, genuine land rover parts"
/>

<ServiceHero
  title="Land Rover Repairs"
  description="NZ's only factory-authorized Land Rover repairer • Genuine parts only • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<!-- Main Content Section with Mixed Layout -->
<section class="section content-section">
  <div class="container">

    <!-- Intro Text -->
    <div class="intro-block">
      <h2 class="content-heading">New Zealand's Only Factory-Authorized Land Rover Repairer</h2>
      <p class="lead-text">
        Eurotech holds full factory authorization from Land Rover for structural aluminium repairs — the only body shop in New Zealand with this certification. Your vehicle is repaired to the exact specifications set by the manufacturer, preserving its safety, warranty, and value.
      </p>
    </div>

    <!-- Image + Text Grid Layout -->
    <div class="content-grid">
      <div class="content-image">
        <CloudflareImage src="/gallery/land-rover/visionaryconcepts-jx4OyQHNhi0-unsplash.jpg" alt="Land Rover repair specialist" width={1200} height={800} />
      </div>
      <div class="content-text">
        <h3>Built for Land Rover's Architecture</h3>
        <p>
          Land Rovers use a combination of aluminium monocoque and body-on-frame constructions depending on the model. Repairing these structures correctly requires specialist knowledge and equipment that most body shops simply don't have.
        </p>
        <p>
          Our technicians are factory-trained in Land Rover's specific repair procedures, using approved measuring systems and dedicated aluminium tooling. Every structural repair is verified against manufacturer tolerances before leaving our workshop.
        </p>
      </div>
    </div>

    <!-- Reversed Layout -->
    <div class="content-grid reverse">
      <div class="content-text">
        <h3>Insurance and Guarantee</h3>
        <p>
          We work with all major New Zealand insurers and manage the claims process directly — from initial assessment through to final delivery. Our team handles the paperwork so you don't have to.
        </p>
        <p>
          All Land Rover repairs carry a written manufacturer guarantee, and our Glasurit paint system ensures a finish that matches factory colour exactly. Over 20 years of specialising in European vehicles means we understand what it takes to get the result right.
        </p>
      </div>
      <div class="content-image">
        <CloudflareImage src="/gallery/land-rover/withluke-Pn285tSRCNY-unsplash.jpg" alt="Land Rover repair workshop" width={1200} height={800} />
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
