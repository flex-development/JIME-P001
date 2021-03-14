import type { AnyObject } from '@flex-development/json/utils/types'
import type { CheckoutLineItemInput, IProductListing } from '@kustomzcore/types'
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
   * @param {AnyObject} [value] - New custom properties
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
 * @param {CheckoutLineItemInput} item - Initial line item data
 * @param {string} item.price - Line item price
 * @param {IProductListing} item.product - Product listing data
 * @param {AnyObject | null} item.properties - Custom line item properties
 * @param {number} item.quanity - Number of items to order
 * @param {number} item.variant_id - ID of product variant to order
 * @return {UseCheckoutLineItemInput} Hook state
 */
export const useCheckoutLineItemInput = (
  item: CheckoutLineItemInput
): UseCheckoutLineItemInput => {
  // Handle custom properties
  const {
    state: properties,
    setState: updateProperties
  } = useSetState<AnyObject>(item.properties || {})

  // Handle product quantity
  const { quantity, updateQuantity } = useQuantity(item.quantity)

  return {
    item: { ...item, properties, quantity },
    updateProperties,
    updateQuantity
  }
}
