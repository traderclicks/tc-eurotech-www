<script lang="ts">
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<div class="admin-layout">
  {#if data.user}
    <header class="admin-header">
      <div class="header-left">
        <h1>Eurotech CMS</h1>
      </div>
      <div class="header-right">
        <span class="user-info">
          {data.user.email}
          <span class="role-badge" class:approver={data.user.role === 'approver'}>
            {data.user.role}
          </span>
        </span>
        <form method="POST" action="/admin/login?/logout" style="display: inline;">
          <button type="submit" class="logout-btn">Logout</button>
        </form>
      </div>
    </header>
  {/if}

  <main class="admin-content">
    <slot />
  </main>
</div>

<style>
  .admin-layout {
    min-height: 100vh;
    background: #f5f7fa;
  }

  .admin-header {
    background: #08141a;
    color: white;
    padding: var(--space-4) var(--space-6);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .admin-header h1 {
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    margin: 0;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .user-info {
    font-size: var(--text-sm);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .role-badge {
    background: rgba(255, 255, 255, 0.2);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-size: var(--text-xs);
    text-transform: uppercase;
  }

  .role-badge.approver {
    background: var(--color-primary);
  }

  .logout-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .logout-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .admin-content {
    padding: var(--space-6);
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
