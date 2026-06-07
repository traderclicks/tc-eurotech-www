<script lang="ts">
  import { modal } from '$lib/stores/modal';
  import { site } from '$lib/config/site';
  import Meta from '$lib/components/Meta.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import GoogleReviewsSection from '$lib/components/GoogleReviewsSection.svelte';
  import BlogCard from '$lib/components/BlogCard.svelte';
  import { generateFAQSchema } from '$lib/utils/structuredData';
  import { page } from '$app/stores';
  import type { FaqsByPage } from '$lib/cms/faqs';

  export let data;

  function openContactModal() {
    modal.cognito();
  }

  const heroImages = [
    '/images/DSC00748.jpg',
    '/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg',
    '/gallery/bmw/martinkatler-1ouLyK5oykg-unsplash.jpg',
    '/images/DSC00619.jpg',
    '/gallery/jaguar/davidgeneugelijk-mdUbSHdebO0-unsplash.jpg',
    '/gallery/land-rover/finding_dan-lXvycA58ZfQ-unsplash.jpg',
    '/images/DSC00773.jpg',
    '/gallery/mini/damiangoh-0f4B4UDk8T0-unsplash.jpg',
    '/images/DSC00751.jpg',
    '/gallery/bmw/pat__-TOigkN59Dcg-unsplash.jpg',
    '/images/DSC00727.jpg',
    '/gallery/range-rover/range-rover-1725815761.jpg'
  ];

  $: faqs = (($page.data.faqs as FaqsByPage | undefined)?.home ?? []);

  // Services data
  const services = [
    {
      icon: '/jaguar-logo-white.svg',
      title: 'Jaguar',
      description: 'Factory-authorized structural repairs with genuine parts',
      buttonHref: '/jaguar',
      backgroundImage: '/gallery/jaguar/fourfour_44-w4aIu8mhxX8-unsplash.jpg'
    },
    {
      icon: '/landrover-logo-white.svg',
      title: 'Land Rover',
      description: 'Factory-authorized Land Rover specialist repairs',
      buttonHref: '/land-rover',
      backgroundImage: '/gallery/land-rover/timtrad-CLm3pWXrS9Q-unsplash.jpg'
    },
    {
      icon: '/range-rover-logo-white.svg',
      title: 'Range Rover',
      description: 'Premium Range Rover collision repair and refinishing',
      buttonHref: '/range-rover',
      backgroundImage: '/gallery/range-rover/range-rover-1725815761.jpg'
    },
    {
      icon: '/bmw-logo-white.svg',
      title: 'BMW',
      description: 'Specialist BMW repairs using latest repair techniques',
      buttonHref: '/bmw',
      backgroundImage: '/bmw.jpg'
    },
    {
      icon: '/mini-white.svg',
      title: 'Mini',
      description: 'Expert Mini collision repairs and panel beating',
      buttonHref: '/mini',
      backgroundImage: '/gallery/mini/huntleytography-d_6pVSQip3I-unsplash.jpg'
    },
    {
      icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1"%3E%3Cpath d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/%3E%3Cpath d="M9 12l2 2 4-4"/%3E%3C/svg%3E',
      title: 'Insurance Claims',
      description: 'Complete claim management from assessment to completion',
      buttonHref: '/insurance',
      backgroundImage: '/gallery/land-rover/woeiman-4C-x7CQNwvw-unsplash.jpg'
    }
  ];

  // Blog articles from CMS
  $: blogArticles = (data.latestPosts ?? []).map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    image: post.featuredImage?.url ?? data.defaultPostImage ?? '',
    category: post.category,
    date: new Date(post.publishedAt).toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' }),
    href: `/blog/${post.slug}`
  }));

  // LocalBusiness schema is now emitted by +layout.svelte site-wide; not duplicated here.
</script>

<!-- SEO Meta Tags -->
<Meta
  title="Eurotech Auto Repair Centre - European Vehicle Specialists Auckland"
  description={`New Zealand's only factory-authorized Jaguar/Land Rover structural repairer. Expert BMW and Mini repairs. Insurance approved. Call ${site.phone}`}
  keywords="european car repair auckland, bmw repair, jaguar repair, land rover repair, mini repair, panel beaters auckland, insurance repairs"
  ogImage="/og-eurotech.jpg"
/>

<!-- Structured Data -->
<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(faqs))}</script>`}
</svelte:head>

<!-- Hero Section -->
<ServiceHero
  title="Eurotech Auto Repair Centre"
  description="NZ's only factory-authorized Jaguar/Land Rover repairer  •  Expert BMW & Mini repairs  •  Over 20 years experience"
  images={heroImages}
  showLogoBar={true}
  minHeight={840}
/>

<!-- Services Section -->
<section class="section bg-blog">
  <div class="container">
    <div class="services-grid">
      {#each services as service}
        <ServiceCard {...service} />
      {/each}
    </div>
  </div>
</section>

<!-- Blog Articles -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <div class="section-title-row">
        <h2 class="section-title">From the Workshop</h2>
        <span class="section-title-pipe"><span class="pipe">|</span> <a href="/blog" class="section-more-link">View all posts →</a></span>
      </div>
      <p class="section-subtitle">Updates and articles from your European vehicle repair specialist</p>
    </div>

    <div class="blog-grid">
      {#each blogArticles as article}
        <BlogCard {...article} />
      {/each}
    </div>
  </div>
</section>

<!-- Google Reviews Section -->
<GoogleReviewsSection />

<!-- FAQ Section -->
<section class="section">
  <div class="container">
    <div class="section-header text-center">
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>
    <div class="faq-container">
      <FAQ items={faqs} />
    </div>
  </div>
</section>

<style>
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
    margin-top: var(--space-8);
  }

  @media (min-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .bg-blog {
    background: var(--bg-content);
    padding-top: var(--space-12);
  }

  .faq-container {
    max-width: 800px;
    margin: var(--space-8) auto 0;
  }

  .section-title-row {
    display: flex;
    align-items: baseline;
    gap: var(--space-4);
  }

  .section-title-pipe {
    margin-left: var(--space-4);
    font-size: var(--text-sm);
    display: inline-flex;
    align-items: baseline;
    gap: var(--space-3);
  }

  .pipe {
    color: var(--text-secondary);
  }

  .section-more-link {
    font-size: var(--text-sm);
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    white-space: nowrap;
    transition: color var(--transition-fast);
  }

  .section-more-link:hover {
    color: var(--text-primary);
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
    margin-top: var(--space-8);
  }

  @media (max-width: 1024px) {
    .blog-grid :global(:last-child:nth-child(odd)) {
      display: none;
    }
  }

  .text-center {
    text-align: center;
  }
</style>
