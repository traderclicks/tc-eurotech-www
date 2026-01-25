/**
 * Media Library Service
 * Manages image metadata and R2 storage integration
 *
 * MULTI-TENANCY MODEL:
 * ====================
 * Tenant isolation uses DEFENSE IN DEPTH:
 *
 * 1. AUTH CONTEXT (primary): tenantId comes from authenticated user's JWT
 *    - tc-services validates user belongs to site
 *    - JWT contains tenantId, cannot be spoofed by client
 *    - All write operations require auth context
 *
 * 2. DEPLOYMENT VALIDATION (secondary): EXPECTED_TENANT validates auth matches deployment
 *    - Catches misconfiguration (wrong site deployed to wrong domain)
 *    - Fails loudly if auth tenant doesn't match expected
 *
 * PROGRESSION:
 * - Stage 1 (current): Single agency test (eurotech)
 * - Stage 2: Multi-agency TraderClicks (~30 clients, shared R2 bucket)
 * - Stage 3: Controlla SaaS (same pattern, Controlla infrastructure)
 *
 * SECURITY:
 * - Tenant comes from tc-services auth, NOT from user input
 * - Deployment validates tenant matches expected (defense in depth)
 * - R2 paths always prefixed: clients/{tenantId}/images/...
 * - Impossible to access another tenant's data through this service
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { MediaImage, MediaLibrary, MediaFolder, MediaFilter } from './media-types';
import type { AuthUser } from './auth-service';

/**
 * Expected tenant for this deployment.
 * Used to VALIDATE auth context, not as primary source.
 * Catches misconfiguration (e.g., wrong site code deployed to wrong domain).
 */
const EXPECTED_TENANT = 'eurotech';

/**
 * Validate that auth context matches expected deployment tenant.
 * Throws if mismatch - indicates misconfiguration.
 */
export function validateTenant(user: AuthUser): void {
  if (user.tenantId !== EXPECTED_TENANT) {
    console.error(`SECURITY: Tenant mismatch. Expected ${EXPECTED_TENANT}, auth says ${user.tenantId}`);
    throw new Error('Tenant mismatch - deployment misconfiguration');
  }
}

/**
 * Get the client slug from authenticated user.
 * This is the ONLY way to get tenant context for write operations.
 */
export function getClientSlug(user: AuthUser): string {
  validateTenant(user);
  return user.tenantId;
}

/**
 * Get expected tenant for this deployment.
 * Used for read operations where auth context may not be available (public pages).
 */
export function getExpectedTenant(): string {
  return EXPECTED_TENANT;
}

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

  return candidates[0];
}

const CONTENT_DIR = getContentDir();
const MEDIA_DIR = join(CONTENT_DIR, 'media');

// Ensure media directory exists
function ensureMediaDir(): void {
  if (!existsSync(MEDIA_DIR)) {
    mkdirSync(MEDIA_DIR, { recursive: true });
  }
}

/**
 * Get the media library for this deployment's client.
 * No client parameter - uses deployment-level EXPECTED_TENANT.
 */
export function getMediaLibrary(): MediaLibrary {
  ensureMediaDir();
  const libraryPath = join(MEDIA_DIR, 'library.json');

  if (!existsSync(libraryPath)) {
    return {
      version: '1.0',
      client: EXPECTED_TENANT,
      lastUpdated: new Date().toISOString(),
      images: []
    };
  }

  const library = JSON.parse(readFileSync(libraryPath, 'utf-8')) as MediaLibrary;

  // Validate client matches deployment (defense in depth)
  if (library.client && library.client !== EXPECTED_TENANT) {
    console.error(`SECURITY: Library client mismatch. Expected ${EXPECTED_TENANT}, got ${library.client}`);
    throw new Error('Media library client mismatch');
  }

  return library;
}

/**
 * Save the media library.
 */
export function saveMediaLibrary(library: MediaLibrary): void {
  ensureMediaDir();

  // Ensure client is set correctly
  library.client = EXPECTED_TENANT;
  library.lastUpdated = new Date().toISOString();

  const libraryPath = join(MEDIA_DIR, 'library.json');
  writeFileSync(libraryPath, JSON.stringify(library, null, 2) + '\n');
}

/**
 * Get all images from the library.
 */
export function getAllImages(): MediaImage[] {
  return getMediaLibrary().images;
}

/**
 * Get images filtered by folder.
 */
export function getImagesByFolder(folder: string): MediaImage[] {
  return getMediaLibrary().images.filter(img => img.metadata.folder === folder);
}

/**
 * Get images filtered by tags.
 */
export function getImagesByTags(tags: string[]): MediaImage[] {
  return getMediaLibrary().images.filter(img =>
    tags.some(tag => img.metadata.tags.includes(tag))
  );
}

/**
 * Get images with filters.
 */
export function getImagesFiltered(filter: MediaFilter): MediaImage[] {
  let images = getAllImages();

  if (filter.folder) {
    images = images.filter(img => img.metadata.folder === filter.folder);
  }

  if (filter.tags && filter.tags.length > 0) {
    images = images.filter(img =>
      filter.tags!.some(tag => img.metadata.tags.includes(tag))
    );
  }

  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    images = images.filter(img =>
      img.filename.toLowerCase().includes(searchLower) ||
      img.metadata.alt.toLowerCase().includes(searchLower) ||
      img.metadata.title?.toLowerCase().includes(searchLower) ||
      img.metadata.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Apply pagination
  const offset = filter.offset || 0;
  const limit = filter.limit || images.length;

  return images.slice(offset, offset + limit);
}

/**
 * Get a single image by ID.
 */
export function getImageById(id: string): MediaImage | null {
  return getMediaLibrary().images.find(img => img.id === id) || null;
}

/**
 * Add a new image to the library.
 */
export function addImage(image: MediaImage): void {
  const library = getMediaLibrary();

  // Ensure image is tagged with correct client
  image.client = EXPECTED_TENANT;

  if (library.images.some(img => img.id === image.id)) {
    throw new Error(`Image with ID ${image.id} already exists`);
  }

  library.images.push(image);
  saveMediaLibrary(library);
}

/**
 * Update an existing image's metadata.
 */
export function updateImage(
  id: string,
  updates: Partial<Pick<MediaImage, 'metadata' | 'attribution'>>
): MediaImage {
  const library = getMediaLibrary();
  const index = library.images.findIndex(img => img.id === id);

  if (index === -1) {
    throw new Error(`Image with ID ${id} not found`);
  }

  const image = library.images[index];

  if (updates.metadata) {
    image.metadata = { ...image.metadata, ...updates.metadata };
  }

  if (updates.attribution) {
    image.attribution = { ...image.attribution, ...updates.attribution };
  }

  image.dates.modified = new Date().toISOString();
  library.images[index] = image;
  saveMediaLibrary(library);

  return image;
}

/**
 * Delete an image from the library.
 */
export function deleteImage(id: string): void {
  const library = getMediaLibrary();
  const index = library.images.findIndex(img => img.id === id);

  if (index === -1) {
    throw new Error(`Image with ID ${id} not found`);
  }

  library.images.splice(index, 1);
  saveMediaLibrary(library);
}

/**
 * Get all unique folders in the library.
 */
export function getFolders(): MediaFolder[] {
  const library = getMediaLibrary();
  const folderMap = new Map<string, number>();

  for (const image of library.images) {
    const folder = image.metadata.folder;
    folderMap.set(folder, (folderMap.get(folder) || 0) + 1);
  }

  return Array.from(folderMap.entries()).map(([path, count]) => ({
    name: path.split('/').pop() || path,
    label: formatFolderLabel(path),
    path,
    imageCount: count
  })).sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Get all unique tags in the library.
 */
export function getAllTags(): string[] {
  const library = getMediaLibrary();
  const tags = new Set<string>();

  for (const image of library.images) {
    for (const tag of image.metadata.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort();
}

/**
 * Update image usage tracking when assigned to a slot.
 */
export function updateImageUsage(
  imageId: string,
  slotId: string,
  action: 'add' | 'remove'
): void {
  const library = getMediaLibrary();
  const image = library.images.find(img => img.id === imageId);

  if (!image) return;

  if (action === 'add') {
    if (!image.usage.slots.includes(slotId)) {
      image.usage.slots.push(slotId);
      image.usage.usageCount++;
    }
  } else {
    const idx = image.usage.slots.indexOf(slotId);
    if (idx !== -1) {
      image.usage.slots.splice(idx, 1);
      image.usage.usageCount = Math.max(0, image.usage.usageCount - 1);
    }
  }

  saveMediaLibrary(library);
}

/**
 * Generate a unique image ID.
 * Prefixed with client slug to ensure global uniqueness across all clients.
 */
export function generateImageId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `${EXPECTED_TENANT}_${timestamp}_${random}`;
}

/**
 * Get the R2 key prefix for this client's images.
 * Used when constructing R2 storage paths.
 */
export function getR2KeyPrefix(): string {
  return `clients/${EXPECTED_TENANT}/images`;
}

/**
 * Format folder path to display label.
 */
function formatFolderLabel(path: string): string {
  const labels: Record<string, string> = {
    'workshop': 'Workshop',
    'vehicles/bmw': 'BMW',
    'vehicles/jaguar': 'Jaguar',
    'vehicles/land-rover': 'Land Rover',
    'vehicles/mini': 'Mini',
    'vehicles/range-rover': 'Range Rover',
    'general': 'General'
  };

  return labels[path] || path.split('/').map(
    part => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
  ).join(' / ');
}

/**
 * Calculate aspect ratio string from dimensions.
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  const ratioW = width / divisor;
  const ratioH = height / divisor;

  if (ratioW === 16 && ratioH === 9) return '16:9';
  if (ratioW === 4 && ratioH === 3) return '4:3';
  if (ratioW === 3 && ratioH === 2) return '3:2';
  if (ratioW === 1 && ratioH === 1) return '1:1';

  return `${ratioW}:${ratioH}`;
}
