import { AnyObject } from '@flex-development/kustomzdesign/types'

/**
 * @file Subdomain Interfaces - Next.js Page Props
 * @module subdomains/app/interfaces/IPageProps
 */

/**
 * Props passed to all Next.js page components.
 *
 * @todo Update `page` type definition
 */
export interface IPageProps {
  /**
   * Page data for a collection, production, or online store page.
   *
   * @see https://shopify.dev/docs/admin-api/rest/reference/online-store
   */
  page: AnyObject
}
