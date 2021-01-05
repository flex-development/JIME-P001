import { LinkProps } from '../Link'

/**
 * @file Component Props - CartPreview
 * @module lib/atoms/CartPreview/props
 */

export interface CartPreviewProps extends LinkProps {
  /**
   * URL to redirect the user to when the cart preview link is clicked.
   *
   * @default '/cart'
   */
  href?: LinkProps['href']
}
