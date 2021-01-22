import { useSpring } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Item } from '@system/lib/atoms/Item'
import { List, ListProps } from '@system/lib/atoms/List'
import merge from 'lodash/merge'
import uniqueId from 'lodash/uniqueId'
import { FC } from 'react'
import type { DropdownMenuProps } from './DropdownMenu.props'

/**
 * @file Implementation - DropdownMenu
 * @module lib/molecules/DropdownMenu/impl
 */

/**
 * Displays a list of menu items.
 * Renders a `List` component with the class `dropdown-menu`.
 */
export const DropdownMenu: FC<DropdownMenuProps> = props => {
  const { $items = [], expanded, ...rest } = props

  // Get component props
  const sanitized = useSanitizedProps<'ul', ListProps>(
    { ...rest, 'aria-expanded': expanded },
    'dropdown-menu'
  )

  // Animate opacity and positioning
  const style = useSpring({
    opacity: expanded ? 1 : 0,
    transform: `translateY(${expanded ? 0 : '-200%'})`
  })

  return (
    <List {...sanitized} style={merge(sanitized['style'], style)}>
      {$items.map(item => {
        if (Object.keys(item).length === 0) return null
        return <Item {...item} key={uniqueId('list-item')} />
      })}
    </List>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

DropdownMenu.defaultProps = {
  $items: []
}
