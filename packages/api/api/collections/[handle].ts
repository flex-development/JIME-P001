import {
  axios,
  createError,
  ICollectionListing
} from '@flex-development/kustomzcore'
import { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import pick from 'lodash/pick'
import { API_URL } from '../../lib/config'
import type { GetCollectionReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Collection By Handle
 * @module api/collections/[handle]
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  // Get request params
  const params = pick(query, ['fields', 'handle'])

  try {
    // Search collection listings
    const collections = await axios<ICollectionListing[]>({
      params,
      url: `${API_URL}/collections`
    })

    if (!collections.length) {
      const data = { errors: { handle: query.handle }, query: params }
      const message = `Collection with handle "${query.handle}" not found`
      const error = createError(message, data, 404)

      debug('api/collections/[handle]')(error)
      return res.status(error.code).json(error)
    }

    return res.json(collections[0])
  } catch (error) {
    debug('api/collections/[handle]')(error)
    return res.status(error.code).json(error)
  }
}
