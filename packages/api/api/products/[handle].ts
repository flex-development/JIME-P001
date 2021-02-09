import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import {
  handleAPIError,
  initPathLogger,
  trackAPIRequest,
  trackAPISuccessEvent
} from '../../lib/middleware'
import Service from '../../lib/services/ProductService'
import type { GetProductReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Product By Handle
 * @module api/products/[handle]
 */

/**
 * Retrieve a product listing resource by handle.
 *
 * @param req - API request object
 * @param req.query - Request query parameters
 * @param req.query.fields - Specify fields to include for each object
 * @param req.query.handle - Handle of product to retrieve
 * @param req.query.sku - SKU of product variant to generate SEO for
 * @param res - API response object
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  // Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  // Get request query parameters
  const query = pick(req.query, ['fields', 'handle', 'sku'])

  try {
    res.json(await Service.get(query.handle, query.fields, query.sku))
  } catch (err) {
    return handleAPIError(req, res, err, { query: req.query })
  }

  // Send success `event` hit to Google Analytics
  await trackAPISuccessEvent(req, '/products/[handle]')
  return res.end()
}
