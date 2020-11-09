import { IPageProps } from './IPageProps'

/**
 * @file Subdomain Interfaces - Props passed from data-fetching methods
 * @module subdomains/app/interfaces/IAppInitialProps
 */

/**
 * Props passed from Next.js data-fetching methods.
 */
export interface IAppInitialProps {
  /**
   * Props passed to Next.js page components.
   */
  pageProps: IPageProps
}
