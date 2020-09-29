import { useMutatedProps } from '@kustomz/hooks'
import { MutatedVoidElementProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'

/**
 * @file Render a `<hr>` element
 * @module lib/elements/Divider
 */

/**
 * Divider component properties.
 */
export interface DividerProps extends MutatedVoidElementProps<HTMLHRElement> {
  /**
   * Sets the color of the rule through color name or hexadecimal value.
   */
  color?: string
}

/**
 * Divider component properties without the `ref` property.
 */
export type ReflessDividerProps = PropsWithoutRef<DividerProps>

/**
 * Ref attributes for `<hr>` elements.
 */
export type DividerRefAttributes = RefAttributes<HTMLHRElement>

/**
 * {@link Divider} component forward ref properties.
 */
export type DividerRefProps = ReflessDividerProps & DividerRefAttributes

/**
 * Renders a `<hr>` element with the class `divider`.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/hr**
 */
export const Divider: FREC<DividerProps> = forwardRef((props, ref) => {
  const mutatedProps = useMutatedProps<
    typeof props,
    JSX.IntrinsicElements['hr']
  >(props, 'divider')

  return <hr {...mutatedProps} ref={ref} />
})
