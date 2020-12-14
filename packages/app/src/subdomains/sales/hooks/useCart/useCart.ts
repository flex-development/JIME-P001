import { CheckoutLineItemInput } from '@flex-development/kustomzcore'
import { getItemsTotal } from '@flex-development/kustomzdesign'
import { useLocalStorage } from '@subdomains/app/hooks'
import { CART_PERSISTENCE_KEY } from '@subdomains/sales/config'
import { createContext, useContext, useEffect, useMemo } from 'react'
import {
  UseCheckoutPermalink,
  useCheckoutPermalink
} from '../useCheckoutPermalink'

/**
 * @file Handle a user's shopping cart
 * @module subdomains/sales/hooks/useCart/impl
 */

export type UseCart = UseCheckoutPermalink & {
  /**
   * Number of items in the shopping cart with variant quantity taken into
   * account.
   */
  items_total: number
}

/**
 * Returns an object containing the line items in the user's cart, as well as
 * functions to update the cart.
 */
export const useCart = (): UseCart => {
  // Load initial line items from local storage
  const [cart] = useLocalStorage<CheckoutLineItemInput[]>(CART_PERSISTENCE_KEY)

  // Get checkout URL using persisted cart
  const checkout = useCheckoutPermalink(cart)

  // Get number of line items in cart
  const items_total = useMemo<number>(() => {
    return getItemsTotal(checkout.items)
  }, [checkout.items])

  // Persist checkout line items to local storage
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(CART_PERSISTENCE_KEY, JSON.stringify(checkout.items))
  }, [checkout.items])

  return useContext(createContext({ ...checkout, items_total }))
}
