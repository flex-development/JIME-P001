import type { AnyObject } from '@flex-development/json'
import { BoxProps } from '@system/lib/atoms/Box'

/**
 * @file Component Props - ProductReview
 * @module lib/molecules/ProductReview/props
 */

export interface ProductReviewProps extends Omit<BoxProps, 'id'> {
  /**
   * Product review data.
   */
  review: AnyObject
}
