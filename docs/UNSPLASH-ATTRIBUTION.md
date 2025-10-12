# Unsplash Attribution System

Automatic photographer attribution for Unsplash images in the gallery.

## Overview

Per Unsplash's terms of service, all images must include photographer attribution. This system automatically extracts photographer information from Unsplash filenames and displays proper attribution in the gallery and modal views.

## How It Works

### 1. Attribution Data in Filenames

Unsplash strips all EXIF metadata from downloaded images for privacy. Attribution data is encoded in the filename:

```
{photographer}-{photoID}-unsplash.jpg
```

**Example:**
```
taylor65s-EIs247QDxZk-unsplash.jpg
```

Breaks down to:
- Photographer: `taylor65s`
- Photo ID: `EIs247QDxZk`
- Platform: `unsplash`

### 2. Automatic Parsing

The `parseUnsplashAttribution()` utility function automatically extracts:

```typescript
{
  photographer: "taylor65s",
  photographerUrl: "https://unsplash.com/@taylor65s",
  photoId: "EIs247QDxZk",
  photoUrl: "https://unsplash.com/photos/EIs247QDxZk",
  isUnsplash: true
}
```

### 3. Display Locations

Attribution appears in two places:

**Gallery Grid** (always visible):
- Bottom overlay on each Unsplash image
- Format: "Photo by {photographer} on Unsplash"
- Links to photographer profile and Unsplash homepage

**Modal View** (when image is clicked):
- Bottom center of enlarged image
- Same format and links as gallery

## Implementation

### Core Utility

**File:** `src/lib/utils/unsplash-attribution.ts`

```typescript
import { parseUnsplashAttribution } from '$lib/utils/unsplash-attribution';

// Parse attribution from filename
const attribution = parseUnsplashAttribution('/gallery/jaguar/taylor65s-EIs247QDxZk-unsplash.jpg');

// Returns:
{
  photographer: "taylor65s",
  photographerUrl: "https://unsplash.com/@taylor65s",
  photoId: "EIs247QDxZk",
  photoUrl: "https://unsplash.com/photos/EIs247QDxZk",
  isUnsplash: true
}

// Non-Unsplash images return null
parseUnsplashAttribution('/images/DSC00651.jpg'); // → null
```

### Gallery Integration

**File:** `src/routes/gallery/+page.svelte`

Attribution is automatically added to all images:

```typescript
// Images array with attribution
const images: GalleryImage[] = rawImages.map(img => ({
  ...img,
  attribution: parseUnsplashAttribution(img.src)
}));
```

Gallery displays attribution for Unsplash images:

```svelte
{#if image.attribution}
  <div class="attribution">
    Photo by <a href={image.attribution.photographerUrl}>
      {image.attribution.photographer}
    </a> on <a href="https://unsplash.com">Unsplash</a>
  </div>
{/if}
```

### Modal Integration

**File:** `src/lib/components/Modal.svelte`

Attribution displays in enlarged view:

```svelte
{#if modal.content.attribution}
  <div class="image-attribution">
    Photo by <a href={modal.content.attribution.photographerUrl}>
      {modal.content.attribution.photographer}
    </a> on <a href="https://unsplash.com">Unsplash</a>
  </div>
{/if}
```

## Adding New Unsplash Images

### Correct Filename Format

When downloading from Unsplash collections:

✅ **Correct:** `photographer-photoID-unsplash.jpg`
- Example: `taylor65s-EIs247QDxZk-unsplash.jpg`
- Attribution will be automatically extracted

❌ **Incorrect:** `jaguar-EIs247QDxZk-unsplash.jpg`
- Car make replaces photographer name
- Attribution will fail

### Download Script

Use the provided Python script to download from Unsplash collections:

```bash
# Download from specific collections
python /tmp/download.py

# Collections are defined in script:
collections = {
    'fNs_JkekzO8': 'jaguar',    # 15 images
    'cADZlhZuKyQ': 'mini',       # 11 images
    'JQfWOvlJApM': 'land-rover'  # 20 images
}
```

Script automatically:
- Uses correct `{photographer}-{photoID}-unsplash.jpg` naming
- Organizes into folders by car make
- Downloads full-resolution images

## Testing

Test the attribution parser:

```bash
npm run test:attribution
# or
node scripts/test-attribution.mjs
```

**Test cases:**
- Standard Unsplash images ✅
- Photo IDs with hyphens (e.g., `v-4RgW343fA`) ✅
- Non-Unsplash images (returns `null`) ✅
- Various photographer usernames ✅

## Edge Cases Handled

### Photo IDs with Hyphens

Some Unsplash photo IDs contain hyphens:

```
timtrad-v-4RgW343fA-unsplash.jpg
```

Parser correctly extracts:
- Photographer: `timtrad`
- Photo ID: `v-4RgW343fA` (preserves internal hyphen)

### Mixed Image Types

Gallery contains both Unsplash images and workshop photos:

- **Unsplash images:** Show attribution
- **Workshop photos:** No attribution displayed

Parser returns `null` for non-Unsplash images, which is handled gracefully.

## Compliance

### Unsplash License Requirements

Per [Unsplash License](https://unsplash.com/license):

✅ **Required:**
- Photographer credit ("Photo by {name}")
- Link to photographer profile
- Mention of Unsplash platform

✅ **Implemented:**
- Automatic attribution on all Unsplash images
- Links to photographer profile and Unsplash homepage
- Visible in both gallery grid and modal views

❌ **Not required:**
- Permission to use images (free license)
- Notification to photographer
- Display of download count

## API Reference

### `parseUnsplashAttribution(src: string)`

Extract photographer attribution from Unsplash image path.

**Parameters:**
- `src` (string): Image path (e.g., `/gallery/jaguar/photographer-photoID-unsplash.jpg`)

**Returns:**
- `UnsplashAttribution | null`: Attribution object or `null` if not an Unsplash image

**Example:**
```typescript
const attr = parseUnsplashAttribution('/gallery/jaguar/taylor65s-EIs247QDxZk-unsplash.jpg');
// {
//   photographer: "taylor65s",
//   photographerUrl: "https://unsplash.com/@taylor65s",
//   photoId: "EIs247QDxZk",
//   photoUrl: "https://unsplash.com/photos/EIs247QDxZk",
//   isUnsplash: true
// }
```

### `formatUnsplashAttribution(attribution: UnsplashAttribution)`

Generate formatted attribution text.

**Parameters:**
- `attribution` (UnsplashAttribution): Attribution object from `parseUnsplashAttribution`

**Returns:**
- `string`: Formatted text (e.g., "Photo by taylor65s on Unsplash")

**Example:**
```typescript
const attr = parseUnsplashAttribution(src);
const text = formatUnsplashAttribution(attr);
// "Photo by taylor65s on Unsplash"
```

### `isUnsplashImage(src: string)`

Check if an image path is from Unsplash.

**Parameters:**
- `src` (string): Image path

**Returns:**
- `boolean`: `true` if image is from Unsplash

**Example:**
```typescript
isUnsplashImage('/gallery/jaguar/taylor65s-EIs247QDxZk-unsplash.jpg'); // true
isUnsplashImage('/images/DSC00651.jpg'); // false
```

## Current Gallery Stats

As of 2025-10-12:

- **Total images:** 77
  - Unsplash: 46 images (with attribution)
  - Workshop: 31 images (no attribution)

**Unsplash images by make:**
- Land Rover: 20 images
- Jaguar: 15 images
- Mini: 11 images

All 46 Unsplash images have proper attribution automatically extracted and displayed.

## Troubleshooting

### Attribution not showing

**Check:**
1. Filename follows pattern: `{photographer}-{photoID}-unsplash.jpg`
2. File extension is `.jpg` or `.jpeg` (lowercase)
3. Filename ends with `-unsplash` before extension

**Fix:**
```bash
# Correct filename format
mv jaguar-abc123-unsplash.jpg photographer-abc123-unsplash.jpg
```

### Photographer username incorrect

**Problem:** Car make used instead of photographer name in filename

**Fix:** Re-download from Unsplash using correct naming:
1. Go to Unsplash photo URL
2. Note photographer username
3. Rename file: `{photographer}-{photoID}-unsplash.jpg`

### Links not working

**Check:**
1. Links have `target="_blank"` for new tab
2. Links have `rel="noopener noreferrer"` for security
3. Click event has `stopPropagation()` to prevent modal opening

## Related Documentation

- [Image Validation System](IMAGE-VALIDATION.md)
- [Image Optimization Comparison](IMAGE-OPTIMIZATION-COMPARISON.md)
- [Cloudflare Image Component](../src/lib/components/CloudflareImage.svelte)
- [Unsplash License](https://unsplash.com/license)

## Version

**Created:** 2025-10-12
**Last Updated:** 2025-10-12
**Author:** System automated setup
