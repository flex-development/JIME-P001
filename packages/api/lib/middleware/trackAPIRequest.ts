import ga from '@flex-development/kustomzcore/config/google-analytics'
import vercel from '@flex-development/kustomzcore/config/vercel-env'
import type { PageViewParam } from 'ga-measurement-protocol'
import type { IncomingHttpHeaders } from 'http'
import type { APIRequest } from '../types'

/**
 * @file Implementation - trackAPIRequest
 * @module lib/middleware/trackAPIRequest
 */

/**
 * Sends a `pageview` hit to Google Analytics.
 *
 * @template Req - API request object
 *
 * @param {Req} req - API request object
 * @param {IncomingHttpHeaders} req.headers - API request headers
 * @param {string} req.url - API request URL
 * @return {Promise<boolean>} Promise contaning `true` if event was tracked
 * successfully, `false` otherwise
 */
async function trackAPIRequest<Req extends APIRequest = APIRequest>(
  req: Req
): Promise<boolean> {
  const { headers, url } = req

  // Build initial `pageview` params object
  const param: PageViewParam = {
    dl: url,
    documentHost: headers.host || 'unknown',
    documentPath: req.path,
    ds: 'api',
    ua: headers['user-agent'] as string
  }

  // Send `pageview` hit to Google Analytics
  return await ga.pageview({ ...param, ...vercel })
}

export default trackAPIRequest
