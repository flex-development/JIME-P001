import { ContentSectionProps, HTMLElementRefAttributes } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'
import { useMutatedProps, useTextUtilities } from '../hooks'

/**
 * @module lib/elements/Summary
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/summary}
 */

/**
 * {@link Summary} component properties.
 */
export type SummaryProps = ContentSectionProps<HTMLElement>

/**
 * {@link Summary} component properties without the `ref` property.
 */
export type ReflessSummaryProps = PropsWithoutRef<SummaryProps>

/**
 * {@link Summary} component forward ref properties.
 */
export type SummaryRefProps = ReflessSummaryProps & HTMLElementRefAttributes

/**
 * Renders a `<summary>` element.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/summary**
 */
export const Summary: FREC<SummaryRefProps> = forwardRef((props, ref) => {
  const { dictionary, sanitized } = useTextUtilities<typeof props>(props)

  const mutatedProps = useMutatedProps<
    typeof sanitized,
    JSX.IntrinsicElements['summary']
  >(sanitized, dictionary)

  return <summary {...mutatedProps} ref={ref} />
})
