import { IEntity, IFireOrmQueryLine, IOrderByParams } from 'fireorm'

/**
 * Firestore database query.
 *
 * @see https://fireorm.js.org/#/Read_Data?id=complex-queries
 * @see https://fireorm.js.org/#/Read_Data?id=order-by-and-limit
 */
export interface DatabaseQuery {
  order?: IOrderByParams
  queries?: IFireOrmQueryLine[]
  limit?: number
  single?: boolean
}

/**
 * Represents a product review submitted by a customer.
 */
export interface ProductReviewEntity extends IEntity {
  /**
   * Product review text.
   */
  content: string = ''

  /**
   * Email address of the customer who posted the review.
   */
  email: string = ''

  /**
   * Unique product review ID.
   */
  id: string = ''

  /**
   * Name of the customer who posted the review.
   */
  name: string = ''
}
