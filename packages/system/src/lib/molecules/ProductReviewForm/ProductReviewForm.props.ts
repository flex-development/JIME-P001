import type {
  IProductListing,
  JudgeMeReviewCreateDataDTO as ReviewDTO,
  ProductListingData
} from '@core/types'
import type { ANYTHING } from '@flex-development/json/utils/types'
import type { FormProps } from '@system/lib/atoms/Form'
import type { BaseSyntheticEvent } from 'react'
import type { FieldErrors, UnpackNestedValue } from 'react-hook-form'

/**
 * @file Component Props - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/props
 */

export interface ProductReviewFormProps extends Omit<FormProps, 'id'> {
  /**
   * Form submission handler. Fires when user clicks "Submit Review".
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
 * Form values or errors object.
 */
export type HReview = UnpackNestedValue<ReviewDTO> | FieldErrors<ReviewDTO>

/**
 * Form submission handler. Fires when user clicks "Submit Review".
 */
export type Handler = {
  (hreview: HReview, event?: BaseSyntheticEvent): ANYTHING
}
