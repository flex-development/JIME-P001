import { useMutatedProps } from '@system/hooks'
import { MutatedProps } from '@system/types'
import React, {
  forwardRef,
  ForwardRefExoticComponent as FREC,
  PropsWithoutRef,
  RefAttributes
} from 'react'
import { Summary } from '../Summary/Summary'

/**
 * @file Render a `<details>` element
 * @module components/atoms/Details/Details
 */

export interface DetailsProps extends MutatedProps<HTMLDetailsElement> {
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
  summary?: MutatedProps
}

/**
 * Details component properties without the `ref` property.
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
 * - https://developer.mozilla.org/docs/Web/HTML/Element/details
 * - https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement
 */
export const Details: FREC<DetailsRefProps> = forwardRef((props, ref) => {
  const { children, summary, ...rest } = props

  const mutated = useMutatedProps<
    typeof rest,
    JSX.IntrinsicElements['details']
  >(rest)

  return (
    <details {...mutated} ref={ref}>
      {summary && <Summary {...summary} />}
      {children}
    </details>
  )
})

Details.displayName = 'Details'

Details.defaultProps = {
  open: false
}
