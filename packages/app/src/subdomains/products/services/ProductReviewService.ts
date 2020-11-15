import { axiosStamped } from '@app/config/axios'
import { QEData, Query } from '@app/subdomains/app/interfaces'
import { QueryExecutor } from '@app/subdomains/app/models'
import { createError, Logger } from '@app/subdomains/app/utils'
import {
  ProductResource,
  ProductReviewResource as ReviewResource,
  ProductReviewResourceInput as ReviewResourceInput
} from '@flex-development/kustomzdesign/types'
import qs from 'qs'
import {
  GetReviews,
  IProductReviewService,
  ProductReviewQuery
} from '../interfaces/IProductReviewService'

/**
 * @file Subdomain Services - Product Reviews
 * @module subdomains/products/services/ProductReviewService
 * @see https://developers.stamped.io/#da27f990-cabd-4882-864a-7b8f9dd55832
 */

export default class ProductReviewService
  extends QueryExecutor<ReviewResource>
  implements IProductReviewService {
  api_key_private: string
  api_key_public: string
  store_hash: string

  /**
   * Creates a new Product service instance.
   */
  constructor() {
    super()

    this.api_key_private = process.env.SHOPIFY_STAMPED_API_KEY_PRIVATE || ''
    this.api_key_public = process.env.SHOPIFY_STAMPED_API_KEY_PUBLIC || ''
    this.store_hash = process.env.SHOPIFY_STAMPED_STORE_HASH || ''
  }

  /**
   * Creates a new product review.
   *
   * @todo Check if {@param data.email} belongs to a previous customer
   * @todo Make sure product and product variant exist before submitting review
   *
   * @param data - Product review input data
   * @param data.author - Name of customer submitting review
   * @param data.email - Email of customer submitting review
   * @param data.location - Location of customer submitting review
   * @param data.productId - ID of product being reviewed
   * @param data.productImageUrl - Image URL of product variant being reviewed
   * @param data.productName - Name of product being reviewed
   * @param data.productSKU - SKU of product variant being reviewed
   * @param data.productUrl - Link to product variant
   * @param data.reviewMessage - Review body
   * @param data.reviewRating - Product rating, a value 1 through 5
   * @param data.reviewRecommendProduct - True if customer would recommend the
   * product / variant being reviewed
   * @param data.reviewSource - Source of review
   * @param data.reviewTitle - Title of review
   * @returns Product review resource
   */
  async create(data: ReviewResourceInput): Promise<ReviewResource> {
    return await axiosStamped<ReviewResource>({
      data: qs.stringify({ ...data, source: 'api' }),
      method: 'post',
      url: `/reviews2?apiKey=${this.api_key_public}&sId=${this.store_hash}`
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
