const host = require('./scripts/js/get-site-url')()

/**
 * @file Generate robots.txt
 * @see https://github.com/itgalaxy/generate-robotstxt
 * @see https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
 */

module.exports = {
  host,
  policy: [
    {
      allow: '/*',
      disallow: ['/api/*'],
      userAgent: '*'
    }
  ],
  sitemap: `${host}/sitemap.xml`
}
