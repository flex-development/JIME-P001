const defaultBabelConfig = require('../../babel.config.json')

/**
 * @file Babel Configuration (Dev)
 * @see https://babeljs.io/docs/en/configuration
 */

module.exports = {
  ...defaultBabelConfig,
  plugins: defaultBabelConfig.plugins.concat([
    [
      'module-resolver',
      {
        alias: {
          '@app-mocks': '../app/__mocks__',
          '@system': './src',
          '@system-mocks': './__tests__/__mocks__'
        }
      }
    ]
  ])
}
