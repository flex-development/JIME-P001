import type { VercelResponse as Res } from '@vercel/node'
import {
  handleAPIError,
  initRoute,
  trackAPIRequest,
  trackAPISuccessEvent
} from '../../lib/middleware'
import CollectionService from '../../lib/services/CollectionService'
import type { GetCollectionReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Collection By Handle
 * @module api/collections/[handle]
 */

// Initialize API service
const Service = new CollectionService()

/**
 * Retrieve a collection listing resource by handle.
 *
 * @param {Req} req - API request object
 * @param {Req['query']} req.query - Query parameters object
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} [req.query.handle] - Find resource by Shopify resource handle
 * @param {Res} res - API response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  // Initialize API route
  initRoute(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  try {
    res.json(await Service.get(req.query.handle, req.query.fields))
  } catch (err) {
    return handleAPIError(req, res, err)
  }

  // Send success `event` hit to Google Analytics
  await trackAPISuccessEvent(req)
  return res.end()
}
