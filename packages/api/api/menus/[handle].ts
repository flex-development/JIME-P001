import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import {
  handleAPIError,
  initRoute,
  trackAPIRequest,
  trackAPISuccessEvent
} from '../../lib/middleware'
import Service from '../../lib/services/MenuService'
import type { GetMenuReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Menu By Handle
 * @module api/menus/[handle]
 */

/**
 * Retrieve a menu resource by handle.
 *
 * @param req - API request object
 * @param req.query - Request query parameters
 * @param req.query.fields - Specify fields to include
 * @param req.query.handle - Handle of menu to retrieve
 * @param res - API response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  // Initialize API route
  initRoute(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  // Get request query parameters
  const query = pick(req.query, ['fields', 'handle'])

  try {
    res.json(await Service.get(query.handle, query.fields))
  } catch (err) {
    return handleAPIError(req, res, err)
  }

  // Send success `event` hit to Google Analytics
  await trackAPISuccessEvent(req)
  return res.end()
}
