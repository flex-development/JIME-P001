import { CART_PKEY } from '@flex-development/kustomzcore/constants'
import { CheckoutLineItemInput } from '@flex-development/kustomzcore/types/shopify'
import '@flex-development/kustomzdesign/kustomzdesign.css'
import {
  CartContextProvider,
  CartContextProviderProps
} from '@providers/CartContextProvider'
import { AppLayout } from '@subdomains/app/components/AppLayout'
import { AC, IAppProps } from '@subdomains/app/interfaces'
import '@subdomains/app/styles.css'
import debug from 'debug'
import { NextWebVitalsMetric } from 'next/app'
import { useCallback, useRef } from 'react'
import useLocalStorage from 'react-use/useLocalStorage'

/**
 * @file Next.js Custom App
 * @module pages/app
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */

/**
 * Custom app initialization component.
 *
 * The following providers will be initialized (in order):
 *
 * - `CartContextProvider`
 *
 * @param param0 - Component props
 * @param param0.Component - Current page component
 * @param param0.pageProps - Page component props from data fetching methods
 */
const App: AC = ({ Component, pageProps }: IAppProps) => {
  // Get line items from peristed storage
  const [items, setItems] = useLocalStorage<CheckoutLineItemInput[]>(CART_PKEY)
  const _items = useRef<CheckoutLineItemInput[]>(items || [])

  /**
   * Updates the line items state and persists the items to local storage.
   *
   * @param cart - `CartContextProvider` state
   * @param cart.items - Checkout line items
   */
  const persistCart: CartContextProviderProps['persist'] = async cart => {
    if (typeof window !== 'undefined') return setItems(cart.items)
  }

  /* Callback version of `persistCart` */
  const persistCartCB = useCallback(persistCart, [setItems])

  return (
    <CartContextProvider items={_items.current} persist={persistCartCB}>
      <AppLayout page={Component} pageProps={pageProps} />
    </CartContextProvider>
  )
}

/**
 * Logs Next.js web metrics.
 *
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 *
 * @param metric - Web metric object
 */
export const reportWebVitals = async (
  metric: NextWebVitalsMetric
): Promise<void> => {
  debug('App.reportWebVitals')(metric)
}

export default App
