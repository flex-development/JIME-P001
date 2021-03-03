import type { AnyObject, ANYTHING } from '@flex-development/json/utils/types'
import type { IProductListing } from '@kustomzcore/types'
import type { FormProps } from '@system/lib/atoms/Form'
import type { EventHandlers } from '@system/types'

/**
 * @file Component Props - ProductReviewForm
 * @module lib/molecules/ProductReviewForm/props
 */

export interface ProductReviewFormProps extends FormProps {
  /**
   * Form description.
   */
  description: string

  /**
   * Form submission handler. This function will be fired when the user clicks
   * the `submit` button.
   */
  handleSubmit?(req: AnyObject, event: EventHandlers.Click.Button): ANYTHING

  /**
   * The ID of the product the user is submitting a review for.
   */
  id: string

  /**
   * The title of the product the user is submitting a review for.
   */
  title: IProductListing['title']

  /**
   * Product variants.
   *
   * @default []
   */
  variants: IProductListing['variants']
}
