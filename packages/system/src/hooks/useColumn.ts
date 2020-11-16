import {
  Columns,
  GridBreakpoint,
  ResponsiveUtility
} from '@flex-development/types'
import { GRID_BREAKPOINTS } from '@system/config'
import { getResponsiveUtilities } from '@system/utils'
import classnames from 'classnames'
import { isEmpty } from 'lodash'

/**
 * @file Generate grid column classes
 * @module hooks/useColumn
 */

/**
 * Returns a string of `col-*` classes.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/columns
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
