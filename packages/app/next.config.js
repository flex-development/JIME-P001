/**
 * @file Next.js Configuration
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

const {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  SHOPIFY_DOMAIN,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  SITE_URL,
  VERCEL_URL
} = process.env

module.exports = {
  /**
   * Add environment variables to the JavaScript bundle.
   */
  env: {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    FIREBASE_DATABASE_URL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: `${FIREBASE_PROJECT_ID}.appspot.com`,
    SHOPIFY_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SITE_URL: SITE_URL || VERCEL_URL || 'http://localhost:3001',
    VERCEL_URL
  },

  /**
   * Extends the native Webpack configuration.
   *
   * @todo Update documentation
   *
   * @param {object} config - Webpack config object
   * @param {object} param1 - Next.js helpers
   * @param {boolean} param1.isServer - `true` for server-side compilation
   * @returns {object} Altered Webpack configuration
   */
  webpack: config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{ loader: 'awesome-typescript-loader' }]
    })

    return config
  }
}
