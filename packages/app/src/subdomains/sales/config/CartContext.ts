import {
  CheckoutLineItemInput,
  CheckoutPermalinkInput
} from '@flex-development/kustomzcore'
import { createContext } from 'react'

/**
 * @file Shopping Cart Context
 * @module subdomains/sales/config/CartContext
 */

export type CartContextState = {
  items: Array<CheckoutLineItemInput>
  removeItem: (variant_id: number | string) => void
  subtotal: number
  upsertItem: (data: CheckoutPermalinkInput) => void
  url: string
}

export const CartContext = createContext<CartContextState>({
  items: [],
  removeItem: (variant_id: number | string) => {
    console.debug({ 'CartContext.removeItem': variant_id })
  },
  subtotal: 0,
  upsertItem: (data: CheckoutPermalinkInput) => {
    console.debug({ 'CartContext.upsertItem': data })
  },
  url: '/cart'
})

CartContext.displayName = 'CartContext'

export const CART_PERSISTENCE_KEY = 'morenaskustomz-cart'
