import { CheckoutLineItemInput } from '@flex-development/kustomzcore'

/**
 * @file Get total number of line items using quanity property
 * @module utils/getItemsTotal/impl
 */

/**
 * Returns the number of items in the cart using the `data.quantity` property
 * of each line item.
 *
 * @param items - Array of line items
 */
const getItemsTotal = (items: CheckoutLineItemInput[] = []): number => {
  if (!items.length) return 0

  // Get each item quantity
  const quantities = items.map(({ data }) => data.quantity)

  // Add item quantities
  return quantities.reduce((accumulator, curr) => accumulator + curr)
}

export default getItemsTotal