# Image Validation System

Automated pre-deploy checks to ensure optimal image delivery and prevent performance issues.

## Quick Start

```bash
# Run validation manually
npm run check:images

# Runs automatically before build
npm run build
```

## How It Works

The validation script (`scripts/check-images.mjs`) enforces image optimization rules before deployment:

### Rule 1: Cloudflare Optimization Enabled (Current Mode)

**When enabled** (`cloudflareEnabled: true`):
- ✅ Ensures `CloudflareImage` component exists
- ✅ Scans all code for image references
- ⚠️  Warns if images don't use CloudflareImage component
- ✅ **3MB limit per image** - keeps dev/git manageable
- ❌ Blocks deployment if images > 3MB

**Why 3MB limit?**
- Development serves originals (no Cloudflare transforms on localhost)
- Large files slow down dev server and bloat git repo
- 3MB = reasonable for 2400px high-quality JPEGs
- Production still optimizes via Cloudflare (3MB → 150KB for mobile)

**Result**:
- Images optimized for development AND production
- Cloudflare transforms: AVIF/WebP/JPEG automatically
- Responsive sizes generated at edge

### Rule 2: Cloudflare Optimization Disabled

**When disabled** (`cloudflareEnabled: false`):
- ❌ **500KB limit per image** - forces aggressive optimization
- 💡 Suggests running `prepare-images.sh` to optimize
- ❌ Blocks deployment until fixed

**Result**: Forces manual optimization before deployment.

## Configuration

Edit `image-check.config.json` to customize:

```json
{
  "cloudflareEnabled": true,
  "maxImageSizeBytes": {
    "cloudflareEnabled": 3145728,
    "cloudflareDisabled": 524288
  },
  "imageDirs": [
    "static/images",
    "static/gallery"
  ],
  "codeDirs": [
    "src/routes",
    "src/lib/components"
  ]
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `cloudflareEnabled` | boolean | `true` | Enable Cloudflare optimization mode |
| `maxImageSizeBytes` | object or number | See below | Size limits per mode |
| `maxImageSizeBytes.cloudflareEnabled` | number | `3145728` (3MB) | Max size with Cloudflare |
| `maxImageSizeBytes.cloudflareDisabled` | number | `524288` (512KB) | Max size without Cloudflare |
| `imageDirs` | array | `["static/images", "static/gallery"]` | Directories to scan for images |
| `codeDirs` | array | `["src/routes", "src/lib/components"]` | Directories to scan for code |
| `imageExtensions` | array | `[".jpg", ".jpeg", ".png", ".webp", ".gif"]` | Image file types to check |
| `codeExtensions` | array | `[".svelte", ".ts", ".js"]` | Code file types to scan |

**Size Limit Rationale:**
- **3MB (Cloudflare mode)**: Allows 2400px high-quality images for dev, keeps git repo reasonable
- **512KB (No Cloudflare)**: Forces aggressive optimization since no CDN transforms available

## Usage Examples

### Example 1: Check before commit

```bash
npm run check:images
```

Output:
```
🔍 Image Validation Check

Mode: ✨ Cloudflare Optimization Enabled

📦 Checking CloudflareImage component...
✅ CloudflareImage component found

🔎 Scanning code for image references...
✅ All images use CloudflareImage component

📏 Checking image file sizes...
   Total images: 171 files (186.05 MB)
   Average size: 1.09 MB
✅ All images within size limits

✅ All image checks passed - ready to deploy!
```

### Example 2: Build fails with violations

```bash
npm run build
```

Output:
```
🔍 Image Validation Check

❌ Found 3 image usage errors:

   src/routes/+page.svelte:45
   └─ Found <img> tag without CloudflareImage component
      Path: /images/hero.jpg
      Fix: Use <CloudflareImage> instead of <img> for optimized delivery

❌ Image validation failed - fix errors above before deploying
```

**Build stops** ❌ - must fix issues first.

### Example 3: Disable Cloudflare temporarily

Edit `image-check.config.json`:

```json
{
  "cloudflareEnabled": false,
  "maxImageSizeBytes": 524288
}
```

Now if any image > 512KB:

```
❌ Found 15 oversized images (limit: 512 KB):

   static/images/DSC00651.jpg
   └─ 2.2 MB (exceeds 512 KB)

   Fix: Run prepare-images.sh to optimize images:
   $ prepare-images.sh ./static/images
```

## Integration with CI/CD

### Vercel (automatic)

```json
// vercel.json
{
  "buildCommand": "npm run build"
}
```

The `prebuild` hook runs `check:images` automatically before build.

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
- name: Validate Images
  run: npm run check:images

- name: Build
  run: npm run build
```

### Manual Override (emergency deployments)

```bash
# Skip validation (not recommended)
SKIP_IMAGE_CHECK=1 npm run build

# Or temporarily disable in config
{
  "cloudflareEnabled": true,
  "maxImageSizeBytes": 10485760  # 10MB - effectively disabled
}
```

## Troubleshooting

### Error: "CloudflareImage component not found"

**Fix**: Copy component to project:

```bash
cp ../../../_workspace/scripts/cloudflare-images/templates/CloudflareImage.svelte \
   src/lib/components/
```

### Error: "Found <img> tag without CloudflareImage"

**Fix**: Replace `<img>` tags with `<CloudflareImage>`:

**Before:**
```svelte
<img src="/images/hero.jpg" alt="Hero" />
```

**After:**
```svelte
<script>
  import CloudflareImage from '$lib/components/CloudflareImage.svelte';
</script>

<CloudflareImage
  src="/images/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  eager
/>
```

### Error: "Oversized images"

**Fix**: Run image optimization script:

```bash
# Install libvips (one-time)
brew install vips  # macOS
# or
apt install libvips-tools  # Ubuntu

# Optimize images
cd /path/to/images
prepare-images.sh .

# Move optimized images back
mv cf-ready/* ../static/images/
```

### Warning: "Found /images/ references"

**Not an error**, just a warning that some images might not be using CloudflareImage. Check the file and ensure:

1. Workshop photos have `useCloudflare: true` flag
2. Or use `<CloudflareImage>` component directly

## Best Practices

### ✅ DO

- Use `<CloudflareImage>` for all content images
- Set `useCloudflare: true` for workshop photos in gallery
- Run `npm run check:images` before committing
- Keep `cloudflareEnabled: true` for production

### ❌ DON'T

- Use plain `<img>` tags for large images
- Commit unoptimized images (> 2MB)
- Disable validation without a good reason
- Skip `prebuild` checks in CI/CD

## Related Documentation

- [Cloudflare Image Optimization System](../../../_workspace/scripts/cloudflare-images/README.md)
- [CloudflareImage Component](../src/lib/components/CloudflareImage.svelte)
- [Image Preparation Script](../../../_workspace/scripts/cloudflare-images/prepare-images.sh)

## Version

**Created**: 2025-10-12
**Last Updated**: 2025-10-12
**Author**: System automated setup
