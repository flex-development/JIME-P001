import {
  CheckoutLineItemInput,
  CheckoutPermalinkInput,
  CHECKOUT_BASE_URL
} from '@flex-development/kustomzcore'
import { getItemsTotal } from '@system/utils'
import { isFunction } from 'lodash'
import { createContext, useContext, useMemo } from 'react'
import {
  UseCheckoutPermalink,
  useCheckoutPermalink
} from '../useCheckoutPermalink'

/**
 * @file Handle a user's shopping cart
 * @module hooks/useCart/impl
 */

export type UseCart = UseCheckoutPermalink & {
  /**
   * Number of items in the shopping cart with variant quantity taken into
   * account.
   */
  items_total: number
}

export const CartContext = createContext<UseCart>({
  items: [],
  items_total: 0,
  removeItem: (variant_id: number | string) => {
    console.log({ 'CartContext.removeItem': variant_id })
  },
  setItems: (items: CheckoutPermalinkInput[]) => {
    console.log({ 'CartContext.setItems': items })
  },
  upsertItem: (data: CheckoutPermalinkInput) => {
    console.log({ 'CartContext.upsertItem': data })
  },
  url: CHECKOUT_BASE_URL
})

/**
 * Returns an object containing the line items in the user's cart, functions to
 * update the cart, and the total number of line items in the cart.
 *
 * The total number is calculated using the `quantity` field of each item.
 *
 * @param items - Current line items
 */
export const useCart = (
  items: CheckoutLineItemInput[] | (() => CheckoutLineItemInput[]) = []
): UseCart => {
  // Get checkout URL using initial line items
  const checkout = useCheckoutPermalink(isFunction(items) ? items() : items)

  // Get number of line items in cart
  const items_total = useMemo<number>(() => {
    return getItemsTotal(checkout.items)
  }, [checkout.items])

  return { ...checkout, items_total }
}

/**
 * Returns an object representing the shopping cart context state.
 */
export const useCartContext = (): UseCart => {
  return useContext(CartContext)
}
