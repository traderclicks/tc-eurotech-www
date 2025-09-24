<script lang="ts">
  export let badges = [
    { src: '/images/badge-ssl.svg', alt: 'SSL Secured' },
    { src: '/images/badge-verified.svg', alt: 'Verified Business' },
    { src: '/images/badge-guarantee.svg', alt: 'Money Back Guarantee' },
  ];
</script>

<div class="trust-badges">
  {#each badges as badge}
    <div class="badge">
      <img src={badge.src} alt={badge.alt} />
    </div>
  {/each}
</div>

<style>
  .trust-badges {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
  }

  .badge {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .badge img {
    max-width: 100%;
    max-height: 100%;
    filter: grayscale(100%);
    opacity: 0.6;
    transition: all var(--transition-fast);
  }

  .badge:hover img {
    filter: grayscale(0%);
    opacity: 1;
  }
</style>