import { GitHubSession } from '@app/subdomains/cms/interfaces/IGitHubService'
import { AnyObject } from '@flex-development/kustomzdesign/types'

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
  page: AnyObject

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
