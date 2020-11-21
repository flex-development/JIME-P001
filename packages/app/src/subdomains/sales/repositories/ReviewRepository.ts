import { RTDRepository } from '@app/subdomains/app/models/RTDRepository'
import { IReview } from '@flex-development/types'
import { IProductListing } from 'shopify-api-node'
import { IReviewRepository } from '../interfaces'
import { Review } from '../models'

/**
 * @file Access the `reviews` collection
 * @module subdomains/sales/repositories/ReviewRepository
 */

export default class ReviewRepository
  extends RTDRepository<IReview>
  implements IReviewRepository {
  /**
   * Creates a new connection to the `reviews` collection.
   *
   * @param database - Realtime Database service
   */
  constructor(database: IReviewRepository['database']) {
    super('reviews', Review, database)
  }

  /**
   * Returns an array of review objects for the product listing with the id
   * {@param id}.
   *
   * @async
   * @param id - ID of the product listing to retrieve reviews for
   * @returns Array of product review objects
   * @throws {FeathersErrorJSON}
   */
  async findByProductId(
    id: IProductListing['product_id']
  ): Promise<Array<IReview>> {
    return (await this.find({ product_id: { $eq: id } })) as Array<IReview>
  }
}
