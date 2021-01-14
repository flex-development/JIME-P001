import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { ParagraphProps } from './Paragraph.props'

/**
 * @file Implementation - Paragraph
 * @module lib/atoms/Paragraph/impl
 */

/**
 * Renders a `<p>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/p
 * - https://developer.mozilla.org/docs/Web/API/HTMLParagraphElement
 */
export const Paragraph: FREC<ParagraphProps> = forwardRef((props, ref) => {
  const { $form, ...rest } = props

  const sanitized = useSanitizedProps<'p'>(rest, { 'form-text': $form })

  return <a.p {...sanitized} ref={ref} />
})

Paragraph.displayName = 'Paragraph'

Paragraph.defaultProps = {}
