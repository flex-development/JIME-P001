import type { CheckoutLineItemInput } from '@kustomzcore/types'

/**
 * @file Implementation - getSubtotal
 * @module utils/getSubtotal/impl
 */

/**
 * Iterates over {@param items} to get the order subtotal.
 *
 * ! The `properties` key will not be factored into the order subtotal.
 * ! This must be done manually via Shopify Admin.
 *
 * @param {CheckoutLineItemInput[]} [items] - Array of checkout line items
 * @return {number} Order subtotal
 */
const getSubtotal = (items: CheckoutLineItemInput[] = []): number => {
  if (!items?.length) return 0

  // Get subtotal for each item
  const totals = items.map(item => item.quantity * JSON.parse(item.price))

  // Add all item subtotals
  return totals.reduce((accumulator, curr) => accumulator + curr)
}

export default getSubtotal
