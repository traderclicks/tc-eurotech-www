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
    <p class="placeholder">Content coming soon.</p>
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

  .placeholder {
    color: var(--color-text-muted);
    font-size: var(--text-lg);
  }
</style>
