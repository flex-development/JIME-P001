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
          '@app': '../app/src',
          '@app-tests': '../app/__tests__',
          '@system': './src'
        }
      }
    ]
  ]
}
