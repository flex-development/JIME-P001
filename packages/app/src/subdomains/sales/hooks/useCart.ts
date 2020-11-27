import { useContext } from 'react'
import { CartContext, CartContextState } from '../config'

/**
 * @file Handle a user's shopping cart
 * @module subdomains/sales/hooks/useCart
 */

/**
 * Access the shopping cart context. Line items can be upserted and removed.
 */
export const useCart = (): CartContextState => useContext(CartContext)
