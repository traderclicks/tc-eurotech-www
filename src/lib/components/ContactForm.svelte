<script lang="ts">
  export let title = 'Contact Form';
</script>

<div class="contact-form">
  {#if title}
    <div class="form-header">
      <h3 class="form-title">{title}</h3>
    </div>
  {/if}
</div>

<style>
  .contact-form {
    width: 100%;
    padding: var(--space-4);
  }

  .form-header {
    text-align: center;
  }

  .form-title {
    margin: 0;
    font-size: var(--text-2xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
  }
</style>