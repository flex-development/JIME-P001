import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { ItemProps } from '@system/lib/atoms/Item'
import { Item } from '@system/lib/atoms/Item'
import type { AnimatedFREC, FREC } from '@system/types'
import { createElement, forwardRef } from 'react'
import type { ListProps } from './List.props'

/**
 * @file Implementation - List
 * @module lib/atoms/List/impl
 */

/**
 * Renders a `<ol>` or `<ul>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/ol
 * - https://developer.mozilla.org/docs/Web/HTML/Element/ul
 * - https://developer.mozilla.org/docs/Web/API/HTMLOListElement
 * - https://developer.mozilla.org/docs/Web/API/HTMLUListElement
 */
export const List: FREC<ListProps> = forwardRef((props, ref) => {
  const { $items = [], is = 'ul', ...rest } = props

  const sanitized = useSanitizedProps<'ul'>(rest)

  const children = () => {
    if (rest.children) return rest.children

    return $items.map((item: ItemProps, i: number) => {
      const key = item['data-key'] || item.id || `item-${i}`
      return <Item {...item} key={key} />
    })
  }

  return createElement(is, { ...sanitized, ref }, children())
})

List.displayName = 'List'

List.defaultProps = {
  $items: []
}

export const ListAnimated: AnimatedFREC<ListProps> = a(List)

ListAnimated.displayName = 'ListAnimated'

ListAnimated.defaultProps = List.defaultProps
