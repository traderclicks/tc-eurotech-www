<script lang="ts">
  export let checked = false;
  export let error = '';
  export let disabled = false;
  export let id = Math.random().toString(36).substring(7);
</script>

<div class="checkbox-group">
  <label for={id} class="checkbox-label">
    <input
      {id}
      type="checkbox"
      bind:checked
      {disabled}
      class="checkbox-field"
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    <span class="checkbox-text">
      <slot />
    </span>
  </label>
  {#if error}
    <span id="{id}-error" class="checkbox-error">{error}</span>
  {/if}
</div>

<style>
  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    cursor: pointer;
  }

  .checkbox-field {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    border: 2px solid var(--color-gray-300);
    border-radius: var(--radius-base);
    background: var(--bg-primary);
    cursor: pointer;
    transition: all var(--transition-fast);
    appearance: none;
    position: relative;
  }

  .checkbox-field:checked {
    background: var(--color-primary);
    border-color: var(--color-primary);
  }

  .checkbox-field:checked::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .checkbox-field:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-light)20;
  }

  .checkbox-field:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox-text {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-normal);
  }

  .checkbox-text :global(a) {
    color: var(--color-primary);
    text-decoration: underline;
  }

  .checkbox-error {
    font-size: var(--text-sm);
    color: var(--color-danger);
    margin-left: 32px;
  }
</style>