import type { GetGlobalMetafieldsQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import Service from '../services/MetafieldService'
import type { GetGlobalMetafieldsReq as Req } from '../types'

/**
 * @file Implementation - MetafieldsController
 * @module services/MetafieldsController
 */

/**
 * Handles all API requests to the '/metafields/*` endpoints.
 *
 * @class
 */
class MetafieldsController {
  /**
   * Returns an object with shop-level metafields.
   * All metafields will be from the `globals` namespace.
   *
   * @async
   * @param {Req} req - API request object
   * @param {GetGlobalMetafieldsQuery} [req.query] - Query parameters object
   * @param {Res} res - Server response object
   * @return {Promise<Res | void>} Promise containing server response object if
   * an error is thrown, or empty promise if request completed successfully
   */
  static async getGlobalMetafields(req: Req, res: Res): Promise<void> {
    res.json(await Service.globals(req.query))
  }
}

export default MetafieldsController
