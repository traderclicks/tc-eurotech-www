<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import { site } from '$lib/config/site';
</script>

<Meta
  title="Privacy Policy"
  description="How Eurotech Auto Repair Centre collects, uses, and protects your personal information."
/>

<div class="page-header">
  <div class="container">
    <h1>Privacy Policy</h1>
    <p class="updated">Last updated: March 2026</p>
  </div>
</div>

<div class="page">
  <div class="container">
    <div class="content">

      <section>
        <h2>Who We Are</h2>
        <p>{site.businessName} operates from {site.fullAddress}. When we refer to "we", "us", or "our" in this policy, we mean {site.businessName}.</p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>We collect personal information when you:</p>
        <ul>
          <li>Submit a quote request or contact form on our website</li>
          <li>Phone or email us directly</li>
          <li>Bring a vehicle in for assessment or repair</li>
        </ul>
        <p>This typically includes your name, phone number, email address, vehicle details, and information about the damage or repair required. If your repair involves an insurance claim, we may also collect your policy number and insurer details.</p>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Prepare repair quotes and assessments</li>
          <li>Communicate with you about your repair</li>
          <li>Process insurance claims on your behalf (with your consent)</li>
          <li>Contact you about your vehicle's progress</li>
        </ul>
        <p>We do not use your information for marketing purposes unless you have specifically opted in.</p>
      </section>

      <section>
        <h2>Who We Share It With</h2>
        <p>We may share your personal information with:</p>
        <ul>
          <li>Your insurance company, to process a claim you have authorised</li>
          <li>Parts suppliers, where necessary to complete your repair</li>
          <li>Our form provider (Cognito Forms), which processes online form submissions on our behalf</li>
        </ul>
        <p>We do not sell or share your personal information with third parties for their own marketing purposes.</p>
      </section>

      <section>
        <h2>How We Protect It</h2>
        <p>Online form submissions are processed through Cognito Forms using encrypted (HTTPS) connections. We store customer records securely and limit access to staff who need the information to carry out their work.</p>
      </section>

      <section>
        <h2>How Long We Keep It</h2>
        <p>We retain your information for as long as necessary to complete your repair and meet our legal obligations. Repair records are typically kept for seven years in accordance with New Zealand tax and business record requirements.</p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>Under the New Zealand Privacy Act 2020, you have the right to:</p>
        <ul>
          <li>Ask what personal information we hold about you</li>
          <li>Request correction of any information that is wrong</li>
          <li>Ask us to delete your information (subject to legal retention requirements)</li>
        </ul>
        <p>To make a request, contact us at <a href="mailto:{site.email}">{site.email}</a> or phone <a href="tel:{site.phoneTel}">{site.phone}</a>.</p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>If you have questions about this privacy policy or how we handle your information, contact us:</p>
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
      font-size: clamp(2rem, 6vw, 3rem);
    }

    p, li {
      font-size: var(--text-base);
    }
  }
</style>
