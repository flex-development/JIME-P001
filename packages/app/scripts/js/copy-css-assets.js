const debug = require('debug')('scripts').extend('js/copy-css-assets')
const fse = require('fs-extra')
const path = require('path')

/**
 * @file Implementation - copyCSSAssets
 * @module scripts/js/copy-css-assets
 */

const { VERCEL = '0' } = process.env

/**
 * Setting the Next.js `target` option changes the location of pages and static
 * files to be used in server(less) environments.
 *
 * Previously (see commit log), in Vercel environments, the `target` option was
 * set by Vercel which resulted in files being located in the `serverless`
 * directory.
 *
 * The name of the target build directory was recently changed to `server`,
 * which originally caused a missing styles issue within the deployed storefront
 * application (see commit log). In local environments, however, the name
 * remains as `serverless`.
 *
 * Not sure if this is a bug, or an intended change on Vercel's behalf.
 */
const TARGET_DIR = `server${JSON.parse(`${VERCEL}`) ? '' : 'less'}`

/**
 * Copies all files in `.next/static/css` to `.next/{TARGET}/static/css`.
 *
 * This function is required to read CSS files from server environments.
 *
 * It's used in lieu of adding a custom CSS configuration to Webpack, which
 * would disbale built-in CSS support.
 *
 * @async
 * @return {Promise<void>} Empty promise when function is done executing
 */
const copyCSSAssets = async () => {
  // Client CSS directory
  const src = path.resolve(process.cwd(), '.next/static/css')

  // Server CSS directory
  const dest = path.resolve(process.cwd(), `.next/${TARGET_DIR}/static/css`)

  // Copy CSS assets
  await fse.copy(src, dest)
  debug(`Copied ${src} files to ${dest} directory.`)
}

module.exports = copyCSSAssets
module.exports.TARGET_DIR = TARGET_DIR
