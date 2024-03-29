import type { CheckoutLineItemInput } from '@core/types'
import type { ANYTHING } from '@flex-development/json/utils/types'
import type { BoxProps } from '@system/lib/atoms/Box'
import type { EventHandlers } from '@system/types'

/**
 * @file Component Props - CheckoutLineItem
 * @module lib/molecules/CheckoutLineItem/props
 */

export interface CheckoutLineItemProps extends BoxProps {
  /**
   * Checkout line item data.
   */
  data: CheckoutLineItemInput

  /**
   * Fires when user clicks the "REMOVE" button.
   */
  handleRemove?(event: EventHandlers.Click.Button): ANYTHING

  /**
   * Fires when user updates the line item quantity.
   */
  handleUpdate?(
    updates: CheckoutLineItemInput,
    event: EventHandlers.Change.Input
  ): ANYTHING
}
