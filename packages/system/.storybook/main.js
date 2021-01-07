const path = require('path')
const { merge: mergeWebpack } = require('webpack-merge')
const babelConfig = require('../babel.config')
const wc = require('../webpack.common')

/**
 * @file Storybook Configuration
 * @module storybook/main
 * @see https://storybook.js.org/docs/react/configure/overview
 */

const DEV = process.env.NODE_ENV.toLowerCase() === 'development'
const TSCONFIG_REL_PATH = DEV ? '../tsconfig.json' : '../tsconfig.prod.json'

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
      tsconfigPath: path.join(__dirname, TSCONFIG_REL_PATH)
    }
  },

  /**
   * Alters the Storybook Webpack configuration.
   *
   * @param {object} config - Base Webpack config
   * @return {object} Webpack configuration
   */
  webpackFinal: config =>
    mergeWebpack(config, {
      resolve: {
        alias: {
          '@system': path.join(__dirname, '../src')
        }
      },
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [{ loader: 'style-loader' }].concat(wc.module.rules[0].use)
          },
          {
            test: /\.(ts|tsx)$/,
            include: [path.join(__dirname, '../src')],
            use: [
              {
                loader: 'awesome-typescript-loader',
                options: {
                  babelCore: '@babel/core',
                  babelOptions: { ...babelConfig, babelrc: false },
                  cacheDirectory:
                    'node_modules/.cache/awesome-typescript-loader',
                  useBabel: true,
                  useCache: true
                }
              }
            ]
          }
        ]
      }
    })
}
