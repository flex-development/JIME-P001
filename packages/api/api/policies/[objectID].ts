import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import PolicyService from '../../lib/services/PolicyService'
import type { PolicyReq } from '../../lib/types'

/**
 * @file API Endpoint - Get Policy By Handle
 * @module api/policies/[objectID]
 */

/**
 * Retrieve a policy resource by handle.
 *
 * @async
 * @param {PolicyReq.Get} req - API request object
 * @param {APIQuery.Policy.Get} req.query - Query parameters
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - Handle of policy to retrieve
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: PolicyReq.Get, res: Res): Promise<void> => {
  res.json(await new PolicyService().findOne(req.query))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {PolicyReq.Get} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: PolicyReq.Get, res: Res): Promise<void> => {
  return routeWrapper<PolicyReq.Get, Res>(req, res, next)
}
