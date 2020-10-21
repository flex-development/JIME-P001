import { Columns, GridBreakpoint, ResponsiveUtility } from '@system/types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import { getResponsiveUtilities, GRID_BREAKPOINTS } from '../utils'

/**
 * @file Generate grid column classes
 * @module hooks/useColumn
 */

/**
 * Returns a string of `col-*` classes.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/columns/
 *
 * @param config - Grid column span utilities
 * @param breakpoints - Breakpoint array to use instead of `GRID_BREAKPOINTS`
 */
export const useColumn = (
  utilities: ResponsiveUtility<boolean | Columns>,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINTS
): string => {
  const dictionary = {}

  getResponsiveUtilities('col', utilities, breakpoints).map(classes => {
    dictionary[classes] = !isEmpty(classes)
  })

  const classes = classnames(dictionary)

  return classes.length ? classes : 'col'
}