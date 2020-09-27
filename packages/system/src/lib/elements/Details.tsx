import { MutatedProps } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { useMutatedProps } from '../hooks'

/**
 * @file Render a `<details>` element
 * @module lib/elements/Details
 */

/**
 * {@link Details} component properties.
 */
export interface DetailsProps extends MutatedProps<HTMLDetailsElement> {
  /**
   * Indicates whether or not the contents of the `<details>` element is
   * currently visible.
   *
   * @default false
   */
  open?: boolean
}

/**
 * {@link Details} component properties without the `ref` property.
 */
export type ReflessDetailsProps = PropsWithoutRef<DetailsProps>

/**
 * Ref attributes for `<details>` elements.
 */
export type DetailsRefAttributes = RefAttributes<HTMLDetailsElement>

/**
 * {@link Details} component forward ref properties.
 */
export type DetailsRefProps = ReflessDetailsProps & DetailsRefAttributes

/**
 * Renders a `<details>` element.
 *
 * - **https://developer.mozilla.org/docs/Web/HTML/Element/details**
 */
export const Details: FREC<DetailsRefProps> = forwardRef((props, ref) => {
  const { children, ...rest } = props

  const mutatedProps = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['details']
  >(rest)

  return (
    <details {...mutatedProps} ref={ref}>
      {children}
    </details>
  )
})

Details.defaultProps = {
  open: false
}
