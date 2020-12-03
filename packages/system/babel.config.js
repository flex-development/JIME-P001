const defaultConfig = require('../../babel.config.json')

/**
 * @file Babel Configuration
 * @see https://babeljs.io/docs/en/configuration
 */

module.exports = {
  extends: '../../babel.config.json',
  plugins: defaultConfig.plugins.concat([
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
