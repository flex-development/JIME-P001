import { createError, Logger } from '@app/subdomains/app/utils'
import { ICustomerService } from '@app/subdomains/customers/interfaces'
import { CustomerService } from '@app/subdomains/customers/services'
import { CreateReviewRequest, IReview } from '@flex-development/types'
import { pick } from 'lodash'
import { IProductService } from '../interfaces'
import { IReviewService } from '../interfaces/IReviewService'
import { ReviewRepository } from '../repositories'
import ProductService from './ProductService'

/**
 * @file Subdomain Services - Product Reviews
 * @module subdomains/sales/services/ReviewService
 */

export default class ReviewService
  extends ReviewRepository
  implements IReviewService {
  customers: ICustomerService
  products: IProductService

  /**
   * Creates a new Product Review service instance.
   *
   * @param database - Realtime Database service
   */
  constructor(database: IReviewService['database']) {
    super(database)

    this.customers = new CustomerService()
    this.products = new ProductService()
  }

  /**
   * Creates a new product review.
   *
   * To submit a review, {@param data.email} must be belong a previous customer.
   * Additionally, {@param data.product_id} and {@param data.product_sku} must
   * map to an existing product and product variant.
   *
   * @param data - Product review input data
   * @param data.body - Review body
   * @param data.email - Email of customer submitting review
   * @param data.product_id - ID of product being reviewed
   * @param data.product_sku - SKU of product variant being reviewed
   * @param data.rating - Product rating, a value 1 through 5
   * @param data.title - Title of review
   * @returns Product review resource
   * @throws {FeathersErrorJSON}
   */
  async create(data: CreateReviewRequest): Promise<IReview> {
    const { email, product_id, product_sku, ...rest } = data

    // Make sure customer exists
    const customer = await this.customers.getByEmail(email)

    // Make sure product exists
    const product = await this.products.get(product_id)

    // Get product variant
    const variant = product.variants.find(v => v.sku === product_sku)

    if (!variant) {
      const data = {
        errors: { product_sku },
        product: pick(product, ['product_id', 'variants'])
      }

      const message = `Variant with sku "${product_sku}" does not exist.`
      const error = createError(message, data, 404)

      Logger.error({ ReviewService: error })
      throw error
    }

    // Get variant image
    const variant_img = product.images.find(img => img.id === variant.image_id)

    // Get base products url
    const site_url = process.env.SITE_URL || 'http://localhost:3001'
    const products_base_url = `${site_url}/products`

    return await super.create({
      ...rest,
      customer_id: customer.id,
      product_handle: product.handle,
      product_id,
      product_image_url: variant_img?.src ?? '',
      product_sku,
      product_title: product.title,
      product_url: `${products_base_url}/${product.handle}?sku=${product_sku}`
    })
  }
}
