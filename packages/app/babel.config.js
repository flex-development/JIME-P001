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
          '@app-mock-data': './__tests__/__mocks__/data',
          '@app-tests': './__tests__',
          '@system': '../system/src'
        }
      }
    ]
  ]
}
