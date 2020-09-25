import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import {GlobalProps} from '../declarations'
import {Item, ItemProps} from '../elements'
import {useMutatedProps} from '../modules/hooks'

/**
 * @module lib/elements/List
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/ol}
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/ul}
 */

export type HTMLListElement = HTMLDListElement &
  HTMLOListElement &
  HTMLUListElement

/**
 * {@link List} component properties.
 */
export interface ListProps extends GlobalProps<HTMLListElement> {
  /**
   * JSON array of items to render.
   *
   * @default []
   */
  items?: ItemProps[]

  /**
   * Type of list element to render.
   *
   * @default 'ul'
   */
  is?: 'ol' | 'ul'
}

/**
 * JSX `<dl>`, `<ol>`, and `<ul>` properties.
 */
type InstrinsicListProps = JSX.IntrinsicElements['dl'] &
  JSX.IntrinsicElements['ol'] &
  JSX.IntrinsicElements['ul']

/**
 * {@link List} component properties without the `ref` property.
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
export const List: FREC<ListRefProps> = forwardRef(({is, ...props}, ref) => {
  const {items, ...rest} = props

  const mutatedProps = useMutatedProps<typeof rest, InstrinsicListProps>(rest)

  mutatedProps.children = ((): ListProps['children'] => {
    if (rest.children) return rest.children

    return (items as ItemProps[]).map((props: ItemProps, i: number) => {
      const key = props['data-key'] || props.id || `item-${i}`

      return <Item {...props} key={key} />
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
  items: [],
}
