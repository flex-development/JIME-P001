import { AnyObject } from '@flex-development/json'
import { useSanitizedProps } from '@system/hooks'
import { uuid } from '@system/utils'
import { FC, useEffect } from 'react'
import { useArray } from 'react-hanger/array/useArray'
import { Link, LinkProps, Nav, NavProps } from '../../atoms'

/**
 * @file Navigation component
 * @module components/molecules/Menu/Menu/Menu/impl
 */

export interface MenuProps extends NavProps {
  /**
   * Links to display in the menu.
   *
   * @default []
   */
  links?: LinkProps[]
}

type MenuLink = LinkProps & { key: string }

/**
 * Displays the site navigation. Renders a `Nav` component.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/navs
 */
export const Menu: FC<MenuProps> = (props: MenuProps) => {
  const { links: initialLinks = [], ...rest } = props

  const sanitized = useSanitizedProps<typeof rest>(rest)

  const [links, { setValue: setLinks }] = useArray<MenuLink>([])

  useEffect(() => {
    setLinks(initialLinks.map(data => ({ ...data, key: uuid(), nav: true })))
  }, [initialLinks, setLinks])

  return (
    <Nav {...sanitized}>
      {/* eslint-disable-next-line prettier/prettier */}
      {links.map(({ key, uuid, ...link }: AnyObject) => {
        return <Link {...link} key={uuid || key} />
      })}
    </Nav>
  )
}

Menu.displayName = 'Menu'

Menu.defaultProps = {
  links: []
}
