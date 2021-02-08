import { objectFromArray } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import { handleAPIError, initPathLogger } from '../../lib/middleware'
import type { GetGlobalMetafieldsReq as Req } from '../../lib/types'
import { metafieldsShop } from '../../lib/utils'

/**
 * @file API Endpoint - Get Global Metafields
 * @module api/metafields/globals
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  try {
    const globals = await metafieldsShop({ ...req.query, namespace: 'globals' })
    return res.json(objectFromArray(globals || [], 'key'))
  } catch (err) {
    return handleAPIError(req, res, err, { query: req.query })
  }
}
