/**
 * CMS FAQs
 * Read page FAQs from JSON files at request time. Keyed by page slug.
 */

import { readFileSync, existsSync } from 'fs';
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

  console.error('Content directory not found for faqs. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const FAQS_DIR = join(CONTENT_DIR, 'faqs');

export interface FaqItem {
  question: string;
  answer: string;
}

export type FaqsByPage = Record<string, FaqItem[]>;

export function getLiveFaqs(): FaqsByPage {
  const livePath = join(FAQS_DIR, 'live.json');
  if (!existsSync(livePath)) {
    return {};
  }
  return JSON.parse(readFileSync(livePath, 'utf-8'));
}

export function getFaqsWithPreview(_isPreviewMode: boolean): FaqsByPage {
  return getLiveFaqs();
}
