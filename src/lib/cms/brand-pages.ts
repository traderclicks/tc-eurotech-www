/**
 * CMS Brand Pages
 * Read per-brand page data from content/brand-pages/<slug>.json at request time.
 * One file per brand keeps edits atomic and git diffs clean.
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

function getContentDir(): string {
  const candidates = [
    join(process.cwd(), 'content'),
    '/var/task/content',
    join(dirname(fileURLToPath(import.meta.url)), '../../../../content'),
  ];

  for (const dir of candidates) {
    if (existsSync(dir)) {
      return dir;
    }
  }

  console.error('Content directory not found for brand-pages. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const BRAND_DIR = join(CONTENT_DIR, 'brand-pages');

// Path-traversal guard: only allow lowercase slugs with hyphens.
const SLUG_RE = /^[a-z0-9-]+$/;

export interface BrandPageSection {
  image: string;
  imageAlt: string;
  imageHeight?: number;
  title: string;
  paragraphs: string[];
}

export interface BrandPageData {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  content: {
    heading: string;
    leadText: string;
    sections: BrandPageSection[];
  };
  showReviews?: boolean;
}

export function getBrandPage(slug: string): BrandPageData | null {
  if (!SLUG_RE.test(slug)) return null;
  const path = join(BRAND_DIR, `${slug}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8'));
}

export function getBrandPageWithPreview(slug: string, _isPreviewMode: boolean): BrandPageData | null {
  return getBrandPage(slug);
}

/** List all known brand slugs (for sitemap, prerender entries, etc.) */
export function listBrandSlugs(): string[] {
  if (!existsSync(BRAND_DIR)) return [];
  return readdirSync(BRAND_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'schema.json')
    .map((f) => f.replace(/\.json$/, ''))
    .filter((slug) => SLUG_RE.test(slug))
    .sort();
}
