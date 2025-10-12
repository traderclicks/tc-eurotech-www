<script lang="ts">
  import { modal } from '$lib/stores/modal';

  const currentYear = new Date().getFullYear();

  function openContactModal() {
    modal.form({ title: 'Get a Quote' });
  }

  function openImageCreditsModal() {
    modal.alert({
      title: 'Image Credits',
      message: `
        <h3 style="margin-top: 0;">Image Sources</h3>
        <p>Vehicle photography from:</p>
        <ul style="line-height: 1.8;">
          <li><strong>Unsplash Contributors:</strong> Professional automotive photography</li>
          <li><strong>Eurotech Workshop:</strong> Original photography of our facility and work</li>
        </ul>
        <p style="margin-top: 1rem;">All images are used in accordance with their respective licenses.</p>
      `
    });
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
          <li>
            <a href="/insurance" class="service-link">
              <div class="logo-col">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3Cpath d='M9 12l2 2 4-4'/%3E%3C/svg%3E" alt="" class="service-logo service-logo-insurance" />
              </div>
              <span class="text-col">Insurance Claims</span>
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
          <li><a href="#about">About Eurotech</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms & Conditions</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="footer-column">
        <h3 class="footer-heading">Contact Us</h3>
        <div class="contact-info">
          <div class="contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <a href="tel:095731093">(09) 573 1093</a>
          </div>
          <div class="contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <a href="mailto:info@eurotech.co.nz">info@eurotech.co.nz</a>
          </div>
          <div class="contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Mount Wellington, Auckland</span>
          </div>
          <div class="contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>Mon-Fri: 8:00 AM - 5:00 PM</span>
          </div>
        </div>
        <button class="footer-cta" on:click={openContactModal}>
          Get a Quote
        </button>

        <!-- Social Links -->
        <div class="social-links">
          <a href="https://www.facebook.com/eurotechauto" aria-label="Facebook" class="social-icon-link">
            <img src="/icons/facebook.svg" alt="Facebook" width="35" height="35" />
          </a>
          <a href="https://www.instagram.com/eurotechauto" aria-label="Instagram" class="social-icon-link">
            <img src="/icons/instagram.svg" alt="Instagram" width="35" height="35" />
          </a>
          <a href="https://g.page/eurotech-auto-repair" aria-label="Google Business" class="social-icon-link">
            <img src="/icons/google.svg" alt="Google" width="35" height="35" />
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Links -->
    <div class="footer-bottom-links">
      <div class="bottom-left">
        <p class="copyright">
          © {currentYear} Eurotech Auto Repair Centre. All rights reserved.
        </p>
        <span class="separator">|</span>
        <a href="/privacy">Privacy</a>
        <span class="separator">|</span>
        <a href="/terms">Terms</a>
        <span class="separator">|</span>
        <button class="link-button" on:click={openImageCreditsModal}>Image Credits</button>
      </div>

      <!-- Logos at right -->
      <div class="certifications-logos">
        <span>I-Car Gold Certified</span>
        <span class="separator">|</span>
        <span>Member of:</span>
        <img src="/eurotech-logo.png" alt="Eurotech" width="60" height="30" />
        <img src="/mta-logo.png" alt="MTA Member" width="60" height="30" />
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #08141a;
    color: rgba(255, 255, 255, 0.8);
    padding: var(--space-16) 0 0;
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
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    padding-top: var(--space-12);
    margin-top: var(--space-12);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: var(--text-sm);
  }

  .bottom-left {
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

  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-8);
    }

    .footer-spacer {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .footer-spacer {
      display: none;
    }

    .footer-bottom-links {
      flex-direction: column;
      gap: var(--space-4);
    }

    .bottom-left {
      flex-wrap: wrap;
      justify-content: center;
    }

    .certifications-logos {
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--space-2);
    }
  }
</style>