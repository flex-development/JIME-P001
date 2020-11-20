import { ICMSPage } from '@app/subdomains/cms/interfaces/ICMSPage'
import { GitHubSession } from '@app/subdomains/cms/interfaces/IGitHubService'
import {
  CollectionTemplateProps,
  IndexTemplateProps,
  ProductTemplateProps,
  SearchTemplateProps
} from '@flex-development/kustomzdesign'

/**
 * @file Subdomain Interfaces - Next.js Page Props
 * @module subdomains/app/interfaces/IPageProps
 */

/**
 * Props passed to all Next.js page components.
 */
export interface IPageProps {
  /**
   * Page data for a collection, production, or online store page.
   *
   * @see https://shopify.dev/docs/admin-api/rest/reference/online-store
   */
  page: PageData | null

  /**
   * True if user is signed-in with GitHub and viewing a marketing site page.
   *
   * @see https://nextjs.org/docs/advanced-features/preview-mode
   */
  preview?: boolean

  /**
   * Current user session.
   */
  session: GitHubSession | null
}

/* eslint-disable prettier/prettier */

export type PageData =
  | CollectionTemplateProps
  | ICMSPage
  | IndexTemplatePropsServer
  | ProductTemplatePropsServer
  | SearchTemplateProps

/* eslint-enable prettier/prettier */

/**
 * Server side `IndexTemplateProps`.
 */
export type IndexTemplatePropsServer = Pick<
  IndexTemplateProps,
  'products' | 'reviews'
>

/**
 * Server side `ProductTemplateProps`.
 */
export type ProductTemplatePropsServer = Pick<
  ProductTemplateProps,
  'product' | 'reviews'
>
