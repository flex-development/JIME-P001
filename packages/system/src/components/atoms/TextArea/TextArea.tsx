import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedFormControlProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render a `<textarea>` element
 * @module components/atoms/TextArea/impl
 */

export interface TextAreaProps
  extends Omit<MutatedFormControlProps<HTMLTextAreaElement>, 'children'> {
  /**
   * The visible width of the text control, in average character widths. If it
   * is specified, it must be a positive integer.
   *
   * @default 20
   */
  cols?: number

  /**
   * In the React rendering lifecycle, the `value` attribute on form elements
   * will override the value in the DOM.
   *
   * With an uncontrolled component, you often want React to specify the initial
   * value, but leave subsequent updates uncontrolled. To handle this case, you
   * can specify a `defaultValue` attribute instead of `value`.
   *
   * See: https://reactjs.org/docs/uncontrolled-components.html#default-values
   */
  defaultValue?: MutatedFormControlProps['value']

  /**
   * The maximum number of characters (UTF-16 code units) that the user can
   * enter. If this value isn't specified, the user can enter an unlimited
   * number of characters.
   */
  maxLength?: number

  /**
   * The minimum number of characters (UTF-16 code units) required that the user
   * should enter.
   */
  minLength?: number

  /**
   * A hint to the user of what can be entered in the control.
   *
   * Carriage returns or line-feeds within the placeholder text must be treated
   * as line breaks when rendering the hint.
   */
  placeholder?: string

  /**
   * Indicates that the user should not be able to edit the value of the input.
   *
   * Unlike the `disabled` attribute, the `readOnly` attribute does not prevent
   * the user from clicking or selecting in the control. The value of a
   * read-only control is still submitted with the form.
   */
  readOnly?: boolean

  /**
   * The number of visible text lines for the control.
   */
  rows?: number

  /**
   * Indicates how the control wraps text.
   *
   * Possible values are:
   *
   * - `'hard'`: The browser automatically inserts line breaks (CR+LF) so that
   *   each line has no more than the width of the control; the cols attribute
   *   must also be specified for this to take effect.
   * - `'soft'`: The browser ensures that all line breaks in the value consist
   *   of a CR+LF pair, but does not insert any additional line breaks.
   * - `'off'`: Like soft but changes appearance to `white-space: pre` so line
   *   segments exceeding cols are not wrapped and the `<textarea>` becomes
   *   horizontally scrollable.
   *
   * If this attribute is not specified, `soft` is its default value.
   */
  wrap?: 'hard' | 'soft' | 'off'
}

/**
 * Renders a `<textarea>` element with the class `form-control`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/forms/form-control/
 * - https://developer.mozilla.org/docs/Web/HTML/Element/textarea
 * - https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement
 */
export const TextArea: FREC<TextAreaProps> = forwardRef((props, ref) => {
  const { invalid, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'textarea'>>(
    rest,
    {
      'form-control': true,
      'is-invalid': invalid
    }
  )

  sanitized['children'] = undefined

  return <animated.textarea {...sanitized} ref={ref} />
})

TextArea.displayName = 'TextArea'

TextArea.defaultProps = {}
