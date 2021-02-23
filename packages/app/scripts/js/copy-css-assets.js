const debug = require('debug')('scripts').extend('js/copy-css-assets')
const fse = require('fs-extra')
const path = require('path')

/**
 * @file Implementation - copyCSSAssets
 * @module scripts/js/copy-css-assets
 */

/**
 * Copies all files in `.next/static/css` to `.next/${target}/static/css`.
 *
 * This function is required to read CSS files from the server (in Vercel
 * hosting) environments. It's used in lieu of adding a custom CSS configuration
 * to Webpack, which would disbale built-in CSS support.
 *
 * @async
 * @return {Promise<void>} Empty promise when function is done executing
 */
const copyCSSAssets = async () => {
  // Change server directory if in Vercel environment
  const target = `server${JSON.parse(process.env.VERCEL || '0') ? 'less' : ''}`

  // Client CSS directory
  const src = path.resolve(process.cwd(), '.next/static/css')

  // Server CSS directory
  const dest = path.resolve(process.cwd(), `.next/${target}/static/css`)

  // Copy CSS assets
  await fse.copy(src, dest)
  debug(`Copied ${src} files to ${dest} directory.`)
}

module.exports = copyCSSAssets
