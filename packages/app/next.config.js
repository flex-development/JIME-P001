const wc = require('@flex-development/kustomzdesign/webpack.common')
const { DuplicatesPlugin } = require('inspectpack/plugin')
const merge = require('lodash').merge
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const createDeveloperToken = require('./scripts/create-developer-token')
const vercel = require('./vercel.json')

/**
 * @file Next.js Configuration
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

const {
  APPLE_AUTHKEY_MUSICKIT: private_key,
  APPLE_AUTHKEY_MUSICKIT_KEY_ID: kid,
  APPLE_TEAM_ID: iss,
  ANALYZE,
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
    APPLE_DEVELOPER_TOKEN: createDeveloperToken(iss, kid, private_key),
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
    optimizeImages: true,
    scrollRestoration: true
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
   * Server-side only configuration.
   */
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
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
    // Module resolutions
    config.resolve.alias = merge(config.resolve.alias, {
      '@babel': path.join(__dirname, '../../node_modules/@babel'),
      '@baggie/string': '@baggie/string/lib',
      '@commitlint': false,
      '@flex-development/json': '@flex-development/json/dist',
      '@flex-development/kustomzcore': '@flex-development/kustomzcore/dist',
      '@flex-development/kustomzdesign': '@flex-development/kustomzdesign/dist',
      '@hooks': '@flex-development/kustomzdesign/dist/hooks',
      '@lib': '@flex-development/kustomzdesign/dist/lib',
      '@mdx-js/react': '@mdx-js/react/dist/esm',
      '@providers': '@flex-development/kustomzdesign/dist/providers',
      '@shopify/theme-images': '@shopify/theme-images/dist/images.es5',
      lodash: 'lodash-es',
      'react-hanger': 'react-hanger/esm',
      'react-use': 'react-use/esm',
      swr: 'swr/esm',
      validator: 'validator/es'
    })

    // Add Node.js polyfills
    config.resolve.fallback = merge(config.resolve.fallback, {
      util: require.resolve('util')
    })

    // Prevent client-side errors
    if (!isServer) {
      config.resolve.fallback = merge(config.resolve.fallback, {
        child_process: false,
        dns: false,
        fs: false
      })
    }

    // Push custom TypeScript loader
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

    // Overwrite CSS rules to handle inlining CSS using `InlineStylesHead`
    config.module.rules.push({
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader].concat(wc.module.rules[0].use)
    })

    // ! Extract styles BOTH client-side and server-side
    config.plugins.push(
      new MiniCssExtractPlugin({
        chunkFilename: 'static/css/[contenthash].css',
        filename: 'static/css/[contenthash].css'
      })
    )

    // Report duplicate dependencies
    if (!dev) config.plugins.push(new DuplicatesPlugin({ verbose: true }))

    // Analyze Webpack bundle output
    if (ANALYZE) {
      const reportFilenameClient = './analyze/client.html'
      const reportFilenameServer = '../analyze/server.html'

      const options = {
        analyzerMode: 'static',
        defaultSizes: 'stat',
        openAnalyzer: false,
        reportFilename: isServer ? reportFilenameServer : reportFilenameClient
      }

      config.plugins.push(new BundleAnalyzerPlugin(options))
    }

    // Optimization settings
    config.optimization = merge(config.optimization, {
      mergeDuplicateChunks: true,
      minimize: true,
      sideEffects: true,
      usedExports: true
    })

    return config
  }
}
