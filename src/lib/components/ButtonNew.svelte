<script lang="ts">
  import { buttonStyles, type ButtonVariant, type ButtonSize } from '$lib/styles/buttonStyles';

  export let variant: ButtonVariant = 'primary';
  export let size: ButtonSize = 'medium';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  export let disabled = false;
  export let loading = false;
  export let fullWidth = false;
  export let icon: string | undefined = undefined;

  // Construct classes using centralized styles
  $: classes = [
    buttonStyles.base,
    buttonStyles.variants[variant],
    buttonStyles.sizes[size],
    fullWidth && buttonStyles.fullWidth,
    loading && buttonStyles.loading
  ].filter(Boolean).join(' ');
</script>

{#if href && !disabled}
  <a
    {href}
    class={classes}
    class:opacity-50={disabled}
    class:pointer-events-none={disabled}
  >
    {#if loading}
      <span class="btn-spinner"></span>
    {/if}
    {#if icon && !loading}
      <span class="btn-icon">{@html icon}</span>
    {/if}
    <span class:invisible={loading}>
      <slot />
    </span>
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    on:click
  >
    {#if loading}
      <span class="btn-spinner"></span>
    {/if}
    {#if icon && !loading}
      <span class="btn-icon">{@html icon}</span>
    {/if}
    <span class:invisible={loading}>
      <slot />
    </span>
  </button>
{/if}

<style>
  /* Only component-specific styles that aren't in centralized file */
  .btn-spinner {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  .btn-icon {
    display: flex;
    align-items: center;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Ensure proper touch target on mobile */
  @media (max-width: 640px) {
    button, a {
      min-height: 44px;
    }
  }

  /* Utility classes using Tailwind-like naming */
  .opacity-50 {
    opacity: 0.5;
  }

  .pointer-events-none {
    pointer-events: none;
  }

  .invisible {
    visibility: hidden;
  }

  /* Background and text colors for variants - using semantic colors */
  .bg-primary {
    background-color: var(--color-primary);
  }

  .bg-secondary {
    background-color: var(--color-secondary);
  }

  .bg-success {
    background-color: var(--color-success);
  }

  .bg-danger {
    background-color: var(--color-danger);
  }

  .bg-warning {
    background-color: var(--color-warning);
  }

  /* Hover states using semantic colors */
  .hover\:bg-primary-dark:hover {
    background-color: var(--color-primary-dark);
  }

  .hover\:bg-secondary-dark:hover {
    background-color: var(--color-secondary-dark);
  }

  .hover\:bg-success-dark:hover {
    background-color: var(--color-success-dark);
  }

  .hover\:bg-danger-dark:hover {
    background-color: var(--color-danger-dark);
  }

  .hover\:bg-warning-dark:hover {
    background-color: var(--color-warning-dark);
  }
</style>