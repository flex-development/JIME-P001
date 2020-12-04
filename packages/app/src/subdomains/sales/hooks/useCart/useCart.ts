import { CartContext, CartContextState } from '@subdomains/sales/config'
import { useContext } from 'react'

/**
 * @file Handle a user's shopping cart
 * @module subdomains/sales/hooks/useCart/impl
 */

/**
 * Access the shopping cart context. Line items can be upserted and removed.
 */
export const useCart = (): CartContextState => useContext(CartContext)
