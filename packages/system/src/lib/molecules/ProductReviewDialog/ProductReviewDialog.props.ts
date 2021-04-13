import type { ButtonProps } from '@system/lib/atoms/Button'
import type { DialogProps } from '@system/lib/atoms/Dialog'
import type { ProductReviewFormProps } from '@system/lib/molecules/ProductReviewForm'

/**
 * @file Component Props - ProductReviewDialog
 * @module lib/molecules/ProductReviewDialog/props
 */

export interface ProductReviewDialogProps extends DialogProps {
  /**
   * Fires when the close button is clicked.
   */
  onClose?: ButtonProps['onClick']

  /**
   * `ProductReviewForm` component properties.
   *
   * If the review is submitted successfully, the handler will be passed the new
   * review data and form event.
   */
  form: ProductReviewFormProps
}
