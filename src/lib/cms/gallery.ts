/**
 * Gallery Scanner
 * Scans static/gallery folders for available images
 */

import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const GALLERY_DIR = join(process.cwd(), 'static', 'gallery');

export interface GalleryFolder {
  name: string;
  label: string;
  images: string[];
}

// Map folder names to display labels
const FOLDER_LABELS: Record<string, string> = {
  'bmw': 'BMW',
  'jaguar': 'Jaguar',
  'land-rover': 'Land Rover',
  'mini': 'Mini',
  'range-rover': 'Range Rover'
};

/**
 * Get all gallery folders with their images
 */
export function getGalleryFolders(): GalleryFolder[] {
  const folders: GalleryFolder[] = [];

  try {
    const entries = readdirSync(GALLERY_DIR, { withFileTypes: true });

    for (const entry of entries) {
      // Skip non-directories and special folders
      if (!entry.isDirectory()) continue;
      if (entry.name === 'cf-ready') continue;

      const folderPath = join(GALLERY_DIR, entry.name);
      const images = scanFolderForImages(folderPath, `/gallery/${entry.name}`);

      if (images.length > 0) {
        folders.push({
          name: entry.name,
          label: FOLDER_LABELS[entry.name] || entry.name,
          images
        });
      }
    }
  } catch (error) {
    console.error('Error scanning gallery:', error);
  }

  // Sort folders alphabetically by label
  return folders.sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Scan a folder for image files
 */
function scanFolderForImages(folderPath: string, urlPrefix: string): string[] {
  const images: string[] = [];
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  try {
    const entries = readdirSync(folderPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isFile()) continue;

      const ext = entry.name.toLowerCase().slice(entry.name.lastIndexOf('.'));
      if (imageExtensions.includes(ext)) {
        images.push(`${urlPrefix}/${entry.name}`);
      }
    }
  } catch (error) {
    console.error(`Error scanning folder ${folderPath}:`, error);
  }

  // Sort alphabetically
  return images.sort();
}

/**
 * Get all images across all folders (flat list)
 */
export function getAllGalleryImages(): string[] {
  const folders = getGalleryFolders();
  return folders.flatMap(folder => folder.images);
}
