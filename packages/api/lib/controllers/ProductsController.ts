import type {
  GetProductQuery as GetQuery,
  OrNever
} from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import Service from '../services/ProductService'
import type {
  FindProductsReq as FindReq,
  GetProductReq as GetReq
} from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - ProductService
 * @module lib/controllers/ProductsController
 */

/**
 * Handles all API requests to the '/products/*` endpoints.
 *
 * @class
 * @extends SearchIndexController
 */
class ProductsController extends SearchIndexController<FindReq | GetReq> {
  /**
   * Initializes a new `ProductsController` instance.
   */
  constructor() {
    super(new Service())
  }

  /**
   * Retrieve a product listing from the search index.
   *
   * @async
   * @param {GetReq} req - API request object
   * @param {GetQuery} req.query - Query parameters object
   * @param {string} [req.query.fields] - List of fields to include
   * @param {string} req.query.objectID - Handle of product listing to retrieve
   * @param {string} [req.query.sku] - SKU of variant to generate SEO for
   * @param {Res} res - Server response object
   * @return {Promise<void>} Empty promise if request completed successfully
   */
  async findOne(req: GetReq, res: Res): OrNever<Promise<void>> {
    const { fields, objectID, sku } = req.query

    const $objectID = `${objectID}${sku ? `.${sku}` : ''}`

    res.json(await this.service.get($objectID, fields))
  }
}

export default ProductsController
