const { merge } = require('lodash')
const vercel = require('./vercel.json')

/**
 * @file Next.js Configuration
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

const {
  APPLE_AUTHKEY_MUSICKIT,
  APPLE_AUTHKEY_MUSICKIT_KEY_ID,
  APPLE_TEAM_ID,
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  SHOPIFY_API_VERSION,
  SHOPIFY_DOMAIN,
  SITE_URL,
  VERCEL_URL
} = process.env

let SITE_URL_SAFE = SITE_URL || VERCEL_URL || 'http://localhost:3001'
if (!SITE_URL_SAFE.startsWith('http')) SITE_URL_SAFE = `https://${VERCEL_URL}`

module.exports = {
  /**
   * Add environment variables to the JavaScript bundle.
   */
  env: {
    APPLE_AUTHKEY_MUSICKIT,
    APPLE_AUTHKEY_MUSICKIT_KEY_ID,
    APPLE_TEAM_ID,
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
    FIREBASE_DATABASE_URL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: `${FIREBASE_PROJECT_ID}.appspot.com`,
    SHOPIFY_API_VERSION,
    SHOPIFY_DOMAIN,
    SITE_URL: SITE_URL_SAFE,
    VERCEL_URL
  },

  /**
   * Experimental features config.
   */
  experimental: {
    optimizeFonts: true,
    optimizeImages: true
  },

  /**
   * Returns the headers configuration.
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/headers
   *
   * @return {Array<object>} Array of headers
   */
  async headers() {
    return vercel.headers || []
  },

  /**
   * Image Optimization configuration.
   *
   * @see https://nextjs.org/docs/basic-features/image-optimization
   */
  images: {
    domains: [
      SITE_URL_SAFE,
      'cdn.accentuate.io',
      'cdn.shopify.com',
      'firebasestorage.googleapis.com',
      'images.accentuate.io',
      'is4-ssl.mzstatic.com'
    ]
  },

  /**
   * Opt-in to React Strict Mode.
   *
   * @see https://reactjs.org/docs/strict-mode.html
   */
  reactStrictMode: true,

  /**
   * Returns the redirects configuration.
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/redirects
   *
   * @return {Array<object>} Array of redirects
   */
  async redirects() {
    return vercel.redirects || []
  },

  /**
   * Returns the rewrites configuration.
   *
   * @see https://nextjs.org/docs/api-reference/next.config.js/rewrites
   *
   * @return {Array<object>} Array of rewrites
   */
  async rewrites() {
    return vercel.rewrites || []
  },

  /**
   * Extends the native Webpack configuration.
   *
   * @param {object} config - Webpack config object
   * @param {object} helpers - Next.js helpers
   * @param {string} helpers.buildId - Unique identifier between builds
   * @param {object} helpers.defaultLoaders - Default loaders used internally
   * @param {object} helpers.defaultLoaders.babel - `babel-loader` config
   * @param {boolean} helpers.dev - True if the compiling in development mode
   * @param {boolean} helpers.isServer - `true` for server-side compilation
   * @param {object} helpers.webpack - Webpack
   * @return {object} Altered Webpack configuration
   */
  webpack: (config, { dev, isServer }) => {
    config.resolve.alias = merge(config.resolve.alias, {
      '@flex-development/kustomzdesign': '@flex-development/kustomzdesign/dist'
    })

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            cacheDirectory: 'node_modules/.cache/awesome-typescript-loader',
            configFileName: `tsconfig.${dev ? 'dev' : 'prod'}.json`
          }
        }
      ]
    })

    if (!isServer) {
      config.node = {
        child_process: 'empty',
        dns: 'empty',
        fs: 'empty'
      }
    }

    return config
  }
}
