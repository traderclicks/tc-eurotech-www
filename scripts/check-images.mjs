#!/usr/bin/env node
/**
 * Pre-deploy image validation script
 *
 * Rules:
 * 1. If Cloudflare optimization enabled: All images must use CloudflareImage component
 * 2. If Cloudflare disabled: No images can exceed size limit
 * 3. Fails build if violations found
 *
 * Usage: node scripts/check-images.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// ============================================================================
// Configuration
// ============================================================================

// Load config from file if it exists, otherwise use defaults
function loadConfig() {
  const configPath = join(projectRoot, 'image-check.config.json');

  if (existsSync(configPath)) {
    try {
      const configFile = readFileSync(configPath, 'utf-8');
      return JSON.parse(configFile);
    } catch (err) {
      console.error(`⚠️  Could not parse image-check.config.json: ${err.message}`);
      console.error('   Using default configuration\n');
    }
  }

  // Default configuration
  return {
    cloudflareEnabled: true,
    maxImageSizeBytes: {
      cloudflareEnabled: 3 * 1024 * 1024,  // 3MB - reasonable for dev
      cloudflareDisabled: 500 * 1024        // 500KB - forces optimization
    },
    imageDirs: ['static/images', 'static/gallery'],
    codeDirs: ['src/routes', 'src/lib/components'],
    imageExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
    codeExtensions: ['.svelte', '.ts', '.js']
  };
}

const config = loadConfig();

// ============================================================================
// Utilities
// ============================================================================

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getAllFiles(dir, extensions, baseDir = dir) {
  const files = [];
  const fullDir = join(projectRoot, dir);

  if (!existsSync(fullDir)) {
    return files;
  }

  const items = readdirSync(fullDir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(fullDir, item.name);
    const relativePath = join(dir, item.name);

    if (item.isDirectory()) {
      // Skip node_modules, .git, etc
      if (!item.name.startsWith('.') && item.name !== 'node_modules') {
        files.push(...getAllFiles(relativePath, extensions, baseDir));
      }
    } else if (item.isFile()) {
      const ext = extname(item.name).toLowerCase();
      if (extensions.includes(ext)) {
        files.push(relativePath);
      }
    }
  }

  return files;
}

// ============================================================================
// Check 1: Cloudflare Component Exists
// ============================================================================

function checkCloudflareComponentExists() {
  const componentPath = join(projectRoot, 'src/lib/components/CloudflareImage.svelte');

  if (!existsSync(componentPath)) {
    return {
      passed: false,
      error: 'CloudflareImage.svelte component not found at src/lib/components/'
    };
  }

  return { passed: true };
}

// ============================================================================
// Check 2: Image Usage in Code
// ============================================================================

function checkImageUsage() {
  const errors = [];
  const warnings = [];

  // Get all code files
  const codeFiles = config.codeDirs.flatMap(dir =>
    getAllFiles(dir, config.codeExtensions)
  );

  for (const file of codeFiles) {
    const content = readFileSync(join(projectRoot, file), 'utf-8');

    // Check for <img> tags with src="/images/" or src="/gallery/"
    const imgTagRegex = /<img[^>]+src=["'](\/(images|gallery)\/[^"']+)["']/g;
    let match;

    while ((match = imgTagRegex.exec(content)) !== null) {
      const [fullMatch, imagePath] = match;

      // Check if this file imports CloudflareImage
      const hasCloudflareImport = content.includes('CloudflareImage');

      if (!hasCloudflareImport) {
        errors.push({
          file,
          line: getLineNumber(content, match.index),
          issue: `Found <img> tag without CloudflareImage component`,
          path: imagePath,
          suggestion: 'Use <CloudflareImage> instead of <img> for optimized delivery'
        });
      }
    }

    // Check for useCloudflare: true flag (workshop photos should have this)
    const useCloudflareRegex = /src:\s*['"]\/images\/[^'"]+['"]\s*,.*?useCloudflare:\s*true/gs;
    if (content.includes('/images/') && !useCloudflareRegex.test(content)) {
      // Check if there are /images/ references without useCloudflare
      const imageRefs = content.match(/src:\s*['"]\/images\/[^'"]+['"]/g);
      if (imageRefs && imageRefs.length > 0) {
        warnings.push({
          file,
          issue: `Found /images/ references - ensure they use CloudflareImage component or have useCloudflare: true flag`,
          count: imageRefs.length
        });
      }
    }
  }

  return { errors, warnings };
}

function getLineNumber(content, index) {
  const lines = content.substring(0, index).split('\n');
  return lines.length;
}

// ============================================================================
// Check 3: Image File Sizes
// ============================================================================

function checkImageSizes() {
  const oversizedImages = [];
  const totalSize = { bytes: 0, count: 0 };

  // Determine size limit based on Cloudflare setting
  const maxSize = typeof config.maxImageSizeBytes === 'object'
    ? (config.cloudflareEnabled
        ? config.maxImageSizeBytes.cloudflareEnabled
        : config.maxImageSizeBytes.cloudflareDisabled)
    : config.maxImageSizeBytes;

  for (const dir of config.imageDirs) {
    const imageFiles = getAllFiles(dir, config.imageExtensions);

    for (const file of imageFiles) {
      const fullPath = join(projectRoot, file);
      const stats = statSync(fullPath);

      totalSize.bytes += stats.size;
      totalSize.count++;

      if (stats.size > maxSize) {
        oversizedImages.push({
          file,
          size: stats.size,
          sizeFormatted: formatBytes(stats.size),
          limit: formatBytes(maxSize)
        });
      }
    }
  }

  return { oversizedImages, totalSize, maxSize };
}

// ============================================================================
// Main Execution
// ============================================================================

function main() {
  console.log('\n🔍 Image Validation Check\n');
  console.log(`Mode: ${config.cloudflareEnabled ? '✨ Cloudflare Optimization Enabled' : '⚠️  Cloudflare Disabled - Size Limits Apply'}\n`);

  let hasErrors = false;

  // Check 1: Cloudflare component exists (if enabled)
  if (config.cloudflareEnabled) {
    console.log('📦 Checking CloudflareImage component...');
    const componentCheck = checkCloudflareComponentExists();

    if (!componentCheck.passed) {
      console.error(`❌ ${componentCheck.error}`);
      console.error('   Run: cp templates/CloudflareImage.svelte src/lib/components/\n');
      hasErrors = true;
    } else {
      console.log('✅ CloudflareImage component found\n');
    }
  }

  // Check 2: Image usage in code
  console.log('🔎 Scanning code for image references...');
  const usageCheck = checkImageUsage();

  if (usageCheck.errors.length > 0) {
    console.error(`❌ Found ${usageCheck.errors.length} image usage errors:\n`);

    for (const error of usageCheck.errors) {
      console.error(`   ${error.file}:${error.line}`);
      console.error(`   └─ ${error.issue}`);
      console.error(`      Path: ${error.path}`);
      console.error(`      Fix: ${error.suggestion}\n`);
    }

    hasErrors = true;
  } else if (usageCheck.warnings.length > 0) {
    console.log(`⚠️  Found ${usageCheck.warnings.length} warnings:\n`);

    for (const warning of usageCheck.warnings) {
      console.log(`   ${warning.file}`);
      console.log(`   └─ ${warning.issue}`);
      if (warning.count) console.log(`      Count: ${warning.count}\n`);
    }
  } else {
    console.log('✅ All images use CloudflareImage component\n');
  }

  // Check 3: Image file sizes
  console.log('📏 Checking image file sizes...');
  const sizeCheck = checkImageSizes();

  console.log(`   Total images: ${sizeCheck.totalSize.count} files (${formatBytes(sizeCheck.totalSize.bytes)})`);
  console.log(`   Size limit: ${formatBytes(sizeCheck.maxSize)} per image ${config.cloudflareEnabled ? '(Cloudflare mode)' : '(No Cloudflare)'}`);

  if (sizeCheck.oversizedImages.length > 0) {
    console.error(`\n❌ Found ${sizeCheck.oversizedImages.length} oversized images:\n`);

    for (const img of sizeCheck.oversizedImages) {
      console.error(`   ${img.file}`);
      console.error(`   └─ ${img.sizeFormatted} (exceeds ${img.limit})\n`);
    }

    if (config.cloudflareEnabled) {
      console.error('   These images are too large even for development/git.');
      console.error('   Fix: Run prepare-images.sh to optimize:');
      console.error('   $ prepare-images.sh ./static/images\n');
      console.error('   This will resize to max 2400px width (~1-2MB)\n');
    } else {
      console.error('   Fix: Run prepare-images.sh to optimize images:');
      console.error('   $ prepare-images.sh ./static/images\n');
    }

    hasErrors = true;
  } else {
    const avgSize = sizeCheck.totalSize.bytes / sizeCheck.totalSize.count;
    console.log(`   Average size: ${formatBytes(avgSize)}`);
    console.log('✅ All images within size limits\n');
  }

  // Summary
  console.log('─'.repeat(60));

  if (hasErrors) {
    console.error('\n❌ Image validation failed - fix errors above before deploying\n');
    process.exit(1);
  } else {
    console.log('\n✅ All image checks passed - ready to deploy!\n');
    process.exit(0);
  }
}

main();
