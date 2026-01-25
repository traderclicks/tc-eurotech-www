/**
 * CMS Meta Slot Management
 * Read/write meta content (SEO title, description, keywords) from JSON files
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Resolve content directory - works both locally and on Vercel
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

  console.error('Content directory not found for meta slots. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const META_DIR = join(CONTENT_DIR, 'meta');

export interface MetaFieldSchema {
  label: string;
  type: 'text' | 'textarea';
  maxLength?: number;
}

export interface MetaPageSchema {
  label: string;
  page: string;
  fields: Record<string, MetaFieldSchema>;
}

export interface MetaSchemas {
  [pageId: string]: MetaPageSchema;
}

export interface MetaPageValues {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export interface MetaValues {
  [pageId: string]: MetaPageValues;
}

export interface MetaPendingChange {
  proposed: MetaPageValues;
  proposedBy: string;
  proposedAt: string;
  note?: string;
}

export interface MetaPendingChanges {
  [pageId: string]: MetaPendingChange;
}

/**
 * Get meta schema definitions
 */
export function getMetaSchemas(): MetaSchemas {
  const schemaPath = join(META_DIR, 'schema.json');
  if (!existsSync(schemaPath)) {
    return {};
  }
  return JSON.parse(readFileSync(schemaPath, 'utf-8'));
}

/**
 * Get current live meta values
 */
export function getLiveMetaValues(): MetaValues {
  const livePath = join(META_DIR, 'live.json');
  if (!existsSync(livePath)) {
    return {};
  }
  return JSON.parse(readFileSync(livePath, 'utf-8'));
}

/**
 * Get pending meta changes awaiting approval
 */
export function getMetaPendingChanges(): MetaPendingChanges {
  const pendingPath = join(META_DIR, 'pending.json');
  if (!existsSync(pendingPath)) {
    return {};
  }
  return JSON.parse(readFileSync(pendingPath, 'utf-8'));
}

/**
 * Propose a meta change (saves to pending.json)
 */
export function proposeMetaChange(
  pageId: string,
  values: MetaPageValues,
  proposedBy: string,
  note?: string
): void {
  const schemas = getMetaSchemas();
  if (!schemas[pageId]) {
    throw new Error(`Unknown meta page: ${pageId}`);
  }

  const pending = getMetaPendingChanges();
  pending[pageId] = {
    proposed: values,
    proposedBy,
    proposedAt: new Date().toISOString(),
    note
  };

  const pendingPath = join(META_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Approve a pending meta change (merge to live.json)
 */
export function approveMetaChange(pageId: string): void {
  const pending = getMetaPendingChanges();
  if (!pending[pageId]) {
    throw new Error(`No pending change for meta page: ${pageId}`);
  }

  const live = getLiveMetaValues();
  live[pageId] = { ...live[pageId], ...pending[pageId].proposed };

  const livePath = join(META_DIR, 'live.json');
  writeFileSync(livePath, JSON.stringify(live, null, 2) + '\n');

  delete pending[pageId];
  const pendingPath = join(META_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Reject a pending meta change
 */
export function rejectMetaChange(pageId: string): void {
  const pending = getMetaPendingChanges();
  if (!pending[pageId]) {
    throw new Error(`No pending change for meta page: ${pageId}`);
  }

  delete pending[pageId];
  const pendingPath = join(META_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

export interface MetaSlotData {
  id: string;
  label: string;
  page: string;
  fields: Record<string, MetaFieldSchema>;
  values: MetaPageValues;
  pendingChange: MetaPendingChange | null;
}

/**
 * Get all meta slot data for admin UI
 */
export function getAllMetaSlotData(): MetaSlotData[] {
  const schemas = getMetaSchemas();
  const live = getLiveMetaValues();
  const pending = getMetaPendingChanges();

  return Object.entries(schemas).map(([pageId, schema]) => ({
    id: pageId,
    label: schema.label,
    page: schema.page,
    fields: schema.fields,
    values: live[pageId] || {},
    pendingChange: pending[pageId] || null
  }));
}

/**
 * Get meta values for a specific page (for frontend use)
 */
export function getMetaForPage(pageId: string): MetaPageValues {
  const live = getLiveMetaValues();
  return live[pageId] || {};
}

/**
 * Get meta values for a specific page with preview mode support
 * In preview mode, returns pending changes merged with live if any
 */
export function getMetaForPageWithPreview(pageId: string, isPreviewMode: boolean): MetaPageValues {
  const live = getLiveMetaValues();
  const liveValues = live[pageId] || {};

  if (isPreviewMode) {
    const pending = getMetaPendingChanges();
    if (pending[pageId]) {
      return { ...liveValues, ...pending[pageId].proposed };
    }
  }
  return liveValues;
}
