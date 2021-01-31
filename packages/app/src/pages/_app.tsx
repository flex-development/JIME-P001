import type { CheckoutLineItemInput } from '@flex-development/kustomzcore'
import { CART_PKEY } from '@flex-development/kustomzcore/constants'
import '@flex-development/kustomzdesign/kustomzdesign.css'
import type { CartContextProviderProps } from '@providers/CartContextProvider'
import { CartContextProvider } from '@providers/CartContextProvider'
import { Layout } from '@subdomains/app/components/Layout'
import '@subdomains/app/styles/index.scss'
import type { AppComponent, IAppProps } from '@subdomains/app/types'
import type { NextWebVitalsMetric } from 'next/app'
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
 * @param props - Component props
 * @param props.Component - Current page component
 * @param props.pageProps - Page component props from data fetching methods
 */
const App: AppComponent = ({ Component, pageProps }: IAppProps) => {
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
      <Layout page={Component} pageProps={pageProps} />
    </CartContextProvider>
  )
}

/**
 * Logs Next.js web metrics and sends results to Google Analytics.
 *
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 * @see https://nextjs.org/docs/advanced-features/measuring-performance
 *
 * @param metric - Web metric object
 * @param metric.id - Unique identifier in the context of the current page load
 * @param metric.label - Type of metric, `custom` or `web-vital`
 * @param metric.name - Metric name
 * @param metric.startTime - First recorded timestamp of the performance entry
 * @param metric.value - Duration of performance entry
 */
export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
  const { id, label, name, value } = metric

  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js Metric',
    event_label: id,
    non_interaction: true,
    value: Math.round(name === 'CLS' ? value * 1000 : value)
  })

  console.debug({ 'App.reportWebVitals': metric })
}

export default App
