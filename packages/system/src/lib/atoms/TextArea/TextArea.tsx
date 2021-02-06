import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { TextAreaProps } from '././TextArea.props'

/**
 * @file Implementation - TextArea
 * @module lib/atoms/TextArea/impl
 */

/**
 * Renders a `<textarea>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/textarea
 * - https://developer.mozilla.org/docs/Web/API/HTMLTextAreaElement
 */
export const TextArea: FREC<TextAreaProps> = forwardRef((props, ref) => {
  const { $invalid, ...rest } = props

  const sanitized = useSanitizedProps<'textarea'>(rest, {
    'form-control': true,
    'is-invalid': $invalid
  })

  sanitized['children'] = undefined

  return <textarea {...sanitized} ref={ref} />
})

TextArea.displayName = 'TextArea'

TextArea.defaultProps = {}

export const TextAreaAnimated: AnimatedFREC<TextAreaProps> = a(TextArea)

TextAreaAnimated.displayName = 'TextAreaAnimated'

TextAreaAnimated.defaultProps = TextArea.defaultProps
