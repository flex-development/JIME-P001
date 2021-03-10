import type {
  GetImageAssetQuery,
  NumberString
} from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import Controller from '../../../lib/controllers/AssetsController'
import routeWrapper from '../../../lib/middleware/routeWrapper'
import type { GetImageAssetReq as Req } from '../../../lib/types'

/**
 * @file API Endpoint - Get Image Asset
 * @module api/assets/images/[filename]
 */

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
 * @return {Promise<Res | void>} Promise containing server response object if an
 * error is thrown, or empty promise if request completed successfully
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req, res) => {
    return Controller.getImage(req, res)
  })
}
