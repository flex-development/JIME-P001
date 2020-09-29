/**
 * @file Next.js Configuration
 * @see {@link https://nextjs.org/docs/api-reference/next.config.js/introduction}
 */

const {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  NODE_ENV = 'development',
  SITE_URL,
  VERCEL_URL
} = process.env

const SHOPIFY_DOMAIN =
  NODE_ENV === 'production'
    ? 'shop.morenaskustomz.com'
    : 'morenaskustomz.myshopify.com'

module.exports = {
  /**
   * Add environment variables to the JavaScript bundle.
   */
  env: {
    GOOGLE_ANALYTICS_MEASUREMENT_ID,
    SHOPIFY_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: 'b4f6b94e9aa925d4d66a63ee091f9ebf',
    SITE_URL: SITE_URL || VERCEL_URL || 'http://localhost:3000'
  }
}
