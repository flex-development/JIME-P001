const debug = require('debug')('next.config')
const fse = require('fs-extra')
const { DuplicatesPlugin } = require('inspectpack/plugin')
const merge = require('lodash').merge
const transpileModules = require('next-transpile-modules')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const vercel = require('./vercel.json')

/**
 * @file Next.js Configuration
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

debug.info = console.info.bind(console)

const {
  ANALYZE,
  API_URL,
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

class TapDoneWebpackPlugin {
  constructor(callback) {
    this.callback = callback
  }

  apply(compiler) {
    compiler.hooks.done.tap('TapDoneWebpackPlugin', stats => {
      this.callback(stats)
    })
  }
}

/**
 * Copies all files in `.next/static/css` to `.next/${target}/static/css`.
 *
 * This function is required to read CSS files from the server (in Vercel
 * hosting) environments. It's used in lieu of adding a custom CSS configuration
 * to Webpack, which would disbale built-in CSS support.
 *
 * @return {boolean} True if files were succesfully copied, false otherwise
 */
const tapDone = () => {
  // Change server directory if in Vercel environment
  const target = `server${VERCEL_URL && VERCEL_URL.length ? 'less' : ''}`

  // Get CSS directory from / to
  const src = path.resolve(process.cwd(), '.next/static/css')
  const dest = path.resolve(process.cwd(), `.next/${target}/static/css`)

  // Copy CSS assets
  fse.copy(src, dest, err => {
    if (err) {
      debug.extend('tapDone')(err)
      return false
    }

    debug.extend('tapDone')(`Copied ${src} files to ${dest} directory.`)
    return true
  })
}

/** @see https://github.com/martpie/next-transpile-modules */
const withTM = transpileModules(['@flex-development/kustomzcore'], {
  resolveSymlinks: true,
  unstable_webpack5: true
})

module.exports = withTM({
  /**
   * Add environment variables to the JavaScript bundle.
   */
  env: {
    API_URL,
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
    // Update module resolutions
    config.resolve.alias = merge(config.resolve.alias, {
      '@babel': path.join(__dirname, '../../node_modules/@babel'),
      '@baggie/string': '@baggie/string/lib',
      '@commitlint': false,
      '@components': `@flex-development/kustomzdesign/dist/lib`,
      '@flex-development/json': '@flex-development/json/dist',
      '@flex-development/kustomzcore': `@flex-development/kustomzcore/dist`,
      '@flex-development/kustomzdesign': `@flex-development/kustomzdesign/dist`,
      '@hooks': `@flex-development/kustomzdesign/dist/hooks`,
      '@mdx-js/react': '@mdx-js/react/dist/esm',
      '@providers': `@flex-development/kustomzdesign/dist/providers`,
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

    // Report duplicate dependencies
    if (!dev) config.plugins.push(new DuplicatesPlugin({ verbose: true }))

    // Analyze Webpack bundle output
    if (!dev && ANALYZE) {
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

    // ! Client-side only, in non-dev environments: Copy CSS assets so we can
    // ! inline styles via `InlineStylesHead` w/o disabling built-in CSS support
    if (!dev && !isServer) {
      config.plugins.push(new TapDoneWebpackPlugin(tapDone))
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
})
