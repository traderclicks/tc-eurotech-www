<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  export let disabled = false;
  export let loading = false;
  export let fullWidth = false;
  export let icon: string | undefined = undefined;
</script>

{#if href && !disabled}
  <a
    {href}
    class="btn btn--{variant} btn--{size}"
    class:btn--full={fullWidth}
    class:btn--loading={loading}
  >
    {#if loading}
      <span class="btn-spinner" />
    {/if}
    {#if icon && !loading}
      <span class="btn-icon">{@html icon}</span>
    {/if}
    <span class="btn-text">
      <slot />
    </span>
  </a>
{:else}
  <button
    {type}
    {disabled}
    class="btn btn--{variant} btn--{size}"
    class:btn--full={fullWidth}
    class:btn--loading={loading}
    on:click
  >
    {#if loading}
      <span class="btn-spinner" />
    {/if}
    {#if icon && !loading}
      <span class="btn-icon">{@html icon}</span>
    {/if}
    <span class="btn-text">
      <slot />
    </span>
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-family: inherit;
    font-weight: var(--font-medium);
    text-decoration: none;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
    white-space: nowrap;
  }

  .btn:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sizes */
  .btn--small {
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-sm);
  }

  .btn--medium {
    padding: var(--space-3) var(--space-5);
    font-size: var(--text-base);
  }

  .btn--large {
    padding: var(--space-4) var(--space-6);
    font-size: var(--text-lg);
  }

  /* Variants */
  .btn--primary {
    background: var(--color-primary);
    color: white;
  }

  .btn--primary:hover:not(:disabled) {
    background: var(--color-primary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn--primary:active:not(:disabled) {
    transform: translateY(0);
  }

  .btn--secondary {
    background: var(--color-secondary);
    color: white;
  }

  .btn--secondary:hover:not(:disabled) {
    background: var(--color-secondary-dark);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .btn--outline {
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  .btn--outline:hover:not(:disabled) {
    background: var(--color-primary);
    color: white;
  }

  .btn--ghost {
    background: transparent;
    color: var(--text-primary);
  }

  .btn--ghost:hover:not(:disabled) {
    background: var(--bg-secondary);
  }

  /* Full Width */
  .btn--full {
    width: 100%;
  }

  /* Loading State */
  .btn--loading {
    color: transparent;
  }

  .btn--loading .btn-text {
    visibility: hidden;
  }

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

  /* Mobile touch target */
  @media (max-width: 640px) {
    .btn {
      min-height: 44px;
    }
  }
</style>