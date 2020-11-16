import { axiosStamped } from '@app/config/axios'
import { QEData, Query } from '@app/subdomains/app/interfaces'
import { QueryExecutor } from '@app/subdomains/app/models'
import { createError, Logger } from '@app/subdomains/app/utils'
import { ICustomerService } from '@app/subdomains/customers/interfaces'
import { CustomerService } from '@app/subdomains/customers/services'
import {
  ProductResource,
  ProductReviewResource as ReviewResource
} from '@flex-development/kustomzdesign/types'
import { transformAndValidate } from 'class-transformer-validator'
import { pick } from 'lodash'
import qs from 'qs'
import { ProductService } from '.'
import { IProductService } from '../interfaces'
import {
  GetReviews,
  IProductReviewCreateRequest,
  IProductReviewService,
  ProductReviewQuery
} from '../interfaces/IProductReviewService'
import { ProductReviewCreateRequest } from '../models'

/**
 * @file Subdomain Services - Product Reviews
 * @module subdomains/sales/services/ProductReviewService
 * @see https://developers.stamped.io/#da27f990-cabd-4882-864a-7b8f9dd55832
 */

export default class ProductReviewService
  extends QueryExecutor<ReviewResource>
  implements IProductReviewService {
  api_key_private: string
  api_key_public: string
  customers: ICustomerService
  products: IProductService
  store_hash: string

  /**
   * Creates a new Product service instance.
   */
  constructor() {
    super()

    this.api_key_private = process.env.SHOPIFY_STAMPED_API_KEY_PRIVATE || ''
    this.api_key_public = process.env.SHOPIFY_STAMPED_API_KEY_PUBLIC || ''
    this.store_hash = process.env.SHOPIFY_STAMPED_STORE_HASH || ''

    this.customers = new CustomerService()
    this.products = new ProductService()
  }

  /**
   * Creates a new product review.
   *
   * @param data - Product review input data
   * @param data.email - Email of customer submitting review
   * @param data.productId - ID of product being reviewed
   * @param data.productSKU - SKU of product variant being reviewed
   * @param data.reviewMessage - Review body
   * @param data.reviewRating - Product rating, a value 1 through 5
   * @param data.reviewRecommendProduct - True if customer would recommend the
   * product / variant being reviewed
   * @param data.reviewSource - Source of review
   * @param data.reviewTitle - Title of review
   * @returns Product review resource
   * @throws {FeathersErrorJSON}
   */
  async create(data: IProductReviewCreateRequest): Promise<ReviewResource> {
    const { email, productId, productSKU } = data

    // Make sure customer exists
    const customer = await this.customers.getByEmail(email)

    // Make sure product exists
    const product = await this.products.get(productId)

    // Get product variant
    const variant = product.variants.find(v => v.sku === productSKU)

    if (!variant) {
      const data = { errors: { productSKU }, product }
      const message = `Product variant with sku "${productSKU}" does not exist.`
      const error = createError(message, data, 404)

      Logger.error({ ProductReviewService: error })
      throw error
    }

    // Get variant image
    const variant_img = product.images.find(img => img.id === variant.image_id)

    // Get base products url
    const products_base_url = `${process.env.SITE_URL}/products`

    // Get customer review input
    const review_input = pick(data, [
      'reviewMessage',
      'reviewRating',
      'reviewRecommendProduct',
      'reviewSource',
      'reviewTitle'
    ])

    // Validate request data
    data = await transformAndValidate(ProductReviewCreateRequest, {
      ...review_input,
      author: `${customer.first_name} ${customer.last_name}`,
      email: customer.email,
      location: customer.default_address.country_name,
      productId: product.product_id,
      productImageUrl: variant_img?.src ?? '',
      productName: product.title,
      productSKU: variant.sku,
      productUrl: `${products_base_url}/${product.handle}?style=${productSKU}`
    })

    return await axiosStamped<ReviewResource>({
      data: qs.stringify({ ...data, source: 'api' }),
      method: 'post',
      params: { apiKey: this.api_key_public, sId: this.store_hash },
      url: `/reviews2`
    })
  }

  /**
   * Returns an array of `ProductReviewResource` objects.
   * Data can be sorted, filtered, and paginated using {@param query}.
   *
   * @async
   * @param query - Query parameters
   * @param query.$limit - Maximum number of items to return. To return data
   * from the end of the array, pass a negative value
   * @param query.$select - Pick which fields to include in the result
   * @param query.$skip - Skip the specified number of results
   * @param query.$sort - Property to sort by mapped and order (1 asc, -1 des)
   * @param query[foo] - Object containing queries for specified property
   * @param query[foo].$eq - Matches values that are equal to a specified value
   * @param query[foo].$gt - Matches values where value > query.$gt
   * @param query[foo].$gte - Matches values where value >= query.$gte
   * @param query[foo].$in - Matches any of the values specified in an array
   * @param query[foo].$lt - Matches values where value < query.$lt
   * @param query[foo].$lte - Matches values where value <= query.$lte
   * @param query[foo].$ne - Matches all values where value !== query.$ne
   * @param query[foo].$nin - Matches none of the values specified in an array
   * @returns Array of product review resource objects
   */
  async find(
    query: Query<ReviewResource> = {}
  ): Promise<QEData<ReviewResource>> {
    const { results } = await axiosStamped<GetReviews>({
      method: 'get',
      url: `/v2/${this.store_hash}/dashboard/reviews`
    })

    const reviews = results.map(({ review }) => review)

    return this.query(reviews, query)
  }

  /**
   * Returns an array of reviews for the product with the id {@param id}.
   *
   * @async
   * @param id - ID of the product to retrieve reviews for
   * @throws {FeathersErrorJSON}
   */
  async findByProductId(
    id: ProductResource['id']
  ): Promise<Array<ReviewResource>> {
    const query: ProductReviewQuery = { productId: { $eq: id } }

    return (await this.find(query)) as Array<ReviewResource>
  }

  /**
   * Retrieve a product review by ID.
   *
   * @async
   * @param id - ID of product review to retrieve
   * @throws {FeathersErrorJSON}
   */
  async get(id: ReviewResource['id']): Promise<ReviewResource> {
    const query: ProductReviewQuery = { id: { $eq: id } }
    const reviews = (await this.find(query)) as Array<ReviewResource>

    if (!reviews.length) {
      const data = { errors: { id } }
      const error = createError(`Review with id ${id} not found`, data, 404)

      Logger.error({ 'ProductReviewService.get': error })
      throw error
    }

    return reviews[0]
  }
}
