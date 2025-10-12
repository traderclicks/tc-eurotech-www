<script lang="ts">
  export let name = '';
  export let role = '';
  export let content = '';
  export let avatar = '';
</script>

<div class="testimonial">
  <div class="testimonial-content">
    <p>"{content}"</p>
  </div>
  <div class="testimonial-author">
    {#if avatar}
      <img src={avatar} alt={name} class="author-avatar" />
    {/if}
    <div>
      <div class="author-name">{name}</div>
      <div class="author-role">{role}</div>
    </div>
  </div>
</div>

<style>
  .testimonial {
    padding: var(--space-6);
    background: var(--bg-secondary);
    border-radius: var(--radius-xl);
  }

  .testimonial-content {
    margin-bottom: var(--space-4);
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .author-avatar {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
  }

  .author-name {
    font-weight: var(--font-semibold);
  }

  .author-role {
    color: var(--text-secondary);
    font-size: var(--text-sm);
  }
</style>