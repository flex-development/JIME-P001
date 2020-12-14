import { AnyObject } from '@flex-development/json'
import { Item, ItemProps, List, ListProps } from '@system/components/ui/atoms'
import { useSanitizedProps } from '@system/hooks'
import { uuid } from '@system/utils'
import classnames from 'classnames'
import { isEmpty, merge } from 'lodash'
import { FC, useEffect } from 'react'
import { useArray } from 'react-hanger/array/useArray'
import { useSpring } from 'react-spring'

/**
 * @file Navigation component
 * @module components/ui/molecules/DropdownMenu/impl
 */

export interface DropdownMenuProps extends ListProps {
  /**
   * Items to display in the dropdown menu.
   *
   * @default []
   */
  items?: ItemProps[]

  /**
   * If true, dropdown should be expanded.
   */
  open?: boolean
}

/**
 * Displays a dropdown menu.
 *
 * Renders a `List` component with the class `dropdown-menu`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/navs
 */
export const DropdownMenu: FC<DropdownMenuProps> = (
  props: DropdownMenuProps
) => {
  const { items = [], open, ...rest } = props

  // Get component props
  const sanitized = useSanitizedProps<typeof rest, ListProps>(rest, {
    'dropdown-menu': true,
    show: true
  })

  // Animate opacity and positioning
  const style = useSpring({
    opacity: open ? 1 : 0,
    transform: `translateY(${open ? 0 : '-200%'})`
  })

  // Dropdown items state
  const [_items, { setValue: setItems }] = useArray<ItemProps>([])

  // Add additional attributes to dropdown items
  useEffect(() => {
    setItems(
      items.map(data => ({
        ...data,
        className: classnames(data.className, 'dropdown-item'),
        dropdown: true,
        key: uuid()
      }))
    )
  }, [items, setItems])

  return (
    <List {...sanitized} style={merge(sanitized['style'], style)}>
      {_items.map((item: AnyObject) => {
        if (isEmpty(item)) return null

        const { key, uuid, ...rest } = item
        return <Item {...rest} key={uuid || key} />
      })}
    </List>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

DropdownMenu.defaultProps = {
  items: []
}
