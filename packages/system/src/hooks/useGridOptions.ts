import classnames from 'classnames'
import { isBoolean, isNumber, isString } from 'lodash'
import { GridBreakpoint, GridSpanConfig } from '../types'
import { breakpointInfix, GRID_BREAKPOINTS } from '../utils'

/**
 * @file Generate grid classes for a column or row
 * @module hooks/useGridOptions
 *
 * @todo Add comments
 */

/**
 * Returns a string of grid classes for a column or row.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/layout/grid/#grid-options
 *
 * @param config - Grid classes config
 * @param prefix - Type of grid item, `col` or `row`
 * @param breakpoints - Breakpoint array to use instead of `GRID_BREAKPOINTS`
 */
export const useGridOptions = (
  config: GridSpanConfig,
  prefix: 'col' | 'row' = 'col',
  breakpoints: GridBreakpoint[] = GRID_BREAKPOINTS
): string => {
  const dictionary = {}

  /**
   * Generates a dictionary key for the grid span classes dictionary.
   *
   * @param breakpoint - Grid breakpoint
   * @param append - Value to append to dictionary key
   */
  const key = (breakpoint: GridBreakpoint, append = '') => {
    return `${prefix}${breakpointInfix(breakpoint)}${append}`
  }

  breakpoints.forEach(breakpoint => {
    const config_value = config[breakpoint]

    if (isBoolean(config_value) && prefix === 'col') {
      dictionary[key(breakpoint)] = config_value
    } else if (isNumber(config_value) || isString(config_value)) {
      dictionary[key(breakpoint, `-${config_value}`)] = true
    }
  })

  return classnames(dictionary)
}
