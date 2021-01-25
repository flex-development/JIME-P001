import { a } from '@react-spring/web'
import {
  CHECK_INPUT_TYPES,
  CONTROL_INPUT_TYPES,
  EMAIL_PLACEHOLDER
} from '@system/config/constants'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { InputProps } from './Input.props'

/**
 * @file Implementation - Input
 * @module lib/atoms/Input/impl
 */

/**
 * Renders an `<input>` element with the class `form-control`.
 *
 * If `type` is `checkbox` or `radio`, the class `form-check-input` will be
 * assigned instead.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/input
 * - https://developer.mozilla.org/docs/Web/API/HTMLInputElement
 */
export const Input: FREC<InputProps> = forwardRef((props, ref) => {
  const { placeholder, type } = props

  const checks = CHECK_INPUT_TYPES.includes(type as string)
  const control = CONTROL_INPUT_TYPES.includes(type as string)

  const email = type === 'email'
  const range = type === 'range'

  const sanitized = useSanitizedProps<'input'>(
    {
      ...props,
      placeholder: !placeholder && email ? EMAIL_PLACEHOLDER : placeholder
    },
    {
      'form-check-input': checks,
      'form-control': control,
      'form-range': range
    }
  )

  sanitized['children'] = undefined

  return <input {...sanitized} ref={ref} />
})

Input.displayName = 'Input'

Input.defaultProps = {
  autoComplete: 'on',
  type: 'text'
}

export const InputAnimated: AnimatedFREC<InputProps> = a(Input)

InputAnimated.displayName = 'InputAnimated'

InputAnimated.defaultProps = Input.defaultProps
