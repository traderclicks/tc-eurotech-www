<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import Button from '$lib/components/Button.svelte';
  import { modal } from '$lib/stores/modal';
  import { generateFAQSchema } from '$lib/utils/structuredData';

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
    { src: '/images/insurers/aa-insurance.png', alt: 'AA Insurance' },
    { src: '/images/insurers/state-logo.png', alt: 'State Insurance' },
    { src: '/images/insurers/alliance.png', alt: 'Alliance Insurance' },
    { src: '/images/insurers/IAGLogo_0.gif', alt: 'IAG' },
    { src: '/images/insurers/nac.png', alt: 'NAC' },
    { src: '/images/insurers/Ando-logo.png', alt: 'Ando Insurance' },
    { src: '/images/insurers/amp_0.gif', alt: 'AMP' },
    { src: '/images/insurers/navigation_tower_logo.png', alt: 'Tower Insurance' },
    { src: '/images/insurers/prestige-logo.png', alt: 'Prestige' },
    { src: '/images/insurers/Lantern-insurance.jpg', alt: 'Lantern Insurance' },
    { src: '/images/insurers/logo-vero.gif', alt: 'Vero' },
    { src: '/images/insurers/zurich-logo-big.svg', alt: 'Zurich' },
    { src: '/images/insurers/provident-insurance.png', alt: 'Provident Insurance' },
    { src: '/images/insurers/qbe.png', alt: 'QBE' },
    { src: '/images/insurers/mas.png', alt: 'MAS' },
    { src: '/images/insurers/youi.png', alt: 'Youi' },
    { src: '/images/insurers/nzi.png', alt: 'NZI' },
    { src: '/images/insurers/ami.png', alt: 'AMI' },
  ];
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(insuranceFaqs))}</script>`}
</svelte:head>

<Meta
  title="Insurance Claims"
  description="We handle your insurance claim from start to finish. Factory-authorized European vehicle repairs trusted by all major NZ insurers."
/>

<div class="page-header">
  <div class="container">
    <div class="intro-row">
      <div class="intro-text">
        <h1>Insurance Claims</h1>
        <p class="intro">Had an accident? Request a Repair Quote by clicking the button and we'll handle everything. Factory-authorized for Jaguar, Land Rover, and BMW — you get to choose us as your repairer. All work carries a manufacturer's guarantee.</p>
      </div>
      <div class="cta-buttons-wrapper">
        <div class="cta-buttons">
          <Button variant="primary" size="large" on:click={() => modal.cognito()}>Get a Repair Quote</Button>
          <Button variant="link" size="large" on:click={() => modal.insurance()}>Insurance Contacts</Button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="page">
  <div class="container">
    <div class="two-col">
      <!-- Left Column -->
      <div class="col-left">
        <div class="faq-block">
          <div class="section-header text-center">
            <h2 class="section-title">Frequently Asked Questions</h2>
          </div>
          <FAQ items={insuranceFaqs} />
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-right">
        <div class="logos-block insurer-logos">
          <div class="insurer-grid">
            {#each insurerLogos as logo}
              <div class="insurer-logo" class:small-logo={logo.alt === 'NZI'}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .page-header {
    background: var(--bg-content);
    padding: var(--space-16) 0;
  }

  .page {
    padding: var(--space-16) 0;
    min-height: 60vh;
  }


  h1 {
    font-size: clamp(3rem, 7vw, 5rem);
    font-weight: var(--font-extrabold);
    line-height: 1.1;
    margin-bottom: var(--space-4);
    color: var(--text-heading);
  }

  .intro-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
    margin-bottom: 0;
    align-items: center;
  }

  .intro {
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
    color: var(--text-secondary);
  }

  .cta-buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  /* Two-column layout */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: start;
  }

  .col-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
  }

  .col-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-12);
  }

  h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-6);
  }

  .logos-heading {
    text-align: center;
    margin-top: var(--space-4);
    margin-bottom: var(--space-8);
  }

  .cta-buttons {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    white-space: nowrap;
  }

  .section-header {
    margin-bottom: var(--space-8);
  }

  .section-title {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }

  /* Insurer logos — full color grid */
  .insurer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-5);
    align-items: center;
  }

  .insurer-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3);
  }

  .insurer-logo img {
    max-width: 115px;
    max-height: 48px;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  .small-logo img {
    max-width: 50px;
    max-height: 22px;
  }

  @media (max-width: 768px) {
    .page {
      padding: var(--space-8) 0;
    }

    h1 {
      font-size: clamp(2rem, 6vw, 3rem);
    }

    .intro-row {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

    .intro {
      font-size: var(--text-lg);
    }

    .section-title {
      font-size: var(--text-2xl);
    }

    .two-col {
      grid-template-columns: 1fr;
      gap: var(--space-10);
    }

    .insurer-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
    }

    .cta-buttons {
      flex-direction: column;
      gap: var(--space-4);
      align-items: center;
    }
  }
</style>
