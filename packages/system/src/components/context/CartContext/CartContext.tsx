import {
  CartContextState,
  CheckoutPermalinkInput
} from '@flex-development/kustomzcore'
import { createContext } from 'react'

/**
 * @file Shopping Cart Context
 * @module components/context/CartContext/impl
 */

export const DEFAULT_CART_CONTEXT: CartContextState = {
  items: [],
  items_total: 0,
  removeItem: (variant_id: number | string) => {
    console.log({ 'CartContext.removeItem': variant_id })
  },
  upsertItem: (data: CheckoutPermalinkInput) => {
    console.log({ 'CartContext.upsertItem': data })
  },
  url: '/checkouts'
}

export const CartContext = createContext<CartContextState>(DEFAULT_CART_CONTEXT)

CartContext.displayName = 'CartContext'

export const CartContextConsumer = CartContext.Consumer
