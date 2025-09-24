const GET = ({ url }) => {
  const siteUrl = process.env.PUBLIC_SITE_URL || "https://example.com";
  const robotsTxt = `# Robots.txt for ${siteUrl}
# Generated dynamically

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_app/
Disallow: /theme
Crawl-delay: 1

# Googlebot specific
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_app/
Crawl-delay: 0

# Bingbot specific
User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_app/
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Host directive (for Yandex)
Host: ${siteUrl}`;
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age=86400, s-maxage=86400"
      // Cache for 24 hours
    }
  });
};
export {
  GET
};
