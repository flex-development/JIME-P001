import type { APIQuery } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import routeWrapper from '../../lib/middleware/routeWrapper'
import ProductService from '../../lib/services/ProductService'
import type { ProductReq } from '../../lib/types'

/**
 * @file API Endpoint - Find Products
 * @module api/products
 */

/**
 * Returns an array of product listing resource objects.
 *
 * @async
 * @param {ProductReq.Find} req - API request object
 * @param {APIQuery.Product.Find} [req.query] - Query parameters
 * @param {string} [req.query.fields] - List of fields to include
 * @param {number} [req.query.hitsPerPage] - Number of results per page
 * @param {number} [req.query.length] - Result limit (used only with offset)
 * @param {number} [req.query.limit] - Number of hits to retrieve
 * @param {string} [req.query.objectID] - Find product listing by handle
 * @param {number} [req.query.offset] - Offset of the first result to return
 * @param {number} [req.query.page] - Specify the page to retrieve
 * @param {string} [req.query.product_id] - Find product listing by ID
 * @param {string} [req.query.text] - Text to search in index
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
const next = async (req: ProductReq.Find, res: Res): Promise<void> => {
  res.json(await new ProductService().find(req.query))
  return
}

/**
 * Route handler.
 *
 * @async
 * @param {ProductReq.Find} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<void>} Empty promise
 */
export default async (req: ProductReq.Find, res: Res): Promise<void> => {
  return routeWrapper<ProductReq.Find, Res>(req, res, next)
}
