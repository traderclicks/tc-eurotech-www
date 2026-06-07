/**
 * CMS Google Reviews
 * Read review data from JSON files at request time.
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

  console.error('Content directory not found for reviews. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const REVIEWS_DIR = join(CONTENT_DIR, 'reviews');

export interface GoogleReview {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  profileImage: string | null;
  isLocalGuide: boolean;
  reviewerStats: string;
  ownerResponse: string | null;
}

export interface GoogleReviewsData {
  businessName: string;
  totalReviews: number;
  averageRating: number;
  lastUpdated: string;
  reviews: GoogleReview[];
}

const EMPTY: GoogleReviewsData = {
  businessName: '',
  totalReviews: 0,
  averageRating: 0,
  lastUpdated: '',
  reviews: []
};

export function getLiveReviews(): GoogleReviewsData {
  const livePath = join(REVIEWS_DIR, 'live.json');
  if (!existsSync(livePath)) {
    return EMPTY;
  }
  return JSON.parse(readFileSync(livePath, 'utf-8'));
}

/**
 * Returns live reviews. Hook left for preview-mode parity with other CMS loaders;
 * reviews currently have no pending workflow (scraped, not editor-authored).
 */
export function getReviewsWithPreview(_isPreviewMode: boolean): GoogleReviewsData {
  return getLiveReviews();
}
