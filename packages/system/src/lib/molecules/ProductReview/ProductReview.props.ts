import { IReview } from '@flex-development/kustomzcore'
import { BoxProps } from '@system/lib/atoms'

/**
 * @file Component Props - ProductReview
 * @module lib/molecules/ProductReview/props
 */

export interface ProductReviewProps extends Omit<BoxProps, 'id'> {
  /**
   * Product review data.
   */
  review: IReview
}
