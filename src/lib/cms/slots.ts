/**
 * CMS Slot Management
 * Read/write image slot assignments from JSON files
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Resolve content directory - works both locally and on Vercel
function getContentDir(): string {
  // Try multiple possible locations
  const candidates = [
    join(process.cwd(), 'content'),                    // Local dev
    '/var/task/content',                               // Vercel serverless
    join(dirname(fileURLToPath(import.meta.url)), '../../../../content'), // Relative to module
  ];

  for (const dir of candidates) {
    if (existsSync(dir)) {
      return dir;
    }
  }

  console.error('Content directory not found. Tried:', candidates);
  console.error('CWD:', process.cwd());
  console.error('Files in CWD:', existsSync(process.cwd()) ? readdirSync(process.cwd()) : 'CWD does not exist');

  return candidates[0]; // Fallback to first option
}

const CONTENT_DIR = getContentDir();
const SLOTS_DIR = join(CONTENT_DIR, 'slots');

console.log('CMS Slots: Using content dir:', CONTENT_DIR);
console.log('CMS Slots: Slots dir exists:', existsSync(SLOTS_DIR));

export interface SlotSchema {
  label: string;
  description: string;
  page: string;
  maxImages?: number;
  aspectRatio?: string;
}

export interface SlotSchemas {
  [slotId: string]: SlotSchema;
}

export interface SlotAssignments {
  [slotId: string]: string[];
}

export interface PendingChange {
  proposed: string[];
  proposedBy: string;
  proposedAt: string;
  note?: string;
}

export interface PendingChanges {
  [slotId: string]: PendingChange;
}

/**
 * Get slot schema definitions
 */
export function getSlotSchemas(): SlotSchemas {
  const schemaPath = join(SLOTS_DIR, 'schema.json');
  if (!existsSync(schemaPath)) {
    return {};
  }
  return JSON.parse(readFileSync(schemaPath, 'utf-8'));
}

/**
 * Get current live slot assignments
 */
export function getLiveAssignments(): SlotAssignments {
  const livePath = join(SLOTS_DIR, 'live.json');
  if (!existsSync(livePath)) {
    return {};
  }
  return JSON.parse(readFileSync(livePath, 'utf-8'));
}

/**
 * Get pending changes awaiting approval
 */
export function getPendingChanges(): PendingChanges {
  const pendingPath = join(SLOTS_DIR, 'pending.json');
  if (!existsSync(pendingPath)) {
    return {};
  }
  return JSON.parse(readFileSync(pendingPath, 'utf-8'));
}

/**
 * Propose a change to a slot (saves to pending.json)
 */
export function proposeChange(
  slotId: string,
  images: string[],
  proposedBy: string,
  note?: string
): void {
  const schemas = getSlotSchemas();
  if (!schemas[slotId]) {
    throw new Error(`Unknown slot: ${slotId}`);
  }

  const maxImages = schemas[slotId].maxImages;
  if (maxImages && images.length > maxImages) {
    throw new Error(`Slot ${slotId} allows max ${maxImages} images, got ${images.length}`);
  }

  const pending = getPendingChanges();
  pending[slotId] = {
    proposed: images,
    proposedBy,
    proposedAt: new Date().toISOString(),
    note
  };

  const pendingPath = join(SLOTS_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Approve a pending change (merge to live.json)
 */
export function approveChange(slotId: string): void {
  const pending = getPendingChanges();
  if (!pending[slotId]) {
    throw new Error(`No pending change for slot: ${slotId}`);
  }

  const live = getLiveAssignments();
  live[slotId] = pending[slotId].proposed;

  // Write to live
  const livePath = join(SLOTS_DIR, 'live.json');
  writeFileSync(livePath, JSON.stringify(live, null, 2) + '\n');

  // Remove from pending
  delete pending[slotId];
  const pendingPath = join(SLOTS_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Reject a pending change (remove from pending.json)
 */
export function rejectChange(slotId: string): void {
  const pending = getPendingChanges();
  if (!pending[slotId]) {
    throw new Error(`No pending change for slot: ${slotId}`);
  }

  delete pending[slotId];
  const pendingPath = join(SLOTS_DIR, 'pending.json');
  writeFileSync(pendingPath, JSON.stringify(pending, null, 2) + '\n');
}

/**
 * Get all slot data for admin UI
 */
export function getAllSlotData() {
  const schemas = getSlotSchemas();
  const live = getLiveAssignments();
  const pending = getPendingChanges();

  return Object.entries(schemas).map(([slotId, schema]) => ({
    id: slotId,
    ...schema,
    images: live[slotId] || [],
    pendingChange: pending[slotId] || null
  }));
}

/**
 * Get images for a specific slot (for frontend use)
 */
export function getSlotImages(slotId: string): string[] {
  const live = getLiveAssignments();
  return live[slotId] || [];
}

/**
 * Get images for a specific slot with preview mode support
 * In preview mode, returns pending changes if any, otherwise live
 */
export function getSlotImagesWithPreview(slotId: string, isPreviewMode: boolean): string[] {
  if (isPreviewMode) {
    const pending = getPendingChanges();
    if (pending[slotId]) {
      return pending[slotId].proposed;
    }
  }
  return getSlotImages(slotId);
}

/**
 * Get all unique images currently in use
 */
export function getAllCurrentImages(): string[] {
  const live = getLiveAssignments();
  const allImages = Object.values(live).flat();
  return [...new Set(allImages)];
}
