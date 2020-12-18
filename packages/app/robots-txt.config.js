/**
 * @file Config to generate robots.txt
 * @see https://github.com/itgalaxy/generate-robotstxt
 * @see https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
 */

const { SITE_URL, VERCEL_URL } = process.env

const HOST = SITE_URL || VERCEL_URL || 'http://localhost:3001'

module.exports = {
  host: HOST,
  policy: [
    {
      allow: '/*',
      disallow: ['/api/*'],
      userAgent: '*'
    }
  ],
  sitemap: `${HOST}/api/sitemap`
}
