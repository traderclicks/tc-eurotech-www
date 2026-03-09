<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
</script>

<Meta
  title="About Eurotech - European Vehicle Specialists Auckland"
  description="Learn about Eurotech Auto Repair Centre, New Zealand's only factory-authorized Jaguar/Land Rover structural repairer with 20+ years experience."
/>

<div class="page">
  <div class="container">
    <h1>About Eurotech</h1>

    <div class="content">
      <section class="intro">
        <p class="lead">For over 20 years, Eurotech Auto Repair Centre has been one of Auckland's leading panel and paint workshops — specialising exclusively in European vehicles.</p>
        <p>Based in Mount Wellington, we combine factory-authorized repair methods with the latest equipment and technology to deliver results that meet manufacturer specifications every time.</p>
      </section>

      <section>
        <h2>Ownership</h2>
        <p>Eurotech is jointly owned by Trevor and Louise Foreman and Marino Milich. Between them, they bring decades of hands-on experience in panel beating and spray painting, along with a shared commitment to quality and customer service.</p>
      </section>

      <section>
        <h2>Factory Authorizations</h2>
        <p>We hold certifications that set us apart from general body shops:</p>
        <ul>
          <li><strong>New Zealand's only fully factory-authorized structural repairer for Jaguar and Land Rover</strong> — certified to carry out aluminium structural repairs to manufacturer specifications</li>
          <li><strong>New Zealand's only accredited BMW Carbon Fibre Body Shop</strong> — one of very few facilities equipped and trained for carbon fibre repair</li>
          <li><strong>Accredited BMW Group Body Shop</strong> — meeting BMW's standards for panel and paint repairs</li>
          <li><strong>Recommended repairer for Renault</strong></li>
          <li><strong>CRA quality assurance accreditation</strong> — Collision Repair Association certified</li>
          <li><strong>MTA member</strong> — Motor Trade Association</li>
        </ul>
      </section>

      <section>
        <h2>Our Team</h2>
        <p>Our technicians are factory-trained specialists, not generalists. The team includes I-CAR certified welders and technicians who have completed Jaguar aluminium structural repair courses — training that's only available to authorized repairers.</p>
        <p>Our refinish staff are trained in Glasurit automotive paint systems, the same premium products used by manufacturers. This ensures colour accuracy and a finish that's indistinguishable from factory.</p>
      </section>

      <section>
        <h2>How We Work</h2>
        <p>Every repair we carry out meets three standards:</p>
        <ul>
          <li><strong>Manufacturer specifications</strong> — we follow the exact repair methods prescribed by the vehicle maker</li>
          <li><strong>Insurer requirements</strong> — we work with all major NZ insurers and manage the claims process directly</li>
          <li><strong>Written guarantees</strong> — all repairs carry a written manufacturer guarantee</li>
        </ul>
        <p>We use the latest equipment for measuring, pulling, welding, and finishing — including specialist aluminium and carbon fibre tooling that most body shops simply don't have.</p>
      </section>

      <section>
        <h2>Why It Matters</h2>
        <p>Modern European vehicles use advanced materials — high-strength steel, aluminium, carbon fibre — bonded and riveted in ways that require specific knowledge and equipment to repair safely. A repair done to the wrong specification can compromise the vehicle's structural integrity, void its warranty, and reduce its value.</p>
        <p>That's why factory authorization exists, and it's why choosing the right repairer matters.</p>
      </section>
    </div>
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

  .content {
    max-width: 740px;
  }

  .intro {
    margin-bottom: var(--space-10);
  }

  .lead {
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    color: var(--color-text);
    margin-bottom: var(--space-4);
  }

  section {
    margin-bottom: var(--space-10);
  }

  h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--color-text);
    margin-bottom: var(--space-4);
  }

  p {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
    font-size: var(--text-lg);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: var(--space-4) 0;
  }

  li {
    color: var(--text-secondary);
    line-height: var(--leading-relaxed);
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--color-neutral-100);
    font-size: var(--text-lg);
  }

  li:last-child {
    border-bottom: none;
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

    p, li {
      font-size: var(--text-base);
    }
  }
</style>
