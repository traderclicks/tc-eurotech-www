<script lang="ts">
  export let variant: 'primary' | 'hero' | 'light' | 'link' | 'secondary' | 'outline' | 'ghost' = 'primary';
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
    on:click
  >
    {#if loading}
      <span class="btn-spinner"></span>
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
      <span class="btn-spinner"></span>
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
    font-weight: var(--font-semibold);
    text-decoration: none;
    border: none;
    border-radius: var(--radius-full);
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
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
  }

  .btn--medium {
    padding: var(--space-3) var(--space-8);
    font-size: var(--text-base);
  }

  .btn--large {
    padding: var(--space-4) var(--space-10);
    font-size: var(--text-lg);
  }

  /* === Primary: black pill === */
  .btn--primary {
    background: #1a1a1a;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .btn--primary:hover:not(:disabled) {
    background: #000000;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .btn--primary:active:not(:disabled) {
    transform: translateY(0);
  }

  /* === Hero: compact white pill for hero sections === */
  .btn--hero {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    color: #1a1a1a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: var(--space-3) var(--space-8);
    font-size: var(--text-lg);
  }

  .btn--hero:hover:not(:disabled) {
    background: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .btn--hero:active:not(:disabled) {
    transform: translateY(0);
  }

  /* === Light: white pill (for dark backgrounds) === */
  .btn--light {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    color: #1a1a1a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .btn--light:hover:not(:disabled) {
    background: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .btn--light:active:not(:disabled) {
    transform: translateY(0);
  }

  /* === Link: plain text with underline === */
  .btn--link {
    background: none;
    color: currentColor;
    font-weight: var(--font-bold);
    border-bottom: 1px solid currentColor;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
  }

  .btn--link:hover:not(:disabled) {
    opacity: 0.7;
  }

  /* === Legacy variants (backward compat) === */
  .btn--secondary {
    background: var(--color-secondary);
    color: white;
  }

  .btn--secondary:hover:not(:disabled) {
    background: var(--color-secondary-dark);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
    .btn:not(.btn--link) {
      min-height: 44px;
    }

    .btn--medium {
      padding: var(--space-2) var(--space-6);
      font-size: var(--text-sm);
    }
  }
</style>
