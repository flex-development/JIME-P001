import { objectFromArray } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import {
  handleAPIError,
  initPathLogger,
  trackAPIEvent,
  trackAPIRequest
} from '../../lib/middleware'
import type { GetGlobalMetafieldsReq as Req } from '../../lib/types'
import { metafieldsShop } from '../../lib/utils'

/**
 * @file API Endpoint - Get Global Metafields
 * @module api/metafields/globals
 */

export default async (req: Req, res: Res): Promise<Res | void> => {
  // Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  try {
    const globals = await metafieldsShop({ ...req.query, namespace: 'globals' })
    res.json(objectFromArray(globals || [], 'key'))
  } catch (err) {
    return handleAPIError(req, res, err, { query: req.query })
  }

  // Send success `event` hit to Google Analytics
  await trackAPIEvent(req, '/metafields/globals')
  return res.end()
}
