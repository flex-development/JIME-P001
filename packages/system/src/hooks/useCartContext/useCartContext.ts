import { CHECKOUT_BASE_URL } from '@core/config/constants'
import type { CheckoutPermalinkInput } from '@core/types'
import type { NumberString } from '@flex-development/kustomzcore'
import type { UseCheckoutPermalink } from '@system/hooks/useCheckoutPermalink'
import { createContext, useContext } from 'react'

/**
 * @file Handle a user's shopping cart
 * @module hooks/useCartContext/impl
 */

export type UseCartContext = UseCheckoutPermalink & {
  /**
   * Number of items in the shopping cart with variant quantity taken into
   * account.
   */
  items_total: number
}

export const CartContext = createContext<UseCartContext>({
  items: [],
  items_total: 0,
  removeItem: (variant_id: NumberString) => {
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
 * Returns an object representing the shopping cart context state.
 *
 * @return {UseCartContext} Cart context
 */
export const useCartContext = (): UseCartContext => {
  return useContext(CartContext)
}
