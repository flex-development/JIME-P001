import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import PageService from '../../lib/services/PageService'
import type { PageReq } from '../../lib/types'

/**
 * @file API Endpoint - Get Page By Handle
 * @module api/pages/[objectID]
 */

/**
 * Retrieve a page resource by handle.
 *
 * @async
 * @param {PageReq.Get} req - API request object
 * @param {APIQuery.Page.Get} req.query - Query parameters
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - Handle of page to retrieve
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: PageReq.Get, res: Res): Promise<void> => {
  res.json(await new PageService().findOne(req.query))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {PageReq.Get} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: PageReq.Get, res: Res): Promise<void> => {
  return routeWrapper<PageReq.Get, Res>(req, res, next)
}
