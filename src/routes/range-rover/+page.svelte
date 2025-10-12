<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import { modal } from '$lib/stores/modal';

  function openContactModal() {
    modal.form({ title: 'Get a Quote - Range Rover Service' });
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
      question: 'Are you factory-authorized for Range Rover repairs?',
      answer: 'Yes, Eurotech is New Zealand\'s only factory-authorized Jaguar/Land Rover structural repairer, ensuring repairs meet manufacturer standards.'
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
  title="Range Rover Specialist Repairs - Factory Authorized | Eurotech Auto Repair"
  description="NZ's only factory-authorized Range Rover structural repairer. Expert collision repairs, panel beating & genuine parts. Insurance approved. Call (09) 573 1093"
  keywords="range rover repair auckland, range rover panel beaters, range rover collision repair, factory authorized range rover, genuine range rover parts"
/>

<ServiceHero
  title="Range Rover Repairs"
  description="NZ's only factory-authorized Range Rover repairer • Genuine parts only • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<!-- Main Content Section with Mixed Layout -->
<section class="section content-section">
  <div class="container">

    <!-- Intro Text -->
    <div class="intro-block">
      <h2 class="content-heading">Excellence in Range Rover Repair</h2>
      <p class="lead-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>

    <!-- Image + Text Grid Layout -->
    <div class="content-grid">
      <div class="content-image">
        <img src="/gallery/range-rover/range-rover-1529438636731.jpg" alt="Range Rover repair specialist" />
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
        <img src="/gallery/range-rover/range-rover-1736746871.jpg" alt="Range Rover repair workshop" />
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
