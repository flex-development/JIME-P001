import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import React from 'react'

/**
 * @file Next.js Custom App
 * @module pages/app
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */

/**
 * Custom app intialization component.
 *
 * @todo Get shop metadata to merge with page seo
 * @todo Get menus
 *
 * @param param0 - Component props
 * @param param0.Component - Current page component
 * @param param0.pageProps - Initial page props from data fetching methods
 */
const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps
}: AppProps) => {
  return <Component {...pageProps} />
}

export default App
