const babelOptions = require('./babel.config')

/**
 * @file Babel Configuration - Production Compilation
 * @see https://babeljs.io/docs/en/configuration
 */

module.exports = api => {
  const options = babelOptions()

  return {
    ...options,
    comments: api.env('development'),
    ignore: options.ignore.concat([
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.stories.tsx',
      'src/types/typings'
    ])
  }
}
