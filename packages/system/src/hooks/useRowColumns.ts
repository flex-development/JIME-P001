import { GridBreakpoint, ResponsiveUtility, RowColumns } from '@system/types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { getResponsiveUtilities, GRID_BREAKPOINTS } from '../utils'

/**
 * @file Generate row utility classes
 * @module hooks/useRowColumns
 */

/**
 * Returns a string of `row-cols-*` classes.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/grid/#row-columns
 *
 * @param config - Row column config
 * @param breakpoints - Breakpoint array to use instead of `GRID_BREAKPOINTS`
 */
export const useRowColumns = (
  config: ResponsiveUtility<RowColumns>,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINTS
): string => {
  const dictionary = {}

  getResponsiveUtilities('row-cols', config, breakpoints).map(classes => {
    dictionary[classes] = !isEmpty(classes)
  })

  return classnames(dictionary)
}
