import { MutatedProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { useMutatedProps, useTextUtilities } from '../hooks'

/**
 * @file Render a `<div>` element
 * @module lib/elements/Box
 */

/**
 * {@link Box} component properties.
 */
export type BoxProps<E = HTMLDivElement> = MutatedProps<E>

/**
 * {@link Box} component properties without the `ref` property.
 */
export type ReflessBoxProps = PropsWithoutRef<BoxProps>

/**
 * Ref attributes for `<div>` elements.
 */
export type BoxRefAttributes = RefAttributes<HTMLDivElement>

/**
 * {@link Box} component forward ref properties.
 */
export type BoxRefProps = ReflessBoxProps & BoxRefAttributes

/**
 * Renders a `<div>` element.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/div**
 */
export const Box: FREC<BoxRefProps> = forwardRef((props, ref) => {
  const { dictionary, sanitized } = useTextUtilities<typeof props>(props)

  const mutatedProps = useMutatedProps<
    typeof sanitized,
    JSX.IntrinsicElements['div']
  >(sanitized, dictionary)

  return <div {...mutatedProps} ref={ref} />
})

Box.defaultProps = {}
