const rootBabelOptions = require('../../babel.config.json')

/**
 * @file Babel Configuration
 * @see https://babeljs.io/docs/en/configuration
 * @see https://www.robinwieruch.de/babel-module-resolver-typescript
 */

module.exports = api => ({
  ...rootBabelOptions,
  comments: api.env('development'),
  plugins: rootBabelOptions.plugins.concat([
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
          '@flex-development/json': '@flex-development/json/dist',
          '@core': '@flex-development/kustomzcore',
          '@design': '@flex-development/kustomzdesign/dist',
          '@mdx-js/react': '@mdx-js/react/dist/esm',
          'react-hanger': 'react-hanger/esm',
          'react-use': 'react-use/esm'
        }
      }
    ]
  ])
})
