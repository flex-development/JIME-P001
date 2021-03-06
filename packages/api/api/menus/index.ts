import type { VercelResponse as Res } from '@vercel/node'
import {
  handleAPIError,
  initRoute,
  trackAPIRequest,
  trackAPISuccessEvent
} from '../../lib/middleware'
import Service from '../../lib/services/MenuService'
import type { FindMenusReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Find Menus
 * @module api/menus
 */

/**
 * Returns an array of menu objects.
 *
 * @param req - API request object
 * @param req.query - Request query parameters
 * @param req.query.fields - Specify fields to include for each object
 * @param req.query.handle - Find menu by handle
 * @param req.query.hitsPerPage - Number of hits per page
 * @param req.query.length - Number of hits to retrieve (used only with offset)
 * @param req.query.offset - Specify the offset of the first hit to return
 * @param req.query.page - Specify the page to retrieve
 * @param req.query.text - Search query text
 * @param req.query.title - Filter results by menu title
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  // Initialize API route
  initRoute(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  // Convert query into search options object
  const options = Service.searchOptions(req.query)

  try {
    res.json(await Service.find(req.query.text, options))
  } catch (err) {
    return handleAPIError(req, res, err)
  }

  // Send success `event` hit to Google Analytics
  await trackAPISuccessEvent(req)
  return res.end()
}
