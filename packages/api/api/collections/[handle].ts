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
 * @async
 * @param {Req} req - API request object
 * @param {Req['query']} req.query - Query parameters object
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} [req.query.handle] - Handle of collection listing to retrieve
 * @param {Res} res - API response object
 * @return {Promise<Res | void>} Promise containing server response object if an
 * error is thrown, or empty promise if request completed successfully
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
