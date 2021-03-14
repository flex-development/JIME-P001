import type { ANYTHING } from '@flex-development/json/utils/types'
import type { UseCart, UseCartInitialItems } from '@system/hooks/useCart'
import { CartContext, useCart } from '@system/hooks/useCart'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import isFunction from 'lodash/isFunction'
import type { FC } from 'react'
import { ReactNode, useEffect } from 'react'

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
  items?: UseCartInitialItems

  /**
   * Optional function to persist the user's cart.
   *
   * The function will be passed the user's cart, and a boolean indicating if
   * the component is being unmounted.
   */
  persist?: CartPersistFN
}

export type CartPersistFN = {
  (cart: UseCart, unmount: boolean): ANYTHING
}

/**
 * Provider component for `CartContext`.
 *
 * @param {CartContextProviderProps} props - Component props
 * @param {ReactNode} [props.children] - Context consumers
 * @param {UseCartInitialItems} [props.items] - Initial items array or function
 * @param {CartPersistFN} [props.persist] - Function to persist the user's cart
 * @return {JSX.Element} Context consumer wrapped in provider component
 */
export const CartContextProvider: FC<CartContextProviderProps> = (
  props: CartContextProviderProps
): JSX.Element => {
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
     * @param {boolean} unmount - `true` if component being unmounted
     * @return {ANYTHING} Boolean or persist fn return value
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
