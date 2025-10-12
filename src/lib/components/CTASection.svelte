<script lang="ts">
  export let title = 'Ready to Get Started?';
  export let description = 'Contact us today for a free consultation';
</script>

<section class="cta">
  <div class="container">
    <h2>{title}</h2>
    <p>{description}</p>
    <slot />
  </div>
</section>

<style>
  .cta {
    padding: var(--space-16) 0;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    color: white;
    text-align: center;
  }

  h2 {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-4);
  }

  p {
    font-size: var(--text-xl);
    opacity: 0.9;
    margin-bottom: var(--space-8);
  }
</style>