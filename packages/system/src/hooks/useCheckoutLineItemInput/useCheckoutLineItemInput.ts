import type { AnyObject } from '@flex-development/json'
import type { CheckoutLineItemInput } from '@flex-development/kustomzcore/types'
import type { UseQuantity } from '@system/hooks/useQuantity'
import { useQuantity } from '@system/hooks/useQuantity'
import { useSetState } from 'react-hanger'

/**
 * @file Specify the item fields to create a line item on a checkout
 * @module hooks/useCheckoutLineItemInput
 */

/**
 * `useCheckoutLineItemInput` return type.
 */
export type UseCheckoutLineItemInput = {
  /**
   * The updated line item information.
   */
  item: CheckoutLineItemInput

  /**
   * Updates the line item `properties` state.
   *
   * @param value - New quantity
   */
  updateProperties(value?: AnyObject): void

  /**
   * Updates the line item quanity.
   */
  updateQuantity: UseQuantity['updateQuantity']
}

/**
 * Specify the item fields to create a checkout line item.
 *
 * @param item - Initial line item data
 * @param item.properties - Initial custom properties
 * @param item.quantity - Number of line items to order
 */
export const useCheckoutLineItemInput = (
  item: CheckoutLineItemInput
): UseCheckoutLineItemInput => {
  // Handle custom properties
  const {
    state: properties,
    setState: updateProperties
  } = useSetState<AnyObject>(item.data.properties || {})

  // Handle product quantity
  const { quantity, updateQuantity } = useQuantity(item.data.quantity)

  return {
    item: { ...item, data: { ...item.data, properties, quantity } },
    updateProperties,
    updateQuantity
  }
}
