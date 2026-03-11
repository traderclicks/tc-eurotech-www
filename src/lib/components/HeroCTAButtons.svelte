<script lang="ts">
  import { modal } from '$lib/stores/modal';

  function openContactModal() {
    modal.cognito();
  }

  function openInsuranceModal() {
    modal.insurance();
  }
</script>

<div class="hero-actions">
  <button class="hero-book-btn" on:click={openContactModal}>
    Get a Repair Quote
  </button>
  <button class="hero-insurance-link" on:click={openInsuranceModal}>
    insurance contacts
  </button>
</div>

<style>
  .hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-6);
    margin-top: var(--space-6);
  }

  .hero-book-btn {
    padding: var(--space-3) var(--space-8);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    color: #1a1a1a;
    border: none;
    border-radius: var(--radius-full);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    text-decoration: none;
    display: inline-block;
  }

  .hero-book-btn:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .hero-insurance-link {
    color: white;
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    text-decoration: none;
    opacity: 1;
    transition: opacity var(--transition-base);
    border-bottom: 1px solid white;
    padding-bottom: 2px;
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    cursor: pointer;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
  }

  .hero-insurance-link:hover {
    opacity: 1;
    border-bottom-color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    .hero-actions {
      flex-direction: column;
      gap: var(--space-4);
    }

    .hero-book-btn {
      font-size: var(--text-sm);
      padding: var(--space-2) var(--space-6);
    }
  }
</style>
