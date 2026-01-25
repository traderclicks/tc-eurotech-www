/**
 * Media Library Types
 * Types for R2-backed media library
 */

export interface MediaImage {
  id: string;                    // "eurotech_img_001"
  filename: string;              // "workshop-repair.jpg"

  storage: {
    bucket: string;              // "traderclicks-media"
    key: string;                 // "clients/eurotech/images/workshop/img_001.jpg"
    url: string;                 // Full R2 public URL
    size: number;                // Bytes
    format: 'jpeg' | 'png' | 'webp' | 'gif';
  };

  dimensions: {
    width: number;
    height: number;
    aspectRatio: string;         // "16:9"
  };

  metadata: {
    alt: string;
    title?: string;
    description?: string;
    tags: string[];
    folder: string;              // "workshop" | "vehicles/bmw"
    dominantColor?: string;      // "#2a4d6e"
  };

  attribution: {
    source: 'upload' | 'unsplash' | 'stock' | 'client';
    photographer?: string;
    photographerUrl?: string;
    sourceUrl?: string;          // Original URL if imported
    license: 'owned' | 'unsplash' | 'cc0' | 'cc-by' | 'purchased';
    requiresAttribution: boolean;
    attributionText?: string;
  };

  dates: {
    uploaded: string;            // ISO date
    modified: string;
    photographed?: string;
  };

  usage: {
    slots: string[];             // ["gallery", "home-hero"]
    usageCount: number;
  };

  client: string;                // "eurotech"
}

export interface MediaLibrary {
  version: string;
  client: string;
  lastUpdated: string;
  images: MediaImage[];
}

export interface MediaFolder {
  name: string;
  label: string;
  path: string;                  // "workshop" or "vehicles/bmw"
  imageCount: number;
}

export interface UploadRequest {
  filename: string;
  contentType: string;
  folder: string;
  alt?: string;
  tags?: string[];
}

export interface UploadResponse {
  uploadUrl: string;             // Signed URL for direct upload
  imageId: string;
  finalUrl: string;              // URL where image will be available after upload
}

export interface MediaFilter {
  folder?: string;
  tags?: string[];
  search?: string;
  limit?: number;
  offset?: number;
}
