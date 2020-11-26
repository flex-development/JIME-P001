import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  ReactNode,
  RefAttributes
} from 'react'
import { Item, ItemProps } from '../Item/Item'

/**
 * @file Render a <ol> or <ul> element
 * @module components/atoms/List/List
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
 * JSX `<dl>`, `<ol>`, and `<ul>` properties.
 */
type InstrinsicListProps = JSX.IntrinsicElements['dl'] &
  JSX.IntrinsicElements['ol'] &
  JSX.IntrinsicElements['ul']

/**
 * List component properties without the `ref` property.
 */
export type ReflessListProps = PropsWithoutRef<ListProps>

/**
 * Ref attributes for `<dl>`, `<ol>`, and `<ul>` elements.
 */
export type ListRefAttributes = RefAttributes<HTMLListElement>

/**
 * {@link List} component forward ref properties.
 */
export type ListRefProps = ReflessListProps & ListRefAttributes

/**
 * Renders a `<ol>` or `<ul>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/ol
 * - https://developer.mozilla.org/docs/Web/HTML/Element/ul
 * - https://developer.mozilla.org/docs/Web/API/HTMLOListElement
 * - https://developer.mozilla.org/docs/Web/API/HTMLUListElement
 */
export const List: FREC<ListRefProps> = forwardRef((props, ref) => {
  const { is, items = [], ...rest } = props

  const mutated = useMutatedProps<typeof rest, InstrinsicListProps>(rest)

  mutated.children = ((): ReactNode => {
    if (rest.children) return rest.children

    return items.map((item: ItemProps, i: number) => {
      const key = item['data-key'] || item.id || `item-${i}`

      return <Item {...item} key={key} />
    })
  })()

  switch (is) {
    case 'ol':
      return <ol {...mutated} ref={ref} />
    default:
      return <ul {...mutated} ref={ref} />
  }
})

List.displayName = 'List'

List.defaultProps = {
  is: 'ul',
  items: []
}
