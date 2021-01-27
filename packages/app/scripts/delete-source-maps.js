const debug = require('debug')('scripts/delete-source-maps')
const fs = require('fs')
const path = require('path')

/**
 * @file Implementation - deleteSourceMaps
 * @module scripts/delete-source-maps
 */

/**
 * Deletes source map files that are generated during `preview` and `production`
 * builds so they aren't publicly available.
 *
 * @return {Promise<void>} Empty promise when source maps are removed
 */
async function deleteSourceMaps() {
  const next_dir = path.join(__dirname, '../.next/')

  /**
   * Helper function to delete source map files.
   *
   * @param {string} dir - Directory to being searching for source map files
   * @return {void}
   */
  function deleteMaps(dir) {
    fs.readdirSync(dir).forEach(filename => {
      const filepath = path.join(dir, filename)

      if (path.extname(filepath) === '.map') {
        debug(`Deleting ${filepath}`)
        fs.unlinkSync(filepath)
      } else if (fs.lstatSync(filepath).isDirectory()) {
        deleteMaps(filepath)
      }
    })
  }

  deleteMaps(next_dir)
}

deleteSourceMaps()
