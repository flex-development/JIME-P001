import type { EventParam } from 'ga-measurement-protocol'
import URI from 'urijs'
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
 * @param req - API request object
 * @param eventLabel - Event label
 */
const trackAPISuccessEvent = async (
  req: APIRequest,
  eventLabel: EventParam['eventLabel']
): Promise<boolean> => {
  // Get URI object
  const uri = new URI(req.url)

  // Build `event` params object
  const param = {
    eventAction: 'Success',
    eventCategory: uri.directory() || uri.path(),
    eventLabel,
    eventValue: new Date().valueOf(),
    method: req.method.toUpperCase(),
    path: uri.path()
  }

  // Send `event` hit to Google Analytics
  return await ga.event({ ...param, ...vercel } as EventParam)
}

export default trackAPISuccessEvent
