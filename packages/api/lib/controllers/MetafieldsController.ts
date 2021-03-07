import type { VercelResponse as Res } from '@vercel/node'
import MetafieldService from '../services/MetafieldService'
import type { GetGlobalMetafieldsReq as Req } from '../types'

/**
 * @file Implementation - MetafieldsController
 * @module lib/services/MetafieldsController
 */

class MetafieldsController {
  /**
   * Returns an object with shop-level metafields.
   * All metafields will be from the `globals` namespace.
   *
   * @async
   * @param {Req} req - API request object
   * @param {Req['query']} [req.query] - Query parameters object
   * @param {Res} res - API response object
   * @return {Promise<Res | void>} Promise containing server response object if
   * an error is thrown, or empty promise if request completed successfully
   */
  static async getGlobalMetafields(req: Req, res: Res): Promise<void> {
    res.json(await MetafieldService.globals(req.query))
  }
}

export default MetafieldsController
