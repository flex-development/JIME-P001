import { useMutatedProps } from '@system/hooks'
import { HTMLElementRefAttributes, MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef
} from 'react'

/**
 * @file Render a `<summary>` element
 * @module components/atoms/Summary
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/summary
 */

export type SummaryProps = MutatedProps<HTMLElement>

/**
 * Summary component properties without the `ref` property.
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
  const mutated = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['summary']
  >(props)

  return <summary {...mutated} ref={ref} />
})

Summary.displayName = 'Span'

Summary.defaultProps = {}
