import { GridBreakpoint, GridSpanUtilitiesConfig } from '@system/types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { getResponsiveUtilities, GRID_BREAKPOINTS } from '../utils'

/**
 * @file Generate grid classes for a column or row
 * @module hooks/useGridOptions
 */

/**
 * Returns a string of grid classes for a column or row.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/grid/#grid-options
 *
 * @param utilities - Grid classes config
 * @param prefix - Grid prefix, 'col' or 'row-cols'
 * @param breakpoints - Breakpoint array to use instead of `GRID_BREAKPOINTS`
 */
export const useGridOptions = (
  utilities: GridSpanUtilitiesConfig,
  prefix: 'col' | 'row-cols' = 'col',
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINTS
): string => {
  const dictionary = {}

  getResponsiveUtilities(prefix, utilities, breakpoints).map(classes => {
    dictionary[classes] = !isEmpty(classes)
  })

  return classnames(dictionary)
}
