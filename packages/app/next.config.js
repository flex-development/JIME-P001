const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const withSourceMaps = require('@zeit/next-source-maps')()
const { DuplicatesPlugin } = require('inspectpack/plugin')
const merge = require('lodash').merge
const transpileModules = require('next-transpile-modules')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TapDoneWebpackPlugin = require('./plugins/TapDoneWebpackPlugin')
const tapDone = require('./scripts/webpack-tap-done')
const vercel = require('./vercel.json')

/**
 * @file Next.js Configuration
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

const {
  ANALYZE,
  API_URL,
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  GA_TRACKING_ID,
  GOOGLE_SITE_VERIFICATION,
  NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
  NODE_ENV,
  SENTRY_AUTH_TOKEN,
  SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SHOPIFY_API_VERSION,
  SHOPIFY_DOMAIN,
  SITE_URL,
  VERCEL,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_URL
} = process.env

const env = NODE_ENV ? NODE_ENV.toLowerCase() : 'development'

let SITE_URL_SAFE = SITE_URL || VERCEL_URL || 'http://localhost:3001'
if (!SITE_URL_SAFE.startsWith('http')) SITE_URL_SAFE = `https://${VERCEL_URL}`

/** @see https://github.com/martpie/next-transpile-modules */
const withTM = transpileModules(['@flex-development/kustomzcore'], {
  resolveSymlinks: true,
  unstable_webpack5: true
})

const config = {
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
    GOOGLE_SITE_VERIFICATION,
    NEXT_PUBLIC_GA_TRACKING_ID: GA_TRACKING_ID,
    NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_RELEASE: VERCEL_GITHUB_COMMIT_SHA,
    NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
    SHOPIFY_API_VERSION,
    SHOPIFY_DOMAIN,
    SITE_URL: SITE_URL_SAFE,
    VERCEL_GITHUB_COMMIT_SHA,
    VERCEL_URL
  },

  /**
   * Experimental features config.
   */
  experimental: {
    modern: true,
    optimizeFonts: true,
    optimizeImages: true,
    plugins: true,
    scrollRestoration: true,
    workerThreads: true
  },

  /**
   * Future features config.
   */
  future: {
    excludeDefaultMomentLocales: true
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
    deviceSizes: [576, 834, 1180, 1368, 1440],
    domains: [API_URL, 'cdn.shopify.com'],
    imageSizes: [16, 32, 50, 100, 160, 240, 480, 600, 1024, 2048]
  },

  /**
   * Enable source maps.
   */
  productionBrowserSourceMaps: true,

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
   * Sass options.
   *
   * @see https://github.com/vercel/next.js/pull/11063
   * @see https://nextjs.org/blog/next-9-4#configurable-sass-support
   */
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules')]
  },

  /**
   * Extends the native Webpack configuration.
   *
   * @see https://github.com/vercel/next.js/tree/canary/examples/with-sentry
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
  webpack: (config, { dev, isServer, webpack }) => {
    // Optimization settings
    config.optimization = merge(config.optimization, {
      mergeDuplicateChunks: true,
      minimize: true,
      sideEffects: true,
      usedExports: true
    })

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

    /**
     * In `pages/_app.tsx`, Sentry is imported from @sentry/browser.
     *
     * While @sentry/node will run in a Node.js environment, @sentry/node will
     * use Node.js-only APIs to catch even more unhandled exceptions.
     *
     * This works well when Next.js is SSRing your page on a server with
     * Node.js, but it is not what we want when your client-side bundle is being
     * executed by a browser.
     *
     * Next.js will call this webpack function twice, once for the server and
     * once for the client.
     *
     * Webpack will replace @sentry/node imports with @sentry/browser when
     * building the client-side bundle.
     */
    if (!isServer) config.resolve.alias['@sentry/node'] = '@sentry/browser'

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

    /**
     * Fixes `"TypeError: v is not a function"`.
     * @see https://github.com/pmndrs/react-spring/issues/1078
     * @see https://github.com/plouc/nivo/issues/1290#issuecomment-756264505
     */
    config.module.rules.push({ test: /@react-spring/, sideEffects: true })

    // Define an environment variable so source code can check whether or not
    // it's running on the server so we can correctly initialize Sentry
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(isServer.toString())
      })
    )

    // Report duplicate dependencies
    if (!dev) config.plugins.push(new DuplicatesPlugin({ verbose: true }))

    // ! Client-side only, in non-dev environments: Copy CSS assets so we can
    // ! inline styles via `InlineStylesHead` w/o disabling built-in CSS support
    if (!dev && !isServer) {
      config.plugins.push(new TapDoneWebpackPlugin(tapDone))
    }

    // Analyze Webpack bundle output
    if (!VERCEL && !dev && ANALYZE) {
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

    // When all the Sentry configuration env variables are available/configured
    // The Sentry webpack plugin gets pushed to the webpack plugins to build
    // and upload the source maps to sentry.
    // This is an alternative to manually uploading the source maps
    // Note: This is disabled in development mode.
    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      VERCEL_GITHUB_COMMIT_SHA &&
      env === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          ignore: ['node_modules'],
          include: '.next',
          release: VERCEL_GITHUB_COMMIT_SHA,
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~/_next`
        })
      )
    }

    return config
  }
}

module.exports = withSourceMaps(withTM(config))
