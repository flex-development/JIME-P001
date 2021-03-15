import type { AnyObject } from '@flex-development/json'
import ga, {
  GA_CATEGORIES
} from '@flex-development/kustomzcore/config/google-analytics'
import vercel from '@flex-development/kustomzcore/config/vercel-env'
import type { Method } from 'axios'
import type { EventParam } from 'ga-measurement-protocol'
import type { APIRequest } from '../types'

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
    eventAction: (() => {
      switch (status) {
        case 201:
          return 'Created'
        case 202:
          return 'Accepted'
        case 203:
          return 'NonAuthoritativeInformation'
        case 204:
          return 'NoContent'
        case 205:
          return 'ResetContent'
        case 206:
          return 'PartialContent'
        case 207:
          return 'MultiStatus'
        case 208:
          return 'AlreadyReported'
        case 226:
          return 'ImUsed'
        default:
          return 'OK'
      }
    })(),
    eventCategory: GA_CATEGORIES.responses.success,
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
