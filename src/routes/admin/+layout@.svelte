<script lang="ts">
  import '$lib/styles/admin.css';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>CMS | Eurotech Auto</title>
</svelte:head>

<div class="admin-shell">
  {#if data.user}
    <header class="admin-header">
      <div class="header-left">
        <span class="header-brand">CMS</span>
        <span class="header-divider"></span>
        <span class="header-site">Eurotech Auto</span>
      </div>
      <div class="header-right">
        <span class="header-user">{data.user.email}</span>
        <form method="POST" action="/admin/login?/logout">
          <button type="submit" class="logout-btn">Log out</button>
        </form>
      </div>
    </header>
  {/if}

  <main class="admin-main">
    <slot />
  </main>

  <footer class="admin-footer">
    <span>Content Management System</span>
  </footer>
</div>

<style>
  .admin-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .admin-header {
    background: var(--admin-surface);
    border-bottom: 1px solid var(--admin-border);
    padding: var(--admin-space-3) var(--admin-space-6);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: var(--admin-space-3);
  }

  .header-brand {
    font-weight: var(--admin-font-bold);
    font-size: var(--admin-text-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--admin-primary);
  }

  .header-divider {
    width: 1px;
    height: 16px;
    background: var(--admin-border);
  }

  .header-site {
    font-size: var(--admin-text-sm);
    color: var(--admin-text-secondary);
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: var(--admin-space-4);
  }

  .header-user {
    font-size: var(--admin-text-sm);
    color: var(--admin-text-secondary);
  }

  .logout-btn {
    font-size: var(--admin-text-sm);
    color: var(--admin-text-muted);
    padding: var(--admin-space-1) var(--admin-space-2);
    border-radius: var(--admin-radius-sm);
    transition: color var(--admin-transition), background var(--admin-transition);
  }

  .logout-btn:hover {
    color: var(--admin-danger);
    background: rgba(220, 38, 38, 0.05);
  }

  /* Main */
  .admin-main {
    flex: 1;
    padding: var(--admin-space-6);
  }

  /* Footer */
  .admin-footer {
    background: var(--admin-surface);
    border-top: 1px solid var(--admin-border);
    padding: var(--admin-space-4) var(--admin-space-6);
    text-align: center;
    font-size: var(--admin-text-xs);
    color: var(--admin-text-muted);
  }
</style>
