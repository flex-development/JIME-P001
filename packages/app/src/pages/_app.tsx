import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import React from 'react'

/**
 * @file Next.js Custom App
 * @module pages/app
 * @see https://nextjs.org/docs/advanced-features/custom-app
 *
 * @todo Import global stylesheet
 */

/**
 * Custom app intialization component.
 *
 * @param param0 - Component props
 * @param param0.Component - Current page component
 * @param param0.pageProps - Initial page props from data fetching methods
 */
const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps
}: AppProps) => <Component {...pageProps} />

export default App
