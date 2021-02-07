import type { IProductListing } from '@flex-development/kustomzcore'
import { axios, createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import { API_URL } from '../../lib/config'
import { initPathLogger } from '../../lib/middleware'
import type { GetProductReq as Req, ResourceWithSEO } from '../../lib/types'

/**
 * @file API Endpoint - Get Product By Handle
 * @module api/products/[handle]
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Get request query parameters
  const params = pick(req.query, ['fields', 'handle', 'sku'])

  try {
    const products = await axios<ResourceWithSEO<IProductListing>[]>({
      params,
      url: `${API_URL}/products`
    })

    if (!products.length) {
      const data = { errors: { handle: params.handle }, query: params }
      const message = `Product with handle "${params.handle}" not found`
      const error = createError(message, data, 404)

      req.logger.error({ error })
      return res.status(error.code).json(error)
    }

    return res.json(products[0])
  } catch (error) {
    req.logger.error({ error })
    return res.status(error.code).json(error)
  }
}
