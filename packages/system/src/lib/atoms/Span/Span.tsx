import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { SpanProps } from './Span.props'

/**
 * @file Implementation - Span
 * @module lib/atoms/Span/impl
 */

/**
 * Renders a `<span>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/span
 * - https://developer.mozilla.org/docs/Web/API/HTMLSpanElement
 */
export const Span: FREC<SpanProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'span'>(props)
  return <span {...sanitized} ref={ref} />
})

Span.displayName = 'Span'

Span.defaultProps = {}

export const SpanAnimated: AnimatedFREC<SpanProps> = a(Span)

SpanAnimated.displayName = 'SpanAnimated'

SpanAnimated.defaultProps = {}
