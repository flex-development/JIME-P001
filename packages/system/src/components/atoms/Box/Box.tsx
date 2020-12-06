import { useSanitizedProps } from '@system/hooks'
import { AnimatedFREC, FREC, MutatedProps } from '@system/types'
import { forwardRef } from 'react'
import { animated } from 'react-spring'

/**
 * @file Render a `<div>` element
 * @module components/atoms/Box/impl
 */

export type BoxProps<E = HTMLDivElement> = MutatedProps<E>

/**
 * Renders a `<div>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const Box: FREC<BoxProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<typeof props, AnimatedFREC<'div'>>(props)
  return <animated.div {...sanitized} ref={ref} />
})

Box.displayName = 'Box'

Box.defaultProps = {}
