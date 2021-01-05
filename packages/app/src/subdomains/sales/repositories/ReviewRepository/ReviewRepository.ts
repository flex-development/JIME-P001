import { DataArray } from '@flex-development/json'
import { IProductListing, IReview, Review } from '@flex-development/kustomzcore'
import { RTDRepository } from '@subdomains/firebase/models/RTDRepository'
import { IReviewRepository } from './IReviewRepository'

/**
 * @file Access the `reviews` collection
 * @module subdomains/sales/repositories/ReviewRepository/impl
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
   * @return Array of product review objects
   * @throws {FeathersErrorJSON}
   */
  async findByProductId(
    id: IProductListing['product_id']
  ): Promise<DataArray<IReview>> {
    const reviews = await this.find({ product_id: { $eq: id } })
    return reviews as DataArray<IReview>
  }
}
