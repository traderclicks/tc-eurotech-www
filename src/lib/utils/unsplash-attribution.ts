/**
 * Unsplash Attribution Utilities
 *
 * Unsplash strips all EXIF metadata from images for privacy.
 * Attribution data is encoded in the filename: {photographer}-{photoID}-unsplash.jpg
 */

export interface UnsplashAttribution {
  photographer: string;
  photographerUrl: string;
  photoId: string;
  photoUrl: string;
  isUnsplash: boolean;
}

/**
 * Parse Unsplash filename to extract photographer attribution
 * @param src - Image path (e.g., '/gallery/jaguar/taylor65s-EIs247QDxZk-unsplash.jpg')
 * @returns Attribution data or null if not an Unsplash image
 */
export function parseUnsplashAttribution(src: string): UnsplashAttribution | null {
  // Extract filename from path
  const filename = src.split('/').pop();
  if (!filename) return null;

  // Check if it's an Unsplash image (must end with -unsplash.jpg)
  if (!filename.endsWith('-unsplash.jpg') && !filename.endsWith('-unsplash.jpeg')) {
    return null;
  }

  // Remove extension and split by hyphens
  const withoutExtension = filename.replace(/-(unsplash)\.(jpg|jpeg)$/, '');
  const parts = withoutExtension.split('-');

  // Should have at least 2 parts: photographer and photoID
  if (parts.length < 2) return null;

  // Photographer is first part, photoID is last part
  // (some photo IDs contain hyphens, so we need to handle that)
  const photographer = parts[0];
  const photoId = parts.slice(1).join('-');

  return {
    photographer,
    photographerUrl: `https://unsplash.com/@${photographer}`,
    photoId,
    photoUrl: `https://unsplash.com/photos/${photoId}`,
    isUnsplash: true
  };
}

/**
 * Generate Unsplash attribution text
 * @param attribution - Attribution data from parseUnsplashAttribution
 * @returns Formatted attribution string
 */
export function formatUnsplashAttribution(attribution: UnsplashAttribution): string {
  return `Photo by ${attribution.photographer} on Unsplash`;
}

/**
 * Test if an image path is from Unsplash
 * @param src - Image path
 * @returns true if image is from Unsplash
 */
export function isUnsplashImage(src: string): boolean {
  const filename = src.split('/').pop() || '';
  return filename.includes('-unsplash.');
}
