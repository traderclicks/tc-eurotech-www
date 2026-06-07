/**
 * CMS Blog Content (server-only)
 * Read blog posts from JSON files in content/blog/
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export type { BlogPost, BlogVideo, BlogImage } from './blog-types';
import type { BlogPost } from './blog-types';

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

  console.error('Content directory not found for blog. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const BLOG_DIR = join(CONTENT_DIR, 'blog');

/**
 * Get the default post image from config
 */
export function getDefaultPostImage(): string {
  try {
    const config = JSON.parse(readFileSync(join(CONTENT_DIR, 'config.json'), 'utf-8'));
    return config.settings?.defaultPostImage ?? '/images/DSC00625.jpg';
  } catch {
    return '/images/DSC00625.jpg';
  }
}

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!existsSync(BLOG_DIR)) {
    return [];
  }

  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.json'));

  const posts: BlogPost[] = files
    .map(file => {
      try {
        const content = readFileSync(join(BLOG_DIR, file), 'utf-8');
        return JSON.parse(content) as BlogPost;
      } catch {
        console.error(`Failed to read blog post: ${file}`);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  const filePath = join(BLOG_DIR, `${slug}.json`);

  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as BlogPost;
  } catch {
    console.error(`Failed to read blog post: ${slug}`);
    return null;
  }
}

/**
 * Get the latest N blog posts (for home page teasers)
 */
export function getLatestBlogPosts(count: number = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, count);
}

