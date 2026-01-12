/**
 * Central registry of images currently used on the website
 * Now reads from CMS JSON files in /content/slots/
 * This allows the gallery "Current" tab to dynamically show only active images
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = join(process.cwd(), 'content');
const SLOTS_DIR = join(CONTENT_DIR, 'slots');

export interface CurrentImageSet {
  section: string;
  description: string;
  images: string[];
}

interface SlotSchema {
  label: string;
  description: string;
  page: string;
  maxImages?: number;
  aspectRatio?: string;
}

interface SlotSchemas {
  [slotId: string]: SlotSchema;
}

interface SlotAssignments {
  [slotId: string]: string[];
}

/**
 * Get all images currently in use on the website
 * Reads from CMS JSON files
 */
export function getCurrentImages(): CurrentImageSet[] {
  try {
    const schemaPath = join(SLOTS_DIR, 'schema.json');
    const livePath = join(SLOTS_DIR, 'live.json');

    if (!existsSync(schemaPath) || !existsSync(livePath)) {
      console.warn('CMS slot files not found, returning empty');
      return [];
    }

    const schemas: SlotSchemas = JSON.parse(readFileSync(schemaPath, 'utf-8'));
    const live: SlotAssignments = JSON.parse(readFileSync(livePath, 'utf-8'));

    return Object.entries(schemas).map(([slotId, schema]) => ({
      section: schema.label,
      description: schema.description,
      images: live[slotId] || []
    }));
  } catch (error) {
    console.error('Error reading CMS slot files:', error);
    return [];
  }
}

/**
 * Get flat array of all unique current images
 */
export function getCurrentImagePaths(): string[] {
  const allImages = getCurrentImages().flatMap(set => set.images);
  return [...new Set(allImages)]; // Remove duplicates
}
