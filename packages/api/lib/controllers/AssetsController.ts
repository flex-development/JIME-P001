import type {
  GetImageAssetQuery,
  NumberString
} from '@flex-development/kustomzcore'
import Assets from '@flex-development/kustomzcore/services/AssetService'
import type { VercelResponse as Res } from '@vercel/node'
import type { GetImageAssetReq as Req } from '../../lib/types'
import trackAPISuccessEvent from '../middleware/trackAPISuccessEvent'

/**
 * @file Implementation - AssetsController
 * @module lib/controllers/AssetsController
 */

/**
 * Handles all API requests to the `/assets/*` endpoints and interactions with
 * the {@link AssetService}.
 *
 * @class
 */
class AssetsController {
  /**
   * Retrieve an image asset by filename.
   *
   * @async
   * @param {Req} req - API request object
   * @param {GetImageAssetQuery} req.query - Query parameters object
   * @param {string} req.query.filename - Filename of image to retrieve
   * @param {NumberString} [req.query.height] - Resized image height
   * @param {NumberString} [req.query.width] - Resized image width
   * @param {Res} res - Server response object
   * @return {Promise<void>} Empty promise if request completed successfully
   */
  static async getImage(req: Req, res: Res): Promise<void> {
    // Get asset filename and resize dimensions
    const { filename, height, width } = req.query

    // Attempt to get image from directory
    let image = Assets.image(filename)

    // Resize image
    image = await Assets.resizeImage(image, height, width)

    // Send success `event` hit to Google Analytics
    // ! `res.end` is called, so we can't rely on `routeWrapper` for this event
    await trackAPISuccessEvent(req)

    res.writeHead(200, { 'Content-Type': `image/${Assets.ext(filename)}` })
    return res.end(image)
  }
}

export default AssetsController
