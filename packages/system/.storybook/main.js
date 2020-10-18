const path = require('path')
const { merge } = require('lodash')
const sassOptions = require('../.sassrc.js')

/**
 * @file Storybook Configuration
 * @module storybook/main
 * @see https://storybook.js.org/docs/react/configure/overview
 */

/* eslint-disable sort-keys */

module.exports = {
  /**
   * Project addons.
   *
   * @see https://storybook.js.org/docs/addons/introduction/
   *
   * @property {Array<Object, String>} addons
   */
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    },
    '@storybook/addon-controls',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-jest',
    '@storybook/addon-a11y',
    '@storybook/addon-actions'
  ],

  /**
   * Story paths to load. The sidebar layout will match the order of the array.
   *
   * @property {string[]} stories
   */
  stories: [
    '../src/stories/index.stories.mdx',
    '../src/stories/blocks/*.stories.mdx',
    '../src/stories/lib/atoms/*.stories.@(mdx|tsx)',
    '../src/stories/lib/molecules/*.stories.@(mdx|tsx)',
    '../src/stories/lib/organisms/*.stories.@(mdx|tsx)',
    '../src/stories/lib/templates/*.stories.@(mdx|tsx)'
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
      propFilter: prop => {
        const omit = ['__docgenInfo', 'displayName', 'forwardedRef']

        if (prop.parent && prop.parent.fileName.includes('node_modules')) {
          omit.push(prop.name)
        }

        return !omit.includes(prop.name)
      },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      tsconfigPath: path.join(__dirname, '../tsconfig.json')
    }
  },

  /**
   * Alters the Storybook Webpack configuration.
   *
   * @param {object} config - Base Webpack config
   * @returns {object} Webpack configuration
   */
  webpackFinal: async config => {
    config.resolve.alias = merge(config.resolve.alias, {
      '@system': path.join(__dirname, '../src')
    })

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: path.join(__dirname, '../.postcssrc.json')
            }
          }
        },
        {
          loader: 'sass-loader',
          options: sassOptions
        }
      ]
    })

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [path.join(__dirname, '../src')],
      use: [{ loader: 'awesome-typescript-loader' }]
    })

    return config
  }
}
