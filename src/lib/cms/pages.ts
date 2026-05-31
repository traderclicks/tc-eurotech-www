/**
 * CMS Pages
 * Read static-page content (about, privacy, terms, ...) from
 * content/pages/<slug>.json at request time.
 *
 * One file per page keeps edits atomic, diffs clean, and matches the blog
 * and brand-pages patterns.
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

  console.error('Content directory not found for pages. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const PAGES_DIR = join(CONTENT_DIR, 'pages');

// Path-traversal guard.
const SLUG_RE = /^[a-z0-9-]+$/;

export interface PageList {
  type: 'unordered' | 'ordered' | 'tick';
  items: string[];
}

export interface PageImage {
  src: string;
  alt: string;
  /** Which side the image appears on for split layouts. Default: alternates by index. */
  side?: 'left' | 'right';
  width?: number;
  height?: number;
}

export interface PageSection {
  /** h2 — omit for hero-style intro sections */
  heading?: string;
  /** Larger intro paragraph rendered before the body */
  leadText?: string;
  /** Body paragraphs (plain text, supports {token} substitution) */
  paragraphs?: string[];
  /** Optional list block */
  list?: PageList;
  /** Optional image for split layouts (About-style) */
  image?: PageImage;
  /** Optional raw HTML block (escape hatch — use sparingly) */
  html?: string;
}

export interface PageHero {
  title: string;
  description?: string;
  images: string[];
  showLogoBar?: boolean;
}

export interface PageData {
  meta: {
    title: string;
    description: string;
    keywords?: string;
  };
  /** h1 for plain text pages (Privacy/Terms style) — omit if hero is used */
  title?: string;
  /** "Last updated: …" stamp for legal pages */
  updatedAt?: string;
  /** Hero block for image-led pages (About style) */
  hero?: PageHero;
  sections: PageSection[];
}

export function getPage(slug: string): PageData | null {
  if (!SLUG_RE.test(slug)) return null;
  const path = join(PAGES_DIR, `${slug}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8'));
}

export function getPageWithPreview(slug: string, _isPreviewMode: boolean): PageData | null {
  return getPage(slug);
}

export function listPageSlugs(): string[] {
  if (!existsSync(PAGES_DIR)) return [];
  return readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'schema.json')
    .map((f) => f.replace(/\.json$/, ''))
    .filter((slug) => SLUG_RE.test(slug))
    .sort();
}

export { interpolate } from './interpolate';
