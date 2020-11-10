import { LinkProps } from '@flex-development/kustomzdesign/components'

/**
 * @file Domain Object Interfaces - CMS Menu Link
 * @module subdomains/cms/interfaces/ICMSMenuLink
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
