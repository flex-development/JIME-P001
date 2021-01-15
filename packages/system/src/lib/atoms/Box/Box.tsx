import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { BoxProps } from './Box.props'

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
  return <a.div {...sanitized} ref={ref} />
})

Box.displayName = 'Box'

Box.defaultProps = {}