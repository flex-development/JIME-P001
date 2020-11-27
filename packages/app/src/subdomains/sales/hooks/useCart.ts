import { useLocalStorage } from '@app/subdomains/app/hooks'
import { CheckoutLineItemInput } from '@flex-development/types'
import { useCallback, useEffect } from 'react'
import {
  useCheckoutPermalink,
  UseCheckoutPermalink
} from './useCheckoutPermalink'

/**
 * @file Handle a user's shopping cart
 * @module subdomains/sales/hooks/useCart
 */

/**
 * `useCart` return type.
 */
export type UseCart = {
  /**
   * Checkout permalink URL.
   */
  checkout_url: UseCheckoutPermalink['url']

  /**
   * Items in cart.
   */
  items: UseCheckoutPermalink['items']

  /**
   * Removes a line item from the user's cart.
   *
   * @param variant_id - ID of variant to remove
   */
  removeItem: (variant_id: CheckoutLineItemInput['variant_id']) => void

  /**
   * Creates or updates a line item.
   *
   * @param data - Data to create or update line item
   */
  upsertItem: (data: CheckoutLineItemInput) => void
}

/**
 * Returns an object handling CRUD operations for a user's shopping cart:
 *
 * - Create a new line item
 * - Get all line items
 * - Update a line item
 * - Delete a line item
 *
 * @param items - Initial line items
 * @param key - Name of key in local storage where line items are persisted
 */
export const useCart = (
  items: Array<CheckoutLineItemInput> = [],
  key = 'morenaskustomz-cart'
): UseCart => {
  // State to checkout items in local storage
  const [cart, setCart] = useLocalStorage<CheckoutLineItemInput[]>(key, items)

  // Get checkout URL using persisted cart
  const checkout = useCheckoutPermalink(cart)

  // Update checkout items when local storage items are updated
  useEffect(() => {
    checkout.setItems(cart)
  }, [cart, checkout])

  /**
   * Adds an items to the user's cart. If a line item already exists, it's
   * quantity and properties will be updated.
   *
   * @param data - Line item to add
   */
  const upsertItem = (data: CheckoutLineItemInput) => {
    const { variant_id } = data

    let new_cart: typeof cart = []

    const exists = cart.find(item => item.variant_id === variant_id)

    if (exists) {
      new_cart = [...cart.filter(item => item.variant_id !== variant_id), data]
    } else {
      new_cart = [...cart, data]
    }

    return setCart(new_cart)
  }

  /**
   * Removes a line item from the user's cart.
   *
   * @param variant_id - Variant ID of line item to remove
   */
  const removeItem = (variant_id: CheckoutLineItemInput['variant_id']) => {
    return setCart(cart.filter(item => item.variant_id !== variant_id))
  }

  return {
    checkout_url: checkout.url,
    items: checkout.items,
    removeItem: useCallback(removeItem, [cart, setCart]),
    upsertItem: useCallback(upsertItem, [cart, setCart])
  }
}
