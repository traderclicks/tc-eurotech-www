/**
 * Blog types and client-safe utilities
 * No server-only imports — safe for use in .svelte components
 */

export interface BlogVideo {
  url: string;
  title?: string;
}

export interface BlogImage {
  url: string;
  alt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  featuredImage: BlogImage | null;
  category: string;
  tags: string[];
  publishedAt: string;
  video: BlogVideo | null;
}

/**
 * Parse a video URL and return embed information
 */
export function getVideoEmbed(video: BlogVideo): { provider: string; embedUrl: string } | null {
  const url = video.url;

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    return { provider: 'youtube', embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}` };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return { provider: 'vimeo', embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Facebook
  const fbMatch = url.match(/facebook\.com\/.*\/videos\//);
  if (fbMatch) {
    return { provider: 'facebook', embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}` };
  }

  // Instagram
  const igMatch = url.match(/instagram\.com\/(reel|p)\/([a-zA-Z0-9_-]+)/);
  if (igMatch) {
    return { provider: 'instagram', embedUrl: `https://www.instagram.com/${igMatch[1]}/${igMatch[2]}/embed` };
  }

  return null;
}
