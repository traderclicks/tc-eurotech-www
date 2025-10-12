<script lang="ts">
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<svelte:head>
  <title>Login - Eurotech Auto Repair</title>
</svelte:head>

<div class="login-container">
  <div class="login-card">
    <h1>Site Access</h1>

    <form method="POST">
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autofocus
          class:error={form?.incorrect}
        />
      </div>

      {#if form?.incorrect}
        <p class="error-message">Incorrect password. Please try again.</p>
      {/if}

      <button type="submit" class="submit-btn">
        Access Site
      </button>
    </form>

    <p class="footer-text">
      Authorized access only
    </p>
  </div>
</div>

<style>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #08141a 0%, #1a2f3a 100%);
    padding: var(--space-4);
  }

  .login-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-12);
    width: 100%;
    max-width: 400px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  h1 {
    text-align: center;
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: #08141a;
    margin-bottom: var(--space-8);
    margin-top: 0;
  }

  .form-group {
    margin-bottom: var(--space-6);
  }

  label {
    display: block;
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: #08141a;
    margin-bottom: var(--space-2);
  }

  input {
    width: 100%;
    padding: var(--space-3);
    border: 2px solid rgba(8, 20, 26, 0.2);
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    transition: all var(--transition-fast);
  }

  input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(107, 140, 174, 0.1);
  }

  input.error {
    border-color: #dc2626;
  }

  .error-message {
    color: #dc2626;
    font-size: var(--text-sm);
    margin-top: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .submit-btn {
    width: 100%;
    padding: var(--space-4);
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .submit-btn:hover {
    background: #5a7a9a;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(107, 140, 174, 0.4);
  }

  .submit-btn:active {
    transform: translateY(0);
  }

  .footer-text {
    text-align: center;
    font-size: var(--text-sm);
    color: rgba(8, 20, 26, 0.6);
    margin-top: var(--space-6);
    margin-bottom: 0;
  }

  @media (max-width: 640px) {
    .login-card {
      padding: var(--space-8);
    }

    h1 {
      font-size: var(--text-2xl);
    }
  }
</style>
