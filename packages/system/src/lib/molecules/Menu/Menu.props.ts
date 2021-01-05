import { LinkProps, NavProps } from '@system/lib/atoms'

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
