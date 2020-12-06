import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'
import { IconProps } from '../Icon/Icon'

/**
 * @file Render a <label> element
 * @module components/atoms/Label/impl
 */

export interface LabelProps extends MutatedProps<HTMLLabelElement> {
  /**
   * If true, add the class `form-check-label`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/checks-radios
   *
   * @default false
   */
  check?: boolean

  /**
   * If true, add the class `col-form-label`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text
   *
   * @default false
   */
  col?: boolean

  /**
   * If true, add the class `form-label`.
   *
   * - https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text
   *
   * @default false
   */
  form?: boolean

  /**
   * The `id` of a labelable form-related element in the same document as the
   * `<label>` element. If this attribute is missing, the form-related element
   * should be nested within the `Label` instead.
   *
   * Because `for` is a reserved keyword in JavaScript, React uses `htmlFor`
   * instead.
   *
   */
  htmlFor?: string

  /**
   * Icon to render beside the element text.
   */
  icon?: IconProps

  /**
   * True if labelling a form control element where `required=true`.
   *
   * @default false
   */
  required?: boolean
}

/**
 * Renders a `<label>` element.
 *
 * - https://v5.getbootstrap.com/docs/5.0/forms/overview/#form-text
 * - https://developer.mozilla.org/docs/Web/HTML/Element/label
 * - https://developer.mozilla.org/docs/Web/API/HTMLLabelElement
 */
export const Label: FREC<LabelProps> = forwardRef((props, ref) => {
  const { check, col, form, htmlFor, required, ...rest } = props

  if (required) rest['data-required'] = required

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'label'>>(
    rest,
    {
      'col-form-label': !check && col,
      'form-check-label': check,
      'form-label': !check && form
    }
  )

  return (
    <animated.label {...sanitized} htmlFor={htmlFor} ref={ref}>
      {required && '*'}
      {(sanitized as typeof rest).children}
    </animated.label>
  )
})

Label.displayName = 'Label'

Label.defaultProps = {
  col: false,
  required: false
}
