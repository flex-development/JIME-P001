import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import MenuService from '../../lib/services/MenuService'
import type { MenuReq } from '../../lib/types'

/**
 * @file API Endpoint - Get Menu By Handle
 * @module api/menus/[objectID]
 */

/**
 * Retrieve a menu resource by handle.
 *
 * @async
 * @param {MenuReq.Get} req - API request object
 * @param {APIQuery.Menu.Get} req.query - Query parameters
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - Handle of menu to retrieve
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: MenuReq.Get, res: Res): Promise<void> => {
  res.json(await new MenuService().findOne(req.query))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {MenuReq.Get} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: MenuReq.Get, res: Res): Promise<void> => {
  return routeWrapper<MenuReq.Get, Res>(req, res, next)
}
