import { AnyObject, CheckoutLineItemInput } from '@flex-development/types'
import { useSetState } from 'react-hanger'
import { useQuantity, UseQuantity } from './useQuantity'

/**
 * @file Specify the input fields to create a line item on a checkout
 * @module hooks/useCheckoutLineItemInput
 */

/**
 * `useCheckoutLineItemInput` return type.
 */
export type UseCheckoutLineItemInput = {
  /**
   * The updated line item information.
   */
  input: CheckoutLineItemInput

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
 * Specify the input fields to create a checkout line item.
 *
 * @param input - Initial line item data
 * @param input.properties - Initial custom properties
 * @param input.quantity - Number of line items to order
 */
export const useCheckoutLineItemInput = (
  input: CheckoutLineItemInput
): UseCheckoutLineItemInput => {
  // Handle custom propeties
  const { state: properties, setState: updateProperties } = useSetState<
    AnyObject
  >(input.properties || {})

  // Handle product quantity
  const { quantity, updateQuantity } = useQuantity(input.quantity)

  return {
    input: { properties, quantity, variant_id: input.variant_id },
    updateProperties,
    updateQuantity
  }
}
