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
    '/gallery/bmw/tyler_clemmensen-h5XcT5T0ST8-unsplash.jpg',
    '/gallery/bmw/pat__-TOigkN59Dcg-unsplash.jpg',
    '/gallery/bmw/jakobnoahrosen-rC1Llibcis0-unsplash.jpg',
    '/gallery/bmw/stephanlouis-mN8H_fe040Y-unsplash.jpg',
    '/gallery/bmw/huntleytography-2h3UGhof_fU-unsplash.jpg'
  ];

  const faqs = [
    {
      question: 'Do you specialize in BMW repairs?',
      answer: 'Yes, we are European vehicle specialists with extensive experience in BMW collision repairs, panel beating, and paint work.'
    },
    {
      question: 'Can you work with my insurance company?',
      answer: 'Absolutely. We work with all major insurance companies and can manage your entire claim from assessment to completion.'
    },
    {
      question: 'What types of BMW repairs do you perform?',
      answer: 'We perform comprehensive repairs including collision damage, panel beating, paint work, and structural repairs for all BMW models.'
    },
    {
      question: 'How long do BMW repairs typically take?',
      answer: 'Repair timelines vary based on damage extent. We provide detailed estimates and keep you informed throughout the process.'
    }
  ];
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(faqs))}</script>`}
</svelte:head>

<Meta
  title="BMW Specialist Repairs - European Vehicle Experts | Eurotech Auto Repair"
  description={`Expert BMW collision repairs, panel beating & paint work. European vehicle specialists with 20+ years experience. Insurance approved. Call ${site.phone}`}
  keywords="bmw repair auckland, bmw panel beaters, bmw collision repair, european vehicle specialists"
/>

<ServiceHero
  title="BMW Repairs"
  description="European vehicle specialists • Precision repairs • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<!-- Main Content Section with Mixed Layout -->
<section class="section content-section">
  <div class="container">

    <!-- Intro Text -->
    <div class="intro-block">
      <h2 class="content-heading">Accredited BMW Group Body Shop</h2>
      <p class="lead-text">
        Eurotech is an accredited BMW Group Body Shop and NZ's only accredited BMW Carbon Fibre Body Shop. We have the training, equipment, and authorization to repair BMW vehicles to the standard the manufacturer demands.
      </p>
    </div>

    <!-- Image + Text Grid Layout -->
    <div class="content-grid">
      <div class="content-image">
        <CloudflareImage src="/gallery/bmw/arteum-KiTalJFRkcg-unsplash.jpg" alt="BMW repair specialist" width={1200} height={800} />
      </div>
      <div class="content-text">
        <h3>Carbon Fibre and Multi-Material Expertise</h3>
        <p>
          BMW's latest models use a mix of carbon fibre reinforced plastic (CFRP), aluminium, and high-strength steel. Repairing these multi-material structures requires specific training, dedicated tooling, and strict contamination controls that most body shops don't have.
        </p>
        <p>
          As NZ's only accredited BMW Carbon Fibre Body Shop, we're equipped to handle the full range of BMW structural and cosmetic repairs — from the carbon-intensive i-series to the latest 3, 5, and 7 Series models.
        </p>
      </div>
    </div>

    <!-- Reversed Layout -->
    <div class="content-grid reverse">
      <div class="content-text">
        <h3>Quality You Can Trust</h3>
        <p>
          We use genuine BMW parts and the Glasurit 100 Line paint system to deliver a finish that's indistinguishable from factory. Every repair is backed by a written guarantee, and our I-CAR certified technicians follow BMW's prescribed repair methods to the letter.
        </p>
        <p>
          We work with all major New Zealand insurers and handle the claims process from start to finish. With over 20 years of European vehicle specialisation, we understand what BMW owners expect — and we deliver it.
        </p>
      </div>
      <div class="content-image">
        <CloudflareImage src="/gallery/bmw/romaxp-PzCGId2ljsY-unsplash.jpg" alt="BMW repair workshop" width={1200} height={1800} />
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
