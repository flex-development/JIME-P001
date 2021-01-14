import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Link, LinkProps } from '@system/lib/atoms/Link'
import { Nav, NavProps } from '@system/lib/atoms/Nav'
import uniqueId from 'lodash/uniqueId'
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
      {$items.map((link: LinkProps) => (
        <Link {...link} $menu key={uniqueId('menu-item')} />
      ))}
    </Nav>
  )
}

Menu.displayName = 'Menu'

Menu.defaultProps = {
  $items: []
}
