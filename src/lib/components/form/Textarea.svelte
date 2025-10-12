<script lang="ts">
  export let label = '';
  export let value = '';
  export let placeholder = '';
  export let error = '';
  export let required = false;
  export let disabled = false;
  export let readonly = false;
  export let rows = 4;
  export let id = Math.random().toString(36).substring(7);
</script>

<div class="textarea-group">
  {#if label}
    <label for={id} class="textarea-label">
      {label}
    </label>
  {/if}
  <textarea
    {id}
    bind:value
    {placeholder}
    {required}
    {disabled}
    {readonly}
    {rows}
    class="textarea-field"
    class:error
    aria-invalid={!!error}
    aria-describedby={error ? `${id}-error` : undefined}
  ></textarea>
  {#if error}
    <span id="{id}-error" class="textarea-error">{error}</span>
  {/if}
</div>

<style>
  .textarea-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .textarea-label {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-primary);
  }

  .textarea-field {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    font-family: inherit;
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--text-primary);
    background: var(--bg-primary);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    resize: vertical;
    min-height: 100px;
    transition: all var(--transition-fast);
  }

  .textarea-field:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light)20;
  }

  .textarea-field.error {
    border-color: var(--color-danger);
  }

  .textarea-field:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--bg-secondary);
  }

  .textarea-error {
    font-size: var(--text-sm);
    color: var(--color-danger);
  }
</style>