<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import ClientLogos from '$lib/components/ClientLogos.svelte';
  import { modal } from '$lib/stores/modal';

  function openEstimateModal() {
    modal.cognito();
  }

  const insuranceFaqs = [
    {
      question: 'What do I do if I have an accident?',
      answer: 'First, assess the situation and make sure everyone is safe. Obtain the other driver\'s details if applicable, and report the accident to police within 24 hours if someone is injured. Take photos of the damage if you can — they\'ll be useful for your claim.'
    },
    {
      question: 'What\'s the next step after reporting it?',
      answer: 'Contact your insurer or broker to lodge a claim. Once you have a claim number, get in touch with us. We can also help you through the claims process if you\'re not sure where to start.'
    },
    {
      question: 'Can I choose which panel beater to use?',
      answer: 'Yes — as the vehicle owner, you have the right to choose whichever repairer you wish. You don\'t have to use the insurer\'s recommended repairer. For European vehicles, choosing a factory-authorized specialist like Eurotech ensures your car is repaired to manufacturer specifications.'
    },
    {
      question: 'How does the insurance company assess my vehicle?',
      answer: 'Bring your vehicle to Eurotech and we\'ll evaluate the damage, take digital photos, and prepare a complimentary repair estimate. We send everything directly to your insurer. Some insurers approve repairs from photos alone, while others may want to inspect the vehicle in person.'
    },
    {
      question: 'When will my vehicle be repaired?',
      answer: 'Once we receive written authorization from your insurance company, we order the necessary parts and contact you to schedule the repair as soon as parts arrive. We\'ll keep you informed throughout.'
    },
    {
      question: 'Will I get a replacement vehicle?',
      answer: 'Most major insurers cover a replacement vehicle or contribute toward rental costs while your car is being repaired. We can also offer courtesy vehicles in certain situations. We\'ll help you work out what\'s available under your policy.'
    },
    {
      question: 'Can I get extra private work done at the same time?',
      answer: 'Absolutely. If there\'s other damage or work you\'d like done while your vehicle is with us, we\'ll provide a free, no-obligation quote. It\'s often more convenient to have everything done in one visit.'
    },
    {
      question: 'What happens when my vehicle is finished?',
      answer: 'We\'ll contact you to arrange a convenient collection time. When you pick up your vehicle, we\'ll walk you through the repairs and answer any questions. All work carries a written manufacturer guarantee.'
    }
  ];

  const insurerLogos = [
    { src: '/jaguar-logo-black.svg', alt: 'Jaguar Factory Authorized' },
    { src: '/landrover-logo-black.svg', alt: 'Land Rover Factory Authorized' },
    { src: '/bmw-logo-black.svg', alt: 'BMW Accredited Body Shop' },
    { src: '/mini-black.svg', alt: 'Mini Specialist' },
    { src: '/range-rover-logo-black.svg', alt: 'Range Rover Specialist' },
    { src: '/mta-logo.png', alt: 'Motor Trade Association Member' },
  ];
</script>

<Meta
  title="Insurance Claims - Eurotech Auto Repair Centre"
  description="We handle your insurance claim from start to finish. Factory-authorized European vehicle repairs trusted by all major NZ insurers."
/>

<div class="page">
  <div class="container">
    <h1>Insurance Claims</h1>

    <div class="intro">
      <p class="lead">We work with all major New Zealand insurers and handle the claims process for you — from initial assessment through to completion.</p>
      <p>As a factory-authorized repairer for Jaguar, Land Rover, and BMW, your insurer can be confident the repair meets manufacturer standards. This often speeds up the approval process. You have the right to choose your own repairer, and for European vehicles, choosing a specialist matters.</p>
      <p>We provide a complimentary damage assessment, prepare detailed repair estimates with digital photos, and communicate directly with your insurer so you don't have to. All repairs carry a written manufacturer guarantee.</p>
      <button class="btn-estimate" on:click={openEstimateModal}>Request an Estimate</button>
    </div>

    <section class="logos-section">
      <h2>Factory Authorizations & Accreditations</h2>
      <ClientLogos logos={insurerLogos} />
    </section>

    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>
      <FAQ items={insuranceFaqs} />
    </section>
  </div>
</div>

<style>
  .page {
    padding: var(--space-16) 0;
    min-height: 60vh;
  }

  h1 {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-8);
    color: var(--color-text);
  }

  .intro {
    max-width: 740px;
    margin-bottom: var(--space-12);
  }

  .lead {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-4);
  }

  .intro p {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
    font-size: var(--text-lg);
  }

  .btn-estimate {
    display: inline-block;
    margin-top: var(--space-4);
    padding: var(--space-4) var(--space-8);
    background: var(--color-primary);
    color: white;
    border: none;
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: background var(--transition-fast);
  }

  .btn-estimate:hover {
    background: var(--color-primary-dark);
  }

  .logos-section {
    margin-bottom: var(--space-12);
  }

  .faq-section {
    max-width: 800px;
  }

  h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--color-text);
    margin-bottom: var(--space-6);
  }

  @media (max-width: 768px) {
    .page {
      padding: var(--space-8) 0;
    }

    h1 {
      font-size: var(--text-3xl);
    }

    .lead {
      font-size: var(--text-lg);
    }

    .intro p {
      font-size: var(--text-base);
    }
  }
</style>
