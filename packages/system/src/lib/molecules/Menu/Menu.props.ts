import { LinkProps } from '@system/lib/atoms/Link'
import { NavProps } from '@system/lib/atoms/Nav'

/**
 * @file Component Props - Menu
 * @module lib/molecules/Menu/props
 */

export interface MenuProps extends NavProps {
  /**
   * Array of `Link` component properties.
   */
  $items?: LinkProps[]
}

export type MenuLinkProps = LinkProps & { key: string }
