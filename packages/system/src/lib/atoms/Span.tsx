import { useMutatedProps } from '@kustomz/hooks'
import { MutatedProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a `<span>` element
 * @module lib/elements/Span
 */

/**
 * {@link Span} component properties.
 */
export type SpanProps = MutatedProps<HTMLSpanElement>

/**
 * {@link Span} component properties without the `ref` property.
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
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['span']
  >(props)

  return <span {...mutatedProps} ref={ref} />
})
