/**
 * @file Config to generate robots.txt
 * @see https://github.com/itgalaxy/generate-robotstxt
 * @see https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs
 */

const HOST = (() => {
  const url = process.env.SITE_URL || 'http://localhost:3001'

  // ! Fixes: Option `sitemap` should be an absolute URL
  // In Vercel environments, `VERCEL_URL` is aliased to `SITE_URL`, but
  // Vercel URLs are not specified with "http(s)" protocols
  return process.env.VERCEL ? `https://${url}` : url
})()

module.exports = {
  host: HOST,
  policy: [
    {
      allow: '/*',
      disallow: ['/api/*'],
      userAgent: '*'
    }
  ],
  sitemap: `${HOST}/sitemap.xml`
}
