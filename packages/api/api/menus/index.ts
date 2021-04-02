import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import MenuService from '../../lib/services/MenuService'
import type { MenuReq } from '../../lib/types'

/**
 * @file API Endpoint - Find Menus
 * @module api/menus
 */

/**
 * Returns an array of menu objects.
 *
 * @param {MenuReq.Find} req - API request object
 * @param {APIQuery.Menu.Find} [req.query] - Query parameters
 * @param {string} [req.query.fields] - List of fields to include
 * @param {number} [req.query.hitsPerPage] - Number of results per page
 * @param {number} [req.query.length] - Result limit (used only with offset)
 * @param {number} [req.query.limit] - Number of hits to retrieve
 * @param {string} [req.query.objectID] - Find menu by handle
 * @param {number} [req.query.offset] - Offset of the first result to return
 * @param {number} [req.query.page] - Specify the page to retrieve
 * @param {string} [req.query.text] - Text to search in index
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: MenuReq.Find, res: Res): Promise<void> => {
  res.json(await new MenuService().find(req.query))
  return
}

/**
 * Route handler.
 *
 * @param {MenuReq.Find} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: MenuReq.Find, res: Res): Promise<void> => {
  return routeWrapper<MenuReq.Find, Res>(req, res, next)
}
