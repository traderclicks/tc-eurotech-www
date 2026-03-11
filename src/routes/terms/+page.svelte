<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import { site } from '$lib/config/site';
</script>

<Meta
  title="Terms & Conditions"
  description="Terms and conditions for using the Eurotech Auto Repair Centre website and services."
/>

<div class="page-header">
  <div class="container">
    <h1>Terms & Conditions</h1>
    <p class="updated">Last updated: March 2026</p>
  </div>
</div>

<div class="page">
  <div class="container">
    <div class="content">

      <section>
        <h2>About This Website</h2>
        <p>This website is operated by {site.businessName}, {site.fullAddress}. By using this website you agree to these terms.</p>
      </section>

      <section>
        <h2>Quotes and Estimates</h2>
        <p>Quotes submitted through this website are requests only and do not constitute a binding agreement. All repair quotes are subject to a physical inspection of the vehicle. Final pricing may differ from initial estimates if additional damage is found during the repair process.</p>
        <p>We will always discuss any changes in scope or cost with you before proceeding.</p>
      </section>

      <section>
        <h2>Repairs and Warranty</h2>
        <p>All repairs are carried out in accordance with manufacturer specifications where applicable. Repairs completed by {site.businessName} carry a written guarantee as outlined at the time of repair.</p>
        <p>Warranty does not cover damage caused by subsequent incidents, misuse, or failure to follow manufacturer maintenance recommendations.</p>
      </section>

      <section>
        <h2>Insurance Claims</h2>
        <p>Where we manage an insurance claim on your behalf, we act as your representative with your insurer. You remain responsible for any excess or costs not covered by your insurance policy. We are not responsible for decisions made by your insurer regarding claim approval or coverage.</p>
      </section>

      <section>
        <h2>Website Content</h2>
        <p>We make reasonable efforts to keep the information on this website accurate and up to date. However, we do not guarantee that all content is complete, current, or free of errors. Vehicle images on this site may include stock photography and may not represent specific vehicles repaired by us.</p>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <p>All content on this website, including text, images, logos, and design, is owned by or licensed to {site.businessName} and is protected by copyright. You may not reproduce, distribute, or use any content from this website without our written permission.</p>
        <p>Vehicle manufacturer names, logos, and trademarks displayed on this site are the property of their respective owners and are used to indicate our repair specialisations.</p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>To the fullest extent permitted by New Zealand law, {site.businessName} is not liable for any indirect, incidental, or consequential loss arising from your use of this website. This does not affect your rights under the Consumer Guarantees Act 1993 or other applicable New Zealand legislation.</p>
      </section>

      <section>
        <h2>External Links</h2>
        <p>This website may contain links to third-party websites. We are not responsible for the content, privacy practices, or availability of those sites.</p>
      </section>

      <section>
        <h2>Changes to These Terms</h2>
        <p>We may update these terms from time to time. The latest version will always be available on this page. Continued use of the website after changes constitutes acceptance of the updated terms.</p>
      </section>

      <section>
        <h2>Governing Law</h2>
        <p>These terms are governed by the laws of New Zealand. Any disputes will be subject to the jurisdiction of the New Zealand courts.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>If you have questions about these terms, contact us:</p>
        <p>
          {site.businessName}<br>
          {site.address}<br>
          {site.suburb}, {site.city} {site.postcode}<br>
          Phone: <a href="tel:{site.phoneTel}">{site.phone}</a><br>
          Email: <a href="mailto:{site.email}">{site.email}</a>
        </p>
      </section>
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
    color: var(--text-heading);
    text-align: center;
  }

  .content {
    max-width: 740px;
    margin: 0 auto;
  }

  .updated {
    text-align: center;
    color: var(--text-tertiary);
    font-size: var(--text-sm);
    margin-bottom: 0;
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

  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .page {
      padding: var(--space-8) 0;
    }

    h1 {
      font-size: clamp(2rem, 6vw, 3rem);
    }

    p {
      font-size: var(--text-base);
    }
  }
</style>
