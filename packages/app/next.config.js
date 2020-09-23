/**
 * @file Next.js Configuration
 * @see {@link https://nextjs.org/docs/api-reference/next.config.js/introduction}
 */

const {
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  SITE_URL,
  VERCEL_URL
} = process.env

module.exports = {
  /**
   * To deploy a Next.js application under a sub-path of a domain you can use
   * the `basePath` config option.
   */
  basePath: '',

  /**
   * Add environment variables to the JavaScript bundle.
   */
  env: {
    GOOGLE_ANALYTICS_MEASUREMENT_ID,
    SITE_URL: SITE_URL | VERCEL_URL | 'http://localhost:3000'
  },

  /**
   * Headers allow you to set custom HTTP headers for an incoming request path.
   *
   * @returns {object[]}
   */
  headers() {
    return []
  },

  /**
   * Extensions looked for in the `pages` directory when resolving pages.
   */
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],

  /**
   * Redirects allow you to redirect an incoming request path to a different
   * destination path.
   *
   * Redirects are only available on the Node.js environment and do not affect
   * client-side routing.
   *
   * @returns {object[]}
   */
  redirects() {
    return []
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
   * @returns {object} Altered Webpack configuration
   */
  webpack: (config, helpers) => config
}
