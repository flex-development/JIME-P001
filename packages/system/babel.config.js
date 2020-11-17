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
          '@app-mocks': '../app/__tests__/__mocks__',
          '@system': './src',
          '@system-mocks': './__tests__/__mocks__'
        }
      }
    ]
  ]
}
