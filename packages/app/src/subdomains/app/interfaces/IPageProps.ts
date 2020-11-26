import { ICMSPage } from '@app/subdomains/cms/interfaces/ICMSPage'
import { GitHubSession } from '@app/subdomains/cms/interfaces/IGitHubService'
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
 * Props passed to Next.js page components.
 */
export interface IPageProps {
  /**
   * Page data for a collection, production, or online store page.
   *
   * @see https://shopify.dev/docs/admin-api/rest/reference/online-store
   */
  page: PageData

  /**
   * True if user is signed-in with GitHub.
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

/**
 * Types of data passed to Next.js page components via the `page` property.
 */
export type PageData =
  | CollectionTemplateProps
  | ICMSPage
  | ProductTemplateProps
  | SearchTemplateProps

/* eslint-enable prettier/prettier */
