import { MainProps } from '@system/lib/atoms'
import { CheckoutLineItemProps } from '@system/lib/molecules'

/**
 * @file Component Props - CartTemplate
 * @module lib/templates/CartTemplate/props
 */

export interface CartTemplateProps extends MainProps {
  /**
   * `onClick` handler that's fired when the user clicks the "REMOVE" button.
   */
  handleRemove?: CheckoutLineItemProps['handleRemove']

  /**
   * `onChange` handler that's fired when the user updates the line item
   * quantity.
   */
  handleUpdate?: CheckoutLineItemProps['handleUpdate']
}
