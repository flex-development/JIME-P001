import { sanitizeQuantity } from '@system/utils'
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

  // Return quanity and useQuantity actions
  return {
    quantity,
    updateQuantity: (value?: number) => setValue(sanitizeQuantity(value))
  }
}
