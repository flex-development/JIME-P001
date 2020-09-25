import { GlobalProps, ThemeColor, ThemeOutline } from '@kustomz/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { Summary, SummaryProps } from '.'
import { useMutatedProps } from '../hooks'

/**
 * @module lib/elements/Details
 * @see {@link https://developer.mozilla.org/docs/Web/HTML/Element/details}
 */

/**
 * {@link Details} component properties.
 */
export interface DetailsProps extends GlobalProps<HTMLDetailsElement> {
  /**
   * Indicates whether or not the contents of the `<details>` element is
   * currently visible.
   *
   * @default false
   */
  open?: boolean

  /**
   * Properties to pass to the inner `Summary` component.
   */
  summary?: SummaryProps

  /**
   * Background color or outline variant.
   *
   * @default false
   */
  variant?: boolean | ThemeColor | ThemeOutline
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
  const { children, summary, ...rest } = props

  const mutatedProps = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['details']
  >(rest)

  return (
    <details {...mutatedProps} ref={ref}>
      {summary && <Summary {...summary} />}
      {children}
    </details>
  )
})

Details.defaultProps = {
  open: false
}
