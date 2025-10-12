<script lang="ts">
  export let type: 'text' | 'email' | 'tel' | 'password' | 'number' | 'url' = 'text';
  export let label = '';
  export let value = '';
  export let placeholder = '';
  export let error = '';
  export let required = false;
  export let disabled = false;
  export let readonly = false;
  export let id = Math.random().toString(36).substring(7);
</script>

<div class="input-group">
  {#if label}
    <label for={id} class="input-label">
      {label}
    </label>
  {/if}
  <input
    {id}
    {type}
    bind:value
    {placeholder}
    {required}
    {disabled}
    {readonly}
    class="input-field"
    class:error
    aria-invalid={!!error}
    aria-describedby={error ? `${id}-error` : undefined}
  />
  {#if error}
    <span id="{id}-error" class="input-error">{error}</span>
  {/if}
</div>

<style>
  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .input-label {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-primary);
  }

  .input-field {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--text-primary);
    background: var(--bg-primary);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }

  .input-field:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light)20;
  }

  .input-field.error {
    border-color: var(--color-danger);
  }

  .input-field.error:focus {
    box-shadow: 0 0 0 3px #ef444420;
  }

  .input-field:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--bg-secondary);
  }

  .input-field::placeholder {
    color: var(--text-muted);
  }

  .input-error {
    font-size: var(--text-sm);
    color: var(--color-danger);
  }

  @media (max-width: 640px) {
    .input-field {
      font-size: 16px; /* Prevent zoom on iOS */
    }
  }
</style>