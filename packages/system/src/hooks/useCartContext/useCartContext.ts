import { CartContextState } from '@flex-development/kustomzcore'
import { CartContext } from '@system/components/context/CartContext'
import { useContext } from 'react'

/**
 * @file Access shopping cart context
 * @module hooks/useCartContext/impl
 */

/**
 * Returns an object representing the shopping cart context state.
 */
export const useCartContext = (): CartContextState => {
  return useContext(CartContext)
}
