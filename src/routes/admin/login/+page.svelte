<script lang="ts">
  import type { ActionData, PageData } from './$types';

  export let data: PageData;
  export let form: ActionData;
</script>

<svelte:head>
  <title>Admin Login - Eurotech CMS</title>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<div class="login-container">
  <div class="login-card">
    <h1>CMS Login</h1>
    <p class="subtitle">Enter your email to receive a login link</p>

    {#if data.error}
      <div class="error-banner">
        {data.error}
      </div>
    {/if}

    {#if form?.success}
      <div class="success-banner">
        <p>{form.message}</p>
        {#if form.devLink}
          <div class="dev-link">
            <p><strong>Dev mode:</strong> Click below to login</p>
            <a href={form.devLink} class="magic-link-btn">Open Magic Link</a>
          </div>
        {/if}
      </div>
    {:else}
      <form method="POST" action="?/request">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autofocus
            placeholder="you@example.com"
            value={form?.email || ''}
            class:error={form?.error}
          />
        </div>

        {#if form?.error}
          <p class="error-message">{form.error}</p>
        {/if}

        <div class="turnstile-wrapper">
          <div
            class="cf-turnstile"
            data-sitekey="1x00000000000000000000AA"
            data-theme="light"
          ></div>
        </div>

        <button type="submit" class="submit-btn">
          Send Login Link
        </button>
      </form>
    {/if}

    <p class="footer-text">
      Only authorized editors can access the CMS
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
    max-width: 420px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  h1 {
    text-align: center;
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: #08141a;
    margin-bottom: var(--space-2);
    margin-top: 0;
  }

  .subtitle {
    text-align: center;
    color: rgba(8, 20, 26, 0.6);
    margin-bottom: var(--space-8);
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

  .error-banner {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: var(--space-4);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-6);
    text-align: center;
  }

  .success-banner {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
    padding: var(--space-4);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-6);
    text-align: center;
  }

  .dev-link {
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid #bbf7d0;
  }

  .dev-link p {
    font-size: var(--text-sm);
    margin-bottom: var(--space-2);
  }

  .magic-link-btn {
    display: inline-block;
    background: #166534;
    color: white;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    text-decoration: none;
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
  }

  .magic-link-btn:hover {
    background: #14532d;
  }

  .turnstile-wrapper {
    display: flex;
    justify-content: center;
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
