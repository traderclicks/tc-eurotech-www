import type { RequestHandler } from './$types';
import { getAllBlogPosts } from '$lib/cms/blog';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const site = 'https://eurotechauto.co.nz';
const contentDir = join(process.cwd(), 'content');

// Fallback for routes with no source file (hardcoded routes, parse failures).
// Module-scope so it's stable per cold start, not per request.
const moduleStartTime = new Date().toISOString();

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

/** Read `dateModified` from a content JSON. Falls back to file mtime, then module-start. */
function jsonDateModified(relPath: string): string {
  const abs = join(contentDir, relPath);
  try {
    const data = JSON.parse(readFileSync(abs, 'utf-8'));
    if (typeof data?.dateModified === 'string') return data.dateModified;
  } catch {
    /* fall through */
  }
  try {
    return statSync(abs).mtime.toISOString();
  } catch {
    return moduleStartTime;
  }
}

/** Max dateModified across all dict-shaped content JSONs (used for homepage). */
function maxContentDateModified(): string {
  let latest = '';
  try {
    for (const sub of readdirSync(contentDir, { withFileTypes: true })) {
      if (!sub.isDirectory()) continue;
      const dirPath = join(contentDir, sub.name);
      for (const fname of readdirSync(dirPath)) {
        if (!fname.endsWith('.json')) continue;
        if (fname === 'schema.json' || fname === 'pending.json' || fname === 'config.json') continue;
        try {
          const data = JSON.parse(readFileSync(join(dirPath, fname), 'utf-8'));
          const dm: unknown = (data as { dateModified?: unknown })?.dateModified;
          if (typeof dm === 'string' && dm > latest) latest = dm;
        } catch {
          /* skip parse failures (e.g. arrays without metadata) */
        }
      }
    }
  } catch {
    /* fall through */
  }
  return latest || moduleStartTime;
}

function staticPageLastmod(path: string, latestBlogPublished: string): string {
  if (path === '') return maxContentDateModified();
  if (path === '/blog') return latestBlogPublished;
  if (path === '/about') return jsonDateModified('pages/about.json');
  if (path === '/privacy') return jsonDateModified('pages/privacy.json');
  if (path === '/terms') return jsonDateModified('pages/terms.json');
  if (['/jaguar', '/bmw', '/mini', '/land-rover', '/range-rover'].includes(path)) {
    return jsonDateModified(`brand-pages/${path.slice(1)}.json`);
  }
  // /insurance, /gallery — hardcoded routes with no per-page JSON source
  return moduleStartTime;
}

/** Pull dateModified for a blog post via the same file convention, fall back to publishedAt. */
function blogPostLastmod(slug: string, publishedAt: string): string {
  try {
    const data = JSON.parse(readFileSync(join(contentDir, 'blog', `${slug}.json`), 'utf-8'));
    if (typeof data?.dateModified === 'string') return data.dateModified;
  } catch {
    /* fall through */
  }
  return publishedAt;
}

export const GET: RequestHandler = async () => {
  const blogPosts = getAllBlogPosts();

  // blog loader sorts desc by publishedAt — [0] is the latest. Use the latest
  // dateModified (which may be > publishedAt if the post was edited).
  let latestBlogModified = moduleStartTime;
  for (const p of blogPosts) {
    const dm = blogPostLastmod(p.slug, p.publishedAt);
    if (dm > latestBlogModified) latestBlogModified = dm;
  }

  const siteUrl = process.env.PUBLIC_SITE_URL || site;

  const urls = [
    ...staticPages.map((p) => ({
      path: p,
      lastmod: staticPageLastmod(p, latestBlogModified),
      priority: priorityMap[p] ?? 0.5,
      changefreq: changeFreqMap[p] ?? 'monthly',
    })),
    ...blogPosts.map((p) => ({
      path: `/blog/${p.slug}`,
      lastmod: blogPostLastmod(p.slug, p.publishedAt),
      priority: 0.6,
      changefreq: 'monthly' as const,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${urls
  .map((u) => {
    const path = u.path.startsWith('/') ? u.path : `/${u.path}`;
    return `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
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
