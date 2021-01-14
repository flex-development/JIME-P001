import { GRID_COLUMN_UTILITY_CLASS } from '@system/config/constants'
import { useSanitizedProps, useUtilityClasses } from '@system/hooks'
import { FREC } from '@system/types'
import { forwardRef } from 'react'
import { Box, BoxProps } from '../Box'
import { GridColumnProps } from './GridColumn.props'

/**
 * @file Implementation - GridColumn
 * @module lib/atoms/GridColumn/impl
 */

/**
 * Grid layout component.
 *
 * - https://developer.mozilla.org/docs/Web/HTML/Element/div
 * - https://developer.mozilla.org/docs/Web/API/HTMLDivElement
 */
export const GridColumn: FREC<GridColumnProps> = forwardRef((props, ref) => {
  const { $lg, $md, $span, $sm, $xl, $xs, $xxl, ...rest } = props

  // Get column values
  const lg = typeof $lg === 'boolean' ? ($lg ? 'full' : undefined) : $lg
  const md = typeof $md === 'boolean' ? ($md ? 'full' : undefined) : $md
  const span = typeof $span === 'boolean' ? ($span ? 'full' : undefined) : $span
  const sm = typeof $sm === 'boolean' ? ($sm ? 'full' : undefined) : $sm
  const xl = typeof $xl === 'boolean' ? ($xl ? 'full' : undefined) : $xl
  const xs = typeof $xs === 'boolean' ? ($xs ? 'full' : undefined) : $xs
  const xxl = typeof $xxl === 'boolean' ? ($xxl ? 'full' : undefined) : $xxl

  // Generate grid column utility classes
  const utils = useUtilityClasses(
    { lg, md, sm, xl, xs: span || xs, xxl },
    {
      lg: GRID_COLUMN_UTILITY_CLASS,
      md: GRID_COLUMN_UTILITY_CLASS,
      sm: GRID_COLUMN_UTILITY_CLASS,
      xl: GRID_COLUMN_UTILITY_CLASS,
      xs: GRID_COLUMN_UTILITY_CLASS,
      xxl: GRID_COLUMN_UTILITY_CLASS
    }
  )

  // Get component properties
  const sanitized = useSanitizedProps<'div', BoxProps>(rest, utils)

  return <Box {...sanitized} ref={ref} />
})

GridColumn.displayName = 'GridColumn'

GridColumn.defaultProps = {}
