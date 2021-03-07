import type { OrNever } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import ProductService from '../services/ProductService'
import type {
  FindProductsReq as FindReq,
  GetProductReq as GetReq
} from '../types'
import SearchIndexController from './SearchIndexController'

/**
 * @file Implementation - Controller - ProductService
 * @module lib/controllers/ProductsController
 */

class ProductsController extends SearchIndexController<FindReq | GetReq> {
  /**
   * Initializes a new `ProductsController` instance.
   */
  constructor() {
    super(new ProductService())
  }

  /**
   * Retrieve a product listing from the search index.
   *
   * @async
   * @param {GetReq} req - API request object
   * @param {GetReq['query']} req.query - Query parameters object
   * @param {string} [req.query.fields] - List of fields to include
   * @param {string} req.query.objectID - Handle of product listing to retrieve
   * @param {string} [req.query.sku] - SKU of variant to generate SEO for
   * @param {Res} res - API response object
   * @return {Promise<void>} Empty promise if request completed successfully
   */
  async findOne(req: GetReq, res: Res): OrNever<Promise<void>> {
    const { fields, objectID, sku } = req.query

    const $objectID = `${objectID}${sku ? `.${sku}` : ''}`

    res.json(await this.service.get($objectID, fields))
  }
}

export default ProductsController
