import type { MainProps } from '@system/lib/atoms/Main'
import type { CheckoutLineItemProps } from '@system/lib/molecules/CheckoutLineItem'

/**
 * @file Component Props - CartTemplate
 * @module lib/templates/CartTemplate/props
 */

export interface CartTemplateProps extends MainProps {
  /**
   * Fires when user clicks the "REMOVE" button on a `CheckoutLineItem`.
   */
  handleRemove?: CheckoutLineItemProps['handleRemove']

  /**
   * Fires when user updates the quantity of a `CheckoutLineItem`.
   */
  handleUpdate?: CheckoutLineItemProps['handleUpdate']
}
