import { Layout } from '@app/components/Layout'
import kapi from '@app/config/axios-kapi'
import ga from '@app/config/google-analytics'
import vercel from '@app/config/vercel-env'
import '@app/styles/index.scss'
import type { AppComponent, IAppProps } from '@app/types'
import type { CheckoutLineItemInput } from '@flex-development/kustomzcore'
import { CART_PKEY } from '@flex-development/kustomzcore/constants'
import '@flex-development/kustomzdesign/kustomzdesign.css'
import type { GetLayoutDataResJSON } from '@kapi/types'
import type { CartContextProviderProps } from '@providers/CartContextProvider'
import { CartContextProvider } from '@providers/CartContextProvider'
import type { PageViewParam } from 'ga-measurement-protocol'
import type { AppContext, NextWebVitalsMetric as Metric } from 'next/app'
import NextApp from 'next/app'
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
 * @param props.addthis - True if AddThis script should be rendered
 * @param props.layout - Data to populate `Layout` component
 * @param props.pageProps - Page component props from data fetching methods
 * @param props.ua - User-Agent header, or an empty string
 */
const App: AppComponent = (props: IAppProps) => {
  const { Component, addthis, layout, pageProps, ua } = props

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
      <Layout data={layout} page={Component} pageProps={pageProps} ua={ua} />
      {addthis && (
        <script
          defer
          src='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-60103a572a723aa0'
          type='text/javascript'
        />
      )}
    </CartContextProvider>
  )
}

/**
 * Fetches the store layout data and sends a `pageview` hit to Google Analytics.
 *
 * @async
 * @param actx - Next.js app context
 * @param actx.ctx - Next.js page context
 * @param actx.ctx.asPath - Actual path including query
 * @param actx.ctx.err - Error object if encountered during rendering
 * @param actx.ctx.pathname - Path section of `URL`
 * @param actx.ctx.req - `HTTP` request object
 * @param actx.ctx.res - `HTTP` response object
 */
App.getInitialProps = async (actx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(actx)

  // Get layout data
  const layout = await kapi<GetLayoutDataResJSON>({ url: 'layout' })

  // Build `pageview` params object
  const param: PageViewParam = {
    dl: actx.ctx.asPath as string,
    documentHost: actx.ctx.req?.headers.host as string,
    documentPath: actx.ctx.pathname,
    ds: 'storefront',
    ua: actx.ctx.req?.headers['user-agent'] ?? ''
  }

  // Send `pageview` hit to Google Analytics
  await ga.pageview({ ...param, ...vercel })

  // Enable AddThis script rendering on product pages
  const addthis = actx.ctx.pathname.includes('/products/')

  return { ...appProps, addthis, layout, ua: param.ua as string }
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
export const reportWebVitals = async (metric: Metric): Promise<void> => {
  const { id, label, name, value } = metric

  await ga.event({
    eventAction: name,
    eventCategory: label === 'web-vital' ? 'Web Vitals' : 'Next.js Metric',
    eventLabel: id,
    eventValue: Math.round(name === 'CLS' ? value * 1000 : value),
    non_interaction: JSON.stringify(true)
  })

  console.debug({ 'App.reportWebVitals': metric })
}

export default App
