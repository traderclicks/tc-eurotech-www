<script lang="ts">
  import { logoPlaceholder } from '$lib/utils/placeholders';

  export let logos = [
    { src: '/jaguar-logo-lg.jpg', alt: 'Jaguar Authorized Repairer' },
    { src: '/bmw-logo.jpg', alt: 'BMW Specialist' },
    { src: '/mini-logo-lg.jpg', alt: 'Mini Cooper Specialist' },
  ];
</script>

<div class="client-logos">
  {#each logos as logo}
    <div class="client-logo">
      <img src={logo.src} alt={logo.alt} />
    </div>
  {/each}
</div>

<style>
  .client-logos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--space-8);
    align-items: center;
    background: #ffffff1a;
  }

  .client-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    filter: grayscale(100%);
    transition: all var(--transition-base);
  }

  .client-logo:hover {
    opacity: 1;
    filter: grayscale(0%);
  }

  .client-logo img {
    max-width: 180px;
    max-height: 80px;
    width: auto;
    height: auto;
  }
</style>