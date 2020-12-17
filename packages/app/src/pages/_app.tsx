import { app } from '@app/subdomains/firebase/config/web'
import {
  CART_PERSISTENCE_KEY as CART_KEY,
  CheckoutLineItemInput
} from '@flex-development/kustomzcore'
import {
  CartContextProvider,
  UseCart,
  useMemoCompare
} from '@flex-development/kustomzdesign'
import '@flex-development/kustomzdesign/src/index.scss'
import { AC, AppLayout, IAppProps } from '@subdomains/app'
import '@subdomains/app/styles.css'
import { CMS_CONFIG } from '@subdomains/cms'
import '@subdomains/cms/styles.css'
import { useCallback, useRef } from 'react'
import { useLocalStorage } from 'react-use'
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
        <TinaProvider cms={cms}>
          <AppLayout page={Component} pageProps={pageProps} />
        </TinaProvider>
      </CartContextProvider>
    </FirebaseAppProvider>
  )
}

export default App
