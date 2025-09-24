<script lang="ts">
  import { page } from '$app/stores';
  import Meta from '$lib/components/Meta.svelte';
  import Button from '$lib/components/Button.svelte';

  $: statusCode = $page.status;
  $: statusMessage = $page.error?.message || 'Something went wrong';

  $: isNotFound = statusCode === 404;
  $: title = isNotFound ? 'Page Not Found' : `Error ${statusCode}`;
  $: description = isNotFound
    ? 'The page you are looking for could not be found.'
    : 'An error occurred while processing your request.';
</script>

<Meta
  {title}
  {description}
  noindex={true}
/>

<div class="error-page">
  <div class="container">
    <div class="error-content">
      <h1 class="error-code">{statusCode}</h1>
      <h2 class="error-title">{title}</h2>
      <p class="error-message">{statusMessage}</p>
      <p class="error-description">{description}</p>

      <div class="error-actions">
        <Button href="/" variant="primary">
          Return to Homepage
        </Button>
        {#if isNotFound}
          <Button href="/sitemap" variant="secondary">
            View Sitemap
          </Button>
        {/if}
      </div>

      {#if isNotFound}
        <div class="helpful-links">
          <h3>Helpful Links</h3>
          <ul>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .error-page {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-16) 0;
  }

  .error-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .error-code {
    font-size: clamp(4rem, 10vw, 8rem);
    font-weight: var(--font-bold);
    color: var(--color-primary);
    margin: 0;
    line-height: 1;
  }

  .error-title {
    font-size: var(--text-3xl);
    margin: var(--space-4) 0;
    color: var(--text-primary);
  }

  .error-message {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    margin: var(--space-2) 0;
  }

  .error-description {
    color: var(--text-muted);
    margin: var(--space-4) 0 var(--space-8);
  }

  .error-actions {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
    margin: var(--space-8) 0;
  }

  .helpful-links {
    margin-top: var(--space-12);
    padding-top: var(--space-8);
    border-top: 1px solid var(--border-color);
  }

  .helpful-links h3 {
    font-size: var(--text-xl);
    margin-bottom: var(--space-4);
  }

  .helpful-links ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: var(--space-6);
    justify-content: center;
    flex-wrap: wrap;
  }

  .helpful-links a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .helpful-links a:hover {
    color: var(--color-primary-dark);
    text-decoration: underline;
  }
</style>