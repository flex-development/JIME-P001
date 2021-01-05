import { useSanitizedProps } from '@system/hooks'
import { Item, List, ListProps } from '@system/lib/atoms'
import { uuid } from '@system/utils'
import { isEmpty, merge } from 'lodash'
import { FC } from 'react'
import { useSpring } from 'react-spring'
import { DropdownMenuProps } from './DropdownMenu.props'

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
        if (isEmpty(item)) return null
        return <Item {...item} key={uuid()} />
      })}
    </List>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

DropdownMenu.defaultProps = {
  $items: []
}
