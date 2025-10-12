#!/usr/bin/env node
/**
 * Test script for Unsplash attribution parsing
 *
 * Usage: node scripts/test-attribution.mjs
 */

// Simple inline version of parseUnsplashAttribution for testing
function parseUnsplashAttribution(src) {
  const filename = src.split('/').pop();
  if (!filename) return null;

  if (!filename.endsWith('-unsplash.jpg') && !filename.endsWith('-unsplash.jpeg')) {
    return null;
  }

  const withoutExtension = filename.replace(/-(unsplash)\.(jpg|jpeg)$/, '');
  const parts = withoutExtension.split('-');

  if (parts.length < 2) return null;

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

// Test cases
const testCases = [
  {
    input: '/gallery/jaguar/taylor65s-EIs247QDxZk-unsplash.jpg',
    expected: {
      photographer: 'taylor65s',
      photoId: 'EIs247QDxZk',
      photographerUrl: 'https://unsplash.com/@taylor65s',
      photoUrl: 'https://unsplash.com/photos/EIs247QDxZk'
    }
  },
  {
    input: '/gallery/land-rover/grundsteins-53JjnvtUGKE-unsplash.jpg',
    expected: {
      photographer: 'grundsteins',
      photoId: '53JjnvtUGKE',
      photographerUrl: 'https://unsplash.com/@grundsteins',
      photoUrl: 'https://unsplash.com/photos/53JjnvtUGKE'
    }
  },
  {
    input: '/gallery/mini/sonniehiles-PUBt7UPbJFY-unsplash.jpg',
    expected: {
      photographer: 'sonniehiles',
      photoId: 'PUBt7UPbJFY',
      photographerUrl: 'https://unsplash.com/@sonniehiles',
      photoUrl: 'https://unsplash.com/photos/PUBt7UPbJFY'
    }
  },
  {
    input: '/images/DSC00651.jpg',
    expected: null // Not an Unsplash image
  },
  {
    input: '/gallery/land-rover/timtrad-v-4RgW343fA-unsplash.jpg', // Photo ID with hyphen
    expected: {
      photographer: 'timtrad',
      photoId: 'v-4RgW343fA',
      photographerUrl: 'https://unsplash.com/@timtrad',
      photoUrl: 'https://unsplash.com/photos/v-4RgW343fA'
    }
  }
];

console.log('\n🧪 Testing Unsplash Attribution Parser\n');

let passed = 0;
let failed = 0;

for (const testCase of testCases) {
  const result = parseUnsplashAttribution(testCase.input);

  const success = testCase.expected === null
    ? result === null
    : result !== null &&
      result.photographer === testCase.expected.photographer &&
      result.photoId === testCase.expected.photoId &&
      result.photographerUrl === testCase.expected.photographerUrl &&
      result.photoUrl === testCase.expected.photoUrl;

  if (success) {
    console.log(`✅ ${testCase.input}`);
    if (result) {
      console.log(`   → Photographer: ${result.photographer}`);
      console.log(`   → Photo ID: ${result.photoId}`);
    }
    passed++;
  } else {
    console.log(`❌ ${testCase.input}`);
    console.log(`   Expected:`, testCase.expected);
    console.log(`   Got:`, result);
    failed++;
  }
  console.log();
}

console.log('─'.repeat(60));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('✅ All tests passed!\n');
  process.exit(0);
} else {
  console.log('❌ Some tests failed\n');
  process.exit(1);
}
