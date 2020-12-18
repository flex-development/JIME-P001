const nextConfig = require('./next.config').default

/**
 * @file Config to generate robots.txt
 * @see https://github.com/itgalaxy/generate-robotstxt
 * @see https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
 */

module.exports = {
  host: nextConfig.env.SITE_URL,
  policy: [
    {
      allow: '/*',
      disallow: ['/api/*'],
      userAgent: '*'
    }
  ],
  sitemap: `${nextConfig.env.SITE_URL}/api/sitemap`
}
