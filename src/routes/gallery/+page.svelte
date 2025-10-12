<script lang="ts">
  import { modals } from '$lib/stores/modal';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';

  type Category = 'all' | 'jaguar' | 'landrover' | 'mini' | 'workshop';

  interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: Category;
    useCloudflare?: boolean;
  }

  let activeCategory: Category = 'all';

  const images: GalleryImage[] = [
    // Range Rover / Land Rover
    { id: 1, src: '/gallery/Range-rover-6XeVLIVbbpg-unsplash.jpeg', alt: 'Range Rover luxury vehicle', category: 'landrover' },
    { id: 2, src: '/gallery/range-rover-LyhzCmT23QM-unsplash.jpeg', alt: 'Range Rover luxury vehicle', category: 'landrover' },
    { id: 3, src: '/gallery/range-rover-kD858yV-GME-unsplash.jpeg', alt: 'Range Rover luxury vehicle', category: 'landrover' },
    { id: 4, src: '/gallery/lasnd-rover-EiYV7GWsR78-unsplash.jpeg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    // Mini
    { id: 5, src: '/gallery/mini-gFP1cUAviAc-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 6, src: '/gallery/mini-G0GRk2bzJiU-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 7, src: '/gallery/mini-VjjhiOobxU0-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 8, src: '/gallery/mini-d_6pVSQip3I-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 9, src: '/gallery/mini-PUBt7UPbJFY-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 10, src: '/gallery/mini-0jdnuETGLRg-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 11, src: '/gallery/mini-jjzQB15xcGs-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 12, src: '/gallery/mini--AfHLWdTyjQ-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 13, src: '/gallery/mini-msFTpW3g9CA-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 14, src: '/gallery/mini-AnQV-1C-hJk-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 15, src: '/gallery/mini-ZIyIy8RFoQA-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 16, src: '/gallery/mini-zKILixwL90A-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 17, src: '/gallery/mini-RUQV_UbOKgY-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    { id: 18, src: '/gallery/mini-vynohradov-QimUytDxdKk-unsplash.jpeg', alt: 'Mini specialist service', category: 'mini' },
    // Jaguar
    { id: 19, src: '/gallery/jaguar-kalamar-pJ5Nm5QfB7k-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 20, src: '/gallery/jaguar-6pDXbba2cQk-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 21, src: '/gallery/jaguar-yRAb7f_LlfI-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 22, src: '/gallery/jaguarj-wYZOFSt2f9Y-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 23, src: '/gallery/jaguar-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 24, src: '/gallery/jaguar-OnppPkl1d3U-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 25, src: '/gallery/jaguar-MGVLBuXS6Ic-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 26, src: '/gallery/jaguar-nyUIFbDSy5Y-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 27, src: '/gallery/jaguar-oUoLi5k7esA-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 28, src: '/gallery/Jaguar-UWekMnJ2pCc-unsplash.jpeg', alt: 'Jaguar specialist service', category: 'jaguar' },
    // Andy's Workshop Photos (2019)
    { id: 29, src: '/images/DSC00592.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 30, src: '/images/DSC00596.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 31, src: '/images/DSC00604.jpg', alt: 'Repair bay', category: 'workshop', useCloudflare: true },
    { id: 32, src: '/images/DSC00619.jpg', alt: 'Workshop equipment', category: 'workshop', useCloudflare: true },
    { id: 33, src: '/images/DSC00625.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 34, src: '/images/DSC00636.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 35, src: '/images/DSC00651.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 36, src: '/images/DSC00655.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 37, src: '/images/DSC00661.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 38, src: '/images/DSC00671.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 39, src: '/images/DSC00683.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 40, src: '/images/DSC00689.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 41, src: '/images/DSC00693.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 42, src: '/images/DSC00720.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 43, src: '/images/DSC00727.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 44, src: '/images/DSC00735.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 45, src: '/images/DSC00740.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 46, src: '/images/DSC00748.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 47, src: '/images/DSC00751.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 48, src: '/images/DSC00760.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 49, src: '/images/DSC00768.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 50, src: '/images/DSC00773.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 51, src: '/images/DSC00926.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 52, src: '/images/DSC00931.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 53, src: '/images/DSC00972.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 54, src: '/images/DSC00977.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 55, src: '/images/DSC00979.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 56, src: '/images/DSC00981.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 57, src: '/images/DSC00985.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 58, src: '/images/DSC00986.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 59, src: '/images/DSC00988.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true }
  ];

  $: filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory);

  $: categoryCounts = {
    all: images.length,
    jaguar: images.filter(img => img.category === 'jaguar').length,
    landrover: images.filter(img => img.category === 'landrover').length,
    mini: images.filter(img => img.category === 'mini').length,
    workshop: images.filter(img => img.category === 'workshop').length
  };

  function openImageModal(src: string, alt: string) {
    modals.open({
      type: 'image',
      content: { src, alt }
    });
  }
</script>

<svelte:head>
  <title>Gallery - Eurotech Automotive</title>
  <meta name="description" content="View our work with Range Rover, Mini, Jaguar and other luxury European vehicles" />
</svelte:head>

<div class="gallery-page">
  <div class="container">
    <header class="page-header">
      <h1>Gallery</h1>
      <p>Our work with Range Rover, Mini, Jaguar and luxury European vehicles</p>
    </header>

    <!-- Category Filter Tabs -->
    <div class="category-tabs">
      <button
        class="tab"
        class:active={activeCategory === 'all'}
        on:click={() => activeCategory = 'all'}
      >
        All ({categoryCounts.all})
      </button>
      <button
        class="tab"
        class:active={activeCategory === 'jaguar'}
        on:click={() => activeCategory = 'jaguar'}
      >
        Jaguar ({categoryCounts.jaguar})
      </button>
      <button
        class="tab"
        class:active={activeCategory === 'landrover'}
        on:click={() => activeCategory = 'landrover'}
      >
        Land Rover ({categoryCounts.landrover})
      </button>
      <button
        class="tab"
        class:active={activeCategory === 'mini'}
        on:click={() => activeCategory = 'mini'}
      >
        Mini ({categoryCounts.mini})
      </button>
      <button
        class="tab"
        class:active={activeCategory === 'workshop'}
        on:click={() => activeCategory = 'workshop'}
      >
        Workshop ({categoryCounts.workshop})
      </button>
    </div>

    <div class="gallery-grid">
      {#each filteredImages as image (image.src)}
        <button
          class="gallery-item"
          on:click={() => openImageModal(image.src, image.alt)}
          aria-label="View larger image: {image.alt}"
        >
          <div class="image-id">{image.id}</div>
          {#if image.useCloudflare}
            <div class="cloudflare-wrapper">
              <CloudflareImage
                src={image.src}
                alt={image.alt}
                width={800}
                height={533}
              />
            </div>
          {:else}
            <img src={image.src} alt={image.alt} loading="lazy" />
          {/if}
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

<style>
  .gallery-page {
    padding: var(--space-16) 0;
    min-height: calc(100vh - 200px);
  }

  .page-header {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .page-header h1 {
    font-size: var(--text-5xl);
    font-weight: var(--font-bold);
    color: var(--text-primary);
    margin-bottom: var(--space-4);
  }

  .page-header p {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .category-tabs {
    display: flex;
    gap: var(--space-2);
    justify-content: center;
    flex-wrap: wrap;
    margin: var(--space-8) 0 var(--space-12);
    padding: 0 var(--space-4);
  }

  .tab {
    padding: var(--space-3) var(--space-6);
    background: var(--bg-secondary);
    border: 2px solid transparent;
    border-radius: var(--radius-full);
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-base);
  }

  .tab:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }

  .tab.active {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  .cloudflare-wrapper {
    width: 100%;
    height: 100%;
  }

  .cloudflare-wrapper :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-6);
    margin: 0 auto;
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
    transition: transform var(--transition-base);
  }

  .gallery-item:hover {
    transform: translateY(-4px);
  }

  .gallery-item:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .image-id {
    position: absolute;
    top: var(--space-2);
    left: var(--space-2);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    z-index: 10;
    pointer-events: none;
  }

  .gallery-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--transition-base);
    color: white;
  }

  .gallery-item:hover .gallery-overlay,
  .gallery-item:focus .gallery-overlay {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .gallery-page {
      padding: var(--space-8) 0;
    }

    .page-header h1 {
      font-size: var(--text-3xl);
    }

    .page-header p {
      font-size: var(--text-base);
    }

    .gallery-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--space-4);
    }
  }

  @media (max-width: 480px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
