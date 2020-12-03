import { LinkProps } from '@flex-development/kustomzdesign'

/**
 * @file Subdomain Interface - CMS Menu Link
 * @module subdomains/cms/models/CMSMenuLink/interface
 */

/**
 * Object representing a CMS menu link.
 */
export interface ICMSMenuLink extends LinkProps {
  /**
   * Unique CMS link id.
   */
  readonly uuid: string
}
