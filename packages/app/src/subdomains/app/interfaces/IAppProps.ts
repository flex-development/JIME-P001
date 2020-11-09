import { NextComponentType, NextPageContext } from 'next'
import { Router } from 'next/dist/client/router'
import { IAppInitialProps } from './IAppInitialProps'

/**
 * @file Subdomain Interfaces - Props passed to the Next.js app
 * @module subdomains/app/interfaces/IAppProps
 */

/**
 * Props passed from Next.js data-fetching methods.
 */
export interface IAppProps extends IAppInitialProps {
  Component: NextComponentType<
    NextPageContext,
    IAppInitialProps,
    IAppInitialProps['pageProps']
  >
  router: Router
  __N_SSG?: boolean
  __N_SSP?: boolean
}
