import { createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import { readFileSync } from 'fs'
import isUndefined from 'lodash/isUndefined'
import { join } from 'path'
import sharp from 'sharp'
import { trackAPISuccessEvent } from '../../../lib/middleware'
import routeWrapper from '../../../lib/middleware/routeWrapper'
import type { GetImageAssetReq as Req } from '../../../lib/types'

/**
 * @file API Endpoint - GetImage Asset
 * @module api/assets/images/[filename]
 */

/**
 * Retrieve an image asset by filename.
 *
 * @async
 * @param {Req} req - API request object
 * @param {Req['query']} req.query - Query parameters object
 * @param {string} req.query.filename - Filename of image to retrieve
 * @param {number | string} [req.query.height] - Resized image height
 * @param {number | string} [req.query.width] - Resized image width
 * @param {Res} res - API response object
 * @return {Promise<Res | void>} Promise containing server response object if an
 * error is thrown, or empty promise if request completed successfully
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req, res) => {
    // Get asset filename and resize dimensions
    const { filename, height, width } = req.query

    // Get extension from filename
    const filename_split = filename.split('.')
    const extension = filename_split[filename_split.length - 1]

    // Parse image resize dimensions
    const $height = height ? JSON.parse(`${height}`) : height
    const $width = width ? JSON.parse(`${width}`) : width

    try {
      // Get file from directory
      let file = readFileSync(join(__dirname, '_files', filename))

      // Resize image
      if (!isUndefined($height) || !isUndefined($width)) {
        file = await sharp(file).resize($width, $height).toBuffer()
      }

      // Send success `event` hit to Google Analytics
      await trackAPISuccessEvent(req)

      res.writeHead(200, { 'Content-Type': `image/${extension}` })
      return res.end(file)
    } catch (err) {
      const data = { code: err.code, errors: { filename }, height, width }
      const status = err.code === 'ENOENT' ? 404 : 500

      return createError({ ...err, status }, data)
    }
  })
}
