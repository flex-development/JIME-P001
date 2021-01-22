import { createError, objectFromArray } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import type { GetGlobalMetafieldsReq as Req } from '../../lib/types'
import { shopMetafields } from '../../lib/utils'

/**
 * @file API Endpoint - Get Global Metafields
 * @module api/metafields/globals
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  try {
    const globals = await shopMetafields({ ...query, namespace: 'globals' })
    return res.json(objectFromArray(globals || [], 'key'))
  } catch (err) {
    const error = createError(err, { query })

    debug('api/metafields/globals')(error)
    return res.status(error.code).json(error)
  }
}
