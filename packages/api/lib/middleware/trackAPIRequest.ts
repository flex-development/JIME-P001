import type { PageViewParam } from 'ga-measurement-protocol'
import URI from 'urijs'
import ga from '../config/google-analytics'
import vercel from '../config/vercel-env'
import type { APIRequest } from '../types'

/**
 * @file Implementation - trackAPIRequest
 * @module lib/middleware/trackAPIRequest
 */

/**
 * Sends a `pageview` hit to Google Analytics.
 *
 * @param req - API request object
 * @param req.headers - API request headers
 * @param req.url - API request URL
 */
const trackAPIRequest = async (req: APIRequest): Promise<boolean> => {
  // Build initial `pageview` params object
  const param: PageViewParam = {
    dl: req.url,
    documentHost: req.headers.host || 'unknown',
    documentPath: URI.parse(req.url).path as string,
    ds: 'api',
    ua: req.headers['user-agent'] as string
  }

  // Send `pageview` hit to Google Analytics
  return await ga.pageview({ ...param, ...vercel })
}

export default trackAPIRequest
