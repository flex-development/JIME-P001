const path = require('path')
const { merge } = require('lodash')
const sassOptions = require('../.sassrc.js')

/**
 * @file Storybook Configuration
 */

module.exports = {
  /**
   * Project addons.
   *
   * @see {@link https://storybook.js.org/docs/addons/introduction/}
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
    './stories/index.stories.mdx',
    './stories/blocks/*.stories.mdx',
    './stories/lib/atoms/*.stories.@(mdx|tsx)',
    './stories/lib/molecules/*.stories.@(mdx|tsx)',
    './stories/lib/organisms/*.stories.@(mdx|tsx)',
    './stories/lib/templates/*.stories.@(mdx|tsx)'
  ],

  /**
   * TypeScript configuration.
   *
   * @see {@link https://github.com/TypeStrong/fork-ts-checker-webpack-plugin}
   *
   * @property {object} typescript
   * @property {boolean} typescript.check - Run `fork-ts-checker-webpack-plugin`
   * @property {object} typescript.checkOptions - Options to pass to
   * `fork-ts-checker-webpack-plugin` (if enabled)
   * @property {string} typescript.reactDocgen - Docgen processor to run
   * @property {object} typescript.reactDocgenTypescriptOptions
   */
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: ({ parent = {} }) => {
        const lib = /system\/src/.test(parent.fileName)
        const storybook = /system\/storybook/.test(parent.fileName)

        return lib || storybook
      },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      tsconfigPath: path.join(__dirname, '../tsconfig.json')
    }
  },

  /**
   * Alters the Storybook Webpack configuration.
   *
   * @param param1.configType has a value of 'DEVELOPMENT' or 'PRODUCTION'.
   * 'PRODUCTION' is used when building the static version of storybook.
   *
   * @param {object} config - Base Webpack config
   * @param {object} param1 - Storybook config
   * @param {string} param1.configType - Storybook development environment
   * @returns {object} Webpack configuration
   */
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = merge(config.resolve.alias, {
      '@kustomz': path.join(__dirname, '../src'),
      '@kustomz-config': path.join(__dirname, './config'),
      '@kustomz-stories': path.join(__dirname, './stories')
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
      include: [
        path.join(__dirname, '../src'),
        path.join(__dirname, './config'),
        path.join(__dirname, './stories')
      ],
      use: [{ loader: 'awesome-typescript-loader' }]
    })

    return config
  }
}
