import type { VercelResponse as Res } from '@vercel/node'
import { docs } from '../lib/config'
import {
  handleAPIError,
  initRoute,
  trackAPIRequest,
  trackAPISuccessEvent
} from '../lib/middleware'
import type { APIRequest as Req } from '../lib/types'

/**
 * @file Handler - API Root
 * @module api
 */

/**
 * Returns the API documentation as a JSON object.
 * Documentation follows OpenAPI Specification v3.0.0 standards.
 *
 * @param req - Incoming request object
 * @param res - Server response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  // Initialize API route
  initRoute(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  try {
    // Return documentation JSON
    res.json(docs)
  } catch (err) {
    return handleAPIError(req, res, err)
  }

  // Send success `event` hit to Google Analytics
  await trackAPISuccessEvent(req)
  return res.end()
}
