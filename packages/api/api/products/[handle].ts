import type { IProductListing } from '@flex-development/kustomzcore'
import { axios, createError } from '@flex-development/kustomzcore'
import { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import pick from 'lodash/pick'
import { API_URL } from '../../lib/config'
import type { GetProductReq as Req, ResourceWithSEO } from '../../lib/types'

/**
 * @file API Endpoint - Get Product By Handle
 * @module api/products/[handle]
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  const params = pick(query, ['fields', 'handle', 'sku'])

  try {
    const products = await axios<ResourceWithSEO<IProductListing>[]>({
      params,
      url: `${API_URL}/products`
    })

    if (!products.length) {
      const data = { errors: { handle: query.handle }, query: params }
      const message = `Product with handle "${query.handle}" not found`
      const error = createError(message, data, 404)

      debug('api/products/[handle]')(error)
      return res.status(error.code).json(error)
    }

    return res.json(products[0])
  } catch (error) {
    debug('api/products/[handle]')(error)
    return res.status(error.code).json(error)
  }
}
