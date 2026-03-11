<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';

  const heroImages = [
    '/images/DSC00931.jpg',
    '/images/DSC00651.jpg',
    '/images/DSC00720.jpg'
  ];
</script>

<Meta
  title="About Eurotech - European Vehicle Specialists Auckland"
  description="Learn about Eurotech Auto Repair Centre, New Zealand's only factory-authorized Jaguar/Land Rover structural repairer with 20+ years experience."
/>

<ServiceHero
  title="About Eurotech"
  description="European vehicle specialists • Factory authorized • 20+ years experience"
  images={heroImages}
  showLogoBar={true}
/>

<div class="page">
  <!-- Section 1: Intro — text left, image right -->
  <section class="split-section alt">
    <div class="container split">
      <div class="split-text">
        <h2>20+ Years of European Expertise</h2>
        <p class="lead">Eurotech Auto Repair Centre has been one of Auckland's leading panel and paint workshops — specialising exclusively in European vehicles.</p>
        <p>Based in Mount Wellington, we combine factory-authorized repair methods with the latest equipment and technology to deliver results that meet manufacturer specifications every time.</p>
      </div>
      <div class="split-image">
        <CloudflareImage src="/images/DSC00931.jpg" alt="Eurotech Auto Repair Centre building" width={800} height={534} />
      </div>
    </div>
  </section>

  <!-- Section 2: Certifications — image left, text right -->
  <section class="split-section">
    <div class="container split reverse">
      <div class="split-text">
        <h2>Factory Authorizations</h2>
        <p>We hold certifications that set us apart from general body shops:</p>
        <ul>
          <li><strong>NZ's only factory-authorized Jaguar/Land Rover structural repairer</strong> — certified for aluminium structural repairs</li>
          <li><strong>NZ's only accredited BMW Carbon Fibre Body Shop</strong></li>
          <li><strong>Accredited BMW Group Body Shop</strong></li>
          <li><strong>Recommended repairer for Renault</strong></li>
          <li><strong>CRA quality assurance</strong> and <strong>MTA member</strong></li>
        </ul>
      </div>
      <div class="split-image">
        <CloudflareImage src="/images/DSC00720.jpg" alt="Technician working on Range Rover in aluminium repair bay" width={800} height={534} />
      </div>
    </div>
  </section>

  <!-- Section 3: Team — text left, image right -->
  <section class="split-section alt">
    <div class="container split">
      <div class="split-text">
        <h2>Our Team</h2>
        <p>Our technicians are factory-trained specialists, not generalists. The team includes I-CAR certified welders and technicians who have completed Jaguar aluminium structural repair courses — training only available to authorized repairers.</p>
        <p>Our refinish staff are trained in Glasurit automotive paint systems, the same premium products used by manufacturers. This ensures colour accuracy and a finish indistinguishable from factory.</p>
      </div>
      <div class="split-image">
        <CloudflareImage src="/images/DSC00625.jpg" alt="Spray painter applying paint in booth" width={800} height={534} />
      </div>
    </div>
  </section>

  <!-- Section 4: Why it matters — image left, text right -->
  <section class="split-section">
    <div class="container split reverse">
      <div class="split-text">
        <h2>Why It Matters</h2>
        <p>Modern European vehicles use advanced materials — high-strength steel, aluminium, carbon fibre — bonded and riveted in ways that require specific knowledge and equipment to repair safely.</p>
        <p>A repair done to the wrong specification can compromise structural integrity, void the warranty, and reduce the vehicle's value. That's why factory authorization exists, and why choosing the right repairer matters.</p>
        <p>Every repair we carry out follows manufacturer specifications, meets insurer requirements, and carries a written guarantee.</p>
      </div>
      <div class="split-image">
        <CloudflareImage src="/images/DSC00651.jpg" alt="Glasurit automotive paint mixing system" width={800} height={534} />
      </div>
    </div>
  </section>
</div>

<style>
  .page {
    min-height: 60vh;
  }

  .split-section {
    padding: var(--space-20, 5rem) 0;
  }

  .split-section.alt {
    background: var(--bg-content);
  }

  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
  }

  .split.reverse .split-image {
    order: -1;
  }

  .split-text h2 {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-6);
  }

  .split-text .lead {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .split-text p {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
    font-size: var(--text-lg);
  }

  .split-text ul {
    list-style: none;
    padding: 0;
    margin: var(--space-4) 0;
  }

  .split-text li {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--color-gray-100);
    font-size: var(--text-lg);
  }

  .split-text li:last-child {
    border-bottom: none;
  }

  .split-image {
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .split-image :global(img) {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    .split-section {
      padding: var(--space-12) 0;
    }

    .split {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .split.reverse .split-image {
      order: 0;
    }

    .split-text h2 {
      font-size: var(--text-2xl);
    }

    .split-text .lead {
      font-size: var(--text-lg);
    }

    .split-text p,
    .split-text li {
      font-size: var(--text-base);
    }
  }
</style>
