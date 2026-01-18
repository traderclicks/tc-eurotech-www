<script lang="ts">
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<div class="admin-layout">
  {#if data.user}
    <header class="admin-header">
      <h1>Eurotech CMS</h1>
    </header>
  {/if}

  <main class="admin-content">
    <slot />
  </main>
</div>

<style>
  .admin-layout {
    min-height: 100vh;
    background: #f5f7fa;
  }

  .admin-header {
    background: #08141a;
    color: white;
    padding: var(--space-4) var(--space-6);
  }

  .admin-header h1 {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    margin: 0;
  }

  .admin-content {
    padding: var(--space-6);
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
