import type { GetProductQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import ProductsController from '../../lib/controllers/ProductsController'
import routeWrapper from '../../lib/middleware/routeWrapper'
import type { GetProductReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Product By Handle
 * @module api/products/[objectID]
 */

/**
 * Retrieve a product listing resource by handle.
 *
 * @async
 * @param {Req} req - API request object
 * @param {GetProductQuery} req.query - Query parameters object
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - Handle of product listing to retrieve
 * @param {string} [req.query.sku] - SKU of variant to generate SEO for
 * @param {Res} res - Server response object
 * @return {Promise<Res | void>} Promise containing server response object if an
 * error is thrown, or empty promise if request completed successfully
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, async (req, res) => {
    return new ProductsController().findOne(req, res)
  })
}
