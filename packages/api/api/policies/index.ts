import type { VercelResponse as Res } from '@vercel/node'
import {
  handleAPIError,
  initPathLogger,
  trackAPIEvent,
  trackAPIRequest
} from '../../lib/middleware'
import Service from '../../lib/services/PolicyService'
import type { FindPoliciesReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Find Policies
 * @module api/policies
 */

export default async (req: Req, res: Res): Promise<Res | void> => {
  // Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  // Convert query into search options object
  const options = Service.searchOptions(req.query)

  try {
    res.json(await Service.find(req.query.text, options))
  } catch (err) {
    return handleAPIError(req, res, err, { query: req.query })
  }

  // Send success `event` hit to Google Analytics
  await trackAPIEvent(req, '/policies ')
  return res.end()
}
