import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { FREC } from '@system/types'
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
  const { $form, htmlFor, ...rest } = props

  const sanitized = useSanitizedProps<'label'>(rest, {
    'form-label': $form
  })

  return <a.label {...sanitized} htmlFor={htmlFor} ref={ref} />
})

Label.displayName = 'Label'

Label.defaultProps = {}
