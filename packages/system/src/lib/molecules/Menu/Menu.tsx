import { useSanitizedProps } from '@system/hooks'
import { Link, LinkProps, Nav, NavProps } from '@system/lib/atoms'
import { uuid } from '@system/utils'
import { FC } from 'react'
import { MenuProps } from './Menu.props'

/**
 * @file Implementation - Menu
 * @module lib/molecules/Menu/impl
 */

/**
 * Displays the site navigation.
 * Renders a `Nav` component with the class `menu`.
 */
export const Menu: FC<MenuProps> = props => {
  const { $items = [], ...rest } = props

  const sanitized = useSanitizedProps<'nav', NavProps>(rest, 'menu')

  return (
    <Nav {...sanitized}>
      {/* eslint-disable-next-line prettier/prettier */}
      {$items.map((link: LinkProps) => <Link {...link} $menu key={uuid()} />)}
    </Nav>
  )
}

Menu.displayName = 'Menu'

Menu.defaultProps = {
  $items: []
}
