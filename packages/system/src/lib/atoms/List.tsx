import { useMutatedProps } from '@kustomz/hooks'
import { MutatedProps } from '@kustomz/types'
import React, {
  FC,
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  ReactNode,
  RefAttributes
} from 'react'
import { Item, ItemProps } from './Item'

/**
 * @file Render a <ol> or <ul> element
 * @module lib/elements/List
 */

export type HTMLListElement = HTMLOListElement & HTMLUListElement

/**
 * List component properties.
 */
export interface ListProps extends MutatedProps<HTMLListElement> {
  /**
   * Array of `Option` components to render.
   */
  children?: Array<typeof Item | FC<ItemProps>>

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
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/ol**
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/ul**
 */
export const List: FREC<ListRefProps> = forwardRef((props, ref) => {
  const { is, items = [], ...rest } = props

  const mutatedProps = useMutatedProps<typeof rest, InstrinsicListProps>(rest)

  mutatedProps.children = ((): ReactNode => {
    if (rest.children) return rest.children

    return items.map((item: ItemProps, i: number) => {
      const key = item['data-key'] || item.id || `item-${i}`

      return <Item {...item} key={key} />
    })
  })()

  switch (is) {
    case 'ol':
      return <ol {...mutatedProps} ref={ref} />
    default:
      return <ul {...mutatedProps} ref={ref} />
  }
})

List.defaultProps = {
  is: 'ul',
  items: []
}
