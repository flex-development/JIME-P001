import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { BoxProps } from './Box.props'

/**
 * @file Implementation - Box
 * @module lib/atoms/Box/impl
 */

/**
 * Renders a `<div>` element.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const Box: FREC<BoxProps> = forwardRef((props, ref) => {
  const sanitized = useSanitizedProps<'div'>(props)
  return <div {...sanitized} ref={ref} />
})

Box.displayName = 'Box'

Box.defaultProps = {}

export const BoxAnimated: AnimatedFREC<BoxProps> = a(Box)

BoxAnimated.displayName = 'BoxAnimated'

BoxAnimated.defaultProps = {}
