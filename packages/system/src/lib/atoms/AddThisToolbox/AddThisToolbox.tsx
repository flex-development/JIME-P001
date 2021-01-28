import { a } from '@react-spring/web'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import type { BoxProps } from '@system/lib/atoms/Box'
import { Box } from '@system/lib/atoms/Box'
import type { AnimatedFREC, FREC } from '@system/types'
import { forwardRef } from 'react'
import type { AddThisToolboxProps as Props } from './AddThisToolbox.props'

/**
 * @file Implementation - AddThisToolbox
 * @module lib/atoms/AddThisToolbox/impl
 */

/**
 * Displays AddThis website tools.
 *
 * - https://www.addthis.com/
 */
export const AddThisToolbox: FREC<Props> = forwardRef((props, ref) => {
  const { type, ...rest } = props

  const $type = type ? type.trim() : ''

  const sanitized = useSanitizedProps<'div', BoxProps>(rest, {
    [`addthis_${$type}_toolbox`]: $type && $type.length
  })

  return <Box {...sanitized} ref={ref} />
})

AddThisToolbox.displayName = 'AddThisToolbox'

AddThisToolbox.defaultProps = {
  type: 'inline_share'
}

export const AddThisToolboxAnimated: AnimatedFREC<Props> = a(AddThisToolbox)

AddThisToolboxAnimated.displayName = 'AddThisToolboxAnimated'

AddThisToolboxAnimated.defaultProps = {}
