const { AnyObject } = require('@flex-development/json')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const withSourceMaps = require('@zeit/next-source-maps')()
const { DuplicatesPlugin } = require('inspectpack/plugin')
const isEmpty = require('lodash').isEmpty
const merge = require('lodash').merge
const transpileModules = require('next-transpile-modules')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SITE_URL = require('./scripts/js/get-site-url')()
const vercel = require('./vercel.json')

/**
 * @file Next.js Configuration
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

const {
  API_URL,
  GA_TRACKING_ID,
  GOOGLE_SITE_VERIFICATION,
  SENTRY_AUTH_TOKEN,
  SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_RELEASE,
  SITE_NAME,
  TYPEKIT_ID,
  VERCEL,
  VERCEL_ENV,
  VERCEL_GIT_COMMIT_REF,
  VERCEL_GIT_COMMIT_SHA,
  VERCEL_URL
} = process.env

const ENV = VERCEL_ENV.toLowerCase()
const ROOT_NODE_MODULES = path.join(__dirname, '../../node_modules')
const VERCEL_PARSED = JSON.parse(VERCEL && VERCEL.length ? VERCEL : 0)

const config = {
  /**
   * Add environment variables to the JavaScript bundle.
   */
  env: {
    API_URL,
    GA_ENABLED: VERCEL_PARSED && ENV !== 'development',
    GA_TRACKING_ID,
    GOOGLE_SITE_VERIFICATION,
    SENTRY_DSN,
    SENTRY_RELEASE,
    SITE_NAME,
    SITE_URL,
    TYPEKIT_ID,
    VERCEL: VERCEL_PARSED,
    VERCEL_ENV: ENV,
    VERCEL_GIT_COMMIT_REF,
    VERCEL_GIT_COMMIT_SHA,
    VERCEL_URL
  },

  /**
   * Experimental features config.
   */
  experimental: {
    modern: true,
    optimizeCss: true,
    optimizeFonts: true,
    optimizeImages: true,
    pageEnv: true,
    plugins: true,
    scrollRestoration: true,
    workerThreads: true
  },

  /**
   * Future features config.
   */
  future: {
    excludeDefaultMomentLocales: true,
    webpack5: true
  },

  /**
   * Identifies an application version.
   *
   * When building the application locally, a random ID will be generated.
   *
   * In Vercel environments, however, the build ID will match the git SHA of the
   * commit the latest deployment was triggered by. For organizational purposes,
   * this value is also used when uploading release artifacts to Sentry.
   *
   * @return {string | null} Git commit SHA if building in Vercel environment
   */
  generateBuildId: () => (!isEmpty(SENTRY_RELEASE) ? SENTRY_RELEASE : null),

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
   * Next.js plugins configuration. Disables plugin auto-detection.
   *
   * @see https://github.com/vercel/next.js/discussions/9133
   */
  plugins: [],

  /**
   * Enable React Strict Mode.
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
   * Enable serverless deployments.
   *
   * @see https://nextjs.org/blog/next-8#serverless-nextjs
   */
  target: 'experimental-serverless-trace',

  /**
   * Extends the native Webpack configuration.
   *
   * @see https://github.com/vercel/next.js/tree/canary/examples/with-sentry
   *
   * @param {import('webpack').Configuration} config - Webpack config object
   * @param {AnyObject} helpers - Helpers
   * @param {string} helpers.buildId - Unique identifier between builds
   * @param {AnyObject} helpers.defaultLoaders - Default loaders used internally
   * @param {AnyObject} helpers.defaultLoaders.babel - `babel-loader` config
   * @param {boolean} helpers.dev - True if the compiling in development mode
   * @param {boolean} helpers.isServer - `true` for server-side compilation
   * @param {import('webpack')} helpers.webpack - Webpack
   * @return {import('webpack').Configuration} Altered Webpack configuration
   */
  webpack: (config, { dev, isServer }) => {
    // Optimization settings
    config.optimization = merge(config.optimization, {
      mergeDuplicateChunks: true,
      minimize: true,
      sideEffects: true,
      usedExports: true
    })

    // Update module resolutions
    config.resolve.alias = merge(config.resolve.alias, {
      '@babel': '@babel',
      '@commitlint': false,
      '@flex-development/json': '@flex-development/json/dist',
      '@kustomzcore': path.join(
        __dirname,
        'node_modules/@flex-development/kustomzcore'
      ),
      '@kustomzdesign': '@flex-development/kustomzdesign/dist',
      '@mdx-js/react': '@mdx-js/react/dist/esm',
      '@sentry/browser': '@sentry/browser/esm',
      '@sentry/node': '@sentry/node/esm',
      '@sentry/types': '@sentry/types/esm',
      '@sentry/utils': '@sentry/utils/esm',
      '@shopify/theme-images': '@shopify/theme-images/dist/images.es5',
      lodash: 'lodash-es',
      'react-hanger': 'react-hanger/esm',
      'react-use': 'react-use/esm'
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

    /**
     * Fixes `"TypeError: v is not a function"`.
     *
     * @see https://github.com/pmndrs/react-spring/issues/1078
     * @see https://github.com/plouc/nivo/issues/1290#issuecomment-756264505
     */
    config.module.rules.push({ sideEffects: true, test: /@react-spring/ })

    // Report duplicate dependencies
    if (!dev) config.plugins.push(new DuplicatesPlugin({ verbose: true }))

    // Analyze Webpack bundle output (local production only)
    if (!VERCEL_PARSED && !dev) {
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

    /**
     * When all Sentry configuration environment variables are available, the
     * {@module SentryWebpackPlugin} is added to the Webpack plugins config.
     *
     * This is an alternative to manually uploading source maps, and only
     * enabled in `preview` and `production` Vercel environments.
     */
    if (
      !isEmpty(SENTRY_AUTH_TOKEN) &&
      !isEmpty(SENTRY_DSN) &&
      !isEmpty(SENTRY_ORG) &&
      !isEmpty(SENTRY_PROJECT) &&
      !isEmpty(SENTRY_RELEASE) &&
      VERCEL_PARSED &&
      ENV !== 'development'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          authToken: SENTRY_AUTH_TOKEN,
          debug: true,
          deploy: {
            env: ENV,
            name: VERCEL_URL.split('.vercel.app')[0],
            url: `https://${VERCEL_URL}`
          },
          ignore: ['node_modules'],
          include: '.next',
          org: SENTRY_ORG,
          project: SENTRY_PROJECT,
          release: SENTRY_RELEASE,
          stripPrefix: ['webpack://_N_E/'],
          urlPrefix: `~/_next`
        })
      )
    }

    return config
  }
}

/** @see https://github.com/martpie/next-transpile-modules */
const withTM = transpileModules(
  [
    path.join(ROOT_NODE_MODULES, '@mdx-js/react'),
    path.join(ROOT_NODE_MODULES, 'react-hanger'),
    path.join(ROOT_NODE_MODULES, 'react-use'),
    '@flex-development/json',
    '@flex-development/kustomzcore',
    '@flex-development/kustomzdesign'
  ],
  {
    resolveSymlinks: true,
    unstable_webpack5: true
  }
)

module.exports = withSourceMaps(withTM(config))
