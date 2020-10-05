import { sanitizeQuantity } from '@kustomz/utils'
import { isNumber } from 'lodash'
import useNumber from 'react-hanger/array/useNumber'

/**
 * @file Convert a value into a product quantity
 * @module hooks/useQuantity
 */

/**
 * Functions to update the `useQuantity` state.
 */
export type UseQuantityActions = {
  /**
   * Updates the `quantity` state.
   *
   * @param value - New quantity
   */
  updateQuantity(value?: number | string): void
}

/**
 * `useQuantity` state.
 */
export type UseQuantityState = {
  /**
   * Number of products to order.
   */
  quantity: number
}

/**
 * `useQuantity` return type.
 */
export type UseQuantity = UseQuantityActions & UseQuantityState

/**
 * Maintains product quantity state.
 *
 * @param initialQuantity - Initial product quantity
 */
export const useQuantity = (initialQuantity = 1): UseQuantity => {
  // Sanitize initial quantity
  initialQuantity = isNumber(initialQuantity) ? initialQuantity : 1

  // Initialize state
  const [quantity, { setValue }] = useNumber(initialQuantity, { lowerLimit: 0 })

  // Return quanity and useQuantity actions
  return {
    quantity,
    updateQuantity: (value?: number) => setValue(sanitizeQuantity(value))
  }
}
