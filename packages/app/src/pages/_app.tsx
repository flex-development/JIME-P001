import { Layout } from '@app/components/Layout'
import '@app/styles/index.scss'
import type {
  AppComponent,
  AppPropsComponent,
  IAppInitialProps,
  IAppProps,
  IPageProps
} from '@app/types'
import kapi from '@kustomzcore/config/axios-kapi'
import { CART_PKEY } from '@kustomzcore/config/constants'
import ga from '@kustomzcore/config/google-analytics'
import vercel from '@kustomzcore/config/vercel-env'
import type { APIPayload, CheckoutLineItemInput } from '@kustomzcore/types'
import type { UseCartContext } from '@kustomzdesign/hooks/useCartContext'
import '@kustomzdesign/kustomzdesign.css'
import { CartContextProvider } from '@kustomzdesign/providers'
import type { PageViewParam } from 'ga-measurement-protocol'
import type { IncomingHttpHeaders, IncomingMessage } from 'http'
import type { NextPageContext } from 'next'
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
 * @param {IAppProps} props - Component props
 * @param {AppPropsComponent} props.Component - Current page component
 * @param {boolean} props.addthis - True if AddThis script should be rendered
 * @param {APIPayload.Layout} props.layout -  `Layout` component data
 * @param {IPageProps} props.pageProps - Page component props
 * @param {string} [props.ua] - User-Agent header, or an empty string
 * @return {JSX.Element} Application wrapped in `CartContextProvider` component
 */
const App: AppComponent = (props: IAppProps) => {
  const { Component, addthis, layout, pageProps, ua } = props

  // Get line items from peristed storage
  const [items, setItems] = useLocalStorage<CheckoutLineItemInput[]>(CART_PKEY)
  const _items = useRef<CheckoutLineItemInput[]>(items || [])

  /**
   * Updates the line items state and persists the items to local storage.
   *
   * @param {UseCartContext} cart - `CartContextProvider` state
   * @param {CheckoutLineItemInput[]} cart.items - Checkout line items
   * @return {Promise<void>} Empty promise if cart updates successfully
   */
  const persistCart = async (cart: UseCartContext): Promise<void> => {
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
 * @param {AppContext} actx - Next.js app context
 * @param {NextPageContext} actx.ctx - Next.js page context
 * @param {string} [actx.ctx.asPath] - Actual path including query
 * @param {string} actx.ctx.pathname - Path segment of `URL`
 * @param {IncomingMessage} actx.ctx.req - `HTTP` request object
 * @param {IncomingHttpHeaders} actx.ctx.req.headers - Incoming request headers
 * @return {Promise<IAppInitialProps>} Promise containing initial app props
 */
App.getInitialProps = async (actx: AppContext): Promise<IAppInitialProps> => {
  const { pathname, req } = actx.ctx

  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await NextApp.getInitialProps(actx)

  // Get layout data
  const layout = await kapi<APIPayload.Layout>({ url: 'layout' })

  // Get hostname
  const host = req?.headers.host ?? process.env.SITE_URL?.split('://')[1]

  // Build `pageview` params object
  const param: PageViewParam = {
    dl: actx.ctx.asPath as string,
    documentHost: host as string,
    documentPath: pathname,
    ds: 'storefront',
    ua: req?.headers['user-agent'] ?? ''
  }

  // Send `pageview` hit to Google Analytics
  if (req?.headers.host) await ga.pageview({ ...param, ...vercel })

  // Enable AddThis script rendering on product pages
  const addthis = param.documentPath.includes('/products/')

  return { ...appProps, addthis, layout, ua: param.ua as string }
}

/**
 * Logs Next.js web metrics and sends results to Google Analytics.
 *
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting
 * @see https://nextjs.org/docs/advanced-features/measuring-performance
 *
 * @param {Metric} metric - Web metric object
 * @param {string} metric.id - Unique ID; in context of the current page load
 * @param {string} metric.label - Type of metric, `custom` or `web-vital`
 * @param {string} metric.name - Metric name
 * @param {number} metric.startTime - First recorded timestamp of entry
 * @param {number} metric.value - Duration of entry
 * @return {Promise<void>} Empty promise if event is tracked succesfully
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
