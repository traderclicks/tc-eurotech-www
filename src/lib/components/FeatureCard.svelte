<script lang="ts">
  export let icon = '✨';
  export let title = '';
  export let description = '';

  // Determine if icon is an SVG string, emoji, or image URL
  $: isSvgString = typeof icon === 'string' && icon.includes('<svg');
  $: isImageUrl = typeof icon === 'string' && (icon.startsWith('/') || icon.startsWith('http') || icon.startsWith('data:'));
</script>

<div class="feature-card">
  <div class="feature-icon">
    {#if isSvgString}
      {@html icon}
    {:else if isImageUrl}
      <img src={icon} alt={title} />
    {:else}
      {icon}
    {/if}
  </div>
  <h3 class="feature-title">{title}</h3>
  <p class="feature-description">{description}</p>
</div>

<style>
  .feature-card {
    padding: var(--space-6);
    background: var(--bg-primary);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    text-align: center;
    transition: all var(--transition-base);
  }

  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: var(--space-4);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
  }

  .feature-icon img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  .feature-icon :global(svg) {
    width: 48px;
    height: 48px;
  }

  .feature-title {
    font-size: var(--text-xl);
    margin-bottom: var(--space-2);
  }

  .feature-description {
    color: var(--text-secondary);
  }
</style>