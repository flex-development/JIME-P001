import type { NumberString } from '@flex-development/kustomzcore'
import { sanitizeQuantity } from '@system/utils/sanitizeQuantity'
import { useCallback } from 'react'
import useNumber from 'react-hanger/array/useNumber'

/**
 * @file Convert a value into a product quantity
 * @module hooks/useQuantity
 */

/**
 * `useQuantity` return type.
 */
export type UseQuantity = {
  /**
   * Number of products to order.
   */
  quantity: number

  /**
   * Updates the `quantity` state.
   *
   * @param {NumberString} [value] - New quantity
   * @return {void}
   */
  updateQuantity(value?: NumberString): void
}

/**
 * Maintains product quantity state.
 *
 * @param {number} [initialQuantity] - Initial product quantity
 * @return {UseQuantity} Hook state
 */
export const useQuantity = (initialQuantity: number = 1): UseQuantity => {
  // Sanitize initial quantity
  if (initialQuantity < 0) initialQuantity = 0

  // Initialize state
  const [quantity, { setValue }] = useNumber(initialQuantity, { lowerLimit: 0 })

  /**
   * Updates the quantity state.
   *
   * @param {number} [val] - New quantity
   * @return {void}
   */
  const updateQuantity = (val?: number): void => setValue(sanitizeQuantity(val))

  // Return quanity and useQuantity actions
  return {
    quantity,
    updateQuantity: useCallback(updateQuantity, [setValue])
  }
}
