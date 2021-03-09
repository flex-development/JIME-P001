const debug = require('debug')('scripts').extend('js/fix-node-module-paths')
const replace = require('replace-in-file')

/**
 * @file Implementation - fixNodeModulePaths
 * @module scripts/js/fix-node-module-paths
 * @see https://github.com/adamreisnz/replace-in-file
 */

/**
 * @see https://github.com/adamreisnz/replace-in-file#custom-regular-expressions
 * @see https://github.com/adamreisnz/replace-in-file#replace-all-occurrences
 *
 * @property {replace.ReplaceInFileConfig} OPTIONS - Replacement options
 */
const OPTIONS = {
  files: 'dist/**/*',
  from: new RegExp('(../.*)?(node_modules/)', 'g'),
  to: ''
}

/**
 * Because TypeScript path aliases must be relative, the correct `node_modules`
 * path cannot be produced.
 *
 * When publising packages, this is incorrect because `'node_modules'` should
 * not be included in any module import paths.
 *
 * This function correctly formats all node module imports.
 *
 * @return {replace.ReplaceResult[]} Replacement results
 */
const fixNodeModulePaths = () => {
  let results = []

  try {
    results = replace.sync(OPTIONS)
  } catch (error) {
    debug({ error })
  }

  debug('finished path replacements.')
  return results
}

fixNodeModulePaths()
