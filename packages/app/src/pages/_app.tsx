import { CheckoutLineItemInput } from '@flex-development/kustomzcore'
import '@flex-development/kustomzdesign/index.scss'
import {
  AC,
  AppLayout,
  IAppProps,
  useLocalStorage,
  useSignInWithCustomToken
} from '@subdomains/app'
import '@subdomains/app/styles.css'
import { CMS_BASE_CONFIG } from '@subdomains/cms'
import '@subdomains/cms/styles.css'
import {
  CartContext,
  CART_PERSISTENCE_KEY as CART_KEY,
  useCheckoutPermalink
} from '@subdomains/sales'
import { isUndefined } from 'lodash'
import { Provider as NextAuthProvider, Session } from 'next-auth/client'
import { useEffect, useMemo } from 'react'
import { TinaCMS, TinaProvider } from 'tinacms'

/**
 * @file Next.js Custom App
 * @module pages/app
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */

/**
 * Custom app initialization component.
 *
 * Registers the NextAuth and TinaCMS providers. Editors (repository
 * collaborators) can sign in with GitHub to edit marketing site content.
 *
 * The CartContext provider will also be registered. Line items will be loaded
 * from local storage.
 *
 * @param param0 - Component props
 * @param param0.Component - Current page component
 * @param param0.pageProps - Page component props from data fetching methods
 * @param param0.pageProps.page - Data for current page
 * @param param0.pageProps.session - CMS user session or null
 */
const App: AC = ({ Component, pageProps }: IAppProps) => {
  const { page, session } = pageProps

  /**
   * Preview mode will be enabled if current user is signed-in with GitHub.
   * Page will be undefined if redirected to /404 page.
   */
  pageProps.preview = session?.provider === 'github' && !isUndefined(page)

  // Grant authenticated user access to database and storage resources
  useSignInWithCustomToken(session?.firebase_token)

  // Get configured TinaCMS instance
  const cms = useMemo(() => {
    return new TinaCMS({ ...CMS_BASE_CONFIG, enabled: pageProps.preview })
  }, [pageProps.preview])

  // Load initial line items from local storage
  const [cart] = useLocalStorage<CheckoutLineItemInput[]>(CART_KEY)

  // Get checkout URL using persisted cart
  const checkout = useCheckoutPermalink(cart)

  // Persist checkout line items to local storage
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(CART_KEY, JSON.stringify(checkout.items))
  }, [checkout.items])

  return (
    <NextAuthProvider session={(session || {}) as Session}>
      <TinaProvider cms={cms}>
        <CartContext.Provider value={checkout}>
          <AppLayout page={Component} pageProps={pageProps} />
        </CartContext.Provider>
      </TinaProvider>
    </NextAuthProvider>
  )
}

export default App
