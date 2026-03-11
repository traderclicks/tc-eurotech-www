<script lang="ts">
  import { modal } from '$lib/stores/modal';
  import { site } from '$lib/config/site';
  import Meta from '$lib/components/Meta.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import ServiceHero from '$lib/components/ServiceHero.svelte';
  import ServiceCard from '$lib/components/ServiceCard.svelte';
  import ReviewSection from '$lib/components/ReviewSection.svelte';
  import BlogCard from '$lib/components/BlogCard.svelte';
  import { generateFAQSchema, generateLocalBusinessSchema } from '$lib/utils/structuredData';

  export let data;

  function openContactModal() {
    modal.cognito();
  }

  const heroImages = [
    '/images/DSC00619.jpg',
    '/gallery/jaguar/imkaravisual-G3A9DDh3ovU-unsplash.jpg',
    '/gallery/bmw/martinkatler-1ouLyK5oykg-unsplash.jpg',
    '/images/DSC00748.jpg',
    '/gallery/jaguar/davidgeneugelijk-mdUbSHdebO0-unsplash.jpg',
    '/images/DSC00972.jpg',
    '/gallery/land-rover/finding_dan-lXvycA58ZfQ-unsplash.jpg',
    '/images/DSC00773.jpg',
    '/gallery/mini/damiangoh-0f4B4UDk8T0-unsplash.jpg',
    '/images/DSC00751.jpg',
    '/gallery/bmw/pat__-TOigkN59Dcg-unsplash.jpg',
    '/images/DSC00727.jpg',
    '/gallery/range-rover/range-rover-1725815761.jpg'
  ];

  const faqs = [
    {
      question: 'What brands do you specialize in?',
      answer: 'We are European vehicle specialists, focusing on BMW, Jaguar, Land Rover, and Mini. We are New Zealand\'s only factory-authorized Jaguar/Land Rover structural repairer.'
    },
    {
      question: 'Do you work with insurance companies?',
      answer: 'Yes, we work with all major insurance companies and can handle your claim from start to finish, making the process as smooth as possible for you.'
    },
    {
      question: 'What certifications do you have?',
      answer: 'We are CRA accredited, I-Car Gold certified, and MTA members. We\'re also the only factory-authorized Jaguar/Land Rover structural repairer in New Zealand.'
    },
    {
      question: 'Where are you located?',
      answer: 'We are at 20 Sylvia Park Road, Mount Wellington, Auckland. We are open Monday to Friday, 7:30 AM to 5:00 PM.'
    },
    {
      question: 'How long have you been in business?',
      answer: 'Eurotech has been providing quality European vehicle repairs for over 20 years, building a reputation for excellence and reliability.'
    }
  ];

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

  // Local Business Schema
  const businessSchema = generateLocalBusinessSchema({
    name: site.businessName,
    description: 'European vehicle repair specialists. New Zealand\'s only factory-authorized Jaguar/Land Rover structural repairer.',
    address: {
      street: site.address,
      city: `${site.suburb}, ${site.city}`,
      state: site.city,
      postalCode: site.postcode,
      country: 'NZ'
    },
    phone: site.phone,
    email: site.email,
    hours: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:30',
        closes: '17:00'
      }
    ],
    rating: {
      value: site.googleReviewRating,
      count: site.googleReviewCount
    },
    geo: {
      latitude: -36.909,
      longitude: 174.836
    }
  });
</script>

<!-- SEO Meta Tags -->
<Meta
  title="Eurotech Auto Repair Centre - European Vehicle Specialists Auckland"
  description="New Zealand's only factory-authorized Jaguar/Land Rover structural repairer. Expert BMW and Mini repairs. Insurance approved. Call (09) 573 1093"
  keywords="european car repair auckland, bmw repair, jaguar repair, land rover repair, mini repair, panel beaters auckland, insurance repairs"
  ogImage="/og-eurotech.png"
/>

<!-- Structured Data -->
<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(generateFAQSchema(faqs))}</script>`}
  {@html `<script type="application/ld+json">${JSON.stringify(businessSchema)}</script>`}
</svelte:head>

<!-- Hero Section -->
<ServiceHero
  title="European Auto Repair"
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
      <h2 class="section-title">From the Workshop</h2>
      <p class="section-subtitle">Tips, guides, and insights from our European vehicle specialists</p>
    </div>

    <div class="blog-grid">
      {#each blogArticles as article}
        <BlogCard {...article} />
      {/each}
    </div>
  </div>
</section>

<!-- Google Reviews Section -->
<ReviewSection />

<!-- FAQ Section -->
<section class="section bg-secondary">
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

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-8);
    margin-top: var(--space-8);
  }

  .text-center {
    text-align: center;
  }
</style>
