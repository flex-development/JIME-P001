import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import { initPathLogger } from '../../lib/middleware'
import Service from '../../lib/services/ProductService'
import type { GetProductReq as Req } from '../../lib/types'
import { formatError } from '../../lib/utils'

/**
 * @file API Endpoint - Get Product By Handle
 * @module api/products/[handle]
 */

/**
 * Retrieve a product listing resource by handle.
 *
 * @param req - API request
 * @param req.query - Request query parameters
 * @param req.query.fields - Specify fields to include for each object
 * @param req.query.handle - Handle of product to retrieve
 * @param req.query.sku - SKU of product variant to generate SEO for
 * @param res - API response object
 */
export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Get request query parameters
  const query = pick(req.query, ['fields', 'handle', 'sku'])

  try {
    return res.json(await Service.get(query.handle, query.fields, query.sku))
  } catch (err) {
    const error = formatError(err, { query })

    req.logger.error({ error })
    return res.status(error.code).json(error)
  }
}
