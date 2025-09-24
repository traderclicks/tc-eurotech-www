import type { RequestHandler } from './$types';

const site = 'https://example.com'; // Update this with your actual domain

// Static pages - update these with your actual routes
const staticPages = [
  '', // Homepage
  '/about',
  '/services',
  '/services/category-a',
  '/services/category-b',
  '/services/category-c',
  '/portfolio',
  '/testimonials',
  '/contact',
  '/privacy',
  '/terms',
  '/theme', // Optional - remove in production
];

// Priority mapping
const priorityMap: Record<string, number> = {
  '': 1.0,
  '/services': 0.9,
  '/about': 0.8,
  '/portfolio': 0.8,
  '/contact': 0.7,
  '/testimonials': 0.6,
  '/privacy': 0.3,
  '/terms': 0.3,
  '/theme': 0.1,
};

// Change frequency mapping
const changeFreqMap: Record<string, string> = {
  '': 'daily',
  '/services': 'weekly',
  '/about': 'monthly',
  '/portfolio': 'weekly',
  '/contact': 'monthly',
  '/testimonials': 'weekly',
  '/privacy': 'yearly',
  '/terms': 'yearly',
  '/theme': 'monthly',
};

export const GET: RequestHandler = async ({ url }) => {
  // In production, you might fetch dynamic pages from a database
  // const dynamicPages = await fetchDynamicPages();
  const dynamicPages: string[] = [];

  const pages = [...staticPages, ...dynamicPages];
  const siteUrl = process.env.PUBLIC_SITE_URL || site;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${pages
  .map((page) => {
    const path = page.startsWith('/') ? page : `/${page}`;
    const priority = priorityMap[page] || 0.5;
    const changefreq = changeFreqMap[page] || 'monthly';

    return `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'noindex',
    },
  });
};