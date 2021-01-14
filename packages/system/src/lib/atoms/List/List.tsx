import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { Item, ItemProps } from '../Item'
import { ListProps } from './List.props'

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
  const Component = a[is]

  return (
    // @ts-expect-error: support ability to render <ol> or <ul>
    <Component {...sanitized} ref={ref}>
      {(() => {
        if (rest.children) return rest.children

        return $items.map((item: ItemProps, i: number) => {
          const key = item['data-key'] || item.id || `item-${i}`
          return <Item {...item} key={key} />
        })
      })()}
    </Component>
  )
})

List.displayName = 'List'

List.defaultProps = {
  $items: []
}
