import { ANYTHING } from '@flex-development/json/utils/types'
import {
  CheckoutLineItemDisplay,
  CheckoutLineItemInput
} from '@flex-development/kustomzcore/types'
import { BoxProps } from '@system/lib/atoms/Box'
import { ImageProps } from '@system/lib/atoms/Image'
import { EventHandlers } from '@system/types'

/**
 * @file Component Props - CheckoutLineItem
 * @module lib/molecules/CheckoutLineItem/props
 */

export interface CheckoutLineItemProps extends BoxProps {
  /**
   * `ICheckoutLineItem` object display properties.
   */
  data: CheckoutLineItemDisplay

  /**
   * Function to fire when the user clicks the "REMOVE" button.
   */
  handleRemove?(event: EventHandlers.Click.Button): ANYTHING

  /**
   * Function to fire when the user updates the line item quantity.
   */
  handleUpdate?(
    updates: CheckoutLineItemInput,
    event: EventHandlers.Change.Input
  ): ANYTHING

  /**
   * Variant display image.
   */
  image: ImageProps
}
