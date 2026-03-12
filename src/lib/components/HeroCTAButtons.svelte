<script lang="ts">
  import Button from './Button.svelte';
  import { modal } from '$lib/stores/modal';
</script>

<div class="hero-actions">
  <Button variant="hero" on:click={() => modal.cognito()}>Get a Repair Quote</Button>
  <span class="hero-link-wrapper">
    <Button variant="link" size="large" on:click={() => modal.insurance()}>Insurance Contacts</Button>
  </span>
</div>

<style>
  .hero-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-8);
    margin-bottom: var(--space-8);
  }

  .hero-link-wrapper {
    color: white;
  }

  @media (max-width: 768px) {
    .hero-actions {
      flex-direction: column;
      gap: var(--space-4);
    }
  }
</style>
