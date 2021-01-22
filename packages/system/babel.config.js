const rootBabelOptions = require('../../babel.config.json')
const isPlainObject = require('lodash').isPlainObject
const isString = require('lodash').isString

/**
 * @file Babel Configuration - Storybook / Jest
 * @see https://babeljs.io/docs/en/configuration
 */

module.exports = api => {
  const env = api ? api.env() : process.env.BABEL_ENV || process.env.NODE_ENV

  /**
   * Returns the configuration for the `module-resolver` plugin.
   *
   * @see https://github.com/tleunen/babel-plugin-module-resolver
   * @see https://www.robinwieruch.de/babel-module-resolver-typescript
   *
   * @return {Array<string, object>} `module-resolver` plugin config
   */
  const moduleResolverPlugin = () => {
    const options = {
      alias: {
        '@app-mocks': '../app/__mocks__',
        '@system': './src',
        '@system-mocks': './__tests__/__mocks__'
      }
    }

    // Add additional alias in test environments
    if (env === 'jest') {
      // Can't rely on TypeScript path aliases
      const key = '@flex-development/kustomzcore'
      options.alias[key] = `${key}/dist`
    }

    return ['module-resolver', options]
  }

  /**
   * Updates the Babel preset configuration.
   * In non-Jest environments, Babel will NOT compile ES modules.
   */
  const presets = rootBabelOptions.presets.map(preset => {
    // Convert strings into array preset config
    const $preset = isString(preset) ? [preset, {}] : preset

    // If missing config object
    if (!isPlainObject($preset[1])) $preset[1] = {}

    // Decide if ES Modules should be compiled
    if (preset[0] === '@babel/preset-env') {
      // Don't use ES Modules in Jest environments
      $preset[1].targets.esmodules = env !== 'jest'
      $preset[1].modules = env === 'jest' ? 'commonjs' : false
    }

    return $preset
  })

  // Add `module-resolver` plugin
  let plugins = rootBabelOptions.plugins.concat([moduleResolverPlugin()])

  // Add `transform-define` plugin
  plugins = plugins.concat([
    [
      'transform-define',
      {
        'process.env.NODE_ENV': process.env.NODE_ENV
      }
    ]
  ])

  // Return Babel options
  return { ...rootBabelOptions, plugins, presets }
}
