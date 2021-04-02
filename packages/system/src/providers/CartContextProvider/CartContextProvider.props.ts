import type { ANYTHING } from '@flex-development/json/utils/types'
import type { CheckoutLineItemInput } from '@kustomzcore/types'
import type { UseCartContext } from '@system/hooks/useCartContext'
import { ReactNode } from 'react'

/**
 * @file Component Props - CartContextProvider
 * @module providers/CartContextProvider/props
 */

export type CartContextProviderProps = {
  /**
   * Context consumers.
   */
  children?: ReactNode

  /**
   * Initial line items in user's cart.
   */
  items?: CartInitialItems

  /**
   * Optional function to persist the user's cart.
   *
   * The function will be passed the user's cart, and a boolean indicating if
   * the component is being unmounted.
   */
  persist?: CartPersistFN
}

/**
 * Array of initial items or a synchronous function that returns an array.
 */
export type CartInitialItems =
  | CheckoutLineItemInput[]
  | (() => CheckoutLineItemInput[])

/**
 * Function to persist the user's cart.
 */
export type CartPersistFN = {
  (cart: UseCartContext, unmount: boolean): ANYTHING
}
