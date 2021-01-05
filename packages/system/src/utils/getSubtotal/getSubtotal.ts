import { CheckoutLineItemInput } from '@flex-development/kustomzcore'

/**
 * @file Implementation - getSubtotal
 * @module utils/getSubtotal/impl
 */

/**
 * Iterates over {@param items} to get the order subtotal.
 *
 * ! The `properties` key of item will not be factored in the order subtotal.
 *
 * @param items - Array of checkout line items
 */
const getSubtotal = (items: Array<CheckoutLineItemInput>): number => {
  if (!items.length) return 0

  // Get subtotal for each item
  const totals = items.map(({ data }) => data.quantity * JSON.parse(data.price))

  // Add all item subtotals
  return totals.reduce((accumulator, curr) => accumulator + curr)
}

export default getSubtotal
