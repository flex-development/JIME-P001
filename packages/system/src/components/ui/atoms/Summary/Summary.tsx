import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render a `<summary>` element
 * @module components/ui/atoms/Summary/impl
 */

/**
 * Renders a `<summary>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/summary
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Summary: FREC<MutatedProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'summary'>>(
    props
  )

  return <animated.summary {...sanitized} ref={ref} />
})

Summary.displayName = 'Summary'

Summary.defaultProps = {}
