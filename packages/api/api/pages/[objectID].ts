import type { GetSearchIndexResourceQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import PagesController from '../../lib/controllers/PagesController'
import routeWrapper from '../../lib/middleware/routeWrapper'
import type { GetPageReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Page By Handle
 * @module api/pages/[objectID]
 */

/**
 * Retrieve a page resource by handle.
 *
 * @async
 * @param {Req} req - API request object
 * @param {GetSearchIndexResourceQuery} req.query - Query parameters object
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - Handle of page to retrieve
 * @param {Res} res - Server response object
 * @return {Promise<Res | void>} Promise containing server response object if an
 * error is thrown, or empty promise if request completed successfully
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req, res) => {
    return new PagesController().findOne(req, res)
  })
}
