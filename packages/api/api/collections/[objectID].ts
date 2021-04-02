import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import CollectionService from '../../lib/services/CollectionService'
import type { CollectionReq } from '../../lib/types'

/**
 * @file API Endpoint - Get Collection By Handle
 * @module api/collections/[objectID]
 */

/**
 * Retrieve a collection listing resource by handle.
 *
 * @async
 * @param {CollectionReq.Get} req - API request object
 * @param {APIQuery.Collection.Get} req.query - Query parameters
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - Handle of collection listing to retrieve
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: CollectionReq.Get, res: Res): Promise<void> => {
  res.json(await new CollectionService().findOne(req.query))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {CollectionReq.Get} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: CollectionReq.Get, res: Res): Promise<void> => {
  return routeWrapper<CollectionReq.Get, Res>(req, res, next)
}
