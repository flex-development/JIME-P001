import type { AnyObject } from '@flex-development/json'
import { STATUS_CODES as CODES } from '@flex-development/kustomzcore/config'
import ga from '@flex-development/kustomzcore/config/google-analytics'
import vercel from '@flex-development/kustomzcore/config/vercel-env'
import type { Method } from 'axios'
import type { EventParam } from 'ga-measurement-protocol'
import type { APIRequest } from '../../types'

/**
 * @file Implementation - trackAPISuccessEvent
 * @module lib/middleware/trackAPISuccessEvent
 */

/**
 * Sends a `event` hit to Google Analytics.
 *
 * Responses will be tracked under the "Success Response" category, and labeled
 * with the request method and path.
 *
 * @template Req - API request object
 *
 * @param {Req} req - API request object
 * @param {Method} req.method - HTTP request method
 * @param {string} req.path - Path segement of request URL
 * @param {AnyObject} req.query - Query parameters
 * @param {number} [status]  - HTTP response status code. Defaults to `200`
 * @return {Promise<boolean>} Promise contaning `true` if event was tracked
 * successfully, `false` otherwise
 */
async function trackAPISuccessEvent<Req extends APIRequest = APIRequest>(
  req: Req,
  status: number = 200
): Promise<boolean> {
  // Build `event` params object
  const param: EventParam = {
    eventAction: `${status}`[0] === '2' ? CODES[status] : CODES[200],
    eventCategory: ga.categories.responses.success,
    eventLabel: `${req.method.toUpperCase()} ${req.path}`,
    eventValue: status,
    method: req.method.toUpperCase(),
    path: req.path,
    query: JSON.stringify(req.query)
  }

  // Send `event` hit to Google Analytics
  return await ga.event({ ...param, ...vercel })
}

export default trackAPISuccessEvent
