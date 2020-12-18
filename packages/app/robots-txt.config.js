/**
 * @file Config to generate robots.txt
 * @see https://github.com/itgalaxy/generate-robotstxt
 * @see https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
 */

const { NODE_ENV, SITE_URL, VERCEL_URL } = process.env

let HOST = SITE_URL || VERCEL_URL || 'http://localhost:3001'

// ! Fixes: Option `sitemap` should be an absolute URL
if (NODE_ENV === 'test') HOST = `https://${HOST}`

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
