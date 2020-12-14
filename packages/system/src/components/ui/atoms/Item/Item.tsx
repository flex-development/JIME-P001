import { Booleanish } from '@flex-development/json'
import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'
import { InputValue } from '../Input'

/**
 * @module components/ui/atoms/Item/impl
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
 * Renders a `<li>` element.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/navs
 * - https://developer.mozilla.org/docs/Web/HTML/Element/li
 * - https://developer.mozilla.org/docs/Web/API/HTMLLIElement
 */
export const Item: FREC<ItemProps> = forwardRef((props, ref) => {
  const { dropdown, nav, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'li'>>(rest, {
    'dropdown-item': dropdown,
    'nav-item': nav
  })

  return <animated.li {...sanitized} ref={ref} />
})

Item.displayName = 'Item'

Item.defaultProps = {}
