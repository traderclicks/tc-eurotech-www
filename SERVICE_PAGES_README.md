# Service Pages Template System

This document explains how to create service pages for each of the 6 service categories using the HeroSlider component and template structure.

## Components Created

### 1. HeroSlider Component (`/src/lib/components/HeroSlider.svelte`)

Reusable hero section with image slider that accepts the following props:

```typescript
{
  title: string;              // Main heading
  subtitle?: string;          // Optional subtitle
  description: string;        // Logo bar description
  images: string[];           // Array of image paths for slider
  primaryCTA?: {              // Primary call-to-action button
    text: string;
    action?: () => void;      // Click handler
    href?: string;            // Or link URL
  };
  secondaryCTA?: {            // Secondary CTA link
    text: string;
    href: string;
  };
  showLogoBar: boolean;       // Show/hide logo bar with stats
}
```

### 2. Service Page Template (`/src/routes/services/+page.svelte`)

Generic template structure showing all sections:
- Hero with slider (HeroSlider component)
- Features grid section
- Service details section (uses slot for custom content)
- Google Reviews (ReviewCarousel component)
- FAQ section (FAQ component)
- CTA section
- Header and Footer (from layout)

### 3. Example Implementation (`/src/routes/jaguar/+page.svelte`)

Complete working example for Jaguar service page demonstrating:
- Hero configuration
- Custom features
- Custom content
- Service-specific FAQs

## Creating Pages for Each Service

Create the following pages using the Jaguar example as a template:

### 1. Land Rover - `/src/routes/land-rover/+page.svelte`
```typescript
const heroImages = [
  '/gallery/land-rover/timtrad-CLm3pWXrS9Q-unsplash.jpg',
  '/gallery/land-rover/finding_dan-lXvycA58ZfQ-unsplash.jpg',
  '/gallery/land-rover/grundsteins-53JjnvtUGKE-unsplash.jpg',
  // Add more images
];
```

### 2. Range Rover - `/src/routes/range-rover/+page.svelte`
```typescript
const heroImages = [
  '/gallery/range-rover/range-rover-1725815761.jpg',
  '/gallery/range-rover/range-rover-1555941543.jpg',
  '/gallery/range-rover/range-rover-1737681904.jpg',
  // Add more Range Rover images
];
```

### 3. BMW - `/src/routes/bmw/+page.svelte`
```typescript
const heroImages = [
  '/bmw.jpg',
  '/gallery/bmw/pat__-TOigkN59Dcg-unsplash.jpg',
  '/gallery/bmw/tyler_clemmensen-h5XcT5T0ST8-unsplash.jpg',
  // Add more BMW images
];
```

### 4. Mini - `/src/routes/mini/+page.svelte`
```typescript
const heroImages = [
  '/gallery/mini/huntleytography-d_6pVSQip3I-unsplash.jpg',
  '/gallery/mini/huntleytography-G0GRk2bzJiU-unsplash.jpg',
  '/gallery/mini/damiangoh-0f4B4UDk8T0-unsplash.jpg',
  // Add more Mini images
];
```

### 5. Insurance Claims - `/src/routes/insurance/+page.svelte`
```typescript
const heroImages = [
  '/gallery/land-rover/woeiman-4C-x7CQNwvw-unsplash.jpg',
  '/images/DSC00720.jpg',
  // Add workshop and repair images
];
```

## Page Structure

Each service page should include:

### 1. Hero Section
- Title: "[Brand] Specialist Repairs" or "Insurance Claims Management"
- Description: Key differentiators (e.g., "Factory authorized • Genuine parts • 20+ years")
- Images: 5-7 relevant images for the slider
- CTAs: "Get a Quote" button and "Call" link

### 2. Features Section
3-4 key features with icons:
- Factory authorization
- Genuine parts
- Experience/certifications
- Specialized equipment

### 3. Service Details Section
- Overview paragraph
- Services list (bullet points)
- Additional context

### 4. Google Reviews Section
Uses the existing ReviewCarousel component (no customization needed)

### 5. FAQ Section
5-6 service-specific questions:
- Authorization/certifications
- Parts used
- Insurance acceptance
- Service types
- Timelines
- Warranty/guarantees

### 6. CTA Section
- Final call to action
- Contact buttons

## Quick Start: Copy Jaguar Page

1. Copy `/src/routes/jaguar/+page.svelte`
2. Update:
   - Service name in all text
   - `heroImages` array
   - `features` array content
   - `faqs` array questions/answers
   - SEO meta tags (title, description, keywords)
   - Content in the service details section

## Example: Creating BMW Page

```svelte
<script lang="ts">
  import Meta from '$lib/components/Meta.svelte';
  import HeroSlider from '$lib/components/HeroSlider.svelte';
  import ReviewCarousel from '$lib/components/ReviewCarousel.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import { modal } from '$lib/stores/modal';

  function openContactModal() {
    modal.form({ title: 'Get a Quote - BMW Service' });
  }

  const heroImages = [
    '/bmw.jpg',
    '/gallery/bmw/pat__-TOigkN59Dcg-unsplash.jpg',
    '/gallery/bmw/tyler_clemmensen-h5XcT5T0ST8-unsplash.jpg',
    '/gallery/bmw/stephanlouis-mN8H_fe040Y-unsplash.jpg',
    '/gallery/bmw/rpnickson-zu95jkyrGtw-unsplash.jpg'
  ];

  const features = [
    {
      icon: `<!-- SVG icon -->`,
      title: 'BMW Specialists',
      description: 'Technicians trained specifically for BMW repairs'
    },
    // Add 2-3 more features
  ];

  const faqs = [
    {
      question: 'Do you service all BMW models?',
      answer: 'Yes, we service all BMW models...'
    },
    // Add 4-5 more FAQs
  ];
</script>

<Meta
  title="BMW Specialist Repairs | Eurotech Auto Repair Auckland"
  description="Expert BMW collision repairs..."
  keywords="bmw repair auckland, bmw panel beaters..."
/>

<HeroSlider
  title="BMW Specialist Repairs"
  description="Expert BMW repairs • Latest technology • 20+ years experience"
  images={heroImages}
  primaryCTA={{ text: 'Get a Quote', action: openContactModal }}
  secondaryCTA={{ text: 'Call (09) 573 1093', href: 'tel:095731093' }}
  showLogoBar={true}
/>

<!-- Copy remaining sections from Jaguar page and customize -->
```

## Navigation Updates

After creating all service pages, update the header navigation in `/src/lib/components/Header.svelte` to link to:
- `/jaguar`
- `/land-rover`
- `/range-rover`
- `/bmw`
- `/mini`
- `/insurance`

## Home Page Service Cards

Update service card `buttonHref` values in `/src/routes/+page.svelte`:
```typescript
const services = [
  {
    icon: '/jaguar-logo-white.svg',
    title: 'Jaguar',
    description: '...',
    buttonHref: '/jaguar',  // ← Update these
    backgroundImage: '...'
  },
  // ... repeat for all 6 services
];
```

## Checklist

- [ ] Create `/src/routes/land-rover/+page.svelte`
- [ ] Create `/src/routes/range-rover/+page.svelte`
- [ ] Create `/src/routes/bmw/+page.svelte`
- [ ] Create `/src/routes/mini/+page.svelte`
- [ ] Create `/src/routes/insurance/+page.svelte`
- [ ] Update header navigation links
- [ ] Update home page service card button hrefs
- [ ] Test all pages
- [ ] Verify mobile responsiveness
- [ ] Check SEO meta tags
- [ ] Test contact form integration

## Notes

- All pages use the existing Header and Footer from the layout
- ReviewCarousel and FAQ components are already created and work out of the box
- HeroSlider component handles all slider logic automatically
- Each page should have unique, service-specific content
- Images should be relevant to each brand/service
- FAQs should address common questions specific to that service
