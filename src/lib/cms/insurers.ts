/**
 * CMS Insurers
 * Read insurer roster from JSON files at request time.
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

  console.error('Content directory not found for insurers. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const INSURERS_DIR = join(CONTENT_DIR, 'insurers');

export interface Insurer {
  name: string;
  logo: string;
  phone?: string;
  phoneTel?: string;
}

export function getLiveInsurers(): Insurer[] {
  const livePath = join(INSURERS_DIR, 'live.json');
  if (!existsSync(livePath)) {
    return [];
  }
  return JSON.parse(readFileSync(livePath, 'utf-8'));
}

export function getInsurersWithPreview(_isPreviewMode: boolean): Insurer[] {
  return getLiveInsurers();
}
