<script lang="ts">
  import { modals } from '$lib/stores/modal';
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';
  import { parseUnsplashAttribution, type UnsplashAttribution } from '$lib/utils/unsplash-attribution';

  type Category = 'all' | 'jaguar' | 'landrover' | 'mini' | 'workshop';

  interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: Category;
    useCloudflare?: boolean;
    attribution?: UnsplashAttribution | null;
  }

  let activeCategory: Category = 'all';

  const rawImages: GalleryImage[] = [
    // Land Rover / Range Rover (20 images from land-rover collection)
    { id: 1, src: '/gallery/land-rover/grundsteins-53JjnvtUGKE-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 2, src: '/gallery/land-rover/cedrikwesche-YP1LA4lzDJc-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 3, src: '/gallery/land-rover/timtrad-CLm3pWXrS9Q-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 4, src: '/gallery/land-rover/timtrad-HxrAN-G0IfI-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 5, src: '/gallery/land-rover/timtrad-v-4RgW343fA-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 6, src: '/gallery/land-rover/grantritchie-j0YPbvXu4t0-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 7, src: '/gallery/land-rover/grantritchie-jYk96oRbPwg-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 8, src: '/gallery/land-rover/richhemingway-UbTktGx_vdQ-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 9, src: '/gallery/land-rover/jonflobrant-lRSChvh1Mhs-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 10, src: '/gallery/land-rover/finding_dan-lXvycA58ZfQ-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 11, src: '/gallery/land-rover/visionaryconcepts-jx4OyQHNhi0-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 12, src: '/gallery/land-rover/withluke-Pn285tSRCNY-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 13, src: '/gallery/land-rover/woeiman-4C-x7CQNwvw-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 14, src: '/gallery/land-rover/louistricot-0Uv4fh1kLCc-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 15, src: '/gallery/land-rover/metinozer-hShrr0WvrQs-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 16, src: '/gallery/land-rover/loris_marie-DFvBETKITEw-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 17, src: '/gallery/land-rover/r3dmax-dTQyfxfdtp8-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 18, src: '/gallery/land-rover/dillonjshook-xWeSCy5BdfI-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 19, src: '/gallery/land-rover/cmalquist-3jquALuN6B0-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    { id: 20, src: '/gallery/land-rover/braintax-Y4vFVJPyYew-unsplash.jpg', alt: 'Land Rover luxury vehicle', category: 'landrover' },
    // Mini (11 images from mini collection)
    { id: 21, src: '/gallery/mini/huntleytography-G0GRk2bzJiU-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 22, src: '/gallery/mini/sonniehiles-PUBt7UPbJFY-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 23, src: '/gallery/mini/v1d-kySbGWdOmio-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 24, src: '/gallery/mini/v1d-4D7rUMPYiqE-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 25, src: '/gallery/mini/yxvi-zKILixwL90A-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 26, src: '/gallery/mini/huntleytography-0jdnuETGLRg-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 27, src: '/gallery/mini/huntleytography-d_6pVSQip3I-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 28, src: '/gallery/mini/picsbyjameslee-msFTpW3g9CA-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 29, src: '/gallery/mini/reinhartjulian-q3WIb09OMYE-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 30, src: '/gallery/mini/damiangoh-0f4B4UDk8T0-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    { id: 31, src: '/gallery/mini/icedcocoa-zmdG9tUvK4I-unsplash.jpg', alt: 'Mini specialist service', category: 'mini' },
    // Jaguar (15 images from jaguar collection)
    { id: 32, src: '/gallery/jaguar/taylor65s-EIs247QDxZk-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 33, src: '/gallery/jaguar/mostafa_jamei-rZzOv2M-CIM-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 34, src: '/gallery/jaguar/introspectivedsgn-oUoLi5k7esA-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 35, src: '/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 36, src: '/gallery/jaguar/imlst-OnppPkl1d3U-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 37, src: '/gallery/jaguar/imlst-XsTEdMbraw0-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 38, src: '/gallery/jaguar/gettyimages-nKlKPouTUsg-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 39, src: '/gallery/jaguar/switch_dtp_fotografie-01dxABUoCQA-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 40, src: '/gallery/jaguar/quentin_martinez-rl9vMwJkoRY-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 41, src: '/gallery/jaguar/fourfour_44-w4aIu8mhxX8-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 42, src: '/gallery/jaguar/escobar_kanishk-J1kmixRfys0-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 43, src: '/gallery/jaguar/neptune279-_J0AfhTco-w-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 44, src: '/gallery/jaguar/davidgeneugelijk-mdUbSHdebO0-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 45, src: '/gallery/jaguar/coty12-MnzEPhMDh6w-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    { id: 46, src: '/gallery/jaguar/cashmacanaya-m2-1PmKnig0-unsplash.jpg', alt: 'Jaguar specialist service', category: 'jaguar' },
    // Andy's Workshop Photos (2019)
    { id: 47, src: '/images/DSC00592.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 48, src: '/images/DSC00596.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 49, src: '/images/DSC00604.jpg', alt: 'Repair bay', category: 'workshop', useCloudflare: true },
    { id: 50, src: '/images/DSC00619.jpg', alt: 'Workshop equipment', category: 'workshop', useCloudflare: true },
    { id: 51, src: '/images/DSC00625.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 52, src: '/images/DSC00636.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 53, src: '/images/DSC00651.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 54, src: '/images/DSC00655.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 55, src: '/images/DSC00661.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 56, src: '/images/DSC00671.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 58, src: '/images/DSC00689.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 59, src: '/images/DSC00693.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 60, src: '/images/DSC00720.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 61, src: '/images/DSC00727.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 62, src: '/images/DSC00735.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 63, src: '/images/DSC00740.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 64, src: '/images/DSC00748.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 65, src: '/images/DSC00751.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 66, src: '/images/DSC00760.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 67, src: '/images/DSC00768.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 68, src: '/images/DSC00773.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 70, src: '/images/DSC00931.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 71, src: '/images/DSC00972.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 72, src: '/images/DSC00977.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 73, src: '/images/DSC00979.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 74, src: '/images/DSC00981.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 75, src: '/images/DSC00985.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 76, src: '/images/DSC00986.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true },
    { id: 77, src: '/images/DSC00988.jpg', alt: 'Workshop facility', category: 'workshop', useCloudflare: true }
  ];

  // Add attribution data to all images
  const images: GalleryImage[] = rawImages.map(img => ({
    ...img,
    attribution: parseUnsplashAttribution(img.src)
  }));

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

  function openImageModal(src: string, alt: string, attribution?: UnsplashAttribution | null) {
    modals.open({
      type: 'image',
      content: { src, alt, attribution }
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
          on:click={() => openImageModal(image.src, image.alt, image.attribution)}
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
          {#if image.attribution}
            <div class="attribution">
              Photo by <a
                href={image.attribution.photographerUrl}
                target="_blank"
                rel="noopener noreferrer"
                on:click={(e) => e.stopPropagation()}
              >
                {image.attribution.photographer}
              </a> on <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                on:click={(e) => e.stopPropagation()}
              >
                Unsplash
              </a>
            </div>
          {/if}
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

  .attribution {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 70%, transparent 100%);
    color: white;
    padding: var(--space-4) var(--space-3) var(--space-2);
    font-size: var(--text-xs);
    text-align: center;
    z-index: 5;
    pointer-events: auto;
  }

  .attribution a {
    color: white;
    text-decoration: underline;
    font-weight: var(--font-medium);
    transition: opacity var(--transition-base);
  }

  .attribution a:hover {
    opacity: 0.8;
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
