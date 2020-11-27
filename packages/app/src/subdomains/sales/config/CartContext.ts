import {
  CheckoutLineItemInput,
  CheckoutPermalinkInput
} from '@flex-development/types'
import { createContext } from 'react'

/**
 * @file Shopping Cart Context
 * @module subdomains/sales/config/CartContext
 */

export type CartContextState = {
  items: Array<CheckoutLineItemInput>
  removeItem: (variant: string) => void
  subtotal: number
  upsertItem: (data: CheckoutPermalinkInput) => void
  url: string
}

export const CartContext = createContext<CartContextState>({
  items: [],
  removeItem: (variant: string) => {
    console.debug({ 'CartContext.removeItem': variant })
  },
  subtotal: 0,
  upsertItem: (data: CheckoutPermalinkInput) => {
    console.debug({ 'CartContext.upsertItem': data })
  },
  url: '/cart'
})

CartContext.displayName = 'CartContext'

export const CART_PERSISTENCE_KEY = 'morenaskustomz-cart'
