import type { RequestHandler } from './$types';

const site = 'https://eurotechauto.co.nz';

const staticPages = [
  '',
  '/about',
  '/jaguar',
  '/land-rover',
  '/range-rover',
  '/bmw',
  '/mini',
  '/insurance',
  '/blog',
  '/gallery',
  '/privacy',
  '/terms',
];

const priorityMap: Record<string, number> = {
  '': 1.0,
  '/jaguar': 0.9,
  '/land-rover': 0.9,
  '/range-rover': 0.9,
  '/bmw': 0.9,
  '/mini': 0.8,
  '/about': 0.8,
  '/insurance': 0.8,
  '/blog': 0.7,
  '/gallery': 0.7,
  '/privacy': 0.3,
  '/terms': 0.3,
};

const changeFreqMap: Record<string, string> = {
  '': 'daily',
  '/jaguar': 'monthly',
  '/land-rover': 'monthly',
  '/range-rover': 'monthly',
  '/bmw': 'monthly',
  '/mini': 'monthly',
  '/about': 'monthly',
  '/insurance': 'monthly',
  '/blog': 'weekly',
  '/gallery': 'weekly',
  '/privacy': 'yearly',
  '/terms': 'yearly',
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