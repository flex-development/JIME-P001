import { firebase } from '@app/config/firebase'
import localforage from '@app/config/localforage'
import {
  CART_PERSISTENCE_KEY,
  CheckoutLineItemInput
} from '@flex-development/kustomzcore'
import {
  CartContextProvider,
  UseCart,
  useMemoCompare
} from '@flex-development/kustomzdesign'
import '@flex-development/kustomzdesign/index.scss'
import { AC, AppLayout, IAppProps, useLocalForage } from '@subdomains/app'
import '@subdomains/app/styles.css'
import { CMS_CONFIG } from '@subdomains/cms'
import '@subdomains/cms/styles.css'
import { useCallback, useRef } from 'react'
import { FirebaseAppProvider } from 'reactfire'
import { TinaCMS, TinaProvider } from 'tinacms'

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
 * - `TinaProvider`
 *
 * @param param0 - Component props
 * @param param0.Component - Current page component
 * @param param0.pageProps - Page component props from data fetching methods
 */
const App: AC = ({ Component, pageProps }: IAppProps) => {
  // Get configured CMS instance
  const cms = useMemoCompare<TinaCMS>(new TinaCMS(CMS_CONFIG))

  // Load initial line items from local storage
  const [items] = useLocalForage<CheckoutLineItemInput[]>(CART_PERSISTENCE_KEY)

  // Maintain line items state to pass to `CartContextProvider`
  const line_items = useRef<CheckoutLineItemInput[]>(items || [])

  /**
   * Updates the line items state and persists the items to local storage.
   *
   * @param cart - `CartContextProvider` state
   * @param cart.items - Checkout line items
   */
  const persistCart = (cart: UseCart) => {
    line_items.current = cart.items

    if (typeof window === 'undefined') return
    return localforage.setItem(CART_PERSISTENCE_KEY, cart.items)
  }

  /* Callback version of `persistCart` */
  const persistCartCB = useCallback(persistCart, [line_items])

  return (
    <FirebaseAppProvider firebaseApp={firebase}>
      <CartContextProvider items={line_items.current} persist={persistCartCB}>
        <TinaProvider cms={cms}>
          <AppLayout page={Component} pageProps={pageProps} />
        </TinaProvider>
      </CartContextProvider>
    </FirebaseAppProvider>
  )
}

export default App
