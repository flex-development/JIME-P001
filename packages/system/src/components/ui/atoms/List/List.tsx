import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef, ReactNode } from 'react'
import { animated } from 'react-spring'
import { Item, ItemProps } from '../Item/Item'

/**
 * @file Render a <ol> or <ul> element
 * @module components/ui/atoms/List/impl
 */

export type HTMLListElement = HTMLOListElement & HTMLUListElement

export interface ListProps extends MutatedProps<HTMLListElement> {
  /**
   * Type of list element to render.
   *
   * @default 'ul'
   */
  is?: 'ol' | 'ul'

  /**
   * JSON array of items to render.
   *
   * @default []
   */
  items?: ItemProps[]
}

/**
 * Renders a `<ol>` or `<ul>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/ol
 * - https://developer.mozilla.org/docs/Web/HTML/Element/ul
 * - https://developer.mozilla.org/docs/Web/API/HTMLOListElement
 * - https://developer.mozilla.org/docs/Web/API/HTMLUListElement
 */
export const List: FREC<ListProps> = forwardRef((props, ref) => {
  const { is, items = [], ...rest } = props

  const sanitized = useSanitizedProps<
    typeof rest,
    AnimatedFREC<'ol'> | AnimatedFREC<'ul'>
  >(rest)

  sanitized['children'] = ((): ReactNode => {
    if (rest.children) return rest.children

    return items.map((item: ItemProps, i: number) => {
      const key = item['data-key'] || item.id || `item-${i}`

      return <Item {...item} key={key} />
    })
  })()

  switch (is) {
    case 'ol':
      return <animated.ol {...sanitized} ref={ref} />
    default:
      return <animated.ul {...sanitized} ref={ref} />
  }
})

List.displayName = 'List'

List.defaultProps = {
  is: 'ul',
  items: []
}
