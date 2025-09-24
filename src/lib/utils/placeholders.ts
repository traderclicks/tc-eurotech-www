/**
 * Lightweight placeholder image utilities
 * Uses data URIs and picsum.photos for demo content
 */

// Generate a simple SVG placeholder with dimensions
export function svgPlaceholder(width: number, height: number, text?: string): string {
  const displayText = text || `${width} × ${height}`;
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='system-ui, sans-serif' font-size='20' fill='%239ca3af'%3E${displayText}%3C/text%3E%3C/svg%3E`;
}

// Use picsum.photos for realistic placeholder images
export function photoPlaceholder(width: number, height: number, seed?: string): string {
  // Use seed for consistent images
  const seedParam = seed ? `?random=${seed}` : '';
  return `https://picsum.photos/${width}/${height}${seedParam}`;
}

// Generate a gradient placeholder
export function gradientPlaceholder(width: number, height: number, color1 = '#667eea', color2 = '#764ba2'): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:${encodeURIComponent(color1)}'/%3E%3Cstop offset='100%25' style='stop-color:${encodeURIComponent(color2)}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='${width}' height='${height}' fill='url(%23g)'/%3E%3C/svg%3E`;
}

// Generate a company logo placeholder
export function logoPlaceholder(company: string, size = 80): string {
  const initial = company.charAt(0).toUpperCase();
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'%3E%3Crect width='${size}' height='${size}' rx='8' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='system-ui, sans-serif' font-size='${size/2}' font-weight='bold' fill='%236b7280'%3E${initial}%3C/text%3E%3C/svg%3E`;
}

// Icon placeholder for services/features
export function iconPlaceholder(type: 'feature' | 'service' | 'category' = 'feature', index: number = 1): string {
  const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];
  const color = colors[(index - 1) % colors.length];

  const icons = {
    feature: 'M13 10V3L4 14h7v7l9-11h-7z', // Lightning bolt
    service: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Star
    category: 'M4 6h16M4 12h16M4 18h16' // Menu bars
  };

  const path = icons[type];

  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(color)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='${path}'/%3E%3C/svg%3E`;
}

// Common placeholder images as constants
export const PLACEHOLDERS = {
  hero: photoPlaceholder(1200, 600, 'hero'),
  avatar: (index: number) => `https://i.pravatar.cc/150?img=${index}`,
  product: (index: number) => photoPlaceholder(400, 300, `product-${index}`),
  client: (company: string) => logoPlaceholder(company),
  icon: (index: number) => iconPlaceholder('feature', index),
  serviceIcon: (index: number) => iconPlaceholder('service', index),
  categoryIcon: (index: number) => iconPlaceholder('category', index),
} as const;