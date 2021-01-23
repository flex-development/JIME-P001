const replace = require('replace-in-file')

/**
 * @file Post Installation Scripts
 * @module scripts/react-spring-side-effects
 */

/**
 * Removes `sideEffects: false` in all `@react-spring/*` packages.
 * Fixes `"TypeError: v is not a function"`.
 *
 * @see https://github.com/pmndrs/react-spring/issues/1078
 *
 * @return {Promise<ReplaceResult[]>} Results from file replacements
 */
const reactSpringSideEffects = async () => {
  const node_modules = `${process.env.VERCEL ? '' : '../../'}node_modules`
  let results = []

  try {
    results = await replace({
      files: [`${node_modules}/@react-spring/*/package.json`],
      from: '"sideEffects": false,',
      to: ''
    })
  } catch (error) {
    console.error({ reactSpringSideEffects: error })
  }

  console.info({ reactSpringSideEffects: results })
  return results
}

reactSpringSideEffects()
