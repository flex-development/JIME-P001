import { objectFromArray } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import { initPathLogger } from '../../lib/middleware'
import type { GetGlobalMetafieldsReq as Req } from '../../lib/types'
import { formatError, metafieldsShop } from '../../lib/utils'

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
    const error = formatError(err, { query: req.query })

    req.logger.error({ error })
    return res.status(error.code).json(error)
  }
}
