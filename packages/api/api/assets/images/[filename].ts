import type { VercelResponse as Res } from '@vercel/node'
import { readFileSync } from 'fs'
import isUndefined from 'lodash/isUndefined'
import { join } from 'path'
import sharp from 'sharp'
import {
  handleAPIError,
  initRoute,
  trackAPIRequest,
  trackAPISuccessEvent
} from '../../../lib/middleware'
import type { GetImageAssetReq as Req } from '../../../lib/types'

/**
 * @file API Endpoint - GetImage Asset
 * @module api/assets/images/[filename]
 */

/**
 * Retrieve an image asset by filename.
 *
 * @param req - API request object
 * @param req.query - Request query parameters
 * @param req.query.filename - Name of image to retrieve, including extension
 * @param req.query.height - Resized image height
 * @param req.query.width - Resized image width
 * @param res - API response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  // Initialize API route
  initRoute(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

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

    return handleAPIError(req, res, { ...err, status }, data)
  }
}
