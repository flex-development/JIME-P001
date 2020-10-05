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
  body: string = ''

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

  /**
   * ID of the product the review is for.
   */
  product: string = ''

  /**
   * Product rating, on a scale of 0 to 5. 
   */
  rating: 0 | 1 | 2 | 3 | 4 | 5

  /**
   * Title of review.
   */
  title: string = ''

  /**
   * Title of the product variant the review is for.
   */
  variant: string = ''
}
