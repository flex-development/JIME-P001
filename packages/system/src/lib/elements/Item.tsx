import { Booleanish } from '@flex-development/kustomtypez'
import { GlobalProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { useMutatedProps, useTextUtilities } from '../hooks'
import { InputValue } from './Input'

/**
 * @module lib/elements/Item
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/li}
 */

/**
 * {@link Item} component properties.
 */
export interface ItemProps<E = HTMLLIElement> extends GlobalProps<E> {
  /**
   * If true, add the class `dropdown-item`.
   *
   * @default false
   */
  dropdown?: Booleanish

  /**
   * If true, add the class `nav-item`.
   *
   * @default false
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
 * {@link Item} component properties without the `ref` property.
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

  const { dictionary, sanitized } = useTextUtilities<typeof rest>(rest)

  const mutatedProps = useMutatedProps<
    typeof sanitized,
    JSX.IntrinsicElements['li']
  >(sanitized, {
    ...dictionary,
    'dropdown-item': dropdown,
    'nav-item': nav
  })

  return <li {...mutatedProps} ref={ref} />
})

Item.defaultProps = {
  dropdown: false,
  nav: false
}
