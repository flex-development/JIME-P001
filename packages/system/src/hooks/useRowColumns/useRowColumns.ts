import {
  GridBreakpoint,
  ResponsiveUtility,
  RowColumns
} from '@flex-development/kustomzcore'
import { GRID_BREAKPOINT_KEYS } from '@system/config'
import { getResponsiveUtilities } from '@system/utils'
import classnames from 'classnames'
import { isEmpty } from 'lodash'

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
 * @param breakpoints - Breakpoint keys to use instead of `GRID_BREAKPOINT_KEYS`
 */
export const useRowColumns = (
  config: ResponsiveUtility<RowColumns>,
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINT_KEYS
): string => {
  const dictionary = {}

  getResponsiveUtilities('row-cols', config, breakpoints).map(classes => {
    dictionary[classes] = !isEmpty(classes)
  })

  return classnames(dictionary)
}
