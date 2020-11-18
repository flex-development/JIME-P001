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
 * @param initialInput - Initial line item data
 * @param initialInput.properties - Initial custom properties
 * @param initialQuantity - Initial number of variants to add
 * @param initialAttributes - Custom line item properties
 */
export const useCheckoutLineItemInput = (
  initialInput: CheckoutLineItemInput
): UseCheckoutLineItemInput => {
  const {
    properties: initialProperties,
    quantity: initialQuantity,
    variant_id
  } = initialInput

  // Handle custom propeties
  const { state: properties, setState: updateProperties } = useSetState<
    AnyObject
  >(initialProperties || {})

  // Handle product quantity
  const { quantity, updateQuantity } = useQuantity(initialQuantity)

  return {
    input: { properties, quantity, variant_id },
    updateProperties,
    updateQuantity
  }
}
