import type { GetGlobalMetafieldsQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import MetafieldsController from '../../lib/controllers/MetafieldsController'
import routeWrapper from '../../lib/middleware/routeWrapper'
import type { GetGlobalMetafieldsReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Global Metafields
 * @module api/metafields/globals
 */

/**
 * Returns an object with shop-level metafields.
 * All metafields will be from the `globals` namespace.
 *
 * @async
 * @param {Req} req - API request object
 * @param {GetGlobalMetafieldsQuery} [req.query] - Query parameters object
 * @param {Res} res - Server response object
 * @return {Promise<Res | void>} Promise containing server response object if an
 * error is thrown, or empty promise if request completed successfully
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req, res) => {
    return MetafieldsController.getGlobalMetafields(req, res)
  })
}
