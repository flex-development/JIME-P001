const debug = require('debug')('webpack-tap-done')
const fse = require('fs-extra')
const path = require('path')

/**
 * @file Implementation - webpackTapDone
 * @module scripts/webpack-tap-done
 */

const { VERCEL_URL } = process.env

/**
 * Copies all files in `.next/static/css` to `.next/${target}/static/css`.
 *
 * This function is required to read CSS files from the server (in Vercel
 * hosting) environments. It's used in lieu of adding a custom CSS configuration
 * to Webpack, which would disbale built-in CSS support.
 *
 * @return {boolean} True if files were succesfully copied, false otherwise
 */
const webpackTapDone = () => {
  // Change server directory if in Vercel environment
  const target = `server${VERCEL_URL && VERCEL_URL.length ? 'less' : ''}`

  // Get CSS directory from / to
  const src = path.resolve(process.cwd(), '.next/static/css')
  const dest = path.resolve(process.cwd(), `.next/${target}/static/css`)

  // Copy CSS assets
  fse.copy(src, dest, err => {
    if (err) {
      debug(err)
      return false
    }

    debug(`Copied ${src} files to ${dest} directory.`)
    return true
  })
}

module.exports = webpackTapDone
