import type { ShopifyMenu } from '@flex-development/kustomzcore'
import { axios, createError } from '@flex-development/kustomzcore'
import { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import pick from 'lodash/pick'
import { API_URL } from '../../lib/config'
import type { GetMenuReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Menu By Handle
 * @module api/menus/[handle]
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  const params = pick(query, ['fields', 'handle'])

  try {
    const menus = await axios<ShopifyMenu[]>({
      params,
      url: `${API_URL}/menus`
    })

    if (!menus.length) {
      const data = { errors: { handle: query.handle }, query: params }
      const message = `Menu with handle "${query.handle}" not found`
      const error = createError(message, data, 404)

      debug('api/menus/[handle]')(error)
      return res.status(error.code).json(error)
    }

    return res.json(menus[0])
  } catch (error) {
    debug('api/menus/[handle]')(error)
    return res.status(error.code).json(error)
  }
}
