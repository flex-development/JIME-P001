/**
 * @file Next.js Configuration
 * @see {@link https://nextjs.org/docs/api-reference/next.config.js/introduction}
 */

const { GOOGLE_ANALYTICS_MEASUREMENT_ID, SITE_URL, VERCEL_URL } = process.env

module.exports = {
  /**
   * Add environment variables to the JavaScript bundle.
   */
  env: {
    GOOGLE_ANALYTICS_MEASUREMENT_ID,
    SITE_URL: SITE_URL || VERCEL_URL || 'http://localhost:3000'
  }
}
