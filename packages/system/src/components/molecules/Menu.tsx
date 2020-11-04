import { useMutatedProps } from '@system/hooks'
import React, { FC } from 'react'
import uuid from 'react-uuid'
import { Link, LinkProps, Nav, NavProps } from '../atoms'

/**
 * @file Navigation component
 * @module components/molecules/Menu
 */

export interface MenuProps extends NavProps {
  /**
   * Links to display in the menu.
   *
   * @default []
   */
  links?: LinkProps[]
}

/**
 * Displays the site navigation. Renders a `Nav` component.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/navs
 */
export const Menu: FC<MenuProps> = (props: MenuProps) => {
  const { links = [], ...rest } = props

  const mutated = useMutatedProps<typeof rest>(rest)

  return (
    <Nav {...mutated}>
      {links.map((link: LinkProps): MenuProps['children'] => {
        return <Link {...link} key={uuid()} nav />
      })}
    </Nav>
  )
}

Menu.displayName = 'Menu'

Menu.defaultProps = {
  links: []
}
