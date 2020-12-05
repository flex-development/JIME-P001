import { sanitizeQuantity } from '@system/utils'
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
   * @param value - New quantity
   */
  updateQuantity(value?: number | string): void
}

/**
 * Maintains product quantity state.
 *
 * @param initialQuantity - Initial product quantity
 */
export const useQuantity = (initialQuantity = 1): UseQuantity => {
  // Sanitize initial quantity
  if (initialQuantity < 0) initialQuantity = 0

  // Initialize state
  const [quantity, { setValue }] = useNumber(initialQuantity, { lowerLimit: 0 })

  /**
   * Updates the internal quantity state.
   *
   * @param value - New quantity
   */
  const updateQuantity = (value?: number) => setValue(sanitizeQuantity(value))

  // Return quanity and useQuantity actions
  return {
    quantity,
    updateQuantity: useCallback(updateQuantity, [setValue])
  }
}
