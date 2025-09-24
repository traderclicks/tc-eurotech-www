<script lang="ts">
  import Button from './Button.svelte';

  export let icon = '';
  export let title = '';
  export let description = '';
  export let buttonText = 'Learn More →';
  export let buttonHref = '#';
  export let buttonVariant = 'ghost';
</script>

<div class="service-card">
  {#if icon}
    <img src={icon} alt={title} class="service-icon" />
  {/if}

  {#if title}
    <h3 class="service-title">{title}</h3>
  {/if}

  {#if description}
    <p class="service-description">{description}</p>
  {/if}

  {#if buttonText && buttonHref}
    <Button variant={buttonVariant} href={buttonHref}>
      {buttonText}
    </Button>
  {/if}
</div>

<style>
  .service-card {
    text-align: center;
    padding: var(--space-6);
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-xl);
    transition: all var(--transition-base);
  }

  .service-card:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }

  .service-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto var(--space-4);
  }

  .service-title {
    margin-bottom: var(--space-3);
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
  }

  .service-description {
    color: var(--text-secondary);
    margin-bottom: var(--space-4);
    line-height: var(--leading-relaxed);
  }
</style>