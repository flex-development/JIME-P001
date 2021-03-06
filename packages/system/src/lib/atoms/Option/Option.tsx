import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { OptionProps } from './Option.props'

/**
 * @file Implementation - Option
 * @module lib/atoms/Option/impl
 */

/**
 * Renders an `<option>` element with the class `form-option`.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/option
 * - https://developer.mozilla.org/docs/Web/API/HTMLOptionElement
 */
export const Option: FREC<OptionProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'option'>(
    { ...props, 'aria-label': props['aria-label'] || props.label },
    'form-option'
  )

  return <option {...sanitized} ref={ref} />
})

Option.displayName = 'Option'

Option.defaultProps = {}

export const OptionAnimated: AnimatedFREC<OptionProps> = a(Option)

OptionAnimated.displayName = 'OptionAnimated'

OptionAnimated.defaultProps = Option.defaultProps
