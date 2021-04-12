import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Span } from '@system/lib/atoms/Span'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { LabelProps } from './Label.props'

/**
 * @file Implementation - Label
 * @module lib/atoms/Label/impl
 */

/**
 * Renders a `<label>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/label
 * - https://developer.mozilla.org/docs/Web/API/HTMLLabelElement
 */
export const Label: FREC<LabelProps> = forwardRef((props, ref) => {
  const { $form, children, htmlFor, required, ...rest } = props

  const sanitized = useSanitizedProps<'label'>(rest, { 'form-label': $form })

  return (
    <label
      {...sanitized}
      data-required={required || undefined}
      htmlFor={htmlFor}
      ref={ref}
    >
      {required ? [children, <Span key='required'>*</Span>] : children}
    </label>
  )
})

Label.displayName = 'Label'

Label.defaultProps = {}

export const LabelAnimated: AnimatedFREC<LabelProps> = a(Label)

LabelAnimated.displayName = 'LabelAnimated'

LabelAnimated.defaultProps = Label.defaultProps
