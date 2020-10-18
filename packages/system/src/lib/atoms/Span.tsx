import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a `<span>` element
 * @module lib/atoms/Span
 */

export type SpanProps = MutatedProps<HTMLSpanElement>

/**
 * Span component properties without the `ref` property.
 */
export type ReflessSpanProps = PropsWithoutRef<SpanProps>

/**
 * Ref attributes for `<span>` elements.
 */
export type SpanRefAttributes = RefAttributes<HTMLSpanElement>

/**
 * {@link Span} component forward ref properties.
 */
export type SpanRefProps = ReflessSpanProps & SpanRefAttributes

/**
 * Renders a `<span>` element.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/span**
 */
export const Span: FREC<SpanRefProps> = forwardRef((props, ref) => {
  const mutated = useMutatedProps<typeof props, JSX.IntrinsicElements['span']>(
    props
  )

  return <span {...mutated} ref={ref} />
})

Span.displayName = 'Span'

Span.defaultProps = {}
