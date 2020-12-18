const nextConfig = require('./next.config')

/**
 * @file Config to generate robots.txt
 * @see https://github.com/itgalaxy/generate-robotstxt
 * @see https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
 */

module.exports = {
  host: nextConfig.env.SITE_URL,
  policy: [
    {
      userAgent: '*',
      allow: '/*',
      disallow: ['/api/*']
    }
  ],
  sitemap: `${nextConfig.env.SITE_URL}/api/sitemap`
}
