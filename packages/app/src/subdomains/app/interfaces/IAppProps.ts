import { NextComponentType, NextPageContext as PageContext } from 'next'
import { AppContext } from 'next/app'
import { Router } from 'next/dist/client/router'
import { IAppInitialProps } from './IAppInitialProps'
import { IPageProps as IPP } from './IPageProps'

/**
 * @file Subdomain Interfaces - Props passed to the Next.js app
 * @module subdomains/app/interfaces/IAppProps
 */

/**
 * Props passed from Next.js data-fetching methods.
 */
export interface IAppProps extends IAppInitialProps {
  Component: NextComponentType<
    PageContext,
    IAppInitialProps,
    IAppInitialProps['pageProps']
  >
  router: Router
  __N_SSG?: boolean
  __N_SSP?: boolean
}

/**
 * Next.js app component type.
 */
export type AppComponent = NextComponentType<
  AppContext,
  IAppInitialProps,
  IAppProps
>

/**
 * `AppComponent` type alias.
 */
export type AC = AppComponent

/**
 * Next.js page component that renders a collection, production, or online store
 * page.
 */
export type PageComponent<P extends IPP = IPP> = NextComponentType<
  PageContext,
  IAppInitialProps,
  P
>

/**
 * `CMSPageComponent` type alias.
 */
export type PC<P extends IPP = IPP> = PageComponent<P>
