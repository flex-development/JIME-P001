import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { ParagraphProps } from './Paragraph.props'

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

  return <p {...sanitized} ref={ref} />
})

export const ParagraphAnimated: AnimatedFREC<ParagraphProps> = a(Paragraph)

ParagraphAnimated.displayName = 'ParagraphAnimated'

ParagraphAnimated.defaultProps = Paragraph.defaultProps
