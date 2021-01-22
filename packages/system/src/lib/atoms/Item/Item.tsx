import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { FREC } from '@system/types'
import { forwardRef } from 'react'
import type { ItemProps } from './Item.props'
/**
 * @file Implementation - Item
 * @module lib/atoms/Item/impl
 */

/**
 * Renders a `<li>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/li
 * - https://developer.mozilla.org/docs/Web/API/HTMLLIElement
 */
export const Item: FREC<ItemProps> = forwardRef((props, ref) => {
  const { $dropdown, $menu, ...rest } = props

  const sanitized = useSanitizedProps<'li'>(
    { ...rest, role: $dropdown ? 'button' : rest.role },
    { 'dropdown-item': $dropdown, 'menu-item': $menu }
  )

  return <a.li {...sanitized} ref={ref} />
})

Item.displayName = 'Item'

Item.defaultProps = {}
