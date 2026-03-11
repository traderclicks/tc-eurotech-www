<script lang="ts">
  import Button from './Button.svelte';
  import { modal } from '$lib/stores/modal';
</script>

<section class="footer-cta">
  <div class="container">
    <div class="cta-actions">
      <Button size="large" on:click={() => modal.cognito()}>Get a Repair Quote</Button>
      <Button variant="link" size="large" on:click={() => modal.insurance()}>Insurance Contacts</Button>
    </div>
  </div>
</section>

<style>
  .footer-cta {
    padding: var(--space-20) 0;
    background: var(--bg-content);
    text-align: center;
  }

  .cta-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-8);
  }

  @media (max-width: 768px) {
    .footer-cta {
      padding: var(--space-8) 0;
    }

    .cta-actions {
      flex-direction: column;
      gap: var(--space-4);
    }
  }
</style>
