const replace = require('replace-in-file')

/**
 * @file Post Installation Scripts
 * @module scripts/postinstall
 */

/**
 * Adds `sideEffects: false` to `sideEffects: true` to the `package.json` file
 * of the`@flex-development/json` module.
 *
 * @return {Promise<ReplaceResult[]>} Results from file replacements
 */
const fldvJSONRuntimeSideEffects = async () => {
  let results = []

  try {
    results = await replace({
      files: 'node_modules/@flex-development/json/package.json',
      from: `"name": "@flex-development/json",`,
      to: `"name": "@flex-development/json","sideEffects": false,`
    })
  } catch (error) {
    console.error({ mdxScopedRuntimeSideEffects: error })
  }

  console.info({ mdxScopedRuntimeSideEffects: results })
  return results
}

/**
 * Converts all instances of `sideEffects: false` to `sideEffects: true` in all
 * `@react-spring/*` packages.
 *
 * @see https://github.com/pmndrs/react-spring/issues/1078
 *
 * @return {Promise<ReplaceResult[]>} Results from file replacements
 */
const reactSpringSideEffects = async () => {
  let results = []

  try {
    results = await replace({
      files: ['node_modules/@react-spring/*/package.json'],
      from: `"sideEffects": false`,
      to: `"sideEffects": true`
    })
  } catch (error) {
    console.error({ reactSpringSideEffects: error })
  }

  console.info({ reactSpringSideEffects: results })
  return results
}

// Call postinstall scripts
fldvJSONRuntimeSideEffects()
reactSpringSideEffects()
