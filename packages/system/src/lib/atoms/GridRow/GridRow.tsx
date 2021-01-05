import { GRID_ROW_UTILITY_CLASS } from '@system/config'
import { useSanitizedProps, useUtilityClasses } from '@system/hooks'
import { FREC } from '@system/types'
import { isBoolean } from 'lodash'
import { forwardRef } from 'react'
import { Box, BoxProps } from '../Box'
import { GridRowProps } from './GridRow.props'

/**
 * @file Implementation - GridRow
 * @module lib/atoms/GridRow/impl
 */

/**
 * Grid layout component.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const GridRow: FREC<GridRowProps> = forwardRef((props, ref) => {
  const { $lg, $md, $span, $sm, $xl, $xs, $xxl, ...rest } = props

  // Get row values
  const lg = isBoolean($lg) ? ($lg ? 'full' : undefined) : $lg
  const md = isBoolean($md) ? ($md ? 'full' : undefined) : $md
  const span = isBoolean($span) ? ($span ? 'full' : undefined) : $span
  const sm = isBoolean($sm) ? ($sm ? 'full' : undefined) : $sm
  const xl = isBoolean($xl) ? ($xl ? 'full' : undefined) : $xl
  const xs = isBoolean($xs) ? ($xs ? 'full' : undefined) : $xs
  const xxl = isBoolean($xxl) ? ($xxl ? 'full' : undefined) : $xxl

  // Generate grid column utility classes
  const utils = useUtilityClasses(
    { lg, md, sm, xl, xs: span || xs, xxl },
    {
      lg: GRID_ROW_UTILITY_CLASS,
      md: GRID_ROW_UTILITY_CLASS,
      sm: GRID_ROW_UTILITY_CLASS,
      xl: GRID_ROW_UTILITY_CLASS,
      xs: GRID_ROW_UTILITY_CLASS,
      xxl: GRID_ROW_UTILITY_CLASS
    }
  )

  // Get component properties
  const sanitized = useSanitizedProps<'div', BoxProps>(rest, utils)

  return <Box {...sanitized} ref={ref} />
})

GridRow.displayName = 'GridRow'

GridRow.defaultProps = {}
