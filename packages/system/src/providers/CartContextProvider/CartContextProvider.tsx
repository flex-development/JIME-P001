import type { ANYTHING } from '@flex-development/json/utils/types'
import { CartContext } from '@system/hooks/useCartContext'
import { useCheckoutPermalink } from '@system/hooks/useCheckoutPermalink'
import { useMemoCompare } from '@system/hooks/useMemoCompare'
import getItemsTotal from '@system/utils/getItemsTotal'
import isFunction from 'lodash/isFunction'
import type { FC } from 'react'
import { ReactNode, useEffect, useMemo } from 'react'
import type {
  CartContextProviderProps,
  CartInitialItems,
  CartPersistFN
} from './CartContextProvider.props'

/**
 * @file Provider - Shopping Cart Context
 * @module providers/CartContextProvider/impl
 */

/**
 * Provider component for `CartContext`.
 *
 * @param {CartContextProviderProps} props - Component props
 * @param {ReactNode} [props.children] - Context consumers
 * @param {CartInitialItems} [props.items] - Initial items array or function
 * @param {CartPersistFN} [props.persist] - Function to persist the user's cart
 * @return {JSX.Element} Context consumer wrapped in provider component
 */
export const CartContextProvider: FC<CartContextProviderProps> = (
  props: CartContextProviderProps
): JSX.Element => {
  const { children, items, persist } = props

  // Get checkout URL using initial line items
  const checkout = useCheckoutPermalink(isFunction(items) ? items() : items)

  // Get number of line items in cart
  const items_total = useMemo<number>(() => {
    return getItemsTotal(checkout.items)
  }, [checkout.items])

  // Get cart memo state
  const cart = useMemoCompare({ ...checkout, items_total })

  useEffect(() => {
    /**
     * Wrapper around `props.persist`.
     *
     * If the function is defined, it will be called with the current cart state
     * and a boolean indicating if the component is being unmounted.
     *
     * @param {boolean} unmount - `true` if component being unmounted
     * @return {ANYTHING} Boolean or persist fn return value
     */
    const doPersist = (unmount: boolean): ANYTHING => {
      if (isFunction(persist)) return (async () => persist(cart, unmount))()
      return unmount
    }

    // Handle cart state on every re-render
    doPersist(false)

    return () => {
      // Call persist function when component is being unmounted
      doPersist(true)
    }
  }, [cart, persist])

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>
}
