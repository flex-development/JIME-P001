const merge = require('lodash').merge
const path = require('path')
const { merge: mergeWebpack } = require('webpack-merge')
const rootBabelOptions = require('../../../babel.config.json')
const wc = require('../webpack.common')

/**
 * @file Storybook Configuration
 * @module storybook/main
 * @see https://storybook.js.org/docs/react/configure/overview
 */

const DEV = process.env.NODE_ENV.toLowerCase() === 'development'
const TSCONFIG = DEV ? 'tsconfig.json' : 'tsconfig.app.json'

module.exports = {
  /**
   * Project addons.
   *
   * @see https://storybook.js.org/docs/addons/introduction/
   *
   * @property {Array<Object, String>} addons
   */
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-docs',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    'storybook-mobile',
    '@storybook/addon-a11y',
    '@storybook/addon-jest',
    'storybook-addon-performance'
  ],

  /**
   * Story paths to load. The sidebar layout will match the order of the array.
   *
   * @property {string[]} stories
   */
  stories: [
    '../src/index.stories.mdx',
    '../src/blocks/*.stories.mdx',
    '../src/lib/**/**/*.stories.@(mdx|tsx)'
  ],

  /**
   * TypeScript configuration.
   *
   * @see https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
   *
   * @property {object} typescript
   * @property {boolean} typescript.check - Run `fork-ts-checker-webpack-plugin`
   * @property {object} typescript.checkOptions - Options to pass to
   * `fork-ts-checker-webpack-plugin` (if enabled)
   * @property {string} typescript.reactDocgen - Docgen processor to run
   * @property {object} typescript.reactDocgenTypescriptOptions
   */
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: ({ name, parent }) => {
        const omit = ['__docgenInfo', 'displayName', 'forwardedRef']

        if (parent && parent.fileName.includes('node_modules')) {
          const react = parent.fileName.includes('@types/react')
          const aria_attr = name.startsWith('aria-')

          if (!react || !aria_attr) omit.push(name)
        }

        return !omit.includes(name)
      },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      tsconfigPath: path.join(__dirname, '..', TSCONFIG)
    }
  },

  /**
   * Alters the Storybook Webpack configuration.
   *
   * @param {object} config - Base Webpack config
   * @return {object} Webpack configuration
   */
  webpackFinal: config => {
    const ROOT_NM = '../../../node_modules'

    const ATL_CACHE_DIRECTORY = 'node_modules/.cache/awesome-typescript-loader'

    const CORE = '@flex-development/kustomzcore'
    const JSON = '@flex-development/json/dist'
    const MDX_JS_REACT = '@mdx-js/react/dist/esm'
    const REACT_HANGER = 'react-hanger/esm'
    const REACT_USE = 'react-use/esm'
    const SRC = '../src'
    const TESTS = '../__tests__'

    const MODULE_RESOLVER_ALIAS = {
      '@system/tests/fixtures': `${TESTS.replace('../', './')}/__fixtures__`,
      '@system/tests': TESTS.replace('../', './'),
      '@system': SRC.replace('../', './')
    }

    return mergeWebpack(config, {
      resolve: {
        alias: {
          '@flex-development/json': path.join(__dirname, ROOT_NM, JSON),
          '@core': path.join(__dirname, '../node_modules', CORE),
          '@mdx-js/react': path.join(__dirname, ROOT_NM, MDX_JS_REACT),
          '@system/tests/fixtures': path.join(__dirname, TESTS, '__fixtures__'),
          '@system/tests': path.join(__dirname, TESTS),
          '@system': path.join(__dirname, SRC),
          'react-hanger': path.join(__dirname, ROOT_NM, REACT_HANGER),
          'react-use': path.join(__dirname, ROOT_NM, REACT_USE)
        }
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            include: [path.join(__dirname, SRC), path.join(__dirname, TESTS)],
            use: [
              {
                loader: 'awesome-typescript-loader',
                options: {
                  babelCore: '@babel/core',
                  babelOptions: merge(rootBabelOptions, {
                    babelrc: false,
                    plugins: [
                      [
                        'module-resolver',
                        {
                          alias: MODULE_RESOLVER_ALIAS
                        }
                      ]
                    ]
                  }),
                  cacheDirectory: ATL_CACHE_DIRECTORY,
                  configFileName: TSCONFIG,
                  useBabel: true,
                  useCache: true
                }
              }
            ]
          },
          {
            test: /\.s[ac]ss$/i,
            use: [{ loader: 'style-loader' }].concat(wc.module.rules[0].use)
          }
        ]
      },
      node: {
        fs: 'empty'
      }
    })
  }
}
