const defaultBabelConfig = require('../../babel.config.json')

/**
 * @file Babel Configuration
 * @see https://babeljs.io/docs/en/configuration
 */

module.exports = {
  ...defaultBabelConfig,
  plugins: defaultBabelConfig.plugins.concat([
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
          '@app-mocks': './__mocks__',
          '@subdomains': './src/subdomains/',
          '@system': '../system/src',
          '@system-mocks': '../system/__tests__/__mocks__'
        }
      }
    ]
  ])
}
