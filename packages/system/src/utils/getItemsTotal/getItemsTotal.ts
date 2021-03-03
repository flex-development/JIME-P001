import type { CheckoutLineItemInput } from '@kustomzcore/types'

/**
 * @file Implementation - getItemsTotal
 * @module utils/getItemsTotal/impl
 */

/**
 * Returns the number of items in the cart using the `quantity` property
 * of each line item.
 *
 * @param items - Array of line items
 */
const getItemsTotal = (items: CheckoutLineItemInput[] = []): number => {
  if (!items.length) return 0

  // Get each item quantity
  const quantities = items.map(({ quantity }) => quantity)

  // Add item quantities
  return quantities.reduce((accumulator, curr) => accumulator + curr)
}

export default getItemsTotal
