import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import ProductService from '../../lib/services/ProductService'
import type { ProductReq } from '../../lib/types'

/**
 * @file API Endpoint - Get Product By Handle
 * @module api/products/[objectID]
 */

/**
 * Retrieve a product listing resource by handle.
 *
 * @async
 * @param {ProductReq.Get} req - API request object
 * @param {APIQuery.Product.Get} req.query - Query parameters
 * @param {string} [req.query.fields] - List of fields to include
 * @param {string} req.query.objectID - Handle of product listing to retrieve
 * @param {string} [req.query.sku] - SKU of variant to generate SEO for
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: ProductReq.Get, res: Res): Promise<void> => {
  res.json(await new ProductService().findOne(req.query))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {ProductReq.Get} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: ProductReq.Get, res: Res): Promise<void> => {
  return routeWrapper<ProductReq.Get, Res>(req, res, next)
}
