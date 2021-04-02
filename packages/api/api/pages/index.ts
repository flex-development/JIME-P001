import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import PageService from '../../lib/services/PageService'
import type { PageReq } from '../../lib/types'

/**
 * @file API Endpoint - Find Pages
 * @module api/pages
 */

/**
 * Returns an array of page resource objects.
 *
 * @async
 * @param {PageReq.Find} req - API request object
 * @param {APIQuery.Page.Find} [req.query] - Query parameters
 * @param {string} [req.query.author] - Filter pages by author
 * @param {string} [req.query.fields] - List of fields to include
 * @param {number} [req.query.hitsPerPage] - Number of results per page
 * @param {number} [req.query.id] - Find page by ID
 * @param {number} [req.query.length] - Result limit (used only with offset)
 * @param {number} [req.query.limit] - Number of hits to retrieve
 * @param {string} [req.query.objectID] - Find page by handle
 * @param {number} [req.query.offset] - Offset of the first result to return
 * @param {number} [req.query.page] - Specify the page to retrieve
 * @param {string} [req.query.text] - Text to search in index
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async ({ query, url }: PageReq.Find, res: Res): Promise<void> => {
  // Initialize API service
  const Service = new PageService()

  // Default service method
  let smethod = 'find'

  // ! Interpreted as URL `/pages` instead of `/pages/[objectID]`
  if (url.includes('/index')) {
    query.objectID = 'index'
    smethod = 'findOne'
  }

  res.json(await Service[smethod](query))

  return
}

/**
 * Route handler.
 *
 * @async
 * @param {PageReq.Find} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: PageReq.Find, res: Res): Promise<void> => {
  return routeWrapper<PageReq.Find, Res>(req, res, next)
}
