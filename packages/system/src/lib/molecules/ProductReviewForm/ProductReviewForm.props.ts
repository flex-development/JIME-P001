import type {
  IProductListing,
  JudgeMeReviewCreateDataDTO as ReviewDTO,
  ProductListingData
} from '@core/types'
import type { ANYTHING } from '@flex-development/json/utils/types'
import type { FormProps } from '@system/lib/atoms/Form'
import type { BaseSyntheticEvent } from 'react'
import type { UnpackNestedValue } from 'react-hook-form'

/**
 * @file Component Props - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/props
 */

export interface ProductReviewFormProps extends Omit<FormProps, 'id'> {
  /**
   * Form submission handler. Fires when user clicks "Submit Review".
   *
   * If the review is submitted successfully, the handler will be passed the new
   * review data and form event.
   */
  handler?: Handler

  /**
   * The ID of the product the user is submitting a review for.
   */
  id: ProductListingData['product_id'] | string

  /**
   * The title of the product the user is submitting a review for.
   */
  title: IProductListing['title']
}

/**
 * Form values.
 */
export type HReview = UnpackNestedValue<ReviewDTO>

/**
 * Form submission handler. Fires when user clicks "Submit Review".
 */
export type Handler = {
  (hreview: HReview, event?: BaseSyntheticEvent): ANYTHING
}
