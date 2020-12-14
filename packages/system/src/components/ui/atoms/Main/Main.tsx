import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render a `<main>` element
 * @module components/ui/atoms/Main/impl
 */

/**
 * Renders a `<main>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/main
 * - https://developer.mozilla.org/docs/Web/API/HTMLElement
 */
export const Main: FREC<MutatedProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'main'>>(props)
  return <animated.main {...sanitized} ref={ref} />
})

Main.displayName = 'Main'

Main.defaultProps = {}
