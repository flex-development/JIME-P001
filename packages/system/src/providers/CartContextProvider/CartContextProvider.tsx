import type { ANYTHING } from '@flex-development/json'
import { CartContext, UseCart, useCart } from '@system/hooks/useCart'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import isFunction from 'lodash/isFunction'
import { FC, ReactNode, useEffect } from 'react'

/**
 * @file Shopping Cart Context Provider
 * @module providers/CartContextProvider/impl
 */

export type CartContextProviderProps = {
  /**
   * Context consumers.
   */
  children?: ReactNode

  /**
   * Initial line items in user's cart.
   */
  items?: Parameters<typeof useCart>[0]

  /**
   * Optional function to persist the user's cart.
   *
   * The function will be passed the user's cart, and a boolean indicating if
   * the component is being unmounted.
   */
  persist?: (cart: UseCart, unmount: boolean) => ANYTHING
}

/**
 * Provider component for `CartContext`.
 *
 * @param props - Component props
 * @param props.children - Context consumers
 * @param props.items - Initial line items in cart
 * @param props.persist - Function to handle context state
 */
export const CartContextProvider: FC<CartContextProviderProps> = props => {
  const { children, items, persist } = props

  // Get cart state and state memo
  const cart = useCart(items)
  const cart_m = useMemoCompare(cart)

  useEffect(() => {
    /**
     * Wrapper around `props.persist`. If the function is defined, it will be
     * called the current cart state and a boolean indicating if the component
     * is being unmounted.
     *
     * @param unmount - Boolean indicating if component being unmounted
     */
    const _persist = (unmount: boolean): ANYTHING => {
      if (isFunction(persist)) return (async () => persist(cart_m, unmount))()
      return unmount
    }

    // Handle cart state on every re-render
    _persist(false)

    return () => {
      // Call persist function when component is being unmounted
      _persist(true)
    }
  }, [cart_m, persist])

  return <CartContext.Provider value={cart_m}>{children}</CartContext.Provider>
}
