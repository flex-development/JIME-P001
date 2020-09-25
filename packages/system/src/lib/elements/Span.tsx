import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes,
} from 'react'
import {ContentSectionProps} from '../declarations'
import {useMutatedProps, useTextContentDictionary} from '../modules/hooks'

/**
 * @module lib/elements/Span
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/span}
 */

/**
 * {@link Span} component properties.
 */
export type SpanProps = ContentSectionProps<HTMLSpanElement>

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
  const {dictionary, sanitized} = useTextContentDictionary<typeof props>(props)

  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['span']
  >(sanitized, dictionary)

  return <span {...mutatedProps} ref={ref} />
})
