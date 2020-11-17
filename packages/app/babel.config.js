/**
 * @file Babel Configuration
 * @see https://babeljs.io/docs/en/configuration
 */

module.exports = {
  extends: '../../babel.config.json',
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
          '@app-mocks': './__tests__/__mocks__',
          '@system': '../system/src',
          '@system-mocks': '../system/__tests__/__mocks__'
        }
      }
    ]
  ]
}
