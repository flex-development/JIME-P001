import type { VercelResponse as Res } from '@vercel/node'
import SearchIndexController from '../../lib/controllers/SearchIndexController'
import routeWrapper from '../../lib/middleware/routeWrapper'
import Service from '../../lib/services/MenuService'
import type { FindMenusReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Find Menus
 * @module api/menus
 */

/**
 * Returns an array of menu objects.
 *
 * @param {Req} req - API request object
 * @param {Req['query']} req.query - Query parameters object
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} [req.query.handle] - Find resource by Shopify handle
 * @param {number} [req.query.hitsPerPage] - Number of results per page
 * @param {number} [req.query.length] - Result limit (used only with offset)
 * @param {string} [req.query.objectID] - Find resource by index object ID
 * @param {number} [req.query.offset] - Offset of the first result to return
 * @param {number} [req.query.page] - Specify the page to retrieve
 * @param {string} [req.query.text] - Text to search in index
 * @param {Res} res - API response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req: Req, res: Res) => {
    return SearchIndexController.find<Req, Res>(req, res, new Service())
  })
}
