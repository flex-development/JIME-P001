import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render a `<span>` element
 * @module components/ui/atoms/Span/impl
 */

export type SpanProps = MutatedProps<HTMLSpanElement>

/**
 * Renders a `<span>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/span
 * - https://developer.mozilla.org/docs/Web/API/HTMLSpanElement
 */
export const Span: FREC<SpanProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'span'>>(props)
  return <animated.span {...sanitized} ref={ref} />
})

Span.displayName = 'Span'

Span.defaultProps = {}
