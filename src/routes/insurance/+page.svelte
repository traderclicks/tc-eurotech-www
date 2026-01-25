<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
</script>

<Meta
  title="Insurance Claims - Eurotech Auto Repair Centre"
  description="We handle your insurance claim from start to finish. Trusted by all major NZ insurers for European vehicle repairs."
/>

<div class="page">
  <div class="container">
    <h1>Insurance Claims</h1>
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
