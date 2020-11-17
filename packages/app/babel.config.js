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
          '@app-tests': './__tests__',
          '@system': '../system/src'
        }
      }
    ]
  ]
}
