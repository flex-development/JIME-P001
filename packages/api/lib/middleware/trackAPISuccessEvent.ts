import type { EventParam } from 'ga-measurement-protocol'
import ga from '../config/google-analytics'
import vercel from '../config/vercel-env'
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
 * @param req - API request object
 * @param status [200] - HTTP response status code
 */
const trackAPISuccessEvent = async (
  req: APIRequest,
  status = 200
): Promise<boolean> => {
  // Build `event` params object
  const param = {
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
    eventCategory: 'Success Response',
    eventLabel: `${req.method.toUpperCase()} ${req.path}`,
    eventValue: status,
    method: req.method.toUpperCase(),
    path: req.path,
    query: JSON.stringify(req.query)
  }

  // Send `event` hit to Google Analytics
  return await ga.event({ ...param, ...vercel } as EventParam)
}

export default trackAPISuccessEvent
