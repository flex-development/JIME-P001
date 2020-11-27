import { CheckoutPermalinkInput } from '@flex-development/types'
import { createContext } from 'react'

/**
 * @file Shopping Cart Context
 * @module subdomains/sales/config/CartContext
 */

export type CartContextState = {
  items: Array<CheckoutPermalinkInput>
  removeItem: (variant: string) => void
  subtotal: number
  upsertItem: (data: CheckoutPermalinkInput) => void
}

export const CartContext = createContext<CartContextState>({
  items: [],
  removeItem: (variant: string) => console.debug({ CartContext: variant }),
  subtotal: 0,
  upsertItem: (data: CheckoutPermalinkInput) => {
    console.debug({ CartContext: data })
  }
})

CartContext.displayName = 'CartContext'

export const CART_PERSISTENCE_KEY = 'morenaskustomz-cart'
