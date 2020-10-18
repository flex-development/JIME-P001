import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a `<div>` element
 * @module lib/atoms/Box
 */

export type BoxProps<E = HTMLDivElement> = MutatedProps<E>

/**
 * Box component properties without the `ref` property.
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
  const mutated = useMutatedProps<typeof props, JSX.IntrinsicElements['div']>(
    props
  )

  return <div {...mutated} ref={ref} />
})

Box.displayName = 'Box'

Box.defaultProps = {}
