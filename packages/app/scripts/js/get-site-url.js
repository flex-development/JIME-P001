/**
 * @file Implementation - getSiteURL
 * @module scripts/js/get-site-url
 */

/**
 * Returns the site domain.
 *
 * In Vercel environments, `VERCEL_URL` is aliased to `SITE_URL`, but Vercel
 * URLs are not specified with "http(s)" protocols.
 *
 * @return {string} Site URL with http(s) protocol
 */
const getSiteURL = () => {
  const url = process.env.SITE_URL || 'http://localhost:3001'
  return url.startsWith('http') ? url : `https://${url}`
}

module.exports = getSiteURL
