<script lang="ts">
  import { fly } from 'svelte/transition';

  export let stats = [];
  export let backgroundColor = 'var(--color-primary)';
  export let textColor = 'white';
</script>

<section class="stats" style="background: {backgroundColor}; color: {textColor};">
  <div class="container">
    <div class="stats-grid">
      {#each stats as stat, i}
        <div class="stat-item" in:fly={{ y: 20, delay: 100 * i, duration: 600 }}>
          <div class="stat-number">{stat.number}</div>
          <div class="stat-label">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .stats {
    padding: var(--space-12) 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-8);
    text-align: center;
  }

  .stat-number {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-2);
  }

  .stat-label {
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.9;
  }

  /* Mobile Styles */
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6);
    }
  }
</style>