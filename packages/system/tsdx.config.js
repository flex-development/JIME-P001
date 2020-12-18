const { DEFAULT_EXTENSIONS: DEFAULT_BABEL_EXTENSIONS } = require('@babel/core')
const isEmpty = require('lodash').isEmpty
const tsPlugin = require('rollup-plugin-typescript2')
const { babelPluginTsdx: babelTSDX } = require('tsdx/dist/babelPluginTsdx')
const ttypescript = require('ttypescript')
const tsconfigProd = require('./tsconfig.prod.json')

/**
 * @file TSDX Configuration
 * @module tsdx-config
 * @see https://tsdx.io/customization
 */

/**
 * Returns options for the TSDX Babel plugin.
 *
 * @see https://github.com/formium/tsdx/blob/master/src/babelPluginTsdx.ts
 *
 * @param {boolean} extractErrors - True if error extraction is running
 * @param {string} format - Module format; "cjs", "esm", 'system', "umd"
 * @param {string} target - JavaScript target; "browser", "node"
 * @returns {object} TSDX Babel plugin options
 */
const babelTSDXOptions = (extractErrors, format, target) => ({
  babelHelpers: 'bundled',
  custom: {
    extractErrors,
    format,
    targets: target === 'node' ? { node: '10' } : undefined
  },
  exclude: ['../../node_modules/**', 'node_modules/**'],
  extensions: [...DEFAULT_BABEL_EXTENSIONS, 'ts', 'tsx'],
  passPerPreset: true
})

/**
 * Get options for the Rollup TypeScript plugin.
 *
 * @param {string} tsconfig - Path to TypeScript config file
 * @param {boolean} transpileOnly - True to disable type checking
 * @returns {object} Options for Rollup TypeScript plugin
 */
const typescriptOptions = (tsconfig, transpileOnly) => ({
  check: !transpileOnly,
  tsconfig,
  tsconfigDefaults: tsconfigProd,
  typescript: ttypescript,
  useTsconfigDeclarationDir: tsconfigProd.declarationDir ? true : false
})

module.exports = {
  /**
   * Extends the default Rollup configuration.
   *
   * @param {object} config - Default Rollup config
   * @param {object} options - TSDX Rollup options
   * @param {boolean} options.extractErrors - Error extract running?
   * @param {string} options.env - Environment; "development", "production"
   * @param {string} options.format -  "cjs", "esm", 'system', or "umd"
   * @param {boolean} options.minify - True if code is being minified
   * @param {string} options.name - Name of package
   * @param {string} options.path - Path to input file
   * @param {string} options.target - JavaScript target; "browser", "node"
   * @param {boolean} options.transpileOnly - True to disable type checking
   * @param {string} options.tsconfig - Path to TypeScript config file
   * @param {boolean} options.writeMeta - True if this is the first rollup
   * config (and thus one-off metadata should be extracted)
   * @returns {object} Updated Rollup config
   */
  rollup: (config, options) => {
    const {
      extractErrors: extract,
      format,
      target,
      transpileOnly,
      tsconfig
    } = options

    // Remove `false` and empty objects from plugins array
    config.plugins = config.plugins.filter(p => !isEmpty(p) && !isEmpty(p.name))

    /**
     * Transform tsconfig.compilerOptions.paths for type declarations
     * @see https://github.com/ezolenko/rollup-plugin-typescript2/issues/201
     */
    config.plugins = config.plugins.filter(plugin => plugin.name !== 'rpt2')
    config.plugins.push(tsPlugin(typescriptOptions(tsconfig, transpileOnly)))

    /**
     * ! Fixes: `(babel plugin) Error: You have declared using "<foo>"
     * ! babelHelpers, but transforming resulted in "<not-foo>".`
     */
    config.plugins = config.plugins.filter(plugin => plugin.name !== 'babel')
    config.plugins.push(babelTSDX(babelTSDXOptions(extract, format, target)))

    return config
  }
}
