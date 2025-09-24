<script lang="ts">
  import { modal } from '$lib/stores/modal';

  const currentYear = new Date().getFullYear();

  function openContactModal() {
    modal.form({ title: 'Get a Quote' });
  }
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Company Info -->
      <div class="footer-column">
        <div class="footer-logo">
          <img src="/eurotech-logo.png" alt="Eurotech Auto Repair Centre" width="150" height="40" />
        </div>
        <p class="footer-description">
          New Zealand's only factory-authorized Jaguar/Land Rover structural repairer.
          European vehicle specialists with 20+ years experience.
        </p>
        <div class="social-links">
          <a href="https://www.facebook.com/eurotechauto" aria-label="Facebook">
            <img src="/icons/facebook.svg" alt="Facebook" width="20" height="20" />
          </a>
          <a href="https://www.instagram.com/eurotechauto" aria-label="Instagram">
            <img src="/icons/instagram.svg" alt="Instagram" width="20" height="20" />
          </a>
          <a href="https://g.page/eurotech-auto-repair" aria-label="Google Business">
            <img src="/icons/google.svg" alt="Google" width="20" height="20" />
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-column">
        <h3 class="footer-heading">Services</h3>
        <ul class="footer-links">
          <li><a href="#jaguar-landrover">Jaguar & Land Rover</a></li>
          <li><a href="#bmw-mini">BMW & Mini</a></li>
          <li><a href="#structural">Structural Repairs</a></li>
          <li><a href="#insurance">Insurance Claims</a></li>
          <li><a href="#paintless">Paintless Dent Removal</a></li>
        </ul>
      </div>

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
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <p class="copyright">
        © {currentYear} Eurotech Auto Repair Centre. All rights reserved.
      </p>
      <div class="footer-bottom-links">
        <a href="/privacy">Privacy Policy</a>
        <span class="separator">|</span>
        <a href="/terms">Terms of Service</a>
        <span class="separator">|</span>
        <a href="#contact">Contact</a>
      </div>
    </div>

    <!-- Certifications Bar -->
    <div class="certifications-bar">
      <span>Member of:</span>
      <img src="/mta-logo.png" alt="MTA Member" width="60" height="30" />
      <span>|</span>
      <span>CRA Accredited</span>
      <span>|</span>
      <span>I-Car Gold Certified</span>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #000000;
    color: rgba(255, 255, 255, 0.8);
    padding: var(--space-16) 0 var(--space-8);
    margin-top: auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
    gap: var(--space-12);
    margin-bottom: var(--space-12);
  }

  .footer-column {
    display: flex;
    flex-direction: column;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: white;
  }

  .footer-description {
    margin-bottom: var(--space-6);
    line-height: var(--leading-relaxed);
    color: rgba(255, 255, 255, 0.7);
  }

  .social-links {
    display: flex;
    gap: var(--space-4);
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

  .footer-links a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-links a:hover {
    color: var(--color-primary);
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
    background: var(--color-primary);
    color: white;
    border: none;
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-md);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .footer-cta:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--space-8);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .copyright {
    margin: 0;
    color: rgba(255, 255, 255, 0.5);
  }

  .footer-bottom-links {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .footer-bottom-links a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-bottom-links a:hover {
    color: var(--color-primary);
  }

  .separator {
    color: rgba(255, 255, 255, 0.3);
  }

  .certifications-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    padding-top: var(--space-6);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: var(--space-6);
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-8);
    }
  }

  @media (max-width: 640px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }

    .footer-bottom {
      flex-direction: column;
      gap: var(--space-4);
      text-align: center;
    }

    .certifications-bar {
      flex-direction: column;
      gap: var(--space-2);
    }
  }
</style>