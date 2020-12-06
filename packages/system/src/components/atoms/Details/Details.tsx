import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'
import { Summary } from '../Summary/Summary'

/**
 * @file Render a `<details>` element
 * @module components/atoms/Details/impl
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
 * Renders a `<details>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/details
 * - https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement
 */
export const Details: FREC<DetailsProps> = forwardRef((props, ref) => {
  const { children, summary, ...rest } = props

  const sanitized = useSanitizedProps<typeof rest, AnimatedFREC<'details'>>(
    rest
  )

  return (
    <animated.details {...sanitized} ref={ref}>
      {summary && <Summary {...summary} />}
      {children}
    </animated.details>
  )
})

Details.displayName = 'Details'

Details.defaultProps = {
  open: false
}
