const debug = require('debug')('scripts').extend('js/copy-css-assets')
const fse = require('fs-extra')
const path = require('path')

/**
 * @file Implementation - copyCSSAssets
 * @module scripts/js/copy-css-assets
 */

/**
 * Copies all files in `.next/static/css` to `.next/server/static/css`.
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
  const dest = path.resolve(process.cwd(), `.next/server/static/css`)

  // Copy CSS assets
  await fse.copy(src, dest)
  debug(`Copied ${src} files to ${dest} directory.`)
}

module.exports = copyCSSAssets
