<script lang="ts">
  import { modal } from '$lib/stores/modal';
  import { site } from '$lib/config/site';
  import PhoneIcon from './PhoneIcon.svelte';

  const currentYear = new Date().getFullYear();

  function openContactModal() {
    modal.cognito();
  }


</script>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Services -->
      <div class="footer-column">
        <div class="services-eyebrow">EUROTECH AUTO REPAIR</div>
        <ul class="footer-links services-grid-links">
          <li>
            <a href="/jaguar" class="service-link">
              <div class="logo-col">
                <img src="/jaguar-logo-white.svg" alt="" class="service-logo" />
              </div>
              <span class="text-col">Jaguar Repair</span>
            </a>
          </li>
          <li>
            <a href="/land-rover" class="service-link">
              <div class="logo-col">
                <img src="/landrover-logo-white.svg" alt="" class="service-logo service-logo-landrover" />
              </div>
              <span class="text-col">Land Rover Repair</span>
            </a>
          </li>
          <li>
            <a href="/range-rover" class="service-link">
              <div class="logo-col">
                <img src="/range-rover-logo-white.svg" alt="" class="service-logo service-logo-landrover" />
              </div>
              <span class="text-col">Range Rover Repair</span>
            </a>
          </li>
          <li>
            <a href="/bmw" class="service-link">
              <div class="logo-col">
                <img src="/bmw-logo-white.svg" alt="" class="service-logo service-logo-bmw" />
              </div>
              <span class="text-col">BMW Repair</span>
            </a>
          </li>
          <li>
            <a href="/mini" class="service-link">
              <div class="logo-col">
                <img src="/mini-white.svg" alt="" class="service-logo" />
              </div>
              <span class="text-col">Mini Repair</span>
            </a>
          </li>
        </ul>
        <p class="footer-description">
          New Zealand's only factory-authorized Jaguar/Land Rover structural repairer.
          European vehicle specialists with 20+ years experience.
        </p>
      </div>

      <!-- Spacer -->
      <div class="footer-spacer"></div>

      <!-- Information -->
      <div class="footer-column">
        <h3 class="footer-heading">Information</h3>
        <ul class="footer-links">
          <li><a href="/insurance">Make an Insurance Claim</a></li>
          <li><a href="/about">About Eurotech</a></li>
          <li><a href="/blog">From the Workshop</a></li>
          <li><a href="/gallery">Gallery</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms & Conditions</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="footer-column">
        <h3 class="footer-heading">Contact Us</h3>
        <div class="contact-info">
          <div class="contact-item">
            <PhoneIcon size={16} />
            <a href="tel:{site.phoneTel}">{site.phone}</a>
          </div>
          <div class="contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <a href="mailto:{site.email}">{site.email}</a>
          </div>
          <div class="contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{site.suburb}, {site.city}</span>
          </div>
          <div class="contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>{site.openingHours}</span>
          </div>
        </div>
        <button class="footer-cta" on:click={openContactModal}>
          Get a Repair Quote
        </button>

      </div>
    </div>

    <!-- Bottom Links -->
    <div class="footer-bottom-links">
      <div class="certifications-logos">
        <span>I-Car Gold Certified</span>
        <span class="separator">|</span>
        <span>Member of:</span>
        <img src="/cra-logo.png" alt="CRA Member" class="cert-logo cert-logo-cra" />
        <img src="/mta-logo.png" alt="MTA Member" class="cert-logo cert-logo-mta" />
      </div>

      <div class="bottom-right">
        <p class="copyright">
          © {currentYear} {site.businessName}. All rights reserved.
        </p>
        <span class="separator">|</span>
        <a href="/privacy">Privacy</a>
        <span class="separator">|</span>
        <a href="/terms">Terms</a>
        <span class="separator">|</span>
        <a
          class="made-with"
          href="https://traderclicks.co.nz"
          rel="noopener"
          target="_blank"
          title="TraderClicks Web Design &amp; Marketing"
        >
          <span class="made-with-text">Made with</span>
          <span class="made-with-heart" aria-hidden="true">
            <img src="/images/tc-heart.svg" alt="" width="16" height="18" />
          </span>
          <span class="sr-only">by TraderClicks</span>
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #08141a;
    color: rgba(255, 255, 255, 0.8);
    padding: var(--space-16) 0 var(--space-16);
    margin-top: auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 0.3fr 1fr 1fr;
    gap: var(--space-12);
  }

  .services-eyebrow {
    font-size: var(--text-base);
    font-weight: bold;
    letter-spacing: 0.30em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--space-6);
  }

  .footer-column {
    display: flex;
    flex-direction: column;
  }

  .footer-description {
    margin-top: var(--space-6);
    line-height: var(--leading-relaxed);
    color: rgba(255, 255, 255, 0.7);
  }

  .social-links {
    display: flex;
    gap: var(--space-6);
    margin-top: var(--space-8);
  }

  .social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.1);
    transition: all var(--transition-fast);
  }

  .social-links a:hover {
    background: var(--color-primary);
    transform: translateY(-2px);
  }

  .social-links a.social-icon-link {
    background: none;
    width: auto;
    height: auto;
    opacity: 0.8;
  }

  .social-links a.social-icon-link:hover {
    background: none;
    opacity: 1;
    transform: translateY(-2px);
  }

  .social-links a.google-link {
    width: auto;
    padding: 0 var(--space-2);
  }

  .google-logo-full {
    width: 70px;
    height: auto;
  }

  .footer-heading {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: white;
    margin-bottom: var(--space-4);
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: var(--space-3);
  }

  .services-grid-links li {
    margin-bottom: var(--space-5);
  }

  .footer-links a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-links a:hover {
    color: var(--color-primary);
  }

  .services-grid-links .service-link {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: var(--space-3);
    align-items: center;
  }

  .logo-col {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
  }

  .text-col {
    display: flex;
    align-items: center;
  }

  .service-logo {
    width: 50px;
    height: auto;
    opacity: 0.8;
  }

  .service-logo-bmw {
    width: 25px;
  }

  .service-logo-landrover {
    width: 40px;
  }

  .service-logo-insurance {
    width: 25px;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: rgba(255, 255, 255, 0.7);
  }

  .contact-item a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .contact-item a:hover {
    color: var(--color-primary);
  }

  .footer-cta {
    background: transparent;
    color: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(255, 255, 255, 0.5);
    padding: var(--space-3) var(--space-8);
    border-radius: var(--radius-full);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    width: fit-content;
  }

  .footer-cta:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.8);
    color: white;
    transform: translateY(-2px);
  }

  .copyright {
    margin: 0;
  }

  .footer-bottom-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    padding-top: var(--space-12);
    margin-top: var(--space-12);
    font-size: var(--text-sm);
  }

  .bottom-right {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }


  .certifications-logos {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.5);
  }

  .cert-logo {
    height: auto;
  }

  .cert-logo-cra {
    width: 54px;  /* -10% from 60px baseline */
  }

  .cert-logo-mta {
    width: 48px;  /* -20% from 60px baseline */
  }

  .footer-bottom-links a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-bottom-links a:hover {
    color: var(--color-primary);
  }

  .link-button {
    background: none;
    border: none;
    padding: 0;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
    transition: color var(--transition-fast);
  }

  .link-button:hover {
    color: var(--color-primary);
  }

  .separator {
    color: rgba(255, 255, 255, 0.3);
  }

  /* TraderClicks attribution — mirrors tc-thelawreports-www pattern */
  .made-with {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-left: var(--space-2);
    color: rgba(255, 255, 255, 0.5);
    font-size: var(--text-sm);
    text-decoration: none;
    transition: color var(--transition-fast);
  }
  .made-with:hover {
    color: white;
  }
  .made-with:hover .made-with-text {
    color: white;
  }
  .made-with-text {
    color: rgba(255, 255, 255, 0.5);
    transition: color var(--transition-fast);
  }
  .made-with-heart {
    display: inline-flex;
    width: 16px;
    height: 18px;
    align-items: center;
    justify-content: center;
    background-image: url('/images/tc-heart-hover.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .made-with-heart img {
    width: 100%;
    height: 100%;
    transition: opacity var(--transition-fast);
  }
  .made-with:hover .made-with-heart img {
    opacity: 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-8);
    }

    .footer-spacer {
      display: none;
    }

    /* Tablet: stack the two bottom blocks, center them, breathing room between */
    .footer-bottom-links {
      flex-direction: column;
      align-items: center;
      gap: var(--space-6);
      padding-top: var(--space-10);
      margin-top: var(--space-10);
      text-align: center;
    }

    .certifications-logos,
    .bottom-right {
      flex-wrap: wrap;
      justify-content: center;
      row-gap: var(--space-2);
    }
  }

  @media (max-width: 640px) {
    .footer {
      padding: var(--space-12) 0 var(--space-10);
    }

    .footer-grid {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .footer-spacer {
      display: none;
    }

    .footer-bottom-links {
      gap: var(--space-5);
      padding-top: var(--space-8);
      margin-top: var(--space-8);
    }

    .certifications-logos {
      gap: var(--space-2);
    }

    .bottom-right {
      gap: var(--space-2);
    }

    /* Tighten the pip separators a touch on mobile */
    .footer-bottom-links .separator {
      margin: 0 calc(var(--space-1) * -1);
    }

    /* Shrink brand service logos */
    .services-grid-links .service-link {
      grid-template-columns: 40px 1fr;
      gap: var(--space-2);
    }

    .logo-col {
      width: 40px;
    }

    .service-logo {
      width: 32px;
    }

    .service-logo-bmw {
      width: 18px;
    }

    .service-logo-landrover {
      width: 26px;
    }

    /* Shrink certifications logos (preserve the -10% / -20% ratio) */
    .cert-logo-cra {
      width: 43px;
    }

    .cert-logo-mta {
      width: 38px;
    }

    /* Keep made-with inline with Privacy/Terms — no own-line break */
    .made-with {
      margin-left: 0;
    }
  }
</style>