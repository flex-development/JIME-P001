import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import CustomerService from '../../lib/services/CustomerService'
import type { CustomerReq } from '../../lib/types'

/**
 * @file API Endpoint - Get Customer By ID
 * @module api/customers/[objectID]
 */

/**
 * Retrieve a customer by ID.
 *
 * @async
 * @param {CustomerReq.Get} req - API request object
 * @param {APIQuery.Customer.Get} req.query - Query parameters
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - ID of customer to retrieve
 * @param {string} req.query.userToken - Shopify API key
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: CustomerReq.Get, res: Res): Promise<void> => {
  res.json(await new CustomerService().findOne(req.query))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {CustomerReq.Get} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: CustomerReq.Get, res: Res): Promise<void> => {
  return routeWrapper<CustomerReq.Get, Res>(req, res, next)
}
