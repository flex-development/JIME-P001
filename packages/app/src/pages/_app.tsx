import { app } from '@app/subdomains/firebase/config/web'
import {
  CART_PERSISTENCE_KEY as CART_KEY,
  CheckoutLineItemInput,
  Logger
} from '@flex-development/kustomzcore'
import { CartContextProvider, UseCart } from '@flex-development/kustomzdesign'
import '@flex-development/kustomzdesign/kustomzdesign.css'
import { AppLayout } from '@subdomains/app/components'
import { AC, IAppProps } from '@subdomains/app/interfaces'
import '@subdomains/app/styles.css'
import { NextWebVitalsMetric } from 'next/app'
import { useCallback, useRef } from 'react'
import { useLocalStorage } from 'react-use'
import { FirebaseAppProvider } from 'reactfire'

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
 * - `FirebaseAppProvider`
 * - `CartContextProvider`
 *
 * @param param0 - Component props
 * @param param0.Component - Current page component
 * @param param0.pageProps - Page component props from data fetching methods
 */
const App: AC = ({ Component, pageProps }: IAppProps) => {
  // Get line items from peristed storage
  const [items, setItems] = useLocalStorage<CheckoutLineItemInput[]>(CART_KEY)
  const _items = useRef<CheckoutLineItemInput[]>(items || [])

  /**
   * Updates the line items state and persists the items to local storage.
   *
   * @param cart - `CartContextProvider` state
   * @param cart.items - Checkout line items
   */
  const persistCart = async (cart: UseCart) => {
    if (typeof window !== 'undefined') return setItems(cart.items)
  }

  /* Callback version of `persistCart` */
  const persistCartCB = useCallback(persistCart, [setItems])

  return (
    <FirebaseAppProvider firebaseApp={app}>
      <CartContextProvider items={_items.current} persist={persistCartCB}>
        <AppLayout page={Component} pageProps={pageProps} />
      </CartContextProvider>
    </FirebaseAppProvider>
  )
}

/**
 * Logs Next.js web metrics.
 *
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 *
 * @param metric - Web metric object
 */
export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
  Logger.info({ reportWebVitals: metric })
}

export default App
