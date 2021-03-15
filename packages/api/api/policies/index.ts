import type { FindSearchIndexResourceQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import PoliciesController from '../../lib/controllers/PoliciesController'
import routeWrapper from '../../lib/middleware/routeWrapper'
import type { FindPoliciesReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Find Policies
 * @module api/policies
 */

/**
 * Returns an array of policy resource objects.
 *
 * @async
 * @param {Req} req - API request object
 * @param {FindSearchIndexResourceQuery} [req.query] - Query parameters object
 * @param {string} [req.query.fields] - List of fields to include
 * @param {number} [req.query.hitsPerPage] - Number of results per page
 * @param {number} [req.query.length] - Result limit (used only with offset)
 * @param {string} [req.query.objectID] - Find policy by handle
 * @param {number} [req.query.offset] - Offset of the first result to return
 * @param {number} [req.query.page] - Specify the page to retrieve
 * @param {string} [req.query.text] - Text to search in index
 * @param {Res} res - Server response object
 * @return {Promise<Res | void>} Promise containing server response object if an
 * error is thrown, or empty promise if request completed successfully
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req, res) => {
    return new PoliciesController().find(req, res)
  })
}
