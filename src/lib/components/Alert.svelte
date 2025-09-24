<script lang="ts">
  import { alertStyles } from '$lib/styles/alertStyles';

  export let variant: 'info' | 'success' | 'warning' | 'danger' = 'info';
  export let title: string | undefined = undefined;
  export let dismissible = false;

  let visible = true;

  const icons = {
    info: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`,
    success: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
    </svg>`,
    warning: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>`,
    danger: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`
  };

  $: classes = [
    alertStyles.base,
    alertStyles.variants[variant]
  ].join(' ');
</script>

{#if visible}
  <div class={classes} role="alert">
    <div class={alertStyles.icon}>
      {@html icons[variant]}
    </div>
    <div class="flex-1">
      {#if title}
        <div class={alertStyles.title}>{title}</div>
      {/if}
      <div class={alertStyles.message}>
        <slot />
      </div>
    </div>
    {#if dismissible}
      <button
        class={alertStyles.close}
        on:click={() => visible = false}
        aria-label="Dismiss"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    {/if}
  </div>
{/if}

<style>
  .flex-1 {
    flex: 1;
  }
</style>