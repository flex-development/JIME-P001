import { useSanitizedProps } from '@system/hooks'
import {
  AnimatedFREC,
  FREC,
  MutatedFormControlProps,
  MutatedProps
} from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render a `<option>` element
 * @module components/atoms/Option/impl
 */

export interface OptionProps extends MutatedProps<HTMLOptionElement> {
  /**
   * If true, make option uncheckable.
   */
  disabled?: boolean

  /**
   * Meaning of the option. If the `label` isn't defined, its value is that of
   * the element text content.
   */
  label?: string

  /**
   * Value to be submitted with the form, should this option be selected. If
   * this attribute is omitted, the value is taken from the text content of the
   * option element.
   */
  value?: MutatedFormControlProps['value']
}

/**
 * Renders an `<option>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/option
 * - https://developer.mozilla.org/docs/Web/API/HTMLOptionElement
 */
export const Option: FREC<OptionProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'option'>>(
    props
  )

  sanitized['aria-label'] = props.label

  return <animated.option {...sanitized} ref={ref} />
})

Option.displayName = 'Option'

Option.defaultProps = {}
