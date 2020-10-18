import { Booleanish } from '@flex-development/kustomtypez'
import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { InputValue } from './Input'

/**
 * @module lib/atoms/Item
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/li
 */

export interface ItemProps<E = HTMLLIElement> extends MutatedProps<E> {
  /**
   * If true, add the class `dropdown-item`.
   */
  dropdown?: Booleanish

  /**
   * If true, add the class `nav-item`.
   */
  nav?: Booleanish

  /**
   * Current value of the form control.
   *
   * Submitted with the form as part of a name/value pair.
   */
  value?: InputValue
}

/**
 * Item component properties without the `ref` property.
 */
export type ReflessItemProps = PropsWithoutRef<ItemProps>

/**
 * Ref attributes for `<li>` elements.
 */
export type ItemRefAttributes = RefAttributes<HTMLLIElement>

/**
 * {@link Item} component forward ref properties.
 */
export type ItemRefProps = ReflessItemProps & ItemRefAttributes

/**
 * Renders a `<li>` element with the class `item`.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/li**
 * - **https://v5.getbootstrap.com/docs/5.0/components/navs/**
 */
export const Item: FREC<ItemRefProps> = forwardRef((props, ref) => {
  const { dropdown, nav, ...rest } = props

  const mutated = useMutatedProps<typeof rest, JSX.IntrinsicElements['li']>(
    rest,
    {
      'dropdown-item': dropdown,
      'nav-item': nav
    }
  )

  return <li {...mutated} ref={ref} />
})

Item.displayName = 'Item'

Item.defaultProps = {}
