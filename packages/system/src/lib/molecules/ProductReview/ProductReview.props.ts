import type { JudgeMeReview } from '@core/types/reviews'
import type { BoxProps } from '@system/lib/atoms/Box'

/**
 * @file Component Props - ProductReview
 * @module lib/molecules/ProductReview/props
 */

export interface ProductReviewProps extends Omit<BoxProps, 'id'> {
  /**
   * Product review data.
   */
  review: Review
}

export type Review = Pick<
  JudgeMeReview,
  | 'body'
  | 'created_at'
  | 'id'
  | 'product_handle'
  | 'product_title'
  | 'rating'
  | 'title'
> & { reviewer: Pick<JudgeMeReview['reviewer'], 'name'> }
