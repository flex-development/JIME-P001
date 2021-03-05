import { objectFromArray } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import type { GetGlobalMetafieldsReq as Req } from '../../lib/types'
import { metafieldsShop } from '../../lib/utils'

/**
 * @file API Endpoint - Get Global Metafields
 * @module api/metafields/globals
 */

export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req: Req, res: Res) => {
    const globals = await metafieldsShop({ ...req.query, namespace: 'globals' })
    res.json(objectFromArray(globals || [], 'key'))
  })
}
