<script lang="ts">
  import { modal } from '$lib/stores/modal';

  export let title = 'Contact Us';

  let name = '';
  let email = '';
  let phone = '';
  let message = '';
  let submitted = false;

  function handleSubmit() {
    // TODO: wire to form submission service (Cognito Forms, Resend, etc.)
    submitted = true;
  }

  function openContactForm() {
    modal.cognito();
  }
</script>

<div class="contact-form">
  {#if submitted}
    <div class="success">
      <p class="success-title">Thank you</p>
      <p>We'll be in touch shortly.</p>
    </div>
  {:else}
    <form on:submit|preventDefault={handleSubmit}>
      <div class="field">
        <label for="cf-name">Name</label>
        <input id="cf-name" type="text" bind:value={name} required />
      </div>

      <div class="field">
        <label for="cf-email">Email</label>
        <input id="cf-email" type="email" bind:value={email} required />
      </div>

      <div class="field">
        <label for="cf-phone">Phone</label>
        <input id="cf-phone" type="tel" bind:value={phone} />
      </div>

      <div class="field">
        <label for="cf-message">Message</label>
        <textarea id="cf-message" bind:value={message} rows="4" required></textarea>
      </div>

      <button type="submit" class="submit-btn">Send</button>
    </form>

    <div class="divider">
      <span>or</span>
    </div>

    <button class="cognito-btn" on:click={openContactForm}>
      Fill in our detailed contact form
    </button>
  {/if}
</div>

<style>
  .contact-form {
    width: 100%;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  label {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-primary);
  }

  input, textarea {
    padding: var(--space-3) var(--space-4);
    border: 1px solid var(--color-neutral-200);
    font-size: var(--text-base);
    font-family: inherit;
    color: var(--text-primary);
    background: white;
    transition: border-color var(--transition-fast);
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  textarea {
    resize: vertical;
  }

  .submit-btn {
    padding: var(--space-3) var(--space-6);
    background: var(--color-primary);
    color: white;
    border: none;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: background var(--transition-fast);
  }

  .submit-btn:hover {
    background: var(--color-primary-dark);
  }

  .divider {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin: var(--space-6) 0;
    color: var(--text-tertiary);
    font-size: var(--text-sm);
  }

  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--color-neutral-200);
  }

  .cognito-btn {
    width: 100%;
    padding: var(--space-3) var(--space-6);
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    font-family: inherit;
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .cognito-btn:hover {
    background: var(--color-primary);
    color: white;
  }

  .success {
    text-align: center;
    padding: var(--space-8) 0;
  }

  .success-title {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-2);
  }

  .success p {
    color: var(--text-secondary);
  }
</style>
