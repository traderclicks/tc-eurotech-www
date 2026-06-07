/**
 * CMS Text Slot Management
 * Read/write text slot assignments from JSON files
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
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

  console.error('Content directory not found for text slots. Tried:', candidates);
  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const TEXT_DIR = join(CONTENT_DIR, 'text');

export interface TextSlotSchema {
  label: string;
  description: string;
  page: string;
  type: 'text' | 'textarea' | 'richtext';
}

export interface TextSlotSchemas {
  [slotId: string]: TextSlotSchema;
}

export interface TextSlotValues {
  [slotId: string]: string;
}

export interface TextPendingChange {
  proposed: string;
  proposedBy: string;
  proposedAt: string;
  note?: string;
}

export interface TextPendingChanges {
  [slotId: string]: TextPendingChange;
}

/**
 * Get text slot schema definitions
 */
export function getTextSlotSchemas(): TextSlotSchemas {
  const schemaPath = join(TEXT_DIR, 'schema.json');
  if (!existsSync(schemaPath)) {
    return {};
  }
  return JSON.parse(readFileSync(schemaPath, 'utf-8'));
}

/**
 * Get current live text values
 */
export function getLiveTextValues(): TextSlotValues {
  const livePath = join(TEXT_DIR, 'live.json');
  if (!existsSync(livePath)) {
    return {};
  }
  return JSON.parse(readFileSync(livePath, 'utf-8'));
}

/**
 * Get pending text changes awaiting approval
 */
export function getTextPendingChanges(): TextPendingChanges {
  const pendingPath = join(TEXT_DIR, 'pending.json');
  if (!existsSync(pendingPath)) {
    return {};
  }
  return JSON.parse(readFileSync(pendingPath, 'utf-8'));
}

/**
 * Propose a text change (saves to pending.json)
 */
export function proposeTextChange(
  slotId: string,
  value: string,
  proposedBy: string,
  note?: string
): void {
  const schemas = getTextSlotSchemas();
  if (!schemas[slotId]) {
    throw new Error(`Unknown text slot: ${slotId}`);
  }

  const pending = getTextPendingChanges();
  pending[slotId] = {
    proposed: value,
    proposedBy,
    proposedAt: new Date().toISOString(),
    note
  };

  const pendingPath = join(TEXT_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Approve a pending text change (merge to live.json)
 */
export function approveTextChange(slotId: string): void {
  const pending = getTextPendingChanges();
  if (!pending[slotId]) {
    throw new Error(`No pending change for text slot: ${slotId}`);
  }

  const live = getLiveTextValues();
  live[slotId] = pending[slotId].proposed;

  const livePath = join(TEXT_DIR, 'live.json');
  writeFileSync(livePath, JSON.stringify(live, null, 2) + '\n');

  delete pending[slotId];
  const pendingPath = join(TEXT_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Reject a pending text change
 */
export function rejectTextChange(slotId: string): void {
  const pending = getTextPendingChanges();
  if (!pending[slotId]) {
    throw new Error(`No pending change for text slot: ${slotId}`);
  }

  delete pending[slotId];
  const pendingPath = join(TEXT_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Get all text slot data for admin UI
 */
export function getAllTextSlotData() {
  const schemas = getTextSlotSchemas();
  const live = getLiveTextValues();
  const pending = getTextPendingChanges();

  return Object.entries(schemas).map(([slotId, schema]) => ({
    id: slotId,
    ...schema,
    value: live[slotId] || '',
    pendingChange: pending[slotId] || null
  }));
}

/**
 * Get text value for a specific slot (for frontend use)
 */
export function getTextSlotValue(slotId: string): string {
  const live = getLiveTextValues();
  return live[slotId] || '';
}

/**
 * Get text value for a specific slot with preview mode support
 * In preview mode, returns pending changes if any, otherwise live
 */
export function getTextSlotValueWithPreview(slotId: string, isPreviewMode: boolean): string {
  if (isPreviewMode) {
    const pending = getTextPendingChanges();
    if (pending[slotId]) {
      return pending[slotId].proposed;
    }
  }
  return getTextSlotValue(slotId);
}

/**
 * Get the full text-value record with preview-mode support.
 * Layout loaders use this so site-wide text is available on $page.data.text.
 * Matches the getXWithPreview() contract used across the CMS loaders
 * (D549 — Controlla Connector integration surface).
 */
export function getTextWithPreview(isPreviewMode: boolean): TextSlotValues {
  const live = getLiveTextValues();
  if (!isPreviewMode) return live;
  const pending = getTextPendingChanges();
  const merged: TextSlotValues = { ...live };
  for (const [slotId, change] of Object.entries(pending)) {
    merged[slotId] = change.proposed;
  }
  return merged;
}
