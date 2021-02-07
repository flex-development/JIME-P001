import { axios, createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import { API_URL } from '../../lib/config'
import { initPathLogger } from '../../lib/middleware'
import type {
  GetCollectionReq as Req,
  GetCollectionResJSON
} from '../../lib/types'

/**
 * @file API Endpoint - Get Collection By Handle
 * @module api/collections/[handle]
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Get request query parameters
  const params = pick(req.query, ['fields', 'handle'])

  try {
    const collections = await axios<GetCollectionResJSON[]>({
      params,
      url: `${API_URL}/collections`
    })

    if (!collections.length) {
      const data = { errors: { handle: params.handle }, query: params }
      const message = `Collection with handle "${params.handle}" not found`
      const error = createError(message, data, 404)

      req.logger.error({ error })
      return res.status(error.code).json(error)
    }

    return res.json(collections[0])
  } catch (error) {
    req.logger.error({ error })
    return res.status(error.code).json(error)
  }
}
