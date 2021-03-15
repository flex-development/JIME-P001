import type { GetSearchIndexResourceQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import PoliciesController from '../../lib/controllers/PoliciesController'
import routeWrapper from '../../lib/middleware/routeWrapper'
import type { GetPolicyReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Policy By Handle
 * @module api/policies/[objectID]
 */

/**
 * Retrieve a policy resource by handle.
 *
 * @async
 * @param {Req} req - API request object
 * @param {GetSearchIndexResourceQuery} req.query - Query parameters object
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - Handle of policy to retrieve
 * @param {Res} res - Server response object
 * @return {Promise<Res | void>} Promise containing server response object if an
 * error is thrown, or empty promise if request completed successfully
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req, res) => {
    return new PoliciesController().findOne(req, res)
  })
}
