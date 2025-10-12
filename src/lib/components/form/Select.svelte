<script lang="ts">
  export let label = '';
  export let value = '';
  export let options: { value: string; label: string }[] = [];
  export let error = '';
  export let required = false;
  export let disabled = false;
  export let id = Math.random().toString(36).substring(7);
</script>

<div class="select-group">
  {#if label}
    <label for={id} class="select-label">
      {label}
    </label>
  {/if}
  <select
    {id}
    bind:value
    {required}
    {disabled}
    class="select-field"
    class:error
    aria-invalid={!!error}
    aria-describedby={error ? `${id}-error` : undefined}
  >
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  {#if error}
    <span id="{id}-error" class="select-error">{error}</span>
  {/if}
</div>

<style>
  .select-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .select-label {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--text-primary);
  }

  .select-field {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--text-primary);
    background: var(--bg-primary);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--space-3) center;
    padding-right: var(--space-10);
  }

  .select-field:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light)20;
  }

  .select-field.error {
    border-color: var(--color-danger);
  }

  .select-field:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--bg-secondary);
  }

  .select-error {
    font-size: var(--text-sm);
    color: var(--color-danger);
  }
</style>