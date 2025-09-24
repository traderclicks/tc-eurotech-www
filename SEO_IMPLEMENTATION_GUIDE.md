# SEO Implementation Guide for New Projects

## Overview
This guide provides comprehensive SEO implementation patterns extracted from production projects (Controlla, OneCall Pest Control, and shared frameworks). Follow these patterns to ensure optimal search engine visibility and marketing effectiveness.

---

## 🎯 Priority 1: Essential SEO (Implement First)

### 1. Meta Tags Component
Every project needs a robust meta tag system. Create a reusable Meta component:

#### SvelteKit Implementation
```svelte
<!-- src/lib/components/Meta.svelte -->
<script lang="ts">
  export let title = 'Default Title';
  export let description = 'Default description';
  export let keywords = '';
  export let canonical: string | undefined = undefined;
  export let ogImage = '/og-image.png';
  export let ogType = 'website';
  export let twitterCard = 'summary_large_image';
  export let noindex = false;
  export let author = '';
  export let publishedTime = '';
  export let modifiedTime = '';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}
  {#if canonical}
    <link rel="canonical" href={canonical} />
  {/if}
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}
  
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={ogType} />
  <meta property="og:image" content={ogImage} />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content={twitterCard} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  
  <!-- Article metadata -->
  {#if ogType === 'article'}
    {#if author}<meta property="article:author" content={author} />{/if}
    {#if publishedTime}<meta property="article:published_time" content={publishedTime} />{/if}
    {#if modifiedTime}<meta property="article:modified_time" content={modifiedTime} />{/if}
  {/if}
</svelte:head>
```

#### Next.js Implementation
```typescript
// Using Next.js Metadata API
export const metadata: Metadata = {
  title: {
    template: '%s | Your Company',
    default: 'Your Company - Tagline',
  },
  description: 'Your description',
  keywords: ['keyword1', 'keyword2'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Your Title',
    description: 'Your description',
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Your Company',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Title',
    description: 'Your description',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### 2. Dynamic Sitemap Generation

#### SvelteKit Sitemap Endpoint
```typescript
// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from './$types';

const site = 'https://yoursite.com';

const staticPages = [
  '',
  '/about',
  '/services',
  '/contact',
  '/privacy',
  '/terms',
];

export const GET: RequestHandler = async () => {
  // Add dynamic pages (e.g., from database)
  const dynamicPages = await fetchDynamicPages(); // Your implementation
  
  const pages = [...staticPages, ...dynamicPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${site}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};
```

#### Next.js Sitemap
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yoursite.com';
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];
  
  // Add dynamic pages
  const dynamicPages = getDynamicPages(); // Your implementation
  
  return [...staticPages, ...dynamicPages];
}
```

### 3. Robots.txt Configuration

#### SvelteKit robots.txt
```typescript
// src/routes/robots.txt/+server.ts
import type { RequestHandler } from './$types';

const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_app/

Sitemap: https://yoursite.com/sitemap.xml`;

export const GET: RequestHandler = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
```

---

## 🎯 Priority 2: Structured Data

### 1. Organization Schema
Add to your root layout for brand recognition:

```svelte
<!-- In +layout.svelte or Meta component -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company Name",
  "url": "https://yoursite.com",
  "logo": "https://yoursite.com/logo.png",
  "description": "Your company description",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-555-5555",
    "contactType": "customer service",
    "areaServed": "US",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://facebook.com/yourcompany",
    "https://twitter.com/yourcompany",
    "https://linkedin.com/company/yourcompany",
    "https://instagram.com/yourcompany"
  ]
}
</script>
```

### 2. LocalBusiness Schema (for local SEO)
```javascript
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Business Name",
  "image": "https://yoursite.com/storefront.jpg",
  "@id": "https://yoursite.com",
  "url": "https://yoursite.com",
  "telephone": "+1-555-555-5555",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Your City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "250"
  }
};
```

### 3. FAQ Schema
```javascript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
```

### 4. Service/Product Schema
```javascript
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Your Service Type",
  "provider": {
    "@type": "Organization",
    "name": "Your Company"
  },
  "areaServed": {
    "@type": "State",
    "name": "California"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Service Name",
          "description": "Service description"
        }
      }
    ]
  }
};
```

---

## 🎯 Priority 3: Performance & Analytics

### 1. Google Tag Manager Integration
```html
<!-- In app.html (SvelteKit) or _document.tsx (Next.js) -->
<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXX');
</script>
<!-- End Google Tag Manager -->

<!-- In body -->
<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 2. Performance Optimizations
```typescript
// Image optimization with lazy loading
<img 
  src="/image.jpg" 
  alt="Descriptive alt text for SEO"
  loading="lazy"
  width="800"
  height="600"
/>

// Preconnect to external domains
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://www.googletagmanager.com">

// Prefetch critical resources
<link rel="prefetch" href="/api/data">
```

### 3. Core Web Vitals Monitoring
```javascript
// Add to your app initialization
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to Google Analytics 4
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

---

## 🎯 Priority 4: Content & URL Strategy

### 1. URL Structure Best Practices
```typescript
// Good URL patterns:
// /services/web-design
// /blog/2024/seo-best-practices
// /case-studies/client-name

// Avoid:
// /page?id=123
// /services.php?cat=web
// /blog_post_12345

// Implement redirects for changed URLs
export async function handle({ event, resolve }) {
  const redirects = {
    '/old-page': '/new-page',
    '/outdated-service': '/services/updated-service',
  };
  
  if (redirects[event.url.pathname]) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: redirects[event.url.pathname]
      }
    });
  }
  
  return resolve(event);
}
```

### 2. Content Guidelines
- **Title tags**: 50-60 characters, include primary keyword
- **Meta descriptions**: 150-160 characters, compelling CTA
- **H1 tags**: One per page, matches search intent
- **Image alt text**: Descriptive, includes keywords naturally
- **Internal linking**: 3-5 contextual links per page

### 3. Blog/Article Schema
```javascript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg"
  ],
  "datePublished": "2024-01-01T08:00:00+08:00",
  "dateModified": "2024-01-02T09:20:00+08:00",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://example.com/profile/author"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Your Company",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.jpg"
    }
  },
  "description": "Article description",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/article"
  }
};
```

---

## 🎯 Priority 5: Advanced SEO

### 1. Multi-language Support (if needed)
```html
<!-- Language alternates -->
<link rel="alternate" hreflang="en" href="https://example.com/" />
<link rel="alternate" hreflang="es" href="https://example.com/es/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

### 2. Rich Snippets for Reviews
```javascript
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "name": "Your Business"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Customer Name"
  },
  "reviewBody": "Review text",
  "datePublished": "2024-01-01"
};
```

### 3. Video SEO
```javascript
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Video Title",
  "description": "Video description",
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "uploadDate": "2024-01-01T08:00:00+08:00",
  "duration": "PT2M30S", // ISO 8601 format
  "contentUrl": "https://example.com/video.mp4",
  "embedUrl": "https://example.com/embed/video"
};
```

---

## 🚀 Implementation Checklist

### Phase 1: Foundation (Week 1)
- [ ] Implement Meta component with all fields
- [ ] Create dynamic sitemap.xml endpoint
- [ ] Add robots.txt with proper rules
- [ ] Install and configure GTM
- [ ] Add Organization schema to layout

### Phase 2: Enhancement (Week 2)
- [ ] Add LocalBusiness schema (if applicable)
- [ ] Implement FAQ schema on FAQ pages
- [ ] Add Service/Product schemas
- [ ] Set up Core Web Vitals monitoring
- [ ] Configure proper redirects

### Phase 3: Content (Week 3)
- [ ] Audit and optimize all title tags
- [ ] Write compelling meta descriptions
- [ ] Add descriptive alt text to all images
- [ ] Implement internal linking strategy
- [ ] Create content calendar

### Phase 4: Advanced (Week 4)
- [ ] Add article schema to blog posts
- [ ] Implement review schemas
- [ ] Set up local SEO (Google My Business)
- [ ] Configure Search Console
- [ ] Set up rank tracking

---

## 📊 Monitoring & Maintenance

### Tools to Set Up
1. **Google Search Console** - Monitor search performance
2. **Google Analytics 4** - Track user behavior
3. **Google PageSpeed Insights** - Monitor performance
4. **Screaming Frog** - Technical SEO audits
5. **Ahrefs/SEMrush** - Keyword tracking and backlinks

### Monthly Tasks
- Review Search Console for errors
- Update sitemap with new pages
- Check Core Web Vitals scores
- Audit new content for SEO
- Review and update meta descriptions
- Monitor keyword rankings
- Check for broken links
- Update structured data as needed

### Quarterly Tasks
- Full technical SEO audit
- Competitor analysis
- Content gap analysis
- Backlink audit
- Schema markup validation
- Performance optimization review

---

## 🎯 Quick Start for SvelteKit Projects

### 1. Install the boilerplate
```bash
cp -r _sveltekit-agency-boilerplate your-project-name
cd your-project-name
npm install
```

### 2. Add these files immediately:
```bash
# Create SEO components
touch src/lib/components/Meta.svelte
touch src/routes/sitemap.xml/+server.ts
touch src/routes/robots.txt/+server.ts
```

### 3. Copy the Meta component code from Priority 1 above

### 4. Update app.html with GTM codes

### 5. Add Organization schema to +layout.svelte

### 6. Configure your site URLs and metadata

### 7. Deploy and submit sitemap to Google Search Console

---

## 📝 Notes

- Always validate structured data using Google's Rich Results Test
- Test mobile responsiveness with Google's Mobile-Friendly Test
- Use Lighthouse in Chrome DevTools for performance audits
- Keep content fresh - Google favors recently updated content
- Focus on user intent, not just keywords
- Build quality backlinks through genuine partnerships
- Implement proper 404 handling with helpful navigation
- Use descriptive, keyword-rich URLs but keep them readable
- Ensure fast server response times (<200ms ideally)
- Implement proper caching strategies

---

*Last Updated: Current Session*
*Based on: Controlla Website, OneCall Pest Control, and Shared Framework implementations*