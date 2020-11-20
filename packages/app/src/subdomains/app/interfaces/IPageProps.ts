import { ICMSPage } from '@app/subdomains/cms/interfaces/ICMSPage'
import { GitHubSession } from '@app/subdomains/cms/interfaces/IGitHubService'
import { FeathersErrorJSON } from '@feathersjs/errors'
import {
  CollectionTemplateProps,
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
  page: FeathersErrorJSON | PageData

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
  | ProductTemplatePropsServer
  | SearchTemplateProps

/* eslint-enable prettier/prettier */

/**
 * Server side `ProductTemplateProps`.
 */
export type ProductTemplatePropsServer = Pick<
  ProductTemplateProps,
  'product' | 'reviews'
>
