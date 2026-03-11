<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  // Images from CMS slot
  $: images = data.images;

  let lightboxOpen = false;
  let lightboxImage = { src: '', alt: '' };
  let lightboxIndex = 0;

  function openLightbox(index: number) {
    lightboxIndex = index;
    lightboxImage = images[index];
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOpen = false;
    document.body.style.overflow = '';
  }

  function nextImage() {
    lightboxIndex = (lightboxIndex + 1) % images.length;
    lightboxImage = images[lightboxIndex];
  }

  function prevImage() {
    lightboxIndex = (lightboxIndex - 1 + images.length) % images.length;
    lightboxImage = images[lightboxIndex];
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<Meta
  title="Gallery - Eurotech Auto Repair Centre"
  description="See our workshop and team in action. European vehicle repair specialists in Auckland."
/>

<div class="gallery-page">
  <div class="container">
    <header class="page-header">
      <h1>Eurotech Gallery</h1>
      <p>See our team and facility in action</p>
    </header>

    <div class="gallery-grid">
      {#each images as image, index}
        <button
          class="gallery-item"
          on:click={() => openLightbox(index)}
          aria-label="View larger: {image.alt}"
        >
          <CloudflareImage
            src={image.src}
            alt={image.alt}
            width={400}
            height={300}
          />
          <div class="gallery-overlay">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div>

<!-- Lightbox -->
{#if lightboxOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="lightbox" on:click={closeLightbox}>
    <button class="lightbox-close" on:click={closeLightbox} aria-label="Close">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <button class="lightbox-nav prev" on:click|stopPropagation={prevImage} aria-label="Previous image">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6"></path>
      </svg>
    </button>

    <div class="lightbox-content" on:click|stopPropagation>
      <img src={lightboxImage.src} alt={lightboxImage.alt} />
    </div>

    <button class="lightbox-nav next" on:click|stopPropagation={nextImage} aria-label="Next image">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6"></path>
      </svg>
    </button>

    <div class="lightbox-counter">
      {lightboxIndex + 1} / {images.length}
    </div>
  </div>
{/if}

<style>
  .gallery-page {
    padding: var(--space-16) 0;
    min-height: 60vh;
  }

  .page-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .page-header h1 {
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .page-header p {
    font-size: var(--text-lg);
    color: var(--text-muted);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
  }

  .gallery-item {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: var(--radius-lg);
    cursor: pointer;
    border: none;
    padding: 0;
    background: var(--bg-secondary);
    transition: transform 0.2s ease;
  }

  .gallery-item:hover {
    transform: scale(1.02);
  }

  .gallery-item :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
    color: white;
  }

  .gallery-item:hover .gallery-overlay {
    opacity: 1;
  }

  /* Lightbox */
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lightbox-close {
    position: absolute;
    top: var(--space-4);
    right: var(--space-4);
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: var(--space-2);
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .lightbox-close:hover {
    opacity: 1;
  }

  .lightbox-content {
    max-width: 90vw;
    max-height: 85vh;
  }

  .lightbox-content img {
    max-width: 100%;
    max-height: 85vh;
    object-fit: contain;
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: var(--space-4);
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .lightbox-nav:hover {
    opacity: 1;
  }

  .lightbox-nav.prev {
    left: var(--space-4);
  }

  .lightbox-nav.next {
    right: var(--space-4);
  }

  .lightbox-counter {
    position: absolute;
    bottom: var(--space-4);
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: var(--text-sm);
    opacity: 0.7;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .gallery-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-3);
    }

    .page-header h1 {
      font-size: var(--text-3xl);
    }
  }

  @media (max-width: 480px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
